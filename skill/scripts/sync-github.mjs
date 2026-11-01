import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Keep Sites' source checkout separate from this private GitHub mirror.
const siteDir = 'E:/VHDL/future-tech-dashboard';
const mirrorDir = 'E:/VHDL/future-tech-radar-github';
const skillDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoName = 'haha333-114514/future-tech-radar-daily';
const remoteUrl = `https://github.com/${repoName}.git`;
const gitEnv = { ...process.env, GIT_TERMINAL_PROMPT: '0' };

function git(args, options = {}) {
  const result = spawnSync('git', args, {
    cwd: options.cwd || mirrorDir,
    encoding: 'utf8',
    env: gitEnv,
    input: options.input,
    maxBuffer: 8 * 1024 * 1024,
  });
  if (result.error || (!options.allowFailure && result.status !== 0)) {
    throw new Error(`Git ${args[0]} 失败：${result.error?.message || result.stderr?.trim() || `退出码 ${result.status}`}`);
  }
  return result;
}

async function verifyPrivateRepository() {
  const result = git(['credential', 'fill'], {
    cwd: siteDir,
    input: 'protocol=https\nhost=github.com\n\n',
  });
  const fields = Object.fromEntries(result.stdout.trim().split(/\r?\n/).map(line => {
    const i = line.indexOf('=');
    return [line.slice(0, i), line.slice(i + 1)];
  }));
  if (!fields.password) throw new Error('GitHub 登录凭据不可用，请恢复本机 Git 登录后重试。');
  const response = await fetch(`https://api.github.com/repos/${repoName}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${fields.password}`,
      'User-Agent': 'future-tech-radar-daily-sync',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) throw new Error(`无法确认 GitHub 仓库权限（HTTP ${response.status}）。`);
  const repo = await response.json();
  if (repo.full_name !== repoName || repo.private !== true || !repo.default_branch) {
    throw new Error('目标仓库不存在、不是预期仓库或已不是私有仓库，停止同步。');
  }
  return repo.default_branch;
}

function loadReports() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(siteDir, 'dist/reports.js'), 'utf8'), sandbox, { timeout: 5000 });
  const reports = sandbox.window.DAILY_REPORTS;
  if (!Array.isArray(reports) || !reports.length) throw new Error('找不到可同步的日报。');
  const dates = reports.map(report => report.date);
  if (dates.some(date => !/^\d{4}-\d{2}-\d{2}$/.test(date)) || new Set(dates).size !== dates.length || dates.some((d, i) => i && d >= dates[i - 1])) {
    throw new Error('日报日期无效、重复或未按最新优先排列，停止同步。');
  }
  return reports;
}

function reportMarkdown(report) {
  const lines = [`# 开发者趋势速报 · ${report.date}`, '', report.pulse, ''];
  if (report.metrics?.length) lines.push(`**本期指标：** ${report.metrics.map(m => `${m.label} ${m.value}`).join(' · ')}`, '');
  for (const item of report.items || []) {
    lines.push(`## ${item.title}`, '', `**${item.category} · ${item.level}**`, '', item.summary || '', '', item.why || '', '');
    if (item.meta?.length) lines.push(item.meta.join(' · '), '');
    const links = [];
    if (item.source) links.push(`[${item.sourceLabel || '原始来源'}](${item.source})`);
    if (item.playUrl) links.push(`[${item.playLabel || '体验 / 补充来源'}](${item.playUrl})`);
    if (links.length) lines.push(links.join(' ｜ '), '');
  }
  if (report.deepDive) lines.push(`## 今日深挖：${report.deepDive.title}`, '', report.deepDive.text, '', `[查看原始项目](${report.deepDive.source})`, '');
  if (report.noise) lines.push('## 信号与噪音', '', report.noise, '');
  return lines.join('\n');
}

function copyFile(source, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function render(target, reports) {
  for (const name of ['index.html', 'reports.js']) copyFile(path.join(siteDir, 'dist', name), path.join(target, 'dist', name));
  for (const name of ['SKILL.md', 'references/daily-brief-spec.md', 'scripts/sync-github.mjs']) {
    copyFile(path.join(skillDir, name), path.join(target, 'skill', name));
  }
  fs.mkdirSync(path.join(target, 'reports'), { recursive: true });
  for (const report of reports) fs.writeFileSync(path.join(target, 'reports', `${report.date}.md`), reportMarkdown(report), 'utf8');
  const readme = path.join(target, 'README.md');
  const existing = fs.existsSync(readme) ? fs.readFileSync(readme, 'utf8').trim() : '';
  if (!existing || existing === '# future-tech-radar-daily') {
    fs.writeFileSync(readme, '# 未来科技雷达 · 开发者趋势日报\n\n个人私有仓库，保存 [未来科技仪表盘](https://future-tech-radar-daily.jdh020684.chatgpt.site/)及每日研究记录。\n\n- `reports/`：按日期保存的中文日报，可直接阅读。\n- `dist/`：网站静态文件与全部历史数据。\n- `skill/`：本机日报技能及其同步脚本的备份。\n\n日报和网站文件由本机技能生成；每次运行同步到此仓库。站点托管配置和登录凭据不会同步。\n', 'utf8');
  }
}

async function main() {
  const reports = loadReports();
  if (process.argv[2] === '--render-only') {
    const target = process.argv[3];
    if (!target || !path.isAbsolute(target) || (fs.existsSync(target) && fs.readdirSync(target).length)) throw new Error('预览目录必须是绝对路径且为空。');
    fs.mkdirSync(target, { recursive: true });
    render(target, reports);
    console.log(`预览完成：${reports.length} 期，最新 ${reports[0].date}。`);
    return;
  }
  if (process.argv.length !== 2) throw new Error('不支持的参数。');
  const branch = await verifyPrivateRepository();
  if (!fs.existsSync(path.join(mirrorDir, '.git'))) {
    if (fs.existsSync(mirrorDir) && fs.readdirSync(mirrorDir).length) throw new Error('同步目录已存在且不是仓库，未修改现有文件。');
    git(['clone', '--', remoteUrl, mirrorDir], { cwd: siteDir });
  }
  const origin = git(['remote', 'get-url', 'origin']).stdout.trim();
  if (origin !== remoteUrl) throw new Error('同步目录的 GitHub 地址与预期不符，停止同步。');
  if (git(['status', '--porcelain', '--untracked-files=all']).stdout.trim()) throw new Error('同步目录包含尚未提交的改动，未覆盖或推送；请先处理这些改动。');
  if (git(['branch', '--show-current']).stdout.trim() !== branch) throw new Error('同步目录没有位于远程默认分支，停止同步。');
  git(['fetch', 'origin', branch]);
  git(['merge', '--ff-only', `refs/remotes/origin/${branch}`]);
  if (git(['rev-parse', 'HEAD']).stdout.trim() !== git(['rev-parse', `refs/remotes/origin/${branch}`]).stdout.trim()) {
    throw new Error('本地分支与远程存在未同步提交，未推送；请先检查。');
  }
  render(mirrorDir, reports);
  git(['add', '--', 'README.md', 'dist', 'reports', 'skill']);
  const staged = git(['diff', '--cached', '--quiet'], { allowFailure: true });
  if (staged.status === 1) {
    if (git(['config', 'user.name'], { allowFailure: true }).status !== 0) git(['config', '--local', 'user.name', 'haha333-114514']);
    if (git(['config', 'user.email'], { allowFailure: true }).status !== 0) git(['config', '--local', 'user.email', '182064659+haha333-114514@users.noreply.github.com']);
    git(['commit', '-m', `更新开发者趋势日报 ${reports[0].date}`]);
    git(['push', 'origin', `HEAD:refs/heads/${branch}`]);
  } else if (staged.status !== 0) {
    throw new Error('无法检查暂存的改动，停止同步。');
  }
  const local = git(['rev-parse', 'HEAD']).stdout.trim();
  const remote = git(['ls-remote', 'origin', `refs/heads/${branch}`]).stdout.trim().split(/\s+/)[0];
  if (local !== remote) throw new Error('远程版本与本地不一致，请检查 GitHub 推送结果。');
  console.log(`GitHub 私有仓库已同步：${repoName}，${reports.length} 期，最新 ${reports[0].date}，提交 ${local.slice(0, 12)}。`);
}

main().catch(error => { console.error(`GitHub 同步失败：${error.message}`); process.exitCode = 1; });
