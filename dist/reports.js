window.DAILY_REPORTS = [
  {
    date: "2026-11-03",
    label: "NOV 03",
    pulse: "今天值得关注的是更可靠地把模型和硬件工具跑起来：大图 VAE 显存预留、VHDL 解析与机器人模型兼容性都有修复，Lattice FPGA 的乘加推断也更完整。研究截止北京时间 11 月 3 日 18:05：10 条技术信号，另附 6 项趣味发现；本地可部署数只统计 8 项有本地运行路径的技术工具，两项机器人兼容性实验均未计入。",
    metrics: [
      { value: "16", label: "今日条目" },
      { value: "8", label: "本地可部署" },
      { value: "2", label: "具身进展" },
      { value: "3", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "VHDL / GHDL 语法解析",
        level: "NOV 03 UPDATE · 14:37 北京时间",
        title: "GHDL 改善 VHDL 语法树解析与格式化输出",
        summary: "14:37 合入的 pyGHDL DOM 修复补全受约束数组维度、枚举字符字面量、条件运算符和聚合赋值目标等解析或输出，并处理 PSL 默认时钟导致的异常。",
        why: "适合用 VHDL 做源码分析、工具集成或查看设计结构的开发者。作者报告 pyunit 测试为 238 通过、16 项预期失败，并解析多份 OSVVM 源码；这是作者测试，未在本机复现，也不是 FPGA 面积或时序数据。主干新增 pretty 的 --std 08 / 19 选择，不表示完整支持 VHDL-2019；需要匹配 pyVHDLModel 约 0.41.0，部分计时属性更名且类型变化，使用现有脚本前应检查兼容性。",
        meta: ["pyGHDL DOM · VHDL / PSL", "作者测试 238 通过 / 16 预期失败", "主干更新 · 注意 API 变化"],
        source: "https://github.com/ghdl/ghdl/pull/3443"
      },
      {
        category: "具身智能 / VLA 推理兼容",
        level: "NOV 03 UPDATE · 17:30 北京时间",
        title: "LeRobot 修复旧 VLA 检查点在新版 Transformers 下的兼容问题",
        summary: "17:30 合入：适配 Transformers 5.22 的视觉编码器参数路径与缓存接口，处理部分旧模型可能静默漏载视觉权重、SmolVLA 推理报错等问题。",
        why: "适合复核或迁移 Pi0、Pi0.5、Pi0-fast、SmolVLA 等策略的研究者。作者报告在 A100 上运行 12 项 OpenPI 对照测试通过，并检查 5 个 Hub 检查点的视觉权重；另有 2 项 PI0Fast 对照测试在主干中也失败。此次没有新增实体机器人闭环测试、传感器配置或硬件成本，不能当成实机成功率提升；代码 Apache-2.0，具体模型权重、许可和算力门槛需按检查点核实。与早些时候报道的 VLA-JEPA RoPE 兼容开关是不同问题，本机未复现。",
        meta: ["Transformers 5.22 · 视觉权重 / 缓存", "作者测试 A100 · 非实体测试", "权重与许可按模型核实"],
        source: "https://github.com/huggingface/lerobot/pull/5220"
      },
      {
        category: "图像超分 / VAE 显存管理",
        level: "NOV 03 MAIN · 北京时间",
        title: "InvokeAI 修正大图分块 VAE 的工作显存估算",
        summary: "07:33 合入：分块编码和解码不再只按单个图块估价，也考虑拼接整张图需要的额外内存，以减少大图时预留不足或小图时预留过多。",
        why: "适合本地大图修复、超分和分块 VAE 用户。作者在 RTX 4090 默认分配器、SDXL FP32 解码、512 像素分块、8192 像素图像的单例中，测得该操作需求 4.94 GiB；旧预留约为需求的 0.48 倍，新预留约 1.34 倍。这不是完整生成流程的总显存或通用最低配置。测量覆盖至 12288 像素，其他平台和更大尺寸存在外推限制；早期未发布估算器的用户校准需重做。代码 Apache-2.0，模型许可另查；与昨日纯超分模式及前日画布截图优化不同，本机未复现。",
        meta: ["SDXL / FLUX 分块 VAE", "4090 单例：实测需求 4.94 GiB", "工作内存估算 ≠ 整机最低显存"],
        source: "https://github.com/invoke-ai/InvokeAI/pull/9946"
      },
      {
        category: "图像生成 / LoRA 兼容",
        level: "NOV 03 MAIN · 北京时间",
        title: "InvokeAI 修复部分 Qwen-Image LoRA 的识别与映射",
        summary: "14:29 合入：识别带 ComfyUI diffusion_model. 或原生 PEFT base_model.model. 前缀的部分 Qwen-Image LoRA，并在加载时剥离前缀。",
        why: "适合在本地使用 Qwen-Image 编辑或风格 LoRA 的用户。作者在 Windows 11 / CPU 的文件头和元设备检查中，一组样本从 840/840 层无法映射变为 0/840；这不是实际生图质量评测，作者未使用 GPU 生图。纯 attention 的适配器以及 LoKr、LoHa、DoRA 等仍有不支持情况；已被记为 Unknown 的文件需在模型管理器重新识别。代码 Apache-2.0、权重许可另核；这是基础 Qwen-Image，不是 10 月 31 日报道的 Qwen-Image-2.1 LoRA。",
        meta: ["ComfyUI / PEFT 前缀", "作者仅做 CPU 识别与映射测试", "部分适配器仍不支持"],
        source: "https://github.com/invoke-ai/InvokeAI/pull/10061"
      },
      {
        category: "FPGA / Lattice DSP 综合",
        level: "NOV 03 MAIN · 北京时间",
        title: "Yosys 为 Lattice Nexus 增强乘加与四路点积推断",
        summary: "01:25 合入：Nexus 的 c + a×b 模式可推断到 MULTADDSUB36X36，四路 9×9 点积加外部加数可推断到 MULTADDSUB9X9WIDE；同时修复部分信号扇出和单元配置问题。",
        why: "适合在 Lattice Nexus / LIFCL 器件上做滤波、矩阵运算和 FPGA 加速的开发者。提交测试使用 synth_nexus -family lifcl；示例网表分别检查 1 个对应宏单元，并不等于完整设计的物理 DSP 数量、面积或最终频率。实际映射取决于位宽、有符号性、运算结构及工具链版本，PR 没有板上时序结果；建议综合前后对照单元统计并做等价性与布线时序验证。本次是主干修改，不保证已有安装包包含。",
        meta: ["Lattice Nexus / LIFCL · sysDSP", "36×36 乘加 / 四路 9×9", "示例宏单元数 ≠ 板级资源"],
        source: "https://github.com/YosysHQ/yosys/pull/6245"
      },
      {
        category: "FPGA / SystemVerilog 仿真性能",
        level: "NOV 03 MAIN · 北京时间",
        title: "Verilator 可按模块实例分组多线程仿真任务",
        summary: "03:45 合入 threads_group 指令，可让多核或阵列设计中标记模块的各实例尽量集中调度，改善多线程访问相同实例状态时的缓存局部性。",
        why: "适合运行大型多核 SystemVerilog 仿真的开发者。作者在 Xeon Gold 6254、4 线程、RTLMeter 特定测试中，BlackParrot 4×4 获 1.78–1.87 倍、HammerBlade 16×8 获 1.57 倍；单个分组占设计大部分时作者在一台 Mac 上反而测得 0.60 倍。需要 --threads 大于 1、手动选择分组，标记模块不内联；这是软件仿真速度，不是 FPGA 时钟。与昨日三态总线正确性修复不同。",
        meta: ["threads_group · 多线程仿真", "4 线程特定案例最高 1.87×", "分组过大可能变慢"],
        source: "https://github.com/verilator/verilator/pull/8804"
      },
      {
        category: "具身智能 / VLA 世界模型兼容",
        level: "NOV 02 MAIN · 非今日发布",
        title: "LeRobot 给旧 VLA-JEPA 检查点加入 RoPE 兼容开关",
        summary: "11 月 2 日 20:31 合入：旧检查点若在早期旋转位置编码实现下训练，可选择 world_model_rope_legacy 保持旧预测方式；新开关默认关闭。",
        why: "适合继续训练或复核旧 VLA-JEPA 世界模型的研究者。作者在 Jetson Orin NX 上用一个 SO-101 旧微调检查点及其数据的 25 段、200 个窗口离线比较，世界模型 L1 旧方式 1.175、新方式 1.731；这不是实体机器人闭环抓取成功率。数据页标注 SO-101、双摄 640×480 / 30fps，数据 Apache-2.0；LeRobot 代码 Apache-2.0，但引用的检查点本次无法访问、许可未核实，评测脚本尚未公开，硬件成本未给出，当前不能完整复现。与 11 月 1 日 EMA 训练更新不同。",
        meta: ["2 日合入 · 非今日发布", "SO-101 双摄记录 · Jetson 离线评估", "检查点不可核实 · 评测脚本未公开"],
        source: "https://github.com/huggingface/lerobot/pull/5098",
        playUrl: "https://huggingface.co/datasets/ravediamond/so101_bowls_all_trimmed",
        playLabel: "官方数据集 / Apache-2.0 ↗"
      },
      {
        category: "端侧推理 / Apple WebGPU 内存",
        level: "NOV 03 MAIN · 北京时间",
        title: "LiteRT 扩展 Apple WebGPU 的内存映射零复制路径",
        summary: "05:41 合入：在满足缓冲区与内存映射条件时，Apple WebGPU 后端除了已有整数格式，也允许 FP16 / FP32 数据走无需额外复制的导入路径。",
        why: "适合研究 Apple 设备端侧模型加载和 GPU 部署的开发者。该优化有后端、数据类型与内存映射条件，不能推断所有浏览器或模型都受益；原始提交没有给出通用内存节省和耗时数字。LiteRT 代码 Apache-2.0，模型权重许可、系统版本和硬件要求需按实际项目核对；主干提交，未本机测试。",
        meta: ["Apple WebGPU · mmap", "FP16 / FP32 条件路径", "未提供通用性能数字"],
        source: "https://github.com/google-ai-edge/LiteRT/pull/11321"
      },
      {
        category: "编码 Agent / 进程管理",
        level: "NOV 03 MAIN · 北京时间",
        title: "OpenCode 守护进程增加 Unix 管道进程模式",
        summary: "02:27 合入：进程守护组件可以在 Unix 下通过管道运行非交互命令，保留输出重放与订阅，为后续服务重启交接期间保活 shell 命令打基础。",
        why: "适合关注编码 Agent 长任务、日志和失败恢复的人。作者报告 Linux / macOS 的进程与信号测试，包括重启交接、输出重放和子进程终止；当前只是守护组件能力，不应当作所有 shell 命令已自动持久运行的承诺。Windows 支持仍待后续；管道模式 stdin 关闭，也不是终端交互或安全隔离机制。主干提交，未在本机运行。",
        meta: ["Unix 管道 · 非交互命令", "输出重放 / 进程组终止", "Windows 支持待后续"],
        source: "https://github.com/anomalyco/opencode/pull/60697"
      },
      {
        category: "本地 LLM 推理 / OpenCL 量化",
        level: "NOV 03 MAIN · 北京时间",
        title: "llama.cpp 的 OpenCL 后端初步支持 IQ4_XS",
        summary: "13:58 合入 IQ4_XS 量化格式的初步 OpenCL 支持，作者参考了 Adreno 的优化路径；这是 11 月 1 日 IQ3_S / IQ3_XXS 支持之后的另一种格式。",
        why: "适合愿意自行构建并测试手机或电脑 GPU 推理的用户。需要兼容 OpenCL 驱动和对应量化模型，llama.cpp 代码 MIT、模型许可另查；初步支持并不保证所有设备可用，原始提交也没有给出通用显存、精度和速度数据。先用固定输入比较输出质量，再测耗时与内存；主干代码未在本机验证。",
        meta: ["IQ4_XS · OpenCL", "参考 Adreno 路径", "驱动 / 精度 / 速度须实测"],
        source: "https://github.com/ggml-org/llama.cpp/pull/31339"
      },
      {
        category: "浏览器游戏 / 电梯调度",
        level: "趣味发现 · 非今日发布",
        title: "Elevator Saga：自己写程序指挥电梯接客",
        summary: "建议 15–25 分钟：调整 JavaScript 电梯调度逻辑，看看怎样更快接送乘客并通过逐渐变难的关卡。",
        why: "作者提供浏览器游戏和 MIT 源码，适合电脑键盘与鼠标；需要一点 JavaScript 基础。网页首次打开需联网，代码保存在浏览器本地，清除数据前建议自行复制备份。费用、账号、手机操作和离线体验未核实；项目目前不再积极维护，官方页面可访问但本次未实际试玩。",
        meta: ["15–25 分钟 · JavaScript 调度", "源码 MIT · 电脑键鼠", "本地保存代码 · 未试玩"],
        source: "https://github.com/magwo/elevatorsaga",
        sourceLabel: "作者源码 / MIT ↗",
        playUrl: "https://play.elevatorsaga.com/",
        playLabel: "打开官方游戏 ↗"
      },
      {
        category: "浏览器游戏 / 3D 方块解谜",
        level: "趣味发现 · 非今日发布",
        title: "FRAC：在三维井里旋转方块、填满整层",
        summary: "建议 8–15 分钟：移动和翻转立体方块，转动视角观察井底，填满一整层后消除；还可以切换练习模式。",
        why: "作者说明支持电脑键盘及手机、平板触控，需要 WebGL 2；无需账号，公开网页未见付费门槛。源码 GPL-3.0-only，在线游戏首次需要联网，离线安装尚未提供。进度保存在浏览器本地，可导出备份，不同网址的存档不互通；官方入口仅确认可访问，本次未实际试玩。",
        meta: ["8–15 分钟 · 三维旋转消层", "GPL-3.0-only · 键盘 / 触控", "需 WebGL 2 · 未试玩"],
        source: "https://github.com/kariato/frac",
        sourceLabel: "作者源码 / GPL-3.0-only ↗",
        playUrl: "https://kariato.github.io/frac/",
        playLabel: "打开官方游戏 ↗"
      },
      {
        category: "浏览器游戏 / 网络连线解谜",
        level: "趣味发现 · 非今日发布",
        title: "Net：旋转线路，把所有节点连成一张网",
        summary: "建议 5–15 分钟：转动每一格线路，让电脑和中心连通；没有速度压力，可以慢慢排除接错的岔路。",
        why: "Simon Tatham 的官方单机谜题合集提供网页与 Windows 原生版本，合集代码 MIT。网页需 JavaScript / WebAssembly，适合电脑鼠标操作；官方页面提供存档文件下载与恢复，浏览器清缓存前可先备份。费用、账号、手机操作和网页离线未独立实测，本次没有试玩或安装。",
        meta: ["5–15 分钟 · 线路旋转", "MIT · 官方 Windows 版可下载", "支持导出存档 · 未试玩"],
        source: "https://www.chiark.greenend.org.uk/~sgtatham/puzzles/",
        sourceLabel: "官方合集 / 源码与许可 ↗",
        playUrl: "https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/net.html",
        playLabel: "打开官方网页 ↗"
      },
      {
        category: "创意编程 / 像素小游戏",
        level: "趣味发现 · 非今日发布",
        title: "Playload Arcade：点开一串不到 3 KB 的小游戏",
        summary: "建议 10–20 分钟：先从街机列表挑个赛车、迷宫或推箱子作品玩，再打开编辑器看看小小的代码如何变成游戏。",
        why: "官方页面提供方向键 / WASD、Z / X 和屏幕按钮；压缩 JavaScript 上限 3 KB，作品代码编码在 URL 里，可以保存链接。引擎源码 MIT，社区作品和第三方素材各自的许可需另查；网页首次加载需联网，账号和离线体验未核实。入口可访问，但未实际试玩。",
        meta: ["10–20 分钟 · 街机 / 编辑器", "引擎 MIT · 作品许可另查", "键盘 / 屏幕按钮 · 备份 URL"],
        source: "https://github.com/kitao/playload",
        sourceLabel: "官方引擎源码 / MIT ↗",
        playUrl: "https://kitao.dev/playload/arcade/",
        playLabel: "打开官方街机列表 ↗"
      },
      {
        category: "浏览器游戏 / 三维迷宫",
        level: "趣味发现 · 非今日发布",
        title: "Astray：把一颗小球滚出三维迷宫",
        summary: "建议 5–10 分钟：用方向键或 H / J / K / L 控制小球，找到迷宫出口；想多玩一会儿就继续试下一关。",
        why: "作者提供 WebGL 网页和公开源码，仓库采用 Unlicense；适合电脑键盘。网页需支持 WebGL，作者给出自行下载源码和本地运行方式，但本次没有安装或测试离线；费用、账号与手机操作也未核实。官方入口页面可访问，未实际试玩。",
        meta: ["5–10 分钟 · 方向键 / HJKL", "Unlicense · WebGL", "入口可访问 · 未试玩"],
        source: "https://github.com/wwwtyro/Astray",
        sourceLabel: "作者源码 / Unlicense ↗",
        playUrl: "https://wwwtyro.github.io/Astray/",
        playLabel: "打开官方网页 ↗"
      },
      {
        category: "浏览器游戏 / 迷宫闯关",
        level: "趣味发现 · 非今日发布",
        title: "OpenGames：迷宫之外还有贪吃蛇和记忆翻牌",
        summary: "建议 5–15 分钟：在合集里挑迷宫、贪吃蛇、打地鼠或翻牌；想换口味时随手切到另一款。",
        why: "作者表示合集免费、无需账号，适用于手机和电脑；代码、原始图形及合成音效采用 MIT。首页可访问，但本次检索工具未能打开迷宫子页，实际可玩性、离线和触屏手感未验证，也没有试玩。浏览器保存的记录可能随清缓存丢失。",
        meta: ["5–15 分钟 · 六款网页小游戏", "作者说明免费 / 无账号", "MIT · 迷宫子页未核验"],
        source: "https://github.com/opengames-dev/opengames-dev.github.io",
        sourceLabel: "作者源码 / MIT ↗",
        playUrl: "https://opengames-dev.github.io/",
        playLabel: "打开官方游戏合集 ↗"
      }
    ],
    deepDive: {
      title: "从 RTL 乘加写法到 Lattice Nexus DSP 宏单元",
      text: "Yosys 针对 Nexus 的本次主干更新让更多乘加结构被识别成器件专用单元：最多 36×36 的 c+a×b 可映射为 MULTADDSUB36X36，四组 9×9 乘积加外部加数可映射为 MULTADDSUB9X9WIDE。此前相应乘法可能进 DSP、加法却留在通用逻辑；新推断更有机会把操作放在同一宏中。作者测试通过 synth_nexus -family lifcl 检查对应网表中各有一个目标宏，并增加有关扇出和等价性的测试；这个数量是测试网表的单元计数，不代表任何完整设计的最终 DSP、LUT 使用或布局后频率。位宽、符号扩展、运算顺序和中间结果是否被其他逻辑使用都会影响匹配。建议先用小型 RTL 在固定的 Yosys 版本上综合，比较变更前后的统计和等价性，再针对实际芯片做布局布线与时序分析；本次未在板上复现。",
      source: "https://github.com/YosysHQ/yosys/pull/6245"
    },
    noise: "判断而非事实：一个新 DSP 宏推断或单次仿真加速数字，很容易被理解为设计一定更省资源或板上频率一定更高；真实结果还取决于位宽、符号、布线、时序约束和并行划分。"
  },
  {
    date: "2026-11-02",
    label: "NOV 02",
    pulse: "今天的重点是让本地视觉工具更好用：ComfyUI 修复动态显存下的 FP8 计算，InvokeAI 发布新版画布与量化模型支持；FPGA 仿真和模型工具调用也有具体正确性修复。研究截止北京时间 11 月 2 日 12:10：6 条技术信号，另附 4 个趣味发现。",
    metrics: [
      { value: "10", label: "今日条目" },
      { value: "6", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / FP8 推理加速",
        level: "NOV 02 MAIN · 北京时间",
        title: "ComfyUI 修复动态显存模式下 FP8 意外退回 BF16",
        summary: "12:02 合入修复：动态显存开启时，FP8 路径改用实际转换后的权重类型判断，避免部分 BF16 检查点设置为 fp8_e4m3fn_fast 后仍走 BF16 计算。",
        why: "适合使用动态显存和 FLUX 工作流的本地用户。作者在 RTX 5070 Ti 16GB、FLUX.1 dev、1024²、20 步的单组测试中，开启动态显存由 1.08 提升到 1.73–1.83 迭代/秒；关闭动态显存的对照组约 1.73–1.77，修复前后基本不变。结果不能外推到所有显卡或模型；需支持所选 FP8 路径，权重许可另核。ComfyUI GPL-3.0，主干提交，本机未运行。与昨日 ProRes 导出是不同改动。",
        meta: ["RTX 5070 Ti 16GB · 单组测试", "动态显存 / fp8_e4m3fn_fast", "主干修复 · 非通用加速"],
        source: "https://github.com/Comfy-Org/ComfyUI/pull/16941"
      },
      {
        category: "图像生成 / 量化与超分",
        level: "NOV 02 RELEASE · alpha 预览版",
        title: "InvokeAI 7 alpha 4 把 4 位模型、区域布局和纯超分带进预览版",
        summary: "08:44 发布的 7.0.0 alpha 4 集成 Krea-2 的部分 ComfyUI INT4 ConvRot 格式、FLUX.3 画布区域布局，并加入只运行超分模型、不做去噪的模式。",
        why: "适合愿意测试预览版、本地生图与修图的人；这是昨日 INT8 传输优化、10 月 31 日 FLUX.3 接入之后的版本化进展。作者在 RX 9060 XT 16GB 的特定 1024² / 8 步案例中，INT4 模型约 34.7–34.9 秒/图，部分常驻 INT8 为 42.1–48.1 秒；收益主要来自模型更容易完整装入显存，INT4 每步仍需解包，不代表计算更快。6.4 GiB 是所测 transformer 常驻量，不是整套工作流最低显存。FLUX.3 区域是图层绘制内容的外接矩形，非精确蒙版。代码 Apache-2.0，模型权重许可各自核对；未在本机复现。",
        meta: ["7.0.0 alpha 4 · 预览版", "INT4 常驻量不等于总显存", "纯超分模式 · 许可按模型核对"],
        source: "https://github.com/invoke-ai/InvokeAI/releases/tag/v7.0.0-alpha.4",
        playUrl: "https://github.com/invoke-ai/InvokeAI/pull/9817",
        playLabel: "INT4 格式与作者测试 ↗"
      },
      {
        category: "图像工作流 / 矢量画布",
        level: "NOV 02 RELEASE · 稳定版",
        title: "InvokeAI 6.14.3 增加可编辑矢量图层",
        summary: "07:58 发布的 6.14.3 为画布增加可编辑形状和曲线图层，可按需要栅格化后用于图生图；同时修复服务中断后部分下载无法重新开始的问题。",
        why: "适合想先摆形状、再将结果送进本地生成工作流的用户。该稳定版与 7 alpha 是不同版本线，不应假设两者功能完全相同；生成所需显卡、内存和许可取决于所用模型。代码 Apache-2.0，本机未安装或验证下载恢复；更新前先保存画布与配置。",
        meta: ["6.14.3 稳定版", "矢量图层 → 栅格化 → 图生图", "下载重启修复 · 未本机测试"],
        source: "https://github.com/invoke-ai/InvokeAI/releases/tag/v6.14.3"
      },
      {
        category: "FPGA / SystemVerilog 仿真",
        level: "NOV 01 MAIN · 非今日发布",
        title: "Verilator 修复总线上拉与逐位上拉混用的求值",
        summary: "11 月 1 日 21:36 合入：此前 tri1 总线叠加逐位 pullup 时，没有单独上拉的位可能错误变成 0；示例中的 7 位总线应为 7'h7f，却得到 7'h08。",
        why: "适合验证三态总线、上拉或开漏接口的 RTL 开发者；变更从总线默认上拉/下拉值出发，再应用逐位设置，并增加回归用例。Verilator 可在本地用 CPU 构建，LGPL-3.0 / Artistic-2.0；建议对正反方向的索引和驱动/高阻状态做回归对照。这是仿真正确性，昨天报道的是循环展开编译性能；没有器件、综合资源或板级时序数据。",
        meta: ["1 日合入 · 非今日发布", "tri1 / pullup · 仿真正确性", "无 FPGA 板级结果"],
        source: "https://github.com/verilator/verilator/pull/8939"
      },
      {
        category: "LLM 推理服务 / 工具调用",
        level: "NOV 02 MAIN · 北京时间",
        title: "vLLM 修复 FunctionGemma 工具参数丢失和流式 JSON",
        summary: "11:27 合入：FunctionGemma 解析器现在处理数字、布尔值、数组和嵌套对象，并修复多参数流式响应及无参数调用的 JSON 拼接。",
        why: "适合自托管小模型、实验工具调用的开发者。作者报告 CPU 解析器 42 项及 H200 服务端 7 项测试通过；服务测试固定了部分输出，检验的是解析与服务行为，不是模型自主选工具的可靠率。作者仍记录大 stream_interval 下可能丢函数名的边界问题；权限、隔离、超时与失败恢复仍需另测。vLLM Apache-2.0，模型许可另查。本次针对 FunctionGemma，与昨日 HYV4 参数名修复不同。",
        meta: ["FunctionGemma · 数字 / 布尔 / 数组", "作者：CPU 42 项、H200 7 项通过", "极大分块间隔仍有边界限制"],
        source: "https://github.com/vllm-project/vllm/pull/63992"
      },
      {
        category: "本地 LLM 推理 / AMD ROCm",
        level: "NOV 02 MAIN · 北京时间",
        title: "vLLM 修复 RDNA 量化矩阵乘法的大尺寸地址溢出",
        summary: "12:06 合入针对 gfx11 / gfx12 的 W4A16 内核修复：大矩阵的行偏移改用 64 位，避免超过 32 位范围时触发显存访问错误或产生 NaN。",
        why: "适合在兼容 AMD 显卡与 ROCm 环境上部署量化模型的用户。作者在 Radeon R9700 / gfx1201 的两组大尺寸测试中复现错误并验证修复；现有 CI 没有覆盖 gfx11 / gfx12 的测试池，通用显存门槛与运行速度没有给出。该提交修的是特定大矩阵正确性，不代表所有 ROCm 模型都会更快；主干代码，本机未运行。",
        meta: ["RDNA gfx11 / gfx12 · W4A16", "作者 R9700 实测 · CI 覆盖缺口", "大矩阵地址正确性修复"],
        source: "https://github.com/vllm-project/vllm/pull/64614"
      },
      {
        category: "浏览器游戏 / 编程解谜",
        level: "趣味发现 · 非今日发布",
        title: "Untrusted：改关卡里的 JavaScript 帮角色逃出去",
        summary: "建议 15–25 分钟：屏幕一边是地图，一边是可编辑代码；试着改一小段脚本，给角色打开一条路。喜欢逐步发现规则的人可以先不看攻略。",
        why: "官方网页可打开，建议电脑键盘和鼠标；需要浏览器 JavaScript，手机操作、账号及离线体验未实测。作者公开源码和音乐，非商业使用按 CC BY-NC-SA 3.0，商业用途需另行授权，因此不能当作无限制开源许可。网页有自愿捐款入口；未实际试玩，进度请留意备份。",
        meta: ["15–25 分钟 · 代码闯关", "源码可见 · 非商业许可", "页面可访问 · 未实际试玩"],
        source: "https://github.com/AlexNisnevich/untrusted",
        sourceLabel: "作者源码 / 许可说明 ↗",
        playUrl: "https://untrustedgame.com/",
        playLabel: "官方网页入口 ↗"
      },
      {
        category: "本地游戏 / 编程增量",
        level: "趣味发现 · 非今日发布",
        title: "Bitburner：写脚本自动推进赛博朋克世界",
        summary: "建议先玩 20–30 分钟：从游戏里的终端和少量命令开始，逐渐用 JavaScript 脚本自动完成任务；不熟悉编程也可以先试基础玩法。",
        why: "官方提供浏览器版和 Steam 版，Steam 页面标注免费；Steam 安装需要其平台账号。适合桌面键盘，网页首次加载需联网，离线、手机与网页账号要求未实测。源码许可证为 Apache-2.0 加 Commons Clause，包含销售限制，不能简写成普通 Apache 开源许可；未安装或试玩，注意导出备份存档。",
        meta: ["20–30 分钟起 · JavaScript / 终端", "Steam 免费 · 需平台账号安装", "源码含 Commons Clause 限制"],
        source: "https://github.com/bitburner-official/bitburner-src",
        sourceLabel: "官方源码 / 完整许可 ↗",
        playUrl: "https://bitburner-official.github.io/",
        playLabel: "官方浏览器版 ↗"
      },
      {
        category: "浏览器游戏 / 六边形消除",
        level: "趣味发现 · 非今日发布",
        title: "Hextris：转动六边形，把同色方块接在一起",
        summary: "建议 5–10 分钟：转动中央六边形，让落下的同色方块相邻消除；节奏会越来越快，适合短暂休息时挑战一下。",
        why: "作者提供浏览器版和 GPL-3.0-or-later 源码。官方两个网页入口在本次检索中均返回 502，因此目前不能确认你的网络能否打开；键盘/触屏兼容、费用、账号和离线体验未实测，也未实际试玩。浏览器本地记录可能因清缓存丢失。",
        meta: ["5–10 分钟 · 旋转消除", "GPL-3.0-or-later 源码", "官方页面本次返回 502"],
        source: "https://github.com/Hextris/hextris",
        sourceLabel: "官方源码 / GPL-3.0-or-later ↗",
        playUrl: "https://hextris.github.io/hextris/",
        playLabel: "官方网页入口（本次返回 502） ↗"
      },
      {
        category: "互动网站 / 荒诞选择",
        level: "趣味发现 · 非今日发布",
        title: "Absurd Trolley Problems：把经典选择题越拧越离谱",
        summary: "建议 5–10 分钟：每关看一辆小电车要往哪条轨道走，然后作出选择；题目会不断增加奇怪的条件，轻松体验就好。",
        why: "Neal.fun 官方网页可访问，界面以点击选择为主；源码和授权未确认，不能视作开源。网页首次打开需要联网；账号、费用、手机触控及离线能力未独立核实。本次只检查到页面，没有实际操作；内容涉及卡通式伤亡情境。",
        meta: ["5–10 分钟 · 点击选择", "网页互动 · 源码未确认", "卡通式伤亡情境 · 未试玩"],
        source: "https://neal.fun/absurd-trolley-problems/",
        sourceLabel: "官方互动页面 ↗",
        playUrl: "https://neal.fun/absurd-trolley-problems/",
        playLabel: "打开互动页面 ↗"
      }
    ],
    deepDive: {
      title: "FP8 选项开了，为什么实际可能仍在用 BF16？",
      text: "动态显存模式会让部分权重先留在 CPU，真正送到 GPU 时才按目标精度转换。ComfyUI 此前检查的是仍在内存里的原始 BF16 权重类型，因此即使工作流选择 fp8_e4m3fn_fast，也可能错过 FP8 矩阵乘法并回退到 BF16。新提交在选择路径时读取目标转换类型；关闭动态显存时保持原有判断。作者用 RTX 5070 Ti 16GB、FLUX.1 dev、1024² / 20 步测得动态显存从 1.08 到 1.73–1.83 迭代/秒；这是特定工作流、驱动与硬件下的作者结果，不是通用承诺。用户可固定模型、种子、分辨率和步数，对比升级前后的迭代速度、峰值显存与图像效果，并留意对应 FP8 硬件和模型许可。主干修复不意味着所有现有安装包都已更新，本机未复现。",
      source: "https://github.com/Comfy-Org/ComfyUI/pull/16941"
    },
    noise: "判断而非事实：看到‘4 位’或一次大幅提速，很容易期待任何电脑都能更快生图。但量化可能主要节省的是权重常驻显存；是否提速还取决于解包开销、PCIe 传输、显卡内核和整体工作流。"
  },
  {
    date: "2026-11-01",
    label: "NOV 01",
    pulse: "今天的信号集中在把现有工具磨得更实用：本地生图的显存换算和大画布处理更省开销，视频导出更灵活，RTL 仿真和移动端量化也有具体改动。研究截止北京时间 11 月 1 日 21:40：7 条技术信号，另附 4 个可选趣味发现；本地运行不代表普通电脑都能开箱即用。",
    metrics: [
      { value: "11", label: "今日条目" },
      { value: "8", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 推理加速",
        level: "NOV 01 MAIN · 北京时间",
        title: "InvokeAI 优化 INT8 权重从内存搬到显卡的路径",
        summary: "10:25 合入：对适用的 INT8 权重，先以压缩格式从 CPU 传到 GPU，再在显卡上转换计算精度，减少部分卸载模型时的数据传输。",
        why: "适合显存装不下完整模型、需要 CPU 内存辅助的生图用户。作者 Windows / RTX 4090 的一组 Krea-2 Turbo、1024²、8 步测试中，24% 常驻显存时从 56.5 秒降到 20.2 秒；这是特定模型与配置，非通用提速。适用 tensorwise / convrot INT8 路径，模型完全常驻显存时路径不变；作者称输出像素一致，峰值预留显存可能略增。Apache-2.0 代码，权重许可另查；主干更新，本机未复现。与昨日 FLUX.3 模型接入是不同改动。",
        meta: ["INT8 · CPU / GPU 卸载", "4090 单组：56.5 → 20.2 秒", "速度与显存取决于模型和总线"],
        source: "https://github.com/invoke-ai/InvokeAI/pull/9845"
      },
      {
        category: "视频工作流 / 编码导出",
        level: "NOV 01 MAIN · 北京时间",
        title: "ComfyUI 增加 ProRes 导出和色度采样选择",
        summary: "11:00 合入视频导出选项：ProRes 可输出到 MOV / MKV，编码可选 4:4:4、4:2:2、4:2:0 等色度采样；不支持的组合会回退并提示。",
        why: "适合想把本地生成视频送进剪辑或调色工作流的用户。需要本机 FFmpeg 有对应编码器；4:4:4 有助于保留后续处理的色度信息，但不能恢复源视频已丢失的细节，也不保证文件更小。ComfyUI GPL-3.0；格式与位深需按具体编码器验证，本机未导出。与昨日 VAE 精度节点是不同更新。",
        meta: ["ProRes · MOV / MKV", "色度采样可选 · 需要编码器", "主干更新 · 输出效果待实测"],
        source: "https://github.com/Comfy-Org/ComfyUI/pull/17463"
      },
      {
        category: "图像工作流 / 画布内存",
        level: "NOV 01 MAIN · 北京时间",
        title: "InvokeAI 截取大画布时减少不必要的完整图层复制",
        summary: "15:58 合入画布截图内存优化：满足条件的已驻留、未旋转图层只复制画框覆盖区域，避免处理小截图时把整个大图层再复制一次。",
        why: "适合使用大画布、局部重绘或截图的用户。作者的模拟案例是 12000×8000 图层截取 1024² 区域，报告跟踪的栅格内存约 394 MiB；测试使用模拟接口，不是实际 GPU 基准。旋转、缩放、冷加载或被驱逐的图层仍可能走完整路径。Apache-2.0；与今天 INT8 权重搬运是两个独立改动。",
        meta: ["大画布 · 局部截图", "作者模拟内存约 394 MiB", "冷加载 / 变换图层有限制"],
        source: "https://github.com/invoke-ai/InvokeAI/pull/10090"
      },
      {
        category: "FPGA / SystemVerilog 仿真",
        level: "NOV 01 MAIN · 北京时间",
        title: "Verilator 减少超大嵌套循环展开的编译开销",
        summary: "21:35 合入循环展开优化：在已知循环下标时更早判断展开限制，避免为复杂嵌套循环建立大量最终不会保留的中间语法树。",
        why: "适合编译含大型循环的 SystemVerilog 验证环境。作者给出的一个案例中，V3Unroll 阶段由 10.4 秒降到 0.61 秒，整体由 61.2 秒降到 50.8 秒，生成代码相同；具体收益取决于设计和展开设置。这是本地 CPU 编译性能，不能当成 FPGA 时序或仿真运行速度提升；LGPL-3.0 / Artistic-2.0。本次是继昨日嵌套循环常量替换正确性修复之后的新性能改动。",
        meta: ["嵌套循环 · 编译阶段", "单案例总编译：61.2 → 50.8 秒", "没有板级资源或时序数据"],
        source: "https://github.com/verilator/verilator/pull/8986"
      },
      {
        category: "具身智能 / 机器人训练",
        level: "OCT 30 MAIN · 非今日发布",
        title: "LeRobot 加入可选 EMA 权重训练与独立检查点",
        summary: "10 月 30 日 23:27 合入指数滑动平均（EMA）训练选项，可配置更新策略并单独保存 EMA 模型与训练状态，默认关闭。",
        why: "适合训练机器人策略、比较权重平滑效果的研究者；作者报告在 4×A800 环境及 LIBERO / PushT 仿真中测试，不能视为真实机器人成功率提升。代码 Apache-2.0；没有本次新增实机平台、传感器、权重或数据集，硬件和成本依具体策略而定。旧格式 ema_state.pt 不再读取，恢复旧训练时 EMA 会从恢复后的权重重新开始并给出提示；先备份检查点。与昨日 rollout 状态日志是不同进展。",
        meta: ["30 日合入 · 非今日发布", "EMA 默认关闭 · 仿真测试", "旧 EMA 状态恢复方式改变"],
        source: "https://github.com/huggingface/lerobot/pull/5117"
      },
      {
        category: "本地 LLM 推理 / 移动端量化",
        level: "NOV 01 MAIN · 北京时间",
        title: "llama.cpp 扩展 OpenCL 量化并修复部分 Hexagon 步幅",
        summary: "13:26 合入 OpenCL 的 IQ3_S / IQ3_XXS 初步支持；07:49 合入一项 Hexagon DMA 步幅修复，处理超出 24 位范围的相关路径。",
        why: "适合愿意自行构建、测试本地推理和手机 DSP 的开发者；IQ3 是继昨日 IQ1_S / IQ1_M 支持之后新增的格式，作者参考 Adreno 优化。Hexagon 修复针对兼容的 v75 及更新设备，不代表所有手机都能用。运行时 MIT，模型许可另查；设备驱动、模型质量、速度和内存均需实测，低比特不自动等于更快。",
        meta: ["IQ3_S / IQ3_XXS · OpenCL", "Hexagon v75+ 特定步幅修复", "主干代码 · 驱动和质量须验证"],
        source: "https://github.com/ggml-org/llama.cpp/pull/31338",
        playUrl: "https://github.com/ggml-org/llama.cpp/pull/31442",
        playLabel: "Hexagon 修复原始提交 ↗"
      },
      {
        category: "LLM 推理服务 / 工具调用",
        level: "NOV 01 MAIN · 北京时间",
        title: "vLLM 修复 HYV4 流式工具参数名称中的空白",
        summary: "04:28 合入解析器修复，在完整和分块流式参数中保留模式定义里参数名称的空白，避免规范化后不同键发生混淆。",
        why: "适合自托管 HYV4 兼容模型并使用工具调用的工程师；这是继昨日 Qwen3 流式参数重复解析优化后，针对另一解析器的正确性修复。作者增加参数类型、名称碰撞和分块测试；不等于 Agent 已可靠或安全。vLLM Apache-2.0，部署资源取决于模型；仍应验证权限、超时、隔离和失败恢复。本机未部署。",
        meta: ["HYV4 · 流式工具参数", "名称空白与碰撞回归", "主干修复 · 不代表 Agent 可靠"],
        source: "https://github.com/vllm-project/vllm/pull/61542"
      },
      {
        category: "电路解谜 / 数字逻辑",
        level: "趣味发现 · 非今日发布",
        title: "AND_GAME：拖逻辑门，拼出会工作的电路",
        summary: "建议 10–20 分钟：从 NOT 门开始，把逻辑门拖进空位并连线，逐步尝试触发器、交通灯等电路关卡。",
        why: "作者提供浏览器入口和本地网页文件，源码可查看，但仓库未找到明确开源许可证，使用与再分发权利待确认。适合电脑鼠标操作；账号、费用、手机和离线体验未核实。官方入口页面可访问，但未实际试玩；浏览器本地进度可能被清除。",
        meta: ["10–20 分钟 · 逻辑门拖拽", "源码可见 · 授权未确认", "官方入口可访问 · 未试玩"],
        source: "https://github.com/MaozEpstein/AND_GAME",
        sourceLabel: "官方源码 / 授权待确认 ↗",
        playUrl: "https://maozepstein.github.io/AND_GAME/",
        playLabel: "作者试玩入口 ↗"
      },
      {
        category: "物理沙盒 / 电路建造",
        level: "趣味发现 · 非今日发布",
        title: "Principia：用电路和物理零件造小机器",
        summary: "建议 15–30 分钟：拼装齿轮、开关和电子元件，试着让机器人动起来，或者打开社区制作的物理关卡。",
        why: "开源项目有 Windows、Linux 和 Android 官方下载；Windows 提供免安装版，网页版仍属实验性。电脑以鼠标为主，手机触控、账号要求与离线运行本次未实测；社区关卡需要联网。源码采用项目列出的多项许可，具体见仓库 LICENSE；建议先备份自己的存档。未安装或试玩。",
        meta: ["15–30 分钟 · 物理与电路", "Windows / Linux / Android 下载", "网页版实验性 · 许可详见仓库"],
        source: "https://github.com/Bithack/principia",
        sourceLabel: "官方源码 / LICENSE ↗",
        playUrl: "https://principia-web.se/download",
        playLabel: "官方试玩与下载 ↗"
      },
      {
        category: "浏览器游戏 / 光学解谜",
        level: "趣味发现 · 非今日发布",
        title: "Quantum Game 旧版：摆镜子引导光子",
        summary: "建议 10–20 分钟：在网格里放置镜子和其他光学元件，引导光子通过关卡，试试看叠加和测量会怎样影响路线。",
        why: "这是 2014–2016 年的经典版本，作者提供旧版官方网页和 MIT 源码；新版是另外的产品，不能把旧仓库授权套到新版。网页需先联网，账号、收费、手机操作与离线使用未核实；本次未实际试玩，旧版已不再维护。浏览器存档可能被清除。",
        meta: ["10–20 分钟 · 浏览器解谜", "旧版源码 MIT · 已停止维护", "账号 / 手机 / 离线待核实"],
        source: "https://github.com/stared/quantum-game",
        sourceLabel: "旧版官方源码 / MIT ↗",
        playUrl: "https://v2016.quantumgame.io/",
        playLabel: "旧版官方游戏入口 ↗"
      },
      {
        category: "浏览器游戏 / 回合沙盒",
        level: "趣味发现 · 非今日发布",
        title: "Exploratron：在回合制小世界里摸索规则",
        summary: "建议 10–20 分钟：在回合制地图里探索和试验，让简单机制相互作用，观察会冒出什么意外局面。",
        why: "作者提供 WebAssembly 网页版和 Windows / Linux 源码构建方式；仓库源码可查看，但未找到明确许可证，不能据此断言拥有开源使用权。官方网页本次未能打开，键盘、手机、费用、账号和离线体验未核实；本次没有安装或试玩。",
        meta: ["10–20 分钟 · 回合制探索", "源码可见 · 授权未确认", "网页入口本次未能验证"],
        source: "https://github.com/achoum/exploratron",
        sourceLabel: "官方源码 / 授权待确认 ↗",
        playUrl: "https://achoum.github.io/exploratron/",
        playLabel: "官方网页入口（可用性待确认） ↗"
      }
    ],
    deepDive: {
      title: "本地生图为什么会卡在显存与内存之间？",
      text: "显存不足时，生图工具可能把部分权重留在 CPU 内存，需要使用时再搬到显卡。InvokeAI 此次对部分 INT8 路径调整顺序：先搬运压缩权重，再在 GPU 上转为计算精度，从而减少 PCIe 上传的数据量；完全常驻显存的模型不会获得同样收益。作者在 RTX 4090 的特定 Krea-2 Turbo 测试中，24% 常驻时 56.5 秒降到 20.2 秒，而另一台 AMD 显卡、不同常驻比例的收益较小；不能按此保证任何机器的速度。作者称结果像素一致，峰值预留显存可能略有增加，其他量化路径也不一定受益。建议固定模型、分辨率、步数和种子，记录生成时间、系统内存与峰值显存，再比较升级前后图像；核对模型权重许可。该提交尚未在本机复现。",
      source: "https://github.com/invoke-ai/InvokeAI/pull/9845"
    },
    noise: "判断而非事实：单一硬件上的大幅提速很容易被看成所有生图用户都能获得的收益；实际瓶颈可能是传输、计算或显存，模型常驻比例和量化方式不同，结果也可能完全不同。"
  },
  {
    date: "2026-10-31",
    label: "OCT 31",
    pulse: "今天值得关注的是实用兼容性：本地图像工作流接上新模型和 LoRA，视频超分增加云端入口，HDL 仿真与机器人运行监测也有可核验的改进。研究截止北京时间 10 月 31 日 11:22：9 条技术信号，另附 4 项趣味发现。9 项按本期推荐方式计为本地可部署：8 项技术工具和可下载离线版的 BeepBox；其中部分需要专业 GPU，不代表普通电脑都能运行。",
    metrics: [
      { value: "13", label: "今日条目" },
      { value: "9", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 本地工作流",
        level: "OCT 31 MAIN · 北京时间",
        title: "InvokeAI 接入 FLUX.3 Image Klein 和 Klein Base",
        summary: "11:08 合入两个 FLUX.3 Image 变体的生成与编辑工作流：Klein 默认 16 步、不使用 CFG；Base 默认 50 步、CFG 3.5 并支持负面提示。两者支持文字生成和最多 10 张参考图编辑。",
        why: "适合有独显、想在 InvokeAI 里试本地图像生成和参考图编辑的人。作者在 Windows / RTX 4090、1024² 测得 Klein 文生图约 15 秒；12 GB 最低显存只是项目方估计，不是保证。当前支持 Diffusers、BF16 单文件和 GGUF；FP8、INT8、NVFP4 单文件及 LoRA 仍列为后续工作。InvokeAI 代码 Apache-2.0；官方 Klein 权重采用 FLUX Kommunity License，商用须核对具体资格与条款。相较此前 FLUX.3 相关报道，这是 InvokeAI 的新接入；主干提交，未本机复现。",
        meta: ["InvokeAI · 图像生成 / 编辑", "RTX 4090 单案例 · 12GB 为估计", "GGUF 可用 · 权重许可另核"],
        source: "https://github.com/invoke-ai/InvokeAI/pull/9883",
        playUrl: "https://huggingface.co/black-forest-labs/flux-3-image-klein",
        playLabel: "官方模型卡 / 许可 ↗"
      },
      {
        category: "图像生成 / LoRA 兼容",
        level: "OCT 31 MAIN · 北京时间",
        title: "InvokeAI 增加 Qwen-Image-2.1 的 LoRA 加载",
        summary: "05:01 合入 Qwen-Image-2.1 的 LoRA 加载及识别，覆盖常见 ComfyUI、Diffusers / PEFT 和 Kohya 前缀；不支持的层或不能正确拆分的布局会被拒绝，避免悄悄只加载一部分。",
        why: "适合已有 Qwen-Image-2.1、想试风格或加速 LoRA 的本地用户；它是对现有模型的工具支持，不是新模型发布。作者在 RTX 4090 测试 BF16、GGUF 和 INT8 的特定工作流，但没有通用显存门槛；部分 LoKR / LyCORIS 布局不支持，少数权重存在模型识别歧义。代码 Apache-2.0，Qwen-Image-2.1 权重受 Qwen Research License 约束，研究与评估以外的用途须先核对授权。",
        meta: ["Qwen-Image-2.1 · 多种 LoRA 布局", "不兼容层会拒绝 · 主干提交", "模型权重为研究许可"],
        source: "https://github.com/invoke-ai/InvokeAI/pull/9793",
        playUrl: "https://huggingface.co/Qwen/Qwen-Image-2.1",
        playLabel: "官方模型卡 / 许可 ↗"
      },
      {
        category: "图像工作流 / VAE 精度",
        level: "OCT 31 MAIN · 北京时间",
        title: "ComfyUI 新增 VAE 计算精度节点",
        summary: "09:05 合入 VAE Compute Dtype 节点，可在单独工作流分支中选择 default、FP32、FP16 或 BF16，影响 VAE 编码和解码时的计算精度。",
        why: "适合排查图片颜色、精度或显存问题的工作流作者；它不保证任何模型在低精度下画质不变或一定省显存。需先确认显卡、驱动和模型支持所选精度，固定输入比较输出与峰值显存。ComfyUI GPL-3.0，模型许可另查；与 30 日 MiniMax-H3 上下文窗口是不同功能。该节点在主干，未在本机实测。",
        meta: ["VAE 编码 / 解码", "default / FP32 / FP16 / BF16", "精度、显存效果按模型实测"],
        source: "https://github.com/Comfy-Org/ComfyUI/pull/17450"
      },
      {
        category: "视频超分 / 云端节点",
        level: "OCT 31 MAIN · 北京时间",
        title: "ComfyUI 新增 Pruna P-Video Upscale 合作节点",
        summary: "10:14 合入视频超分 API 节点，可选择 720p、1080p、2K 或 4K 目标，输入视频大小上限 512 MiB；还可选择帧率，超过源帧率时涉及插帧。",
        why: "适合已使用 ComfyUI 且愿意调用云服务的视频创作者；这是合作 API 节点，不是免费本地超分权重。提交说明需要计费，节点提示高于 30 fps 的输出费用翻倍；确切价格和当前额度请先看官方价格。视频需发送给服务方，注意素材权限与隐私；长视频有分辨率相关长度限制，未在本机上传或测试效果。",
        meta: ["在线 API · 720p / 1080p / 2K / 4K", "最大 512 MiB · 具体价格另查", "高于 30 fps 按节点提示加倍计费"],
        source: "https://github.com/Comfy-Org/ComfyUI/pull/17443",
        playUrl: "https://docs.pruna.ai/en/stable/docs_pruna_endpoints/performance_models/p-video-upscale.html",
        playLabel: "服务方官方文档 ↗"
      },
      {
        category: "FPGA / SystemVerilog 仿真",
        level: "OCT 31 MAIN · 北京时间",
        title: "Verilator 修复嵌套循环展开时的错误常量替换",
        summary: "02:17 合入嵌套循环展开修复：此前内层循环展开后的语句可能被外层展开器再次处理，导致较早的读取被后来赋值的常量错误替换。",
        why: "适合使用复杂 SystemVerilog testbench 或循环生成逻辑的工程师。Verilator 可在本地 Linux / WSL 用 CPU 构建，采用 LGPL-3.0 / Artistic-2.0；建议固定版本，加入先读后写的嵌套循环回归并与参考仿真器对照。这是逻辑正确性问题，与 30 日 dumpvars 事件波形修复不同；没有 FPGA 器件、综合面积或板上时序结论，本次未运行测试。",
        meta: ["嵌套循环展开 · 主干修复", "读取顺序 / 常量传播", "无板级资源或频率数据"],
        source: "https://github.com/verilator/verilator/pull/8980"
      },
      {
        category: "具身智能 / 运行监测",
        level: "OCT 31 MAIN · 北京时间",
        title: "LeRobot 在 rollout 中周期报告频率、延迟和内存",
        summary: "00:21 合入运行状态日志：默认每 5 秒报告控制循环频率、超出时间预算、饥饿次数、推理延迟和可用内存；可通过 status_interval_s 调整，设为 0 可关闭。",
        why: "适合观察机器人控制是否跟得上目标频率的研究者。作者报告相关测试 225 通过、1 跳过，但明确没有做真机 rollout 或真实 CUDA 采样基准；日志示例不是实机成绩。监测随控制循环运行、阻塞时也会暂停，采样本身有开销；远程路径和设备内存含义不同。代码 Apache-2.0，平台、摄像头、权重及硬件成本取决于所用机器人；这是继 30 日连接顺序修复后的新功能，不是安全认证。",
        meta: ["默认 5 秒 · 频率 / 延迟 / 内存", "作者测试 225 通过，1 跳过", "无新增实机基准"],
        source: "https://github.com/huggingface/lerobot/pull/5156"
      },
      {
        category: "本地语音 / 量化模型",
        level: "OCT 30 MAIN · 非今日发布",
        title: "llama.cpp 放开 LFM3 音频解码器的部分量化限制",
        summary: "10 月 30 日 18:52 合入量化规则调整。作者给出的 LFM3-Audio-2B Q4_K_M mmproj 示例由 222.2 MB 降至 172.4 MB；这是单个投影文件大小，不是整套模型的内存占用。",
        why: "适合研究本地语音对话和低内存部署的人；这是 28 日实时语音接口之后针对音频解码器的新增量化进展。llama.cpp MIT，LFM3 权重使用 LFM Open License，条款需单独核对。模型主体、上下文和系统仍占额外内存；音质、延迟及运行方式取决于量化文件与设备，PR 未给出通用音质结论，本机未生成量化权重。",
        meta: ["30 日提交 · 非今日发布", "Q4_K_M mmproj：222.2 → 172.4 MB", "文件大小 ≠ 总运行内存"],
        source: "https://github.com/ggml-org/llama.cpp/pull/31386"
      },
      {
        category: "本地 LLM 推理 / OpenCL 量化",
        level: "OCT 31 MAIN · 北京时间",
        title: "llama.cpp 的 OpenCL 后端初步支持 IQ1_S / IQ1_M",
        summary: "01:43 合入 IQ1_S 和 IQ1_M 的初步 OpenCL 量化支持，作者指出参考了 Adreno 路径。与 30 日的 Q2_0 支持是不同量化格式。",
        why: "适合愿意自行构建、验证手机或电脑 OpenCL 推理的开发者。llama.cpp MIT；需要兼容驱动和对应量化模型。低比特并不自动意味着速度提升或质量足够，作者没有给出通用显存、精度和性能数据；建议先用固定提示比较 CPU 输出及模型质量，再测设备内存和速度。主干支持不代表现有安装包已包含。",
        meta: ["IQ1_S / IQ1_M · OpenCL", "参考 Adreno 优化 · 主干提交", "精度和速度须自行验证"],
        source: "https://github.com/ggml-org/llama.cpp/pull/31341"
      },
      {
        category: "LLM 推理服务 / 工具调用",
        level: "OCT 31 MAIN · 北京时间",
        title: "vLLM 减少 Qwen3 流式工具调用参数的重复解析",
        summary: "09:51 合入解析器更新：已结束的工具参数只解析一次，降低异常长、重复参数流对 API 事件循环的压力；作者通过输出一致性测试和特定服务器场景复现问题。",
        why: "适合自托管模型、让 Agent 频繁调用工具的工程师。作者的高负载服务器案例采用 Qwen3-Coder-30B-A3B 和单张 H200，不能当作其他模型的通用速度提升；其中一些解析器 CI 作业当时关闭，PR 报告了本地测试与同基线错误。vLLM Apache-2.0；更新后仍需测超长工具调用、权限、超时和失败恢复，不把解析优化等同 Agent 可靠性。与 30 日结构化输出草稿 token 修复不同。",
        meta: ["Qwen3 流式工具参数", "特定测试可减轻事件循环压力", "服务器环境 · CI 覆盖有限制"],
        source: "https://github.com/vllm-project/vllm/pull/64675"
      },
      {
        category: "电路解谜 / 数字逻辑",
        level: "趣味发现 · 非今日发布",
        title: "Simten：从一个 NAND 门拼到 4 位 CPU",
        summary: "建议先玩 15–25 分钟：从简单逻辑门开始，通过一关关的电路组合逐步搭出加法器、寄存器和小 CPU，适合你的 FPGA 兴趣。",
        why: "项目代码 Apache-2.0，作者提供网页关卡与 TypeScript 电路工具；官方说明可导出 Verilog，另有 ULX3S FPGA 示例，但玩关卡不需要板卡。本次网页检索工具未能打开游戏入口，未实际试玩；账号、费用、手机操作和离线可用性未核实，先用电脑访问并以页面实际情况为准。",
        meta: ["15–25 分钟 · 数字逻辑关卡", "Apache-2.0 · FPGA 示例另需硬件", "游戏入口本次未能验证"],
        source: "https://github.com/simtenHQ/simten",
        sourceLabel: "官方源码 / Apache-2.0 ↗",
        playUrl: "https://play.simten.dev/",
        playLabel: "官方关卡入口（可用性待确认） ↗"
      },
      {
        category: "创意音乐 / 浏览器合成器",
        level: "趣味发现 · 非今日发布",
        title: "BeepBox：点格子做一段电子旋律",
        summary: "建议 5–15 分钟：在音轨格子里点几个音符，再加一条鼓点，马上就能拼出循环旋律。适合随手玩，也可以慢慢调音色。",
        why: "作者提供免费网页和官方下载的离线版，源码 MIT；桌面可以鼠标点选、空格播放或暂停，手机触控体验未实测。网页首次打开需要联网；曲谱编码在地址栏，想保留作品要复制链接或导出备份。未实际试玩，账号要求未独立验证。",
        meta: ["5–15 分钟 · 鼠标 / 键盘", "免费 · MIT · 官方提供离线版", "曲谱在 URL 中，记得备份"],
        source: "https://github.com/johnnesky/beepbox",
        sourceLabel: "官方源码 / MIT ↗",
        playUrl: "https://www.beepbox.co/",
        playLabel: "打开音乐小工具 ↗"
      },
      {
        category: "浏览器游戏 / 推箱子",
        level: "趣味发现 · 非今日发布",
        title: "Shove：自动生成推箱子关卡，还能看求解过程",
        summary: "建议 10–20 分钟：把箱子推进目标点；每次可以生成新地图，卡住时还能让搜索器一步步展示解法。",
        why: "作者说明关卡通过逆向生成以确保有解，支持电脑方向键 / WASD 及手机点按、滑动；MIT 源码、无账号、静态网页。官方试玩地址本次经网页检索返回 502，不能确认你的网络能否打开；离线能力和实际手感未验证，未安装或试玩。",
        meta: ["10–20 分钟 · 键盘 / 触屏", "MIT · 关卡自动生成", "试玩入口本次返回 502"],
        source: "https://github.com/ctkrug/shove",
        sourceLabel: "官方源码 / MIT ↗",
        playUrl: "https://apps.charliekrug.com/shove/",
        playLabel: "官方试玩入口（可用性待确认） ↗"
      },
      {
        category: "浏览器游戏 / 黑洞解谜",
        level: "趣味发现 · 非今日发布",
        title: "Black Hole Square：点一点，让方块自己发生变化",
        summary: "建议 5–10 分钟：尝试点击不同方块，观察黑洞与其他元素如何影响棋盘，逐关清理画面；左右滑动可跳关或重置。",
        why: "作者的 2021 年 js13k 作品，仓库 MIT；网页入口可访问但游戏操作未实测。基础玩法为网页体验，作者 README 说明另有 3 个奖励关卡需要通过 Web Monetization 支持解锁；账号、离线和具体设备兼容性未确认。浏览器数据可能被清除。",
        meta: ["5–10 分钟 · 点击 / 滑动", "MIT · 官方网页版", "3 个奖励关卡需付费支持 · 未试玩"],
        source: "https://github.com/Quinten/black-hole-square",
        sourceLabel: "官方源码 / MIT ↗",
        playUrl: "https://quinten.github.io/black-hole-square/",
        playLabel: "打开作者游戏页面 ↗"
      }
    ],
    deepDive: {
      title: "本地生图的显存与效果：从 FLUX.3 的参考图路径看取舍",
      text: "InvokeAI 本次在主干接入 FLUX.3 Image Klein 和 Klein Base。前者为蒸馏版本、默认 16 步且不使用 CFG；后者默认 50 步并使用 CFG。作者在 RTX 4090 / 1024² 测试中，Klein 文生图约 15 秒，一张参考图约 24 秒、三张约 31 秒；这些只对应所述设置，不能外推到其他电脑。参考图的 VAE 编码策略也会影响结果：作者发现分块编码会改变参考 token，因此在满足条件时采用非分块路径，但大图和部分设备仍会分块。GGUF Q4_K_M、BF16 与其他格式的比较还可能有明显差异；12GB 最低显存是项目估计而非实测保证。建议先确认权重许可，固定种子和分辨率，从单张参考图开始记录耗时、峰值显存与构图，再比较量化格式。本次没有实际运行模型。",
      source: "https://github.com/invoke-ai/InvokeAI/pull/9883"
    },
    noise: "判断而非事实：‘16 步’‘1 位量化’或‘机器人实时监测’听起来很吸引人，但步数不是完整生成时间，量化要同时检验质量和硬件支持，监测日志也不能证明机器人在实机中安全运行。"
  },
  
{
  date: "2026-10-30",
  label: "OCT 30",
  pulse: "今天的重点是把视觉与机器人模型真正接进可复现的工作流，同时修补仿真波形和本地量化推理的细节。研究截止北京时间 10 月 30 日 13:03：9 条技术信号，另附 3 项可选趣味发现。技术项目均有本地运行或构建路径，但部分需要专业 GPU 或机器人硬件，不能视作普通笔记本开箱即用。",
  metrics: [
    { value: "12", label: "今日条目" },
    { value: "9", label: "本地可部署" },
    { value: "2", label: "具身进展" },
    { value: "1", label: "FPGA / EDA" }
  ],
  items: [
    {
      category: "视频生成 / 上下文窗口",
      level: "OCT 30 MAIN · 北京时间",
      title: "ComfyUI 为 MiniMax-H3 增加音视频上下文窗口",
      summary: "08:08 合入 MiniMaxH3ContextWindows 节点：分窗口处理视频 latent，并按各自的时间维度映射音频及重叠区域。节点使用 17 帧分块边界；窗口长度和重叠分别默认 124、39 帧。",
      why: "适合尝试较长音视频工作流的用户。ComfyUI 为 GPL-3.0，需兼容的 MiniMax-H3 权重及其许可；GPU、显存和加载方式取决于完整工作流，作者没有给出通用硬件下限。本次是上下文采样能力，与 29 日的潜空间放大和 VAE 解码器是不同环节；窗口接缝、音画同步及峰值显存仍应按实际视频测试。主干提交，未在本机生成视频。",
      meta: ["主干更新 · MiniMax-H3", "窗口默认 124 帧 / 重叠 39 帧", "许可及显存按模型单独核对"],
      source: "https://github.com/Comfy-Org/ComfyUI/pull/17425"
    },
    {
      category: "视频生成 / LoRA 工作流",
      level: "OCT 30 MAIN · 北京时间",
      title: "Diffusers 接入 Pika H3 Flex：六步音视频生成采用模块化工作流",
      summary: "00:49 合入 Pika H3 Flex 的 Modular Diffusers 支持：在 MiniMax-H3 组件上加载对应任务的 LoRA，采用六步采样，可生成同步视频和音频；提供首尾帧与参考素材两类适配路径。",
      why: "适合已经部署 MiniMax-H3、想复用组件实验参考图或参考视频的开发者。模型卡写明本地开放权重支持 480p / 768p，4K 是托管 API 的扩展，不能等同于本地 4K。Diffusers Apache-2.0，Pika 权重采用 MiniMax-H3 Community License，需单独查看条款；适配器仍依赖基础组件，不代表低显存或快速出图。具体显存、画质、耗时未在本机实测。",
      meta: ["6 步 · 模块化 LoRA", "本地 480p / 768p；4K 为 API", "模型许可与显存另查"],
      source: "https://github.com/huggingface/diffusers/pull/15150",
      playUrl: "https://huggingface.co/Pika-Labs/Pika-H3-Flex",
      playLabel: "官方模型卡与许可 ↗"
    },
    {
      category: "扩散推理 / AMD 注意力加速",
      level: "OCT 29 MAIN · 非今日发布",
      title: "Diffusers 为 AMD RDNA4 增加 SageAttention 后端",
      summary: "10 月 29 日 17:40 合入 aiter_sage_hub，可对符合形状条件的 BF16 注意力调用 gfx1201 内核，其他不支持的输入回退到原生 SDPA。作者在 R9700、MiniMax-H3 指定测试中报告 Transformer 平均调用从 16.76 秒降到 12.10 秒。",
      why: "适合熟悉 ROCm、愿意自行比较画质的 AMD 部署者。测试使用 960×544、124 帧、9 步和分组卸载；1.39 倍只针对所述 Transformer 调用，不是完整流程的保证。内核仅推理且要求匹配的 GPU、BF16、head dimension 128、无 mask 和非因果；不支持的情况回退，Ring attention 未实现。Diffusers Apache-2.0，模型与外部内核许可分别核对；量化结果与原生输出有差异。",
      meta: ["29 日提交 · 非今日发布", "gfx1201 / ROCm · 条件不符回退", "指定测试 1.39× · 未本机复现"],
      source: "https://github.com/huggingface/diffusers/pull/15060"
    },
    {
      category: "具身智能 / 世界动作模型",
      level: "OCT 29 MAIN · 非今日发布",
      title: "Long-WAM 原生接入 LeRobot：视频和动作联合建模可在 LIBERO 复现",
      summary: "10 月 29 日 22:35 合入原生训练、微调与同步推理，支持先想象视频再去噪动作的 IDM，以及联合去噪视频和动作的 COD。作者提供两套 LIBERO checkpoint 和处理器配置；不是新公布的实体机器人成功率。",
      why: "适合做仿真策略研究。模型卡给出的 IDM/COD 权重均约 12B、BF16，需 LeRobot 的 longwam / libero 扩展和 UMT5 tokenizer；精确显存门槛未给出，作者性能对比用 GB200，不能据此保证消费级 GPU 可运行。模型卡标 Apache-2.0，代码内有需保留的 MIT 来源声明。作者的对照是 16 组匹配 LIBERO 案例、32 次仿真 episode 的小样本冒烟测试，不是完整基准或真机验证；传感器、真实硬件成本及实机部署结果本次未给出。",
      meta: ["LIBERO 仿真 · IDM / COD", "12B BF16 · 测速使用 GB200", "代码与权重开放 · 未证明实机效果"],
      source: "https://github.com/huggingface/lerobot/pull/5008",
      playUrl: "https://huggingface.co/Efficient-Large-Model/Long-WAM-LIBERO-IDM-LeRobot",
      playLabel: "官方 IDM 模型卡 ↗"
    },
    {
      category: "具身智能 / 硬件启动安全",
      level: "OCT 30 MAIN · 北京时间",
      title: "LeRobot 延后连接机器人，并在启动失败时释放资源",
      summary: "00:37 合入 rollout 启动顺序修复：先准备策略、处理器和推理引擎，再连接机器人与遥操作设备；启动失败时关闭已连接硬件并完成数据集清理。",
      why: "作者说明 YAM follower 曾因加载阶段阻塞控制后台而触发反馈看门狗；本次新增的是连接次序和失败清理，不能据此声称 YAM 已完成本次修改后的真机回归。适合自行部署或录制机器人任务的人，需匹配所选机器人、传感器和对应算力；作者报告通过 rollout 测试，未给出硬件价格或新成功率。与 29 日的动作空间评测修复不同。LeRobot 为 Apache-2.0。",
      meta: ["启动顺序 / 异常清理", "作者报告测试通过", "未报告新版本实体实验"],
      source: "https://github.com/huggingface/lerobot/pull/4866"
    },
    {
      category: "FPGA / HDL 波形仿真",
      level: "OCT 30 MAIN · 北京时间",
      title: "Verilator 修复未选入 dumpvars 的事件波形处理",
      summary: "10:38 合入修正：事件触发时也检查波形使能掩码，避免未被 dumpvars 选中的事件在仿真中途触发时造成异常。上游为 VCD、FST、SAIF 场景加入回归测试，作者报告波形测试通过。",
      why: "适合用 SystemVerilog 和 Verilator 排查 FPGA 逻辑的人。可在支持的 Linux/WSL 环境本地 CPU 构建，工具采用 LGPL-3.0 / Artistic-2.0；这是仿真正确性修复，不涉及特定 FPGA 器件、面积或时序。先固定上游版本，用自己的 dumpvars 范围与事件触发复测；本次没有在用户设计上运行。",
      meta: ["SystemVerilog · VCD / FST / SAIF", "波形选择掩码 · 上游回归", "无综合资源或板上频率数据"],
      source: "https://github.com/verilator/verilator/pull/8959"
    },
    {
      category: "本地 LLM 推理 / OpenCL 量化",
      level: "OCT 30 MAIN · 北京时间",
      title: "llama.cpp OpenCL 开始支持 Q2_0 量化",
      summary: "12:30 合入 Q2_0 的初步 OpenCL 支持，补充权重转换及矩阵乘法相关内核；PR 提到参考 Adreno 优化。与 29 日的 Q4_K 分块布局修复是两项不同变更。",
      why: "适合愿意自行构建和验证移动端或桌面 OpenCL 后端的人。llama.cpp MIT；仍需匹配设备驱动、构建选项和 Q2_0 模型，初步支持不意味着所有手机、模型都能跑。PR 未给出通用速度、显存和精度结论：先固定模型与提示对比 CPU 输出，再测峰值内存、速度及低比特质量损失。",
      meta: ["MIT · OpenCL / Q2_0", "初步支持 · 依赖设备和模型", "无跨设备性能保证"],
      source: "https://github.com/ggml-org/llama.cpp/pull/31340"
    },
    {
      category: "LLM 推理服务 / 结构化输出",
      level: "OCT 30 MAIN · 北京时间",
      title: "vLLM 修复流水线并行下的推测解码请求竞争",
      summary: "10:53 合入按请求保留 draft tokens 的改动，处理流水线并行、异步调度与结构化输出组合下不同微批次相互覆盖的问题；作者补充端到端重现和回归测试。",
      why: "适合维护多 GPU 推理服务、依赖 JSON 等受约束输出的开发者。作者列出的对比使用 H100 80GB、特定模型和并发条件，不能外推到单机所有请求；先核验输出格式和接受长度，再测吞吐与延迟。vLLM Apache-2.0；这属于近期主干修复，不表示旧版本已自动修好，也不保证 Agent 调用本身可靠。",
      meta: ["结构化输出 · speculative decode", "按请求保留草稿 token", "服务器 GPU · 以回归测试为准"],
      source: "https://github.com/vllm-project/vllm/pull/63219"
    },
    {
      category: "Python 工具链 / Windows 启动器",
      level: "OCT 30 MAIN · 北京时间",
      title: "uv 调整 Windows 虚拟环境启动器的句柄清理",
      summary: "06:04 合入 Windows trampoline 修复：不再根据来源不一定可靠的 lpReserved2 内容关闭句柄，以免误关解释器仍需使用的句柄；仍会关闭标准输入和输出的相应副本。",
      why: "适合在 Windows 上用 uv 管理 Python 环境的人。作者指出这更接近 CPython venv 启动器的行为，但依赖继承句柄关闭来传递信号的特殊程序仍可能有差异。uv 采用 Apache-2.0 或 MIT；需查看本机发行版本是否已包含该主干修复，原有项目先复测启动和退出行为，未在本机运行该回归。",
      meta: ["Windows · Python venv", "句柄生命周期修复", "主干提交 · 发行版需核对"],
      source: "https://github.com/astral-sh/uv/pull/22977"
    },
    {
      category: "浏览器游戏 / 下落方块",
      level: "趣味发现 · 非今日发布",
      title: "openblocks：轻量版落块，键盘和触屏都能玩",
      summary: "建议 5–15 分钟：旋转并移动下落方块，填满一整行就消除；没有暂存或影子落点，节奏比较纯粹。",
      why: "作者提供免费浏览器版，以及 Windows、macOS、Linux、Android 和 iOS 版本；电脑用方向键、手机可拖动或轻点。MIT 源码，网页首次打开需联网，离线与账号细节未实测；这里只验证官方入口，未实际试玩或安装。浏览器存储可能被清理。",
      meta: ["5–15 分钟 · 键盘 / 触屏", "网页与桌面 / 手机", "免费 · MIT · 未试玩"],
      source: "https://github.com/dannyheskett/openblocks",
      sourceLabel: "官方源码 / MIT ↗",
      playUrl: "https://danheskett.com/dist/openblocks/",
      playLabel: "浏览器游戏入口 ↗"
    },
    {
      category: "浏览器游戏 / 10×10 方块",
      level: "趣味发现 · 非今日发布",
      title: "10Block：拖着三块形状填满行列",
      summary: "建议 5–15 分钟：每轮从三个形状中拖一块放上 10×10 棋盘，填满行或列即可消除；棋盘没有空间时结束。",
      why: "MIT 开源项目，作者称免费、无账号，桌面和手机浏览器支持拖放；首次加载或安装 PWA 后可离线，分数和进度存于浏览器本地。官方试玩地址本次无法通过网页检索工具访问，未实际试玩，能否在你的网络打开尚未确认；清理站点数据可能丢存档。",
      meta: ["5–15 分钟 · 拖放 / 触屏", "MIT · 首次加载后可离线（作者说明）", "试玩入口本次无法验证"],
      source: "https://github.com/viliceq/10block",
      sourceLabel: "官方源码 / MIT ↗",
      playUrl: "https://10block.pages.dev/",
      playLabel: "官方游戏入口（可用性待确认） ↗"
    },
    {
      category: "手机游戏 / 限时三消",
      level: "趣味发现 · 非今日发布",
      title: "Gribli：连消、炸弹和倒计时",
      summary: "建议 5–10 分钟：交换表情符号凑三消，制造连锁和炸弹来争取更多时间。想放松的时候可以先不管排行榜。",
      why: "官方页面介绍为免费 iPhone / iPad 游戏；仓库 MIT，README 标明 iOS 17.6+，具体兼容性和所在地区以 App Store 为准。仓库有在线排行榜；账号、离线和存档细节未核实。仅核对官方项目及商店页面，没有安装或试玩。",
      meta: ["5–10 分钟 · iPhone / iPad 触屏", "官方免费 · MIT", "含排行榜 · 未安装试玩"],
      source: "https://github.com/cassardp/Gribli",
      sourceLabel: "官方源码 / MIT ↗",
      playUrl: "https://apps.apple.com/fr/app/gribli/id6759824235",
      playLabel: "App Store 官方页面 ↗"
    }
  ],
  deepDive: {
    title: "Long-WAM 的两条路径：先想象视频，还是一起生成动作？",
    text: "Long-WAM 把机器人动作预测与未来视频联系起来：IDM 先预测未来视频，再根据其信息去噪动作；COD 联合去噪视频与动作。LeRobot 新增原生同步训练和推理，以及附带配置、归一化统计的 LIBERO 权重，可按官方模型卡加载 checkpoint 并在每个 episode 重置状态。作者在 GB200 上报告特定条件的首个动作块延迟，也用 32 个配对仿真 episode 检查迁移，但样本很小，不能推导通用性能或真实机器人可用性。下一步先固定模型版本、相机顺序、预处理和随机种子，在 LIBERO 逐项复现；若考虑实机，还要单独评估控制频率、硬件、传感器、安全策略与成本。本次未运行模型。",
    source: "https://github.com/huggingface/lerobot/pull/5008"
  },
  noise: "判断而非事实：六步生成、低比特和机器人‘世界模型’都容易让人高估实际落地速度。六步之外还有模型加载与解码，低比特需要测画质和设备兼容，LIBERO 小样本通过也不能证明实体机器人安全可靠。"
},

{
    date: "2026-10-29",
    label: "OCT 29",
    pulse: "视频生成正在把解码和潜空间放大接入现有工作流；同时，手机端量化推理与机器人评测更需要先保证结果正确。研究截止北京时间 10 月 29 日 10:11：6 条技术信号，另附 3 项非今日发布的趣味发现。",
    metrics: [
      { value: "9", label: "今日条目" },
      { value: "5", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "视频生成 / VAE 解码加速",
        level: "OCT 29 MAIN · 北京时间",
        title: "ComfyUI 接入 Sol-H3-VAE：视频解码更快，也有显存取舍",
        summary: "主干 07:46 合入蒸馏后的 MiniMax H3 视频解码器：24 层、窗口注意力，整段解码而非分块。提交者在 RTX 5090、1344×768×124 帧条件下报告 FP16 解码 3.28 秒，原 H3 解码器为 10.7 秒；这只是特定配置的解码时间，不是端到端生成速度。",
        why: "适合已有 H3 工作流并愿意比较画质和显存的用户。作者同一测试中 FP16 峰值分别为 5.9 与 5.5 GiB；不同精度和片长会改变结果，不能作为完整模型显存门槛。此解码器不能分块，显存随片长增加；它经蒸馏，细节与原版并不完全相同。ComfyUI 代码 GPL-3.0，模型卡注明权重受 MiniMax-H3 许可约束；需检查现有环境、模型文件和许可。与昨日 DiffSynth FP4 后端是不同组件。",
        meta: ["主干提交 · 非完整模型", "RTX 5090 单案例 · 显存随片长增加", "模型许可另查 · 未本机实测"],
        source: "https://github.com/Comfy-Org/ComfyUI/pull/17411",
        playUrl: "https://huggingface.co/Efficient-Large-Model/Sol-H3-VAE",
        playLabel: "模型卡与许可 ↗"
      },
      {
        category: "视频超分 / 潜空间放大",
        level: "OCT 29 MAIN · 北京时间",
        title: "MiniMax H3 视频潜空间放大节点进入 ComfyUI",
        summary: "04:05 合入新的 3D 卷积 latent upscaler 支持：可加载对应权重并将视频 latent 调整到目标尺寸。作者说明按 16 帧片段处理并使用全片归一化统计，旨在与单次处理保持一致。",
        why: "适合研究 H3 视频工作流中的放大步骤；它处理的是模型潜变量，不能当作任意现成视频的通用修复器。需要兼容的 H3 latent、对应权重和近期 ComfyUI 主干；代码 GPL-3.0，权重授权、具体 GPU 显存与画质须另行核实。建议固定输入比较输出帧一致性、细节和峰值显存，项目作者的说明不等于我们已复现。",
        meta: ["3D 卷积 · 视频 latent", "需 H3 兼容模型与权重", "主干支持 · 未测显存或画质"],
        source: "https://github.com/Comfy-Org/ComfyUI/pull/17412"
      },
      {
        category: "本地 LLM 推理 / Adreno OpenCL",
        level: "OCT 29 MAIN · 北京时间",
        title: "llama.cpp 修复 Adreno 上 Q4_K 分块布局的计算不一致",
        summary: "05:55 合入 Adreno 的 Q4_K 分块 GEMM：此前某些路径使用分块 GEMV 却由不匹配布局的 GEMM 读取，可能影响多 token 预测与困惑度计算。本次补齐相应矩阵乘法路径。",
        why: "适合在支持 OpenCL 的 Qualcomm Adreno 设备上实验本地模型的开发者。该分块路径依赖设备的整数点积能力及相关开关；具体设备、驱动、构建和量化模型均影响支持情况。llama.cpp MIT；并无跨设备加速数字或最低内存承诺。先用固定模型和输入比较 CPU 与 GPU 输出，再测速度；这是昨天实时语音支持之外的新提交。",
        meta: ["MIT · OpenCL / Adreno", "Q4_K 布局正确性 · 依赖整数点积", "主干提交 · 未实测手机"],
        source: "https://github.com/ggml-org/llama.cpp/pull/30412"
      },
      {
        category: "FPGA / SystemVerilog 综合",
        level: "OCT 29 MAIN · 北京时间",
        title: "Yosys 修正一元运算与位宽转换的优先级",
        summary: "02:45 合入针对 SystemVerilog 位宽 cast 与一元运算符优先级的修正；新增参考 Icarus Verilog 的断言及 SAT 检查，并对零或负数静态位宽报错。它处理表达式解释正确性，不是针对某个 FPGA 芯片的性能更新。",
        why: "适合在 RTL 中组合位宽转换、负号和位运算的工程师。Yosys ISC，Linux/WSL 本地可构建；VHDL 设计需要另行核对前端。本次与昨日 UltraScale+ LUTRAM 映射修复不同。上游测试说明其覆盖的例子，没有提供上板、时序或资源结果；建议在目标版本上回归实际表达式并与参考仿真器对照。",
        meta: ["ISC · read_verilog -sv", "参考值 + SAT 断言", "无板级时序或资源结论"],
        source: "https://github.com/YosysHQ/yosys/pull/6417"
      },
      {
        category: "具身智能 / 策略评测",
        level: "OCT 29 MAIN · 北京时间",
        title: "LeRobot 评测时保留 checkpoint 的动作空间",
        summary: "01:51 合入修正：评测已训练策略时保留 checkpoint 的 output_features，避免被环境动作维度覆盖；训练仍按数据集定义动作。作者以 LIBERO 的 10 维策略输出经后处理变为 7 维环境命令为例解释风险。",
        why: "适合复现机器人策略的研究者。作者报告测试集 133 通过、11 跳过，但相关回归也使用 stub；此项是评测工具修复，并非新增实体机器人验证或成功率。LeRobot Apache-2.0；模型权重、数据集、仿真器与 GPU 依选定策略单独配置，传感器与实机平台并非该修复的测试对象。与前期数据统计修复属于不同进展。",
        meta: ["Apache-2.0 · 评测动作维度", "LIBERO 示例 · 策略与环境空间不同", "测试含 stub · 无新增实体实验"],
        source: "https://github.com/huggingface/lerobot/pull/5077"
      },
      {
        category: "AI 编程 / 图像生成",
        level: "OCT 28 RELEASE · 非今日发布",
        title: "GitHub Copilot 在编码对话中加入图像生成与编辑",
        summary: "GitHub 10 月 28 日公告：Copilot 可调用图像生成工具，在对话内预览并保存到项目，可在 VS Code、Copilot app 或 CLI 发起。",
        why: "适合在做界面或文档时顺手生成素材的开发者。官方称当前为指定付费计划的公开预览，图像 token 单独计费并计入 AI credits；组织管理员可禁用。它是在线服务，不是本地开源图像模型；费用、可用地区与组织策略需在使用前确认。官方未给出可迁移到本机运行的权重或离线方案。",
        meta: ["官方 28 日公告 · 非今日发布", "公开预览 · 指定付费计划", "在线生成 · 图像 token 单独计费"],
        source: "https://github.blog/changelog/2026-10-28-generate-and-edit-images-directly-in-copilot/"
      },
      {
        category: "浏览器游戏 / 数学解谜",
        level: "趣味发现 · 非今日发布",
        title: "Everest：靠试错发现规则的数学谜题",
        summary: "建议玩 10–20 分钟：从简单算术入手，观察每个谜题的反馈，自己摸索通关规则。官方介绍说不需要高等数学基础。",
        why: "官方提供免费网页与 Android 版本；网页布局针对手机或小窗口，手机触控体验以实际设备为准。源码 GPL-3.0，官方网页标注 8 MB；首次加载需联网，离线、账号及存档机制未确认。未实际试玩，浏览器数据可能被清除。",
        meta: ["10–20 分钟 · 数学探索", "手机网页 / Android", "免费 · GPL-3.0 · 未试玩"],
        source: "https://github.com/mwageringel/everest",
        sourceLabel: "源码 / GPL-3.0 ↗",
        playUrl: "https://mwageringel.github.io/everest/",
        playLabel: "官方游戏入口 ↗"
      },
      {
        category: "互动可视化 / 深海探索",
        level: "趣味发现 · 非今日发布",
        title: "The Deep Sea：一路向下看看深海有什么",
        summary: "建议 5–10 分钟：通过滚动持续下潜，观察不同深度出现的海洋生物。它更像互动图鉴，不需要追求输赢。",
        why: "作者 Neal Agarwal 的网页可直接浏览；电脑鼠标滚轮可用，手机触控、无障碍与交互细节未实测。页面可访问但没有实际试玩；是否需账号、离线和源码授权未确认，不把网页可见等同开源。先联网打开；清理浏览器数据可能影响保存的状态。",
        meta: ["5–10 分钟 · 浏览器滚动", "官方页面可达 · 未试玩", "源码 / 离线 / 费用未确认"],
        source: "https://neal.fun/deep-sea/",
        sourceLabel: "作者官方页面 ↗",
        playUrl: "https://neal.fun/deep-sea/",
        playLabel: "打开深海探索 ↗"
      },
      {
        category: "互动可视化 / 太空探索",
        level: "趣味发现 · 非今日发布",
        title: "Space Elevator：乘电梯从地面一直升向太空",
        summary: "建议 5–10 分钟：沿高度向上探索，途经云层、飞行器等不同高度的事物，看看能到多高。",
        why: "Neal.fun 官方互动网页可访问；电脑和手机的具体输入、费用、账号和离线支持未实测。源码与许可未确认，不能视作开源；需要联网打开，也未实际操作或验证存档。",
        meta: ["5–10 分钟 · 互动高度图", "官方网页 · 未试玩", "源码 / 离线 / 费用未确认"],
        source: "https://neal.fun/space-elevator/",
        sourceLabel: "作者官方页面 ↗",
        playUrl: "https://neal.fun/space-elevator/",
        playLabel: "打开太空电梯 ↗"
      }
    ],
    deepDive: {
      title: "视频 VAE 解码：速度与显存为什么可能同时上升？",
      text: "扩散视频模型先产生压缩的 latent，再由 VAE 解码器还原像素帧。Sol-H3 将原解码器蒸馏成 24 层模型，采用窗口注意力并一次解码整段；ComfyUI 贡献者在 RTX 5090 的单例中测到解码时间下降，但 FP16 峰值由 5.5 增至 5.9 GiB。时间、帧数、量化格式和峰值均只对应该测试；整段处理无法分块，长视频内存压力可能继续增长。它是近似重建而非无损替代，建议用固定 latent 对照原解码器，记录耗时、峰值显存与细纹理差异，先检查权重许可，再选择是否接入工作流。",
      source: "https://github.com/Comfy-Org/ComfyUI/pull/17411"
    },
    noise: "判断而非事实：看到视频解码速度提高，就认为整个视频生成流程能等比例加速，容易高估实际收益；扩散采样、模型加载、显存和长片段限制都可能成为瓶颈。机器人评测修复也不能直接推断实机成功率提升。"
  },
  {
    date: "2026-10-28",
    label: "OCT 28",
    pulse: "今天值得留意的是把能力真正接进工具链：扩散推理尝试新量化后端，本地语音加入实时会话，FPGA 存储映射和仿真接口都有具体修复，机器人跌倒保护也开始正视误触发。研究截止北京时间 10 月 28 日 12:07：6 条技术信号约 5 分钟，另附 4 项可选趣味发现，共 10 项。6 项技术工具/系统可本地部署或使用，包含高端服务器 GPU 和专用机器人，不代表普通电脑都可运行；具身 1 项包含作者实机观察和日志回放，须区分两者。DeepGEMM 与 Microduck 的改动发生在 27 日，明确标为非今日发布。",
    metrics: [
      { value: "10", label: "今日条目" },
      { value: "6", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "2", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "扩散推理 / 量化加速",
        level: "OCT 27 MAIN · 非今日发布",
        title: "DiffSynth 接入 DeepGEMM：扩散模型线性层增加 FP8 / FP4 路径",
        summary: "昨日 17:48 合入 e5a44c4：新增 FP8 W8A8、FP4 W4A4 和 FP4 W4A8 后端，权重按块量化、激活逐 token 动态量化，再调用 DeepGEMM 矩阵乘法。它是现有扩散模型的推理后端更新，不是新权重或新的超分模型。",
        why: "适合有高端 NVIDIA 算力、愿意比较画质与吞吐的部署者。DiffSynth 代码 Apache-2.0，模型和依赖许可另查；FP8 路径要求 SM90/SM100，FP4 要求 SM100，CUDA 12.9+ 和 C++20 编译器，DeepGEMM 须单独从源码构建，普通消费显卡不能据此假设受支持。首轮按形状编译并缓存内核，部分非 128 倍数维度保留原精度。未给通用显存下限或本机跑分；固定模型/seed 比较输出、峰值显存和冷/热启动耗时，再决定量化级别。",
        meta: ["Apache-2.0 · 27 日主干", "FP8：SM90/SM100；FP4：SM100", "CUDA 12.9+ · 首轮编译 · 未测画质/速度"],
        source: "https://github.com/modelscope/DiffSynth-Studio/commit/e5a44c42776978457b61d51d595a1f6746c3d87a"
      },
      {
        category: "本地语音 / 实时推理",
        level: "OCT 28 MAIN · 新模型与接口",
        title: "llama.cpp 增加实时语音会话，LFM3-Audio 提供本地 GGUF",
        summary: "08:26 合入 8ca4060：/v1/realtime 可用 WebSocket 接收分块音频，支持对话与转写会话，输出文字、语音或交错结果。今天新增的 LFM3-Audio-2B GGUF 可作为示例；它与 27 日的 OpenCL 缓存恢复、21 日单纯实时转写是不同进展。",
        why: "适合做本地语音助手原型。llama.cpp MIT；LFM3 权重使用 LFM Open License v1.0，需阅读其条款，不能直接等同 MIT。官方 Q4_K_M 约 1.10GB，匹配 F16 mmproj 约 0.57GB，这是文件大小，不含运行内存、上下文和系统开销；CPU/GPU 表现取决于设备。接口要求模型采样率的单声道 PCM16；模型卡列输入 16kHz、输出 24kHz。按主干文档先用短 WAV 验证转写、取消和多轮上下文；未实测时延、准确率或完整 API 兼容性。",
        meta: ["MIT 运行时 · 模型许可另核", "2B GGUF Q4_K_M + 匹配 mmproj", "PCM16 · 实时会话 ≠ 已验证低延迟"],
        source: "https://github.com/ggml-org/llama.cpp/commit/8ca4060b7e30e76baaa5670ee1ec1b760b7f8552",
        playUrl: "https://huggingface.co/LiquidAI/LFM3-Audio-2B",
        playLabel: "官方模型卡 / 音频格式与许可 ↗"
      },
      {
        category: "FPGA / 综合工具链",
        level: "OCT 28 MAIN · Xilinx LUTRAM",
        title: "Yosys 修复 UltraScale+ 的 512×1 LUTRAM 地址位数",
        summary: "07:45 合入 72b0054：Xilinx xcup LUTRAM 规则中 RAM512X1S 的 ABITS 从 16 改为 9，使 512 深度的单比特配置匹配正确。新增测试用 512×3 单写单读存储，检查映射为 3 个 RAM512X1S，并对比优化前后电路，另做 3 个时钟步的 SAT 检查。",
        why: "适合用 UltraScale+ 分布式存储的 RTL 工程。Yosys ISC，CPU 可在 Linux/WSL 构建和复现；仓库案例输入为 Verilog，VHDL 设计还需匹配可用前端并自行核验。测试的 3 个 RAM 是该配置下的断言，不是所有读写端口或器件的通用资源结果；没有实际板上频率、功耗或时序数据。建议固定提交跑 tests/arch/xilinx/lutram.ys，再与自己的器件、综合选项和厂商报告对照。",
        meta: ["ISC · synth_xilinx -family xcup", "512×3 测试：3 × RAM512X1S", "有等价/SAT 测试 · 无板上 PPA"],
        source: "https://github.com/YosysHQ/yosys/commit/72b0054f015d2d234207f3e224f2cff2ca431af8"
      },
      {
        category: "FPGA / HDL 仿真",
        level: "OCT 28 MAIN · DPI 接口",
        title: "Verilator 的 DPI open array 支持动态数组和队列",
        summary: "10:22 合入 b8549b9：SystemVerilog 动态数组或队列可作为 DPI open array 传给 C/C++，新增尺寸查询、元素访问和 inout 数据交互测试。相较 25 日固定 unpacked array 的生成代码缩减，这是新的数组类型覆盖，适合长度变化的数据包和参考模型联调。",
        why: "LGPL-3.0 / Artistic-2.0 双许可；CPU 本地构建，Linux/WSL 可用，不依赖 FPGA 硬件。边界要看清：新增不支持测试明确指出动态维度不能放在第一维以外，动态数组/队列不能传给 output open array，结构体 open array 和流拼接实参也有未支持情况。先从测试中的 byte/int input、inout 及空数组开始，对照目标版本和 C 端 svOpenArrayHandle；尚未进入已安装版本的用户需等发行或自行构建。本次未运行上游测试。",
        meta: ["SystemVerilog DPI-C · 动态数组/队列", "含 input / inout 测试与明确不支持项", "非所有嵌套/结构体/输出形式均支持"],
        source: "https://github.com/verilator/verilator/commit/b8549b97f0766714f9b00c61f662233e960a1330"
      },
      {
        category: "具身智能 / 双足安全控制",
        level: "OCT 27 MAIN · 非今日发布",
        title: "Microduck：站稳之后才重新启用跌倒预测",
        summary: "昨日 17:17 合入 024e125：跌倒预测器需先在站立倾斜范围内连续约 200ms 才重新布防，触发或重置后再次解除。作者在实体鸭起身时观察到反复进入软塌保护；对既有记录回放时，新逻辑保留 1 次行走跌倒、去掉 4 次起身误触发。这里的数字是小样本日志回放，不是新固件在实体机器人的成功率。",
        why: "平台为 15 电机双足，RK3566、1GB RAM、前置相机、8×8 ToF 和 2 个 IMU；本改动使用惯导姿态/角速度。控制代码及 MuJoCo/PPO 训练仓库 Apache-2.0，官网称预置动作可获取并再训练；此次没有发布新的权重或数据集，回放原始记录是否公开未核实。官方预售标价 399 美元未含税运，地区和交付以官网为准。可先读单元测试与仿真，硬件测试需有保护和人工监督；200ms 重布防也意味着未站稳时不再触发该预测器，不能当防摔保证。",
        meta: ["Apache-2.0 · RK3566 / 1GB / IMU", "实体观察 + 旧记录回放，非新实机成功率", "预售 $399 起未含税运 · 仿真可先研究"],
        source: "https://github.com/pollen-robotics/microduck/commit/024e12510120030dcddec04dbf97774d50258932",
        playUrl: "https://store.pollen-robotics.com/products/microduck",
        playLabel: "官方硬件 / 价格与传感器 ↗"
      },
      {
        category: "自托管相册 / 图像编码",
        level: "OCT 28 MAIN · 非正式发行",
        title: "Immich 增加 JPEG XL 预览和缩略图输出选项",
        summary: "01:59 合入 9560989：相册的图像设置加入 JPEG XL（JXL）输出，并更新机器学习解码依赖。代码明确将配置为 JXL 的视频缩略图回退为 WebP；这是服务端派生图格式选择，不是对所有视频生成 JXL，也不是无条件转换原始照片。",
        why: "适合自己管理家庭相册的用户。Immich AGPL-3.0；常见 Docker 部署需匹配版本的服务端、数据库和机器学习组件，CPU 即可使用基础服务，规模决定存储/RAM。官方提示并非所有浏览器和应用都能显示 JXL；先备份原图与数据库，用小批照片检查手机、浏览器、分享和恢复，再决定是否重生成派生图。该主干改动不代表当前稳定版已有，未测试压缩比、客户端兼容或离线行为。",
        meta: ["AGPL-3.0 · 自托管服务", "JXL 派生图 · 视频缩略图回退 WebP", "先测客户端兼容 · 非原图自动改写"],
        source: "https://github.com/immich-app/immich/commit/9560989cb97fb93cd6ab74f7811acce133a9b768"
      },
      {
        category: "浏览器游戏 / 开源项目寻宝",
        level: "趣味发现 · 非今日发布",
        title: "Repo Safari：跳进一个个分类房间，收集 GitHub 项目贴纸",
        summary: "像横版小游戏一样沿路线走、跳进房间，再把感兴趣的仓库贴纸放进相册。作者建议一次约 3 分钟，想多逛可以花 5–10 分钟；不同日期会换路线。这是 10 月较早发布的趣味发现，不是今天新上线。",
        why: "作者官方网页可达，基础游览免费且无需账号；桌面方向键、空格和 E，网页也提供手机按钮，触控本次未测试。MIT 源码；每日项目数据依赖联网，离线未核验，浏览器数据清理可能影响收藏。可选 Idea Board 的发布和点赞需要 GitHub 登录，本次不授权；房间排序使用 stars，只当线索，感兴趣再回到原仓库看许可与实际功能。未实际游玩。",
        meta: ["建议 3–10 分钟 · 键盘 / 手机按钮", "MIT · 基础游览无需账号", "创意板发布/点赞需 GitHub 登录"],
        source: "https://github.com/w20labs/repo-safari",
        sourceLabel: "源码 / MIT 与玩法 ↗",
        playUrl: "https://w20labs.github.io/repo-safari/",
        playLabel: "打开作者浏览器版 ↗"
      },
      {
        category: "浏览器游戏 / 新闻循环",
        level: "趣味发现 · 非今日发布",
        title: "We Become What We Behold：用相机拍下小人，看看新闻会怎样改变他们",
        summary: "移动取景框、点击拍下广场上的人物互动，屏幕会反复播放你选中的画面；接下来观察小圆人与小方人的反应。约 5 分钟就能走完，是一则带黑色幽默的互动短篇，后段涉及冲突和暴力画面。",
        why: "作者 itch.io 官方 HTML5 页面可达，免费浏览器入口，桌面鼠标优先，手机触屏与离线未验证。作者自己的代码和美术以 CC0 贡献公有领域；依赖和部分音效另有 MIT、CC BY 等授权，复用须看仓库鸣谢。页面无明显强制账号门槛，未实际开局；这是一种简化的讽刺表达，不是对现实社会的预测。短篇无需依赖长期存档。",
        meta: ["建议约 5 分钟 · 鼠标拍照", "作者作品 CC0 · 第三方素材另核", "黑色幽默/暴力内容 · 未试玩"],
        source: "https://github.com/ncase/wbwwb",
        sourceLabel: "源码 / CC0 与素材鸣谢 ↗",
        playUrl: "https://ncase.itch.io/wbwwb",
        playLabel: "打开作者浏览器版 ↗"
      },
      {
        category: "创意网站 / 声音互动",
        level: "趣味发现 · 非今日发布",
        title: "Blob Opera：拖一拖四团果冻，让它们现场合唱",
        summary: "上下拖动改变音高，前后拖动换元音，其他角色会跟着配和声；不懂乐理也能即兴做一小段奇怪的歌剧。建议 3–5 分钟戴耳机乱玩。它是 David Li 与 Google Arts & Culture 的经典互动实验，不是今天的新模型。",
        why: "官方网页可达，网页体验入口未见付费提示；建议桌面鼠标和声音设备，触屏、完整离线与实际账号要求未核验。官方说明声音来自根据四位歌手录音训练的模型，不是简单播放原录音；较旧设备的网页音频可能不流畅。未确认整站源码或授权，不能称开源。页面介绍与体验入口可打开，但本次未启动互动或录制作品；需要保留作品时先检查网页提供的保存方式。",
        meta: ["建议 3–5 分钟 · 鼠标 / 声音", "免费网页入口 · 源码许可未确认", "交互、录制与离线未实际验证"],
        source: "https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw",
        sourceLabel: "作者与 Google 官方介绍 ↗",
        playUrl: "https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw",
        playLabel: "打开 Blob Opera ↗"
      },
      {
        category: "浏览器游戏 / 岛屿运动冒险",
        level: "趣味发现 · 非今日发布",
        title: "Doodle Champion Island：操纵小猫逛岛，顺手挑战七种运动",
        summary: "跟着猫咪 Lucky 在岛上找对手：乒乓、滑板、射箭、攀岩等七类小游戏分散在不同区域，途中还有支线。先挑一项运动玩 10–20 分钟，不必一口气收齐卷轴；这是 Google 与 STUDIO 4°C 的 2021 年经典作品。",
        why: "Google Doodle 官方介绍页面可达，游戏嵌在网页中；桌面键盘优先，嵌入游戏可用性、手机触控、账号要求、费用、离线和排行榜当前状态未实测。网页作品源码/复用许可未确认；依赖 Google 服务，所在网络能否加载游戏以实际情况为准。未实际开始游戏；浏览器本地数据可能被清除，长期进度先核对保存方式。",
        meta: ["建议 10–20 分钟 · 桌面键盘", "免费官方网页入口 · 许可未确认", "嵌入游戏可用性/存档未实测"],
        source: "https://doodles.google/doodle/doodle-champion-island-games-begin/",
        sourceLabel: "Google 官方作品介绍 ↗",
        playUrl: "https://doodles.google/doodle/doodle-champion-island-games-begin/",
        playLabel: "打开官方游戏页面 ↗"
      }
    ],
    deepDive: {
      title: "512×3 存储为何映射成三个 RAM512X1S？",
      text: "9 位地址能表示 512 个位置；每个位置有 3 位数据。测试所用的 RAM512X1S 是 512 深度、每个地址 1 位的分布式存储，因此在该单写单读例子中，3 个这样的单元并排提供 3 位宽。Yosys 原规则误写 ABITS=16，本次改为 9，并新增 xcup 的映射与等价验证；测试在映射后断言 3 个 RAM512X1S，使用厂商仿真单元模型和 SAT 做有限步检查。它说明这一类 RTL 在测试条件下的映射得到修复，不证明任意多端口、初始化或板级时序都成立。建议先跑仓库 lutram.ys，再用自己的深度、位宽、读写时钟和目标器件复现，记录 LUTRAM/寄存器数量与时序；VHDL 用户还需先核实前端支持。固定前后版本比较综合网表和仿真结果。本次只核对提交及测试，没有综合或上板。",
      source: "https://github.com/YosysHQ/yosys/commit/72b0054f015d2d234207f3e224f2cff2ca431af8"
    },
    noise: "判断而非事实：‘FP4’‘实时语音’和‘实体机器人验证’都容易被当作开箱即用的性能结论。今天的 FP4 路径限定 SM100、还要检查画质；实时语音接口并未给出你的设备上的时延；Microduck 的新逻辑主要有作者实机故障观察及小样本旧日志回放。先核对适用硬件、版本和测试方法，再决定是否投入时间或购买，信息比宣传标签更有用。"
  },
  {
    date: "2026-10-27",
    label: "OCT 27",
    pulse: "今天的信号在正确性：透明图超分要保住 alpha，恢复本地推理会话要真正写回缓存，机器人训练前的统计也不能悄悄失真。研究截止北京时间 10 月 27 日 09:56：5 条技术内容约 5 分钟读完，另附 3 项未推荐过的经典趣味发现，共 8 项。6 项按本期推荐路径计入本地部署（5 项技术工具与 Opus Magnum）；具身 2 项均是数据/仿真工具链更新，没有新增实体机器人成绩。bg2x 为 24 日、仍在近 72 小时内的实质更新，明确标为非今日发布；其余技术项均为 27 日北京时间主干提交。保留历史，不用版本号变更或普通依赖更新凑新模型。",
    metrics: [
      { value: "8", label: "今日条目" },
      { value: "6", label: "本地可部署" },
      { value: "2", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "超分辨率 / 浏览器推理",
        level: "OCT 24 RELEASE · 非今日发布",
        title: "bg2x 0.2.3：透明 PNG 放大后，别再长出黑底",
        summary: "24 日 13:06 发布，距本次截止约 69 小时。这个本机浏览器超分工具的实质更新，是保留 alpha、在推理前向透明区域延展邻近颜色，再把缩放后的透明度写回拼块结果；历史缩略图也改用支持透明的 WebP。它集成已有 Real-ESRGAN、Swin2SR、Real-CUGAN，不是新训练的超分模型。",
        why: "适合放大贴纸、抠图和插画。应用 MIT，模型权重许可分别核对；ONNX Runtime Web 走 WebGPU，缺少支持时回退 WASM，另有 Windows/macOS/Linux 安装包。模型按需下载后存 IndexedDB，官方声明图片不上传；首次下载仍需联网，未做流量审计或验证完整离线。4× 长宽意味着 16× 像素，模型文件大小不等于运行内存，本次无统一最低 RAM/显存。先用小透明 PNG 检查黑白背景下的边缘，导出 PNG/WebP；JPG 不保透明。官网可达，未上传图片或实测。",
        meta: ["MIT 应用 · WebGPU / WASM / Electron", "alpha 修复 · 旧模型的新部署工具", "模型缓存不等于永久离线 · 未实测"],
        source: "https://github.com/isixe/bg2x/releases/tag/v0.2.3",
        sourceLabel: "正式版 / 透明图修复与下载 ↗",
        playUrl: "https://bg2x.itea.dev/",
        playLabel: "打开官方本机超分工具 ↗"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 27 MAIN · 正确性修复",
        title: "llama.cpp OpenCL：恢复会话时，KV 缓存不能被跳过",
        summary: "02:39 合入 63b4b30，修复 OpenCL set_tensor 对缓存视图的写入：Q4_0/Q8_0 的 AoS 视图不再直接返回，普通写入和相关转换路径也补上 view_offs。相较 25 日 Hexagon 分核、26 日 ExLlamaV3 的优化，这是不同后端的状态恢复正确性问题，不是新增模型或加速倍数。",
        why: "适合在兼容 OpenCL 设备上保存/恢复推理状态的人，包括部分端侧部署。MIT 运行时，模型许可另查；需匹配 OpenCL 驱动、构建和支持的量化布局，不等于所有手机都可用。显存/RAM 随模型、上下文与 KV 类型变化；此次没有统一最低值。固定模型、seed 和上下文，比较连续生成与保存→重载后的续写/logits，覆盖相关 KV 类型。恢复成功返回或文件存在，都不能证明缓存数据正确；主干修复未确认进入你的发行包，本次未做设备测试。",
        meta: ["MIT · OpenCL 特定路径", "Q4_0 / Q8_0 AoS 视图 · 修正偏移", "会话恢复回归 · 非吞吐量宣传"],
        source: "https://github.com/ggml-org/llama.cpp/commit/63b4b303bd87456adc2f09d56c7e1f74e9e26673"
      },
      {
        category: "FPGA / 约束随机验证",
        level: "OCT 27 MAIN · 非正式发行",
        title: "Verilator 可选随机采样方式：求到解，也要看采得够不够散",
        summary: "06:25 合入 be33a0f，新增 +verilator+rand+sampler+default|solver。default 保留 Verilator 自身的分布采样；solver 直接使用求解器按 seed 给出的解，跳过内部额外采样。区别于昨日流拼接位宽修复，这是约束随机验证的可控选项，而不是综合工具更新。",
        why: "LGPL-3.0 / Artistic-2.0 双许可；CPU、匹配的 SMT 求解器及主干构建即可，Linux/WSL 方便，无 GPU。采样方式与 VERILATOR_SOLVER 选择哪个求解器是两回事；也可用 VERILATOR_RAND_SAMPLER 或构建默认值配置。若求解器不按 :random-seed 随机化，solver 模式可能每次给同一解。建议在固定约束下对比耗时、不同解数量与覆盖率，保存求解器版本、seed 和采样模式；未测提速、未上板，无新器件或 PPA 数据。",
        meta: ["default / solver · 约束随机验证", "采样方式 ≠ 求解器选择", "检查多样性/覆盖率 · 无实测倍数"],
        source: "https://github.com/verilator/verilator/commit/be33a0f6c098769a017f7d69738927739b02dd6a"
      },
      {
        category: "机器人数据 / 归一化统计",
        level: "OCT 27 MAIN · 数值修复",
        title: "LeRobot 用 float64 累积统计，避免标准差变成零",
        summary: "07:18 合入 dd5313e：运行统计在计算平方与均值前，把批数据转为 float64。原先 float32 的 E[x²]−E[x]² 在波动远小于均值时可能严重相消，例如接近 1 的 relative rot6d 分量，得到偏差甚至零标准差。和昨日 PEFT 检查点识别不同，这次影响训练前的数据归一化。",
        why: "适合采集、转换或重算 LeRobot 数据集的人。Apache-2.0，NumPy 统计在 CPU 本地完成，无新增 GPU 门槛；统计阶段用双精度，不代表整套模型改为 float64 训练。已有缓存统计不会因更新代码自动修正，先备份，再对原数据重算、检查近常量维度，并保持检查点与训练时统计配套。它不恢复采集时已丢失的精度。此次没有新增机器人平台、传感器、权重、数据集或实机成绩，也没有新硬件成本；本次未重训或实机验证。",
        meta: ["Apache-2.0 · CPU / NumPy", "均值附近小波动 · 避免相消", "旧统计需核对 · 非新策略/实体结果"],
        source: "https://github.com/huggingface/lerobot/commit/dd5313e305ff7aaa5b6c7b4769d1b26650ce250b"
      },
      {
        category: "机器人仿真 / 遥操作采集",
        level: "OCT 27 MAIN · 仿真工具更新",
        title: "Isaac Lab 遥操作与录制脚本，可以按任务决定是否启动 Kit",
        summary: "06:39 合入 a8ae4d4，键盘、手柄和 SpaceMouse 经 Isaac Capture 读取可视化窗口后，teleop_se3_agent.py / record_demos.py 不再强制 Kit，Newton 物理可搭配 newton_rtx 等路径。与 23 日 LeRobot 模型集成不同，是仿真遥操作和示范录制的启动依赖整理。",
        why: "Isaac Lab 代码 BSD-3-Clause，依赖、资产许可另查；已有 Linux/CUDA/匹配 Newton、Warp 与渲染环境适合尝试，未给出新的最低显存或内存降幅。XR、PhysX、Isaac RTX 相机或 Kit 可视化仍会启动 Kit。作者核对了仿真 Franka Reach 等路径，没有实体机器人或头显实测；无需购买 Franka 来做该仿真。Newton GL + Newton 物理的录制重置仍有已知问题，按提交说明用 --no-reset_sim_buffer_each_episode 绕过。没有新权重/数据发布，本次未运行仿真。",
        meta: ["BSD-3-Clause 代码 · 仿真采集", "按任务启动 Kit · GPU 条件仍需匹配", "有已知重置边界 · 非实体机器人验证"],
        source: "https://github.com/isaac-sim/IsaacLab/commit/a8ae4d450239ac5b035b3c1108d6f877e59151eb"
      },
      {
        category: "互动可视化 / 自组织同步",
        level: "趣味发现 · 非今日发布",
        title: "Fireflies：把一群萤火虫搅乱，看它们又闪到一起",
        summary: "拖动鼠标制造混乱，调按钮和滑块，看零散闪光逐渐形成小团、波浪，最后趋向同步。没有分数和通关，像看一张会慢慢恢复秩序的动态壁画；建议 3–8 分钟，想看原理再读旁边的互动短文。Nicky Case 的经典作品，本期首次推荐。",
        why: "免费作者网页，无需账号；桌面鼠标优先，触屏适配未实测。源码以 CC0-1.0 贡献到公有领域，包含静态网页资源，可自行研究；官网嵌有外部视频，完整离线未验证。它是简化同步模型，不能把图案当真实生物实验结果。没有长期存档承诺，想留住某次布置可自行截图，不依赖浏览器临时状态；本次核验文档和入口，没有实际拖动试玩。",
        meta: ["建议 3–8 分钟 · 鼠标互动", "免费 · CC0-1.0 源码", "经典发现 · 触屏/离线未测"],
        source: "https://github.com/ncase/fireflies",
        sourceLabel: "源码 / CC0-1.0 ↗",
        playUrl: "https://ncase.me/fireflies/",
        playLabel: "打开作者互动网页 ↗"
      },
      {
        category: "浏览器游戏 / 精准平台跳跃",
        level: "趣味发现 · 非今日发布",
        title: "CELESTE Classic：一屏一屏往上爬，冲刺差一点就成功",
        summary: "小小的像素关卡，靠跳跃、贴墙和空中冲刺越过尖刺，顺路挑战难拿的草莓。规则少、重试快，很适合用 5–15 分钟试几屏，也可能在‘再试一次’里多待一会。这里推荐 2015 年 PICO-8 原作，不是后来付费完整版。",
        why: "作者 itch.io 页面提供免费浏览器版，入口可达，无需先安装或登录；桌面方向键配合页面提示的跳跃/冲刺键，手柄与触屏未实测。原作者另公开卡带和代码视图，但该发布页标 No License，未确认可复用授权，不标 MIT；PICO-8 运行环境本身也不等于免费开源。网页离线与跨会话保存未验证，关闭/刷新可能失去本次进度。未实际开局，下面链接均为作者渠道。",
        meta: ["建议 5–15 分钟 · 桌面键盘", "免费原作网页 · 非付费完整版", "卡带可读不等于授权复用 · 未试玩"],
        source: "https://www.lexaloffle.com/bbs/?tid=2145",
        sourceLabel: "原作者发布 / 卡带与授权状态 ↗",
        playUrl: "https://maddymakesgamesinc.itch.io/celesteclassic",
        playLabel: "打开作者免费浏览器版 ↗"
      },
      {
        category: "本地游戏 / 机械编程解谜",
        level: "趣味发现 · 非今日发布",
        title: "Opus Magnum：让机械臂按节拍炼金，再把机器缩小一圈",
        summary: "给机械臂排动作，让它抓取、旋转、拼接原料，造出会循环运转的炼金机器。过关之后还可以追求更少成本、更短周期或更紧凑布局，并把漂亮机构导出 GIF；先留 20–30 分钟玩一关。这是经典开放式解谜，不把它包装成今天的新工具。",
        why: "Zachtronics 官方付费游戏，Steam 需账号；支持 Windows/macOS/Linux 和简体中文，键鼠为推荐输入。商店列 4GB RAM、600MB 空间；价格按所在地区，当前 Steam 的系统条件也要另核，不能照搬旧 Vista 条目。基础单人关卡是本地玩法，离线启动/云存档本次未测试，创意工坊和榜单需联网；未确认整作源码开放许可。不要覆盖唯一解题存档；未购买、安装或试玩。",
        meta: ["建议 20–30 分钟 · 桌面键鼠", "付费 · Windows/macOS/Linux · 中文", "4GB RAM 标称 · 非开源确认"],
        source: "https://store.steampowered.com/app/558990/Opus_Magnum/",
        sourceLabel: "开发商官方发行与配置 ↗",
        playUrl: "https://store.steampowered.com/app/558990/Opus_Magnum/",
        playLabel: "查看平台、价格与购买条件 ↗"
      }
    ],
    deepDive: {
      title: "机器人归一化：先保住小波动，再谈模型规模",
      text: "当一维数据都在 1 附近、变化却很小时，方差公式 E[x²]−E[x]² 会相减两个很接近的数。float32 计算中，小差异可能在舍入后消失，于是标准差被低估甚至归零；下游再归一化，模型看到的尺度就可能失真。LeRobot 本次在平方统计之前转为 float64，是提高累计精度，不是重新设计策略或把训练全改为双精度。建议先选近常量的姿态/动作维度，用原始训练分片对照新旧均值、标准差和归一化分位数，并检查异常值、单位与数据划分。已有检查点应保留其原配统计；如果决定改用重算统计，另存数据版本，再比较训练稳定性和离线动作，不能直接替换实体部署中的尺度配置。双精度也救不回采集端已丢失的信息。本次没有训练或实机结果，长期价值在于把数据质量问题纳入模型实验的回归条件。",
      source: "https://github.com/huggingface/lerobot/commit/dd5313e305ff7aaa5b6c7b4769d1b26650ce250b"
    },
    noise: "判断而非事实：‘恢复成功’‘求到了随机解’‘统计流程跑完’这些状态，容易被误当成正确性的证明。OpenCL 仍需比较恢复后的实际续写；solver 采样仍需看不同解与覆盖率；机器人统计仍需检查近常量维度。这些核对通常比换更大模型更值得先做。也别把透明通道插值当作 AI 恢复了真实边缘，bg2x 保留 alpha 的修复解决了处理链路问题，不证明原图不存在的信息能被准确还原。"
  },
  {
    date: "2026-10-26",
    label: "OCT 26",
    pulse: "今天值得动手的进展，是让组合与复现更可靠：MOSS 权重可以按块混合，多 LoRA 不再误用共享配置，机器人微调和 Windows 依赖也补上了容易踩的坑。10/26 补刊，10/27 回溯整理；技术窗口截至北京时间 10/26 23:59，以一手发布和提交为准，不把当前 Trending 当作 26 日榜单快照。6 条技术信号约 5 分钟读完，另附 3 项可选游戏，共 9 项。8 项按本期推荐路径计入本地部署/采用（6 项技术与 2 款本地游戏），不代表低配即用；具身 1 项为工具链修复，没有新实机成绩。超分方向未收录可核实的独立新模型。",
    metrics: [
      { value: "9", label: "今日条目" },
      { value: "8", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 模型合并",
        level: "OCT 26 MAIN · 非正式发行",
        title: "ComfyUI：MOSS-Image 可以按 42 个层块分别混合权重",
        summary: "03:42 合入 fe298e4，新增 MOSS 专用模型合并节点：除 42 个主层，还能分别设置文本/视频嵌入、时间嵌入、调制与输出部分的比例。相较 24 日参考图强度和 25 日 Branch 调度，这次操作的是模型权重，不是提示词、参考图或运行分支。",
        why: "适合已有兼容 MOSS 检查点、想比较风格和编辑能力组合的人。GPL-3.0 代码，两个检查点及派生模型许可分别核对；需相应主干，未确认稳定包包含。沿用块合并器，比例 1 保留 model1，0 使用 model2；先测两个端点，再一次只调一个块。不能任意混合不同结构/形状，也不保证能力线性叠加。显存/RAM 取决于两个检查点及加载策略，没有新增量化或统一最低值；保存原模型、固定 seed 与工作流，比较构图和编辑保真度。",
        meta: ["GPL-3.0 · 同结构检查点优先", "42 主层 + 嵌入/调制/输出", "权重合并 ≠ 条件强度 · 未测画质收益"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/fe298e4e20f1ff26d30e8639267bbd0b57811390"
      },
      {
        category: "扩散模型 / LoRA 组合",
        level: "OCT 26 MAIN · 正确性修复",
        title: "Diffusers 修复共享 LoRA 权重字典被意外消耗",
        summary: "20:04 合入 3b56af0，set_adapters 读取组件权重由 pop 改为 get。多个 adapter 复用同一份组件字典时，先处理的 adapter 不再拿走配置键；新增测试覆盖广播、共享列表、0/0.5 权重、逆序和嵌套块配置。与 20 日 FLUX.3 padding 不同，这是多 LoRA 配置及可复现性的修复。",
        why: "适合用 Python 组合多个风格/角色 LoRA 的生图开发者。Apache-2.0，模型及 LoRA 许可另查；主干修复不等于已进入当前 pip 稳定版。CPU 可检查配置是否被修改，实际出图的 CUDA/其他后端、显存与量化仍依模型，无新硬件门槛承诺。建议把共享配置和每个 adapter 独立深拷贝作对照，固定 seed，测试重复调用和切换顺序；这是让指定权重按预期应用，不是自动提升画质或解决所有 LoRA 冲突。本次未运行模型测试。",
        meta: ["Apache-2.0 · pop → get", "多 adapter 共享配置 · 有回归用例", "不改用户字典 · 无通用画质提升承诺"],
        source: "https://github.com/huggingface/diffusers/commit/3b56af0c5268049588cf470e38955f4c18002498"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 26 RELEASE · 正式版",
        title: "ExLlamaV3 1.6.5：量化缓存、专家卸载与提示缓存一起修",
        summary: "北京时间 01:35 发布 1.6.5：官方列出量化缓存下的 prefill 显存开销降低、热/稀疏词表 drafting 延迟改善、AVX2/AVX512-BW 推理与专家卸载加载优化；并修复 1.6.4 tokenizer 回归引发的部分提示缓存失败。新增视觉模型解析支持也在内。这是另一套本地推理库，不是重复报道 llama.cpp 的 Hexagon 分核。",
        why: "适合已有 NVIDIA 消费卡、EXL3 模型或 CPU 专家卸载配置的人。MIT；主要为 Windows/Linux CUDA 路径，README 要求 CUDA 12.4+ 与匹配 PyTorch，优先选对应 wheel，PyPI 包可能需编译工具链。EXL3 权重量化与 2–8 bit KV 缓存量化是两件事；实际显存/RAM 由模型、上下文及卸载量决定，无统一最低值。发行说明没有统一倍数或准确率保证；固定量化、上下文和硬件比较峰值显存、首 token/生成延迟、缓存命中，先小模型验证。不是手机/Apple Silicon 开箱方案。",
        meta: ["MIT · CUDA 12.4+ / 匹配 PyTorch", "EXL3 权重 + 2–8 bit KV 缓存", "1.6.4 提示缓存回归修复 · 未本机跑分"],
        source: "https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.5",
        playUrl: "https://github.com/turboderp-org/exllamav3/blob/v1.6.5/README.md",
        playLabel: "官方安装与量化条件 ↗"
      },
      {
        category: "FPGA / HDL 仿真",
        level: "OCT 26 MAIN · 正确性修复",
        title: "Verilator 修复 unpacked array 流拼接到不同位宽的结果",
        summary: "19:47 合入 5dcc718，先按整个 unpacked array 的总位宽打包，再匹配目标位宽，补上较窄目标的截取处理。新回归包含两个 32 位元素流入 96 位目标，以及三个 32 位元素流入 40 位目标；与昨日大 DPI 数组的编译规模优化不同，这次直接影响 SystemVerilog 数据重排结果。",
        why: "适合包格式、总线数据和图像像素打包的验证平台。LGPL-3.0 / Artistic-2.0 双许可；CPU 本地构建，Linux/WSL 方便，无 GPU。回归里的右流宽目标期望 96'h112233445566778800000000，不能照搬普通赋值的补零直觉。建议固定提交，核对 t_stream_unpack_wider.v 的宽/窄目标及左右流方向，再与参考仿真器比较；本次未实际编译/仿真。没有新 FPGA 器件支持、综合资源、时序或上板性能数据。",
        meta: ["SystemVerilog streaming · 位宽正确性", "有宽/窄目标测试 · CPU 本地验证", "非综合 PPA 更新 · 未上板"],
        source: "https://github.com/verilator/verilator/commit/5dcc7183c0ec2e00b39ccdae390dbbd089879138"
      },
      {
        category: "机器人训练 / LoRA",
        level: "OCT 26 MAIN · 工具链修复",
        title: "LeRobot 分清‘从基座新训 LoRA’与‘加载已有 adapter’",
        summary: "22:45 合入 45cca1a：统一 --peft.* 与 --policy.use_peft 的启用语义，并根据 adapter_config.json 区分基座检查点和已训练 adapter，覆盖训练、rollout 与远程推理加载。相较 24 日 Faster-WAM 变体，这次解决的是已有策略微调/部署时认错检查点的问题，没有发布新策略模型。",
        why: "Apache-2.0；需 lerobot[peft]、基座权重和匹配数据，权重/数据许可另核。训练以兼容 Linux/CUDA 环境起步，显存依策略与 batch；LoRA 不保证 24GB 就能跑所有模型。文档明确 LingBot-VA 完整 5B DiT 的 AdamW 训练不适合单张 24–32GB 卡，并需显式指定 LoRA target_modules，不能把 SmolVLA 的默认目标照抄过去。先离线验证基座→adapter 保存→重载和动作维度，再接机器人。本提交没有新增机器人/传感器方案、实机成绩或数据集，硬件成本沿用所选平台，未给出新预算。",
        meta: ["Apache-2.0 · 基座 / adapter 检测", "训练 + rollout + 远程加载一致", "非新权重/实机成绩 · LoRA 目标按策略核对"],
        source: "https://github.com/huggingface/lerobot/commit/45cca1a6ba368cf29cc8b4e0f49a1db875d15f61"
      },
      {
        category: "Python 工具链",
        level: "OCT 26 MAIN · Windows 兼容",
        title: "uv：指定 Windows x64 目标时，别漏掉 AMD64 条件依赖",
        summary: "23:35 合入 7a57801：--python-platform windows 和 x86_64-pc-windows-msvc 的 platform_machine 改用 CPython 对应的 AMD64。之前 x86_64 字符串会漏装以 AMD64 为条件的依赖，或拒绝含该环境标记的 pylock.toml。区别于此前证书、安全和导出性能更新，这次与你的 Windows 部署环境直接相关。",
        why: "MIT / Apache-2.0 双许可，Windows/macOS/Linux 本地 CLI，无 GPU；作用点是显式目标平台的标记计算，不是把你的 CPU 改名，也不只支持 AMD 品牌。新增用例用带 AMD64 条件的 cffi 验证 windows 目标解析。需要这一修复时核对后续发行是否包含该提交；原环境先保留，用临时环境对照条件依赖和锁文件，不为小修复盲升整个训练栈。本次未运行 uv 上游测试。",
        meta: ["MIT / Apache-2.0 · 无 GPU", "Windows x64 目标 · AMD64 环境标记", "避免漏依赖 · 主干不等于已发行"],
        source: "https://github.com/astral-sh/uv/commit/7a57801d1fa890d714f614255d44b6ee26a476b0"
      },
      {
        category: "本地游戏 / 微型恐怖解谜",
        level: "OCT 26 RELEASE · 趣味加餐",
        title: "Playable Archive：一小时内看完一段诡异录像档案",
        summary: "DarkStone Digital 在北京时间 26 日 23:00 宣布免费上线：围绕旧房、神秘物件和异常录像进行第一人称探索与解谜。官方写明约 30–60 分钟，而且没有存档，必须一口气玩完；想找一段短恐怖体验可以选它，怕惊吓就跳到下面两项。含暴力、粗口和神秘仪式题材。",
        why: "官方 Steam 免费发行，Windows 10+；最低列双核 2.4GHz、6GB RAM、GTX 960、2GB 空间。桌面键鼠为建议路径，手机/手柄与离线启动未核验；需要 Steam 账号及客户端下载，不是网页即玩。未确认开放源码或自由复用许可，免费不等于开源。源码链接不伪造，下面只给开发者官方发行入口。因为无存档，退出可能要重来；本次未安装、试玩或验证时长。",
        meta: ["建议预留 30–60 分钟 · 无存档", "免费 Steam · Windows · 非开源确认", "含恐怖/暴力题材 · 未实际试玩"],
        source: "https://store.steampowered.com/app/5356470/Playable_Archive/",
        sourceLabel: "开发者官方发行与配置 ↗",
        playUrl: "https://store.steampowered.com/app/5356470/Playable_Archive/",
        playLabel: "查看免费游戏 / 安装条件 ↗"
      },
      {
        category: "浏览器游戏 / 三消生存",
        level: "趣味发现 · 非今日发布",
        title: "Gridland：白天消方块盖房，夜里还是这盘方块救命",
        summary: "同一张三消棋盘，白天用来收集资源和建设，夜晚变成战斗与生存的工具。它会把熟悉的交换方块玩法慢慢拧出另一种节奏，先玩 10–15 分钟发现变化就好。来自 A Dark Room 作者，但这次是不同作品；经典发现，不是今天新发行，也不剧透后面的发展。",
        why: "作者免费网页可达，未见账号门槛，建议桌面鼠标交换相邻方块；手机触控和离线运行本次未验证。源码为 MPL-2.0，不是 MIT；有旧构建说明，但没有代安装依赖或自托管。官网页面依赖脚本，本次仅核验入口与代码，没有实际开局；具体存档/跨设备迁移未实测，别把临时浏览器或清缓存后的进度当可靠备份。无需下载不明安装器。",
        meta: ["建议 10–15 分钟 · 桌面鼠标", "MPL-2.0 · 免费官方网页", "手机/离线/存档迁移未验证"],
        source: "https://github.com/doublespeakgames/gridland",
        sourceLabel: "源码 / MPL-2.0 许可 ↗",
        playUrl: "https://gridland.doublespeakgames.com/",
        playLabel: "打开作者浏览器版 ↗"
      },
      {
        category: "本地游戏 / 规则推箱子",
        level: "趣味发现 · 非今日发布",
        title: "Baba Is You：墙挡路？把‘墙不能过’的规则推开",
        summary: "关卡规则本身就是能推动的文字块：你可以改变谁由你控制、什么能穿过、什么算胜利。好玩之处是发现解法不只在走位，还在改写这关的语法；建议 15–30 分钟玩几关，卡住就换一关。2019 年经典作品，本期首次推荐，非当日热点。",
        why: "Hempuli 官方付费游戏，Steam 支持 Windows/macOS/Linux、简体中文；账号与价格以所在区商店为准，不是免费试玩。桌面键盘优先，商店列最低 1GB RAM/200MB 空间，旧系统列表不等于当前 Steam 客户端仍支持。本地单人玩法不依赖联机，离线启动与云存档未实测；手机原生版和 Remote Play 是不同渠道，本卡只推荐桌面官方发行。未确认整作源码开放或可复用许可。未购买、安装或试玩；换设备先核对存档备份。",
        meta: ["建议 15–30 分钟 · 键盘解谜", "付费 · Windows/macOS/Linux · 中文", "非开源确认 · 不照搬旧系统最低配置"],
        source: "https://store.steampowered.com/app/736260/Baba_Is_You/",
        sourceLabel: "开发者官方发行与配置 ↗",
        playUrl: "https://store.steampowered.com/app/736260/Baba_Is_You/",
        playLabel: "查看平台、价格与购买条件 ↗"
      }
    ],
    deepDive: {
      title: "多 LoRA 的可复现性：共享配置为什么会改变结果",
      text: "Diffusers 这次修复只有一行核心改动，却揭示了组合系统的常见问题：调用者把同一个字典交给多个 adapter，读取方若用 pop 取值，第一个 adapter 会改变后面看到的输入，配置便从‘说明书’变成了会被消耗的状态。改为 get 后，读取不再删除键；新测试不只检查能否运行，还比较共享配置与独立副本的结果、交换 adapter 顺序，并断言调用者字典保持原样。对你的多风格、角色或局部块权重实验，建议保存一组固定模型/LoRA、seed、提示词和调度器，分别测试独立深拷贝、广播同一字典、共享列表与重复调用；包含零权重及嵌套块配置。比较容差内的输出，不要求跨硬件位级一致。它只能修正权重分发，不能证明不同 LoRA 在语义上兼容。下一步先在最小工作流确认配置和输出，再扩大到日常模板；本次未下载权重或运行上游测试。",
      source: "https://github.com/huggingface/diffusers/commit/3b56af0c5268049588cf470e38955f4c18002498"
    },
    noise: "判断而非事实：‘有 LoRA / 有量化 / 能合并’常被过度理解成低门槛和稳定增益。LeRobot 的目标模块仍要匹配策略，ExLlamaV3 的缓存量化不等于权重量化，MOSS 分块合并也不保证两种能力相加。比看演示更有价值的，是核对检查点、配置是否被修改、版本与资源占用，再用同一组任务回归。趣味内容同理：免费不等于开源，30 分钟游戏也不一定能随时存档。"
  },
  {
    date: "2026-10-25",
    label: "OCT 25",
    pulse: "今天的实用信号是把已有能力接好：生图工作流按需选分支，端侧注意力更充分利用核心，HDL 仿真减少生成代码膨胀，本地会议工具则让答案能回到录音核对。研究截止北京时间 10 月 25 日 10:41：5 条技术信号，另附 3 项未推荐过的经典趣味发现，共 8 项；技术重点约 5 分钟，游戏可选阅读。7 项有本地运行路径（5 项技术工具、Lenia 的 Python 版与 SuperTux），不代表低配即用。本期进入 10/25–10/31 新周，旧周仍保留。超分与具身方向未核实到足够重要的新进展，不将榜单热度当新发布。",
    metrics: [
      { value: "8", label: "今日条目" },
      { value: "7", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 工作流控制",
        level: "OCT 24 MAIN · 非今日发布",
        title: "ComfyUI Branch：给一张工作流命名多个可选入口",
        summary: "昨日 08:24 合入 dea870e：实验性 Branch 节点按名称选择已连接输入，支持 1–32 个同类型分支，并只请求所选的 lazy 输入。相较昨日 MOSS 参考图控制，这是工作流调度的新能力，可在不同处理路径之间切换；不是新生图模型，也不是所有分支都跑完再选结果。",
        why: "适合维护多套参考图、预处理或模型路径的 ComfyUI 用户。GPL-3.0；需相应主干与前端控件，未确认稳定包已包含。节点本身不要求额外 GPU，整条图的系统、显存和模型许可仍取决于所选路径；共享上游或其他输出被请求时仍可能执行，不能承诺整图省多少显存。未连接或名称不存在会报错。建议复制工作流、固定 seed，逐分支核对输出与执行记录，再接入常用模板。",
        meta: ["GPL-3.0 · 实验性主干节点", "命名选择 · 1–32 分支 · lazy 输入", "无通用显存/速度承诺"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/dea870e1a36614b3614c0008a820734d0fecdf4f"
      },
      {
        category: "FPGA / HDL 仿真",
        level: "OCT 25 MAIN · 非正式发行",
        title: "Verilator：大 DPI 数组不再展开成海量转换语句",
        summary: "06:03 合入 e4d92cb：DPI unpacked array 参数转换从逐元素生成语句，改为按数组维度生成循环，避免大数组导致巨大 C++ 函数和慢编译。区别于 23 日的仿真线程同步，这是 SystemVerilog 与 C/C++ 交互处的编译规模问题，适合图像帧缓冲、内存模型及大批数据的验证平台。",
        why: "Verilator 为 LGPL-3.0 / Artistic-2.0 双许可；CPU 编译即可，Linux/WSL 是方便的复现环境，无 GPU 或上板要求。固定该提交及相同 C++ 编译器，用现有 DPI 测试比较生成文件大小、编译时间、峰值 RAM，并检查输入/输出/inout、多维数组的结果。提交给出机制修复，没有公布统一提速倍数；转换仍要遍历数据，不等于零拷贝，也不承诺仿真运行更快。没有新增 FPGA 器件、综合时序或资源数据。",
        meta: ["SystemVerilog DPI · 按维生成循环", "CPU / Linux 或 WSL · 无新器件", "编译规模优化 ≠ 零拷贝或实测倍数"],
        source: "https://github.com/verilator/verilator/commit/e4d92cb084ce5ed45e244f5ee14d6bc71c26b063"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 25 MAIN · 非正式发行",
        title: "llama.cpp Hexagon：KV 头少，也让更多 DSP 核心参与",
        summary: "03:19 合入 78a8ae1，HMX Flash Attention 增加 KV-head team split：当 KV 头数少于可用核心时，让多个核心协作一组头；可均分时仍按头拆分。相较 23 日算子融合，这次改善多核工作分配，针对部分 GQA 模型可能闲置核心的问题，而非新增手机全机型支持。",
        why: "适合已有兼容 Qualcomm Hexagon/HMX 开发环境的人，普通桌面 CPU 用户不必为此换后端。MIT 运行时，模型许可另查；需匹配设备、DSP runtime、构建与算子支持，不能仅凭‘骁龙’判断可运行。开关统一为 GGML_HEXAGON_FA_SPLIT，默认 1，0 回到 token-split；旧 FA_HEAD_SPLIT 环境变量不再读取。模型量化、上下文决定 RAM，无通用最低值。本次未公布可泛化性能数据，建议固定模型/上下文、对照 0/1，测正确性、prefill/decode 延迟与发热。",
        meta: ["MIT · Hexagon HMX 特定后端", "KV-head / team split · 新统一开关", "未做设备实测 · 非全手机承诺"],
        source: "https://github.com/ggml-org/llama.cpp/commit/78a8ae14be559b45f5f13ddee82c188b683d5d8d"
      },
      {
        category: "本地语音 / 会议记录",
        level: "OCT 24 RELEASE · 非今日发布",
        title: "Parley 0.5.2：本地会议问答能跳回录音，旧说话人标签可重算",
        summary: "昨晚 19:50 发布正式版：旧会议可从保存的音频重做说话人识别，保留转写文本和已命名身份；章节、书签、问答引用会从对应录音位置播放，搜索能跳到匹配行。它是 Linux 原生 Rust/GPUI 工具，用 Whisper、说话人识别和本地模型完成会议记录；值得关注的是查证与纠错链路，不把作者个案当识别率基准。",
        why: "MIT，Linux x86_64、glibc 2.39+、PipeWire；提供 AppImage，转写可用 Vulkan/CUDA 或 CPU，当前不适合直接在 Windows/手机安装。官方列默认 Whisper large-v3-turbo-q5_0 文件约 547MB，摘要 Gemma 3 1B 约 1GB 内存；这是组件数据，不是整机最低 RAM，权重许可另核。首次下载模型需联网，之后选本地 provider 可在本机处理；主动配置远程模型会发送相应内容。无需账号、无遥测为官方声明，未做流量审计。MCP 可读本地会议库，开放前明确客户端访问范围；先备份会议并告知参与者，再用短录音核对人名、引用与导出。",
        meta: ["MIT · Linux x86_64 / PipeWire", "AppImage · CPU / Vulkan / CUDA", "组件内存不等于整机最低值 · 未安装实测"],
        source: "https://github.com/Hankanman/Parley/releases/tag/v0.5.2",
        sourceLabel: "正式版 / 新增与修复 ↗",
        playUrl: "https://meetparley.app/docs/models.html",
        playLabel: "官方模型与部署条件 ↗"
      },
      {
        category: "LLM 推理服务",
        level: "OCT 25 MAIN · 迁移预告",
        title: "vLLM 开始弃用 LM Format Enforcer，先回归约束输出",
        summary: "06:19 合入 4e59165，公告计划从 v0.33.0 警告、v0.34.0 要求显式选择、v0.35.0 移除 LM Format Enforcer 后端；这是主干中的版本路线，不宣称这三个版本已全部发布。和 22 日 late chunking 不同，此次影响 JSON schema / regex 等结构化输出的服务兼容性。",
        why: "适合依赖约束输出、工具参数或批量抽取的服务开发者。Apache-2.0；仍依 vLLM 支持的 Linux/加速器与模型配置部署，不因改后端降低显存门槛。官方建议在线/离线配置改 auto，也可显式选 xgrammar 或 guidance。Python 风格正则与替代后端的 Rust 风格不同，可接受 token 和输出格式也可能变；auto 的选择还可能跨版本变化。先用已有 schema、正则、边界输入测成功率与内容含义，固定版本/后端并保留旧配置回滚。格式合法不等于事实正确或工具执行已获授权。",
        meta: ["Apache-2.0 · 结构化输出迁移", "0.33→0.34→0.35 为公告路线", "正则语法差异 · 固定后端并回归"],
        source: "https://github.com/vllm-project/vllm/commit/4e591657157a021cab997f911d67f50c0d18a71e"
      },
      {
        category: "人工生命 / 连续元胞自动机",
        level: "趣味发现 · 非今日发布",
        title: "Lenia：养一缸会游动、分裂又突然消失的数学生物",
        summary: "先加载一个生命体预设，再微调生长参数，看它游动、变形或崩散；也可以暂停、单步观察和随机播种。好玩在同一套规则竟能长出像微生物的东西，建议先花 5–15 分钟乱调再看原理。它是经典人工生命项目，不是今日新算法或真正生物。",
        why: "作者免费网页入口可达，无需账号；桌面鼠标/键盘优先，手机布局与性能未验证。MIT 源码，另有可本地运行的 Python 版本，但需自己准备依赖；网页版有外部脚本，未确认断网可用，不能因源码开放就称网页自动离线。大网格或统计/3D 显示可能较慢，建议小场景起步。可复制细胞状态再保存到本地文件，不把浏览器缓存当永久存档；本次只核验入口与文档，未实际试玩。",
        meta: ["建议 5–15 分钟 · 桌面浏览器", "MIT · 免费 · 无账号入口", "Python 可本地部署 · 网页离线未测"],
        source: "https://github.com/Chakazul/Lenia",
        sourceLabel: "源码 / MIT 许可 ↗",
        playUrl: "https://chakazul.github.io/Lenia/JavaScript/Lenia.html",
        playLabel: "打开作者互动实验 ↗"
      },
      {
        category: "创意编程 / 对称绘画",
        level: "趣味发现 · 非今日发布",
        title: "Silk：随手一划，就织出发光的对称图案",
        summary: "用鼠标拖出流动的彩色丝线，切换镜像、旋转对称和颜色混合，画一张像星云或发光生物的图。没有输赢，适合 2–5 分钟放空；空格重来，Z 撤销，也能把画保存成图片。这是经典互动网站，不包装成今天的技术突破。",
        why: "作者官网可达，网页体验入口未见账号或付费要求；桌面鼠标优先，触屏、离线与移动应用价格未核验。未确认整站源码及可复用授权，不能标开源；网站对分享作品的 Creative Commons 说明也不等于网站代码许可。建议用站内 Save Picture 及时保存，不依赖页面或浏览器存储保留创作。未实际绘画或验证下载操作；只推荐官方网页，不要求装插件、登录或上传私人图片。",
        meta: ["建议 2–5 分钟 · 鼠标拖画", "免费网页入口 · 源码授权未确认", "及时保存图片 · 未实际试玩"],
        source: "https://weavesilk.com/",
        sourceLabel: "作者网站 / 操作与作品说明 ↗",
        playUrl: "https://weavesilk.com/",
        playLabel: "打开 Silk 画一张 ↗"
      },
      {
        category: "本地游戏 / 横版闯关",
        level: "趣味发现 · 非今日发布",
        title: "SuperTux：让企鹅滑坡、滚石、跳过一整座岛",
        summary: "经典 2D 跑跳游戏：踩敌人、找隐藏路线，用滑坡、下蹲和新能力探索关卡；0.7.0 还重做了剧情关与关卡编辑器，加入本地多人。先挑一关玩 10–20 分钟即可，也可以慢慢找收集品。稳定版是 3 月旧发行，今天首次推荐，不冒充近期更新。",
        why: "免费开源，代码 GPL-3.0，许多素材另有 CC BY-SA 等许可，复用逐项核对。官方 v0.7.0 提供 Windows 安装/便携包、macOS Intel/ARM、Linux 和 Android APK；桌面键盘/手柄，手机触控适配与具体硬件本次未测。本地基础关卡可离线玩，不需游戏账号，下载及可选扩展需联网。官网还链接浏览器版，但未确认与 0.7.0 内容一致；此卡以官方原生发行作为推荐路径。旧版剧情存档可能不兼容，先备份，不覆盖唯一存档；未代安装或实际试玩。",
        meta: ["建议 10–20 分钟 · 桌面/Android", "免费 · GPL-3.0 代码 / 素材另核", "本地离线 · 0.7.0 旧存档兼容边界"],
        source: "https://github.com/SuperTux/supertux",
        sourceLabel: "官方源码 / 许可与项目 ↗",
        playUrl: "https://github.com/SuperTux/supertux/releases/tag/v0.7.0",
        playLabel: "官方下载 / 按平台选包 ↗"
      }
    ],
    deepDive: {
      title: "Verilator DPI：优化生成程序的规模，也是一种性能工程",
      text: "这次值得精读的是生成器，而不是某条更快的算术指令。旧实现按数组元素生成转换语句，数组越大，交给 C++ 编译器的函数越庞大；新实现为每一维生成循环，用索引对应内部多维布局和 DPI 的线性表示，保留元素转换，却不再让顶层代码随元素数展开。收益首先指向生成代码规模和编译资源，运行时仍有数据遍历，不能推导出零拷贝或更低仿真延迟。建议做一个可控的多维 DPI 数组示例，逐步增大尺寸，分别记录生成 C++ 大小、生成/编译耗时、峰值内存及仿真输出；再覆盖 input/output/inout、位向量和结构体。固定父提交与新提交、相同编译器/选项，才知道问题是否真正缓解。本次仅审阅提交，没有编译测试、跑仿真或上板。",
      source: "https://github.com/verilator/verilator/commit/e4d92cb084ce5ed45e244f5ee14d6bc71c26b063"
    },
    noise: "判断而非事实：‘结构化输出’容易被当作 Agent 可靠性的保证。vLLM 的迁移提示恰好说明，后端一换，正则语义、允许的 token 和格式都可能变化；JSON 能解析仍不能保证内容正确、调用适当或权限成立。更值得保留的是固定版本、真实边界输入的回归集、失败记录与回滚路径。类似地，端侧多核优化要看设备实测，机器人登榜要看新增代码、权重和实机证据，不能用热度填补缺失的验证。"
  },
  {
    date: "2026-10-24",
    label: "OCT 24",
    pulse: "今天最有用的变化在可控性与边界：图像编辑能区分参考图的不同作用，画布增强说明了真实限制，机器人加速也必须先确认权重和测试条件。研究截止北京时间 10 月 24 日 10:07：5 条技术信号，另附 3 项趣味发现，合计 8 项。技术重点约 5 分钟，游戏可选阅读；6 项计入本地部署/采用（5 项技术工具与 Turing Complete），不是低配即用承诺。超分检索未核实到足够重要的独立新模型，今天用有实质更新的图像增强工具补充，明确不冒充超分或真实去雾。",
    metrics: [
      { value: "8", label: "今日条目" },
      { value: "6", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 条件控制",
        level: "OCT 24 MAIN · 非正式发行",
        title: "MOSS-Image 编辑：参考图强度与 VAE 输入可以分开控制",
        summary: "01:52 合入 ComfyUI 9fe7ef7：实验性编辑编码节点新增 image_strength 与可选 VAE。没有 VAE 时，参考图只送入文本编码器；适用格式中，强度通过图像 token 的注意力偏置调整。相较 20 日颜色/深度条件和昨日 FLUX.2 VAE 优化，这是 MOSS 编辑参考路径的新控制，不是重复发布模型。",
        why: "适合已有 MOSS 编辑 LoRA 工作流的人。ComfyUI 代码 GPL-3.0，模型/LoRA 许可分别核对；需匹配训练时的 edit_format，不能把 image_strength 当通用去噪强度。0 会在文本编码路径忽略参考视觉输入，但若接着 VAE，参考 latent 仍可能存在，不能理解成彻底移除参考图。模型算力、显存/RAM依检查点、参考尺寸与 backend，无统一最低值或新量化承诺；该节点仍标实验性。先固定 seed 分别比较有/无 VAE 和强度 0/1，检查负向条件与构图，勿把主干支持当稳定版本已有。",
        meta: ["GPL-3.0 · 实验性主干节点", "可选 VAE · 文本视觉与 latent 路径不同", "image_strength ≠ 通用去噪强度"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/9fe7ef764d0452dcc9dcb925efd076d4e68eece1"
      },
      {
        category: "图像增强 / 局部对比",
        level: "OCT 24 MAIN · 非正式发行",
        title: "InvokeAI 把 Texture、Clarity、Dehaze 放进图层与组",
        summary: "09:20 合入 bd7dde1，新增画布图层/组的纹理、清晰度与去雾调整，细节与局部对比可在画布上非破坏性配置。区别于 18 日 FLUX VAE 分块，这次是像素处理工具；Dehaze 官方明确只是对比度/色彩的审美近似，不估计真实雾气、不恢复丢失细节，也不是 AI 超分。",
        why: "适合本地修图、生图后的细节调整。Apache-2.0；这是本地图像数值处理，不需为每项加载扩散权重，但 Invoke 的其他生成任务仍取决于 GPU。文档限制可见内容跨度不超过 4096×4096：超限或画布内存不足时会警告，并拒绝相关生成/导出/合并等操作，不是悄悄降级成功。旧版在项目曾用过这些调整后，即使移除也会拒绝打开，先备份再试；PSD 不支持组调整，导出后外观可能不同。未给出统一最低 RAM或本机性能验证，主干功能不等于已进入稳定包。",
        meta: ["Apache-2.0 · 画布图层/组调整", "4096×4096 限制 · 非物理去雾", "项目旧版兼容边界 · PSD 组效果差异"],
        source: "https://github.com/invoke-ai/InvokeAI/commit/bd7dde11b54200774816eea67386f4d23921f80d"
      },
      {
        category: "FPGA / 综合工具链",
        level: "OCT 24 MAIN · 非正式发行",
        title: "Yosys：real 常量作条件时，按是否为零折叠",
        summary: "凌晨合入的 a7e6ec5 / #6258 修正前端对 real 条件的常量处理：0.5 等非零 real 可驱动条件折叠，不必先错误地当作整数。新增测试覆盖 generate、常量函数中的 while/if，并用 SAT 验证预期输出。与前两天的 BTOR2 导出和仿真同步优化不同，这是综合前端的常量语义覆盖。",
        why: "适合在参数、常量函数和生成逻辑中使用 real 的 HDL 工程。ISC；CPU 上固定提交运行测试即可，Linux/WSL 方便，无 GPU。这里是 elaboration/常量折叠，不是让 FPGA 获得运行时实数运算硬件；也没有新器件、综合时序或 LUT/BRAM 数据。建议对照 0.0、0.5 与整数条件，运行 tests/verilog/real_bool_condition.ys 并检查生成网表；仓库另补 Icarus 对照测试，本次未实际运行或上板。",
        meta: ["ISC · 常量 real 条件语义", "有 generate/函数/SAT 测试", "非运行时实数硬件 · 无新 PPA"],
        source: "https://github.com/YosysHQ/yosys/commit/a7e6ec5772f2157e5bf52a8bfd91d080aa81b093"
      },
      {
        category: "机器人学习训练",
        level: "OCT 23 MAIN · 非今日发布",
        title: "LeRobot 加入 Faster-WAM 变体，但没有配套训练好权重",
        summary: "昨晚 21:00 合入 d3793b7，针对 arXiv:2608.02365 加入浅动作专家、跨视频层 KV 融合与位置对齐等可选配置，默认全部关闭。区别于昨日 WALL-OSS 集成，是另一条世界动作模型路线；也不是同名的 arXiv:2608.04404。转换旧 Fast-WAM 权重后需要微调，不能假设原策略行为不变。",
        why: "适合有训练资源的研究者，不是新手开箱演示。LeRobot 实现依其 Apache-2.0 Fast-WAM 代码与论文，原作者 FasterWAM 仓库则有 PolyForm Noncommercial 限制，须分清来源。LeRobot 此处未发布训练好的 Faster-WAM 权重；CUDA、数据和显存依训练配置，不能拿提交标题的 A100 倍数当消费卡或实机复测。原论文仿真为 LIBERO/RoboTwin，另有 Franka Panda、夹爪、D405/D435 双 RGB 视角实体实验，但本次软件集成没有新增这些实机结果或公开硬件成本/演示数据。先验证权重加载与离线动作，再训练并评测。",
        meta: ["LeRobot Apache-2.0 实现 · 原仓另有非商业许可", "无配套新训练权重 · 转换需微调", "旧论文实机 ≠ 本次集成验证"],
        source: "https://github.com/huggingface/lerobot/blob/d3793b7e36522321c1c455f0dc4826db3793dceb/docs/source/policy_fastwam_README.md",
        playUrl: "https://arxiv.org/abs/2608.02365",
        playLabel: "对应论文 / 仿真与实体边界 ↗"
      },
      {
        category: "本地语音 / 语音合成",
        level: "OCT 24 MAIN · 非正式发行",
        title: "llama.cpp 新增 Soprano TTS：80M 英语固定音色走 GGUF",
        summary: "07:09 合入 9ae73e6，支持 Soprano-80M / 1.1-80M 的语言骨干和 Vocos 解码器转换、音频图与 llama-tts。新增的是 llama.cpp 集成，1.1 模型本身早在 1 月发布；区别于 21 日实时转写，这是文本生成语音，不是语音识别。",
        why: "适合本地英语朗读、提示音与小型离线工具。llama.cpp 代码 MIT，Soprano 模型卡为 Apache-2.0。须同时转换同一目录的骨干与 decoder.pth 为 GGUF/mmproj；示例骨干 F32、解码器 F16，不能只下载一个普通文字 GGUF 就跑。当前集成为英语规范文本、固定音色，不支持 speaker file，lang 参数不用于多语言。CPU 可作验证起点，具体 GPU 图支持与内存按构建核验；上游速度/低内存宣传不是本次 GGUF 实测。解码器一次处理整句话，stream 模式也在 flush 后单块输出，不承诺逐 token 即时播音。",
        meta: ["MIT 运行时 · Apache-2.0 权重", "英语固定音色 · 双文件匹配", "整句解码 · 未测最低 RAM/延迟"],
        source: "https://github.com/ggml-org/llama.cpp/commit/9ae73e68f5a78933c0d988bbd17bf4647ad6a0b2",
        playUrl: "https://huggingface.co/ekwek/Soprano-1.1-80M",
        playLabel: "原模型卡 / 发布日期与许可 ↗"
      },
      {
        category: "浏览器游戏 / 体素竞技",
        level: "趣味发现 · 非今日发布",
        title: "Spadefall：打不过这堵墙？直接挖个门",
        summary: "在会被破坏和重建的方块地图里对战：铲掩体、挖通道、搭一段墙，再和机器人或朋友交火。比纯拼枪多一点临场施工的乐趣；先试 10–15 分钟。核验的最近提交在 21 日，属于近期发现，不当成今天的新发布。",
        why: "作者官方网页可达，桌面 WASD+鼠标，需 WebGL/浏览器鼠标控制；手机未验证。无需为体验安装软件；有单人 bots、私人房间和公共对战，在线 WebRTC 可能暴露对等连接信息，优先单人了解规则。源码公开但为 PolyForm Noncommercial 1.0.0，不是无限制商用开源；本地运行还需静态服务器，未代开端口或验证离线。网页体验入口未见付费/账号门槛，实际流程未试玩；有匿名玩法统计及退出选项，个人记录留在当前浏览器，清缓存可能丢失。",
        meta: ["建议 10–15 分钟 · 桌面键鼠", "源码公开 · PolyForm Noncommercial", "官方网页可达 · 未试玩/未测联机"],
        source: "https://github.com/brookskc/spadefall",
        sourceLabel: "源码 / 非商业许可 ↗",
        playUrl: "https://spadefall.io/",
        playLabel: "打开作者游戏页 ↗"
      },
      {
        category: "浏览器游戏 / 时间解谜",
        level: "趣味发现 · 非今日发布",
        title: "Borrowed Seconds：冻住障碍三秒，再用自己的三秒偿还",
        summary: "把移动障碍暂时冻住来过路，但稍后自己也会被冻结；关键是让‘还时间’恰好发生在安全处，甚至把它变成解题步骤。可倒带重新试，不需要一次成功；建议先玩 5–15 分钟。这是 10 月项目的趣味发现，不是今日发行。",
        why: "作者提供免费浏览器体验，无需先安装；需 WebGL 2，首载约 18MB。桌面 WASD/方向键移动、鼠标或空格借时间；文档对触控支持存在前后冲突，手机体验未核验。源码公开但 README 明确尚未选许可证、保留全部权利，不能标 MIT 或自由复用。原生 v0.1.0 是 4 日旧构建，不等于官网较新的玩法；作者还说明主要为脚本测试、缺少人工试玩。未实际游玩/验证解算器保证；网页进度单独存在浏览器，清站点数据会清存档，离线未核验。",
        meta: ["建议 5–15 分钟 · 桌面键鼠优先", "源码可读但未授权复用", "WebGL2 · 旧原生发行不等于当前网页"],
        source: "https://github.com/nearbycoder/BorrowedSeconds",
        sourceLabel: "源码 / 状态与权利说明 ↗",
        playUrl: "https://nearbycoder.github.io/BorrowedSeconds/",
        playLabel: "打开作者浏览器版 ↗"
      },
      {
        category: "电路解谜 / CPU 架构",
        level: "趣味发现 · 非今日发布",
        title: "Turing Complete：给你的 FPGA 兴趣加一点闯关动力",
        summary: "从 NAND 门逐步搭出算术、存储和自己的 CPU，再为它设计指令与程序。和之前的免费 NandGame 属于相近兴趣但不同作品，这次是本地商业游戏，带更完整的构建空间；建议用 20–30 分钟试一段电路关卡，不把通关当作 HDL 工程验证。",
        why: "LevelHead 官方 Steam 发行，付费购买并需 Steam 账号；价格以所在地区商店为准，不是免费网页试玩。支持 Windows/macOS/Linux，键盘鼠标；商店最低 Windows/Linux 2GB RAM、集显级配置，macOS 标 Apple Silicon/4GB，实际兼容未验证。Steam 客户端当前 Windows 路径按 Windows 10+ 考虑，不照搬游戏页旧系统列表。未确认开放整作源码或可复用许可。属于本地单人游戏，离线启动/平台许可验证和云存档本次未测；不代购买、安装或登录，换版本前备份电路与进度。",
        meta: ["建议 20–30 分钟 · 本地键鼠", "付费 Steam · 非开源确认", "Windows/macOS/Linux · 未安装试玩"],
        source: "https://store.steampowered.com/app/1444480/Turing_Complete/",
        sourceLabel: "开发商官方发行页 ↗",
        playUrl: "https://store.steampowered.com/app/1444480/Turing_Complete/",
        playLabel: "查看平台、价格与购买条件 ↗"
      }
    ],
    deepDive: {
      title: "Faster-WAM 的长期价值：让浅动作模块读取深视频表征",
      text: "对应 arXiv:2608.02365 的方法，不只是把动作网络砍短：Lite KV-Fusion 按注意力头融合不同视频层的缓存，浅动作专家仍能读取深层信息；位置编码也需从视频的三维时空坐标对齐到动作时间轴。论文还将语言与本体状态先送进世界模型，而不是再直连动作专家。值得研究的是接口能否保留已有表征，而非单看层数。LeRobot 的可选实现提供实验入口，但新融合参数需要训练，默认关闭保证兼容不等于开关一开就保留原策略性能。建议先在固定仿真任务、相同视觉骨干下比较成功率、每阶段耗时与峰值显存，再评估实体闭环；不要把原 Fast-WAM 的 LIBERO 成绩当 Faster-WAM 新权重成绩。本次没有训练、跑仿真或实机复现，也没有验证 A100 标题倍数。",
      source: "https://arxiv.org/abs/2608.02365"
    },
    noise: "判断而非事实：接口叫‘stream’或‘Dehaze’，不代表具备用户直觉中的全部能力。本次 llama.cpp Soprano 在整句 flush 后才输出单块音频；Invoke 的 Dehaze 是对比/色彩近似，不恢复真实丢失信息。类似地，源码可见不等于开源许可：Spadefall 限非商业，Borrowed Seconds 尚未授权复用。把这些边界先说清，比把名称和演示当作可部署、可商用、可验证的能力更有价值。"
  },
  {
    date: "2026-10-23",
    label: "OCT 23",
    pulse: "今天更值得关注的是部署链路变得可用：视觉 VAE 减少中间开销、Fibo 补上训练入口、端侧融合继续推进，机器人模型也进入统一工具链。研究截止北京时间 10 月 23 日 12:56：6 条技术信号，另附 3 项未推荐过的经典趣味发现，合计 9 项；技术重点约 5 分钟，游戏为可选加餐。7 项计入本地部署/采用（6 项技术工具与 Unciv），不代表都适合低配电脑。超分方向已检索，但没有核实到足够重要的新发布，不以旧论文或普通依赖更新填空。",
    metrics: [
      { value: "9", label: "今日条目" },
      { value: "7", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 工作流",
        level: "OCT 23 MAIN · 非正式发行",
        title: "ComfyUI：FLUX.2 VAE 改走融合与行条带路径",
        summary: "10:41 合入 d07dff4：通过 comfy-kitchen 融合归一化等计算、按行条带执行部分卷积并复用缓冲。支持 CUDA FP16/BF16 的相应路径；ROCm 的融合路径要求 FP16 和可用的 RDNA3+ 内核。区别于前几天的模型接入，这是图像编解码执行层变化，不是新的超分模型。",
        why: "适合本地 FLUX.2 工作流。ComfyUI 代码 GPL-3.0，权重许可另查；有对应 GPU、PyTorch/ROCm 与 comfy-kitchen 才能走新分支，CPU/其他精度不会因此自动加速。代码还调整了解码内存估算，但不是实测显存减少四倍的证据，未给出统一最低显存/RAM或同条件性能表。建议独立环境固定提交，分开测 VAE 与全流程的首张/热启动耗时、峰值显存和图像误差；没有量化或手机即装即用承诺。",
        meta: ["GPL-3.0 代码 · GPU 条件路径", "CUDA FP16/BF16 · ROCm FP16 条件支持", "估算调整 ≠ 四倍实测收益"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/d07dff4565ea9804277fff8cdfa0c817e08c3d44"
      },
      {
        category: "扩散模型工具链",
        level: "OCT 22 MAIN · 非今日发布",
        title: "Fibo 2：Diffusers 补齐文生图与图像编辑 LoRA 训练",
        summary: "昨晚 21:16 合入 48cdbae，新增两份 DreamBooth LoRA trainer 和加载支持：只训练 transformer 适配器，冻结文本编码器和 VAE。相较 21 日仅介绍 Fibo 推理/节点接入，这是训练链路的明确新增进展；不是再把原模型发布算一次热点。",
        why: "适合定制风格或编辑能力的人。代码 Apache-2.0，基础权重仍需门控与非商业/商业协议核验；LoRA 代码开源不改变基础模型授权。要求源码版 Diffusers、Transformers ≥5.20.1 与 Accelerate；官方给出 BF16、缓存 latent、checkpointing、CPU offload、8-bit optimizer/量化训练等选项，但未确认消费卡最低显存。编辑任务需源图/目标图/指令三元组，并保持配对几何一致；text_render 专门路径不在这两份 trainer 的训练覆盖内。示例模型 ID 与已发布检查点需对照核验；首次本地试验不要照搬 --push_to_hub 上传私有数据。",
        meta: ["Apache-2.0 代码 · 主干脚本", "文本/编辑两种数据契约", "冻结编码器/VAE · 非即装稳定教程"],
        source: "https://github.com/huggingface/diffusers/blob/48cdbaef5ee3d718aaee392b44f2099ae511c4a5/examples/dreambooth/README_bria_fibo2.md",
        playUrl: "https://huggingface.co/briaai/Fibo-2.0-dev/blob/main/README.md",
        playLabel: "基础模型卡 / 权重许可 ↗"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 23 MAIN · 非正式发行",
        title: "Verilator：用每线程进度字减少并行仿真的同步开销",
        summary: "12:00 合入 043f7aa：每个工作线程拥有独占 cache line 的进度字，生产者用 release store 发布已完成任务位置，消费者用 acquire load 等待；避免为每条依赖更新共享计数器的读改写。与 21 日 $readmemh 功能、昨日 Yosys BTOR2 修复不同，这是多线程 HDL 仿真运行时的优化。",
        why: "适合大设计、多核 CPU 上运行 Verilator 的人；LGPL-3.0 / Artistic-2.0 双许可，Linux/WSL 编译路径成熟，无 GPU 需求。主干同时改动任务调度、生成代码及线程回归相关文件，但不能由同步机制推断所有设计都提速，也没有本期核实的倍数。用同设计/编译器对比单线程与多线程、开启/关闭 trace 的耗时和结果一致性；固定并重建生成模型，别混用旧运行时。没有新增器件、综合、Fmax 或 LUT/BRAM 数据，本次未编译跑分或上板。",
        meta: ["LGPL-3.0 / Artistic-2.0 · 多核 CPU", "减少同步 RMW · 非已证实倍数", "仅仿真运行时 · 无新器件/PPA"],
        source: "https://github.com/verilator/verilator/commit/043f7aa51c5c2297399ea2c374409b5ee7b59aa4"
      },
      {
        category: "具身智能",
        level: "OCT 22 MAIN · 非今日发布",
        title: "WALL-OSS-0.5 原生接入 LeRobot，不等于新机器人开箱即用",
        summary: "昨晚 21:36 合入 65258ac：通过 wall_oss_05 加载 4B VLA、训练与推理，配套 lerobot/wall-oss-0.5 转换权重及处理器。每个动作块只编码一次图像与提示，后续流采样复用前缀。原模型在 5 月已有发布，本期新增的是 LeRobot 集成，区别于昨日流式数据分片修复。",
        why: "Apache-2.0；文档要求 NVIDIA CUDA，最低显存/RAM、量化与特定消费卡速度未给保证。接口使用相机、机器人状态和任务指令；默认 face/right-wrist 图像槽位、26D 规范状态/动作、32 步动作块和 10 步流采样。需按目标机器人映射相机、关节宽度及归一化统计，并微调后评估。代码与转换权重公开，但本次不是新增传感器/低成本硬件/数据集，也未带来新的实体或仿真成功率验证；不把早期原模型的实机宣传移植成这次集成的成绩。先离线检查动作边界，再考虑具备急停的受控实机测试。",
        meta: ["Apache-2.0 · 4B · NVIDIA CUDA", "原模型非今日发布 · 新增原生集成", "需目标任务适配 · 无新增实机成绩"],
        source: "https://github.com/huggingface/lerobot/blob/65258ac2c6ef6d710c3615d56f58e8ca53122591/docs/source/wall_oss_05.mdx",
        playUrl: "https://huggingface.co/lerobot/wall-oss-0.5",
        playLabel: "转换权重与处理器说明 ↗"
      },
      {
        category: "端侧 LLM 推理",
        level: "OCT 23 MAIN · 实验性后端",
        title: "llama.cpp Hexagon：更多算子融合，继续减少端侧中间搬运",
        summary: "12:05 合入 643b0cd：重构融合规则，新增连续 ADD/MUL 等 BINARY_NX、GELU+MUL、SSM_CONV+SILU 等组合，并处理旧 NPU 固件的栈溢出路径。相比 18–19 日的低比特算子与被遮蔽 KV 块跳过，这是新的执行融合层更新，不是重发端侧量化支持。",
        why: "MIT 代码，面向兼容的 Snapdragon/Hexagon 环境，不是所有 Android 手机或任意 NPU 的通用加速。官方固定提交文档提供 v0.8 交叉工具链容器、SDK 和 ADB/目标设备路径；安装成熟度仍偏开发者实验，需要驱动/固件配合。GGUF 模型及量化格式要核对具体后端支持，内存按模型、上下文和运行缓冲计算；未见本次可复用的最低 RAM、功耗或速度对照表。先在同设备、同量化和上下文下比较算子正确性、持续吞吐与温升，不从‘融合’二字推断手机电池更耐用。",
        meta: ["MIT · Snapdragon/Hexagon 限定", "实验性 · SDK/固件/交叉编译门槛", "新融合 ≠ 通用 NPU 或功耗承诺"],
        source: "https://github.com/ggml-org/llama.cpp/commit/643b0cdacb4ca13762a1c833558c890207b54ae2",
        playUrl: "https://github.com/ggml-org/llama.cpp/blob/643b0cdacb4ca13762a1c833558c890207b54ae2/docs/backend/snapdragon/README.md",
        playLabel: "端侧工具链与运行条件 ↗"
      },
      {
        category: "MCP 客户端 / 认证恢复",
        level: "OCT 23 MAIN · 非正式发行",
        title: "OpenCode：别让预取回调和空闲超时打断 MCP 工作",
        summary: "12:37 的 309522f 修复 OAuth 回调无参数请求：预取/重载等杂散访问返回 400，但继续等待真正授权回调；有 state 的错误仍会失败，不是取消 state 校验。此前 12:34 的 e49157b 则关闭 Bun fetch 的底层空闲期限，让长时间静默的远端 MCP 请求不被过早截断。",
        why: "适合使用远端 MCP 的编码 Agent 用户。MIT，本地工具本身不需专门 GPU；模型 API、远程服务和认证仍可能联网/收费，不能因此称整套离线。新增 OAuth 回归测试覆盖无参数 OPTIONS/GET 后继续授权；长期请求仍保留 MCP 执行超时和取消 signal，不是无限等待承诺。主干修复尚不等于所有发行版已有；没有新增 OS 沙箱、审批或回滚保证。建议隔离工作区、最小权限，记录授权与超时错误后再重试，避免把中断直接变成重复执行有副作用的工具调用。",
        meta: ["MIT · MCP 认证/可用性修复", "state 校验仍在 · 有回归用例", "执行超时/取消仍在 · 非权限升级"],
        source: "https://github.com/anomalyco/opencode/commit/309522f0ff1be073d77e646996d62ef002bbe37e",
        playUrl: "https://github.com/anomalyco/opencode/commit/e49157b34c9c2b9475c4510e2e21ef5c15c2401d",
        playLabel: "长请求超时修复原文 ↗"
      },
      {
        category: "浏览器游戏 / 放置经营",
        level: "趣味发现 · 非今日发布",
        title: "Universal Paperclips：先做几个回形针，后面的事先不剧透",
        summary: "起初只有一个制造回形针的按钮，然后你开始调价格、买机器、管理资源。乐趣在于看似朴素的经营界面逐渐冒出新系统；建议先试 10–15 分钟，完整一局会长得多。是经典发现，不是新发布，也不需要把它当 AI 技术演示。",
        why: "给的是作者 decisionproblem.com 官方免费网页版；桌面鼠标点击最合适，官网明确说网页版不是为手机设计。手机版本从官网进入商店，价格另看，不把付费 App 说成免费。未确认整作可复用的开源许可证，按在线作品收录；网页需要联网加载，离线与存档恢复未核验。已确认实际游戏 HTML 入口可达，未试玩或通关。留意浏览器存档/缓存，别在隐私模式里养到一半再关掉。",
        meta: ["建议 10–15 分钟 · 桌面点击", "官方免费网页 · 整作授权未确认", "手机网页非推荐 · 未试玩"],
        source: "https://www.decisionproblem.com/paperclips/",
        sourceLabel: "作者官网 / 平台提示 ↗",
        playUrl: "https://www.decisionproblem.com/paperclips/index2.html",
        playLabel: "进入官方网页版 ↗"
      },
      {
        category: "本地游戏 / 回合制文明经营",
        level: "趣味发现 · 非今日发布",
        title: "Unciv：再按一次下一回合，就去睡觉",
        summary: "探地图、建城市、研究科技、谈外交，把一个小聚落慢慢经营成文明。画面简洁，适合更在意策略和模组的人；初次用小地图试 20–30 分钟即可，不必一口气打完。与昨日的回合制地牢是不同玩法，本次按经典项目发现推荐，不宣称今日有重大更新。",
        why: "免费开源，代码以 MPL-2.0 为主；特定代码及美术素材另有 CC0、CC BY/SA 等条款，不能全部标 MIT。作者仓库提供 Android 与桌面官方发行渠道，Windows/Linux/macOS 按各自安装说明；桌面鼠标/键盘，Android 触控，官方不计划 iOS 版。单人本地玩法可作离线候选，下载、模组与联网多人需要网络；账号/联网需求随渠道与模式，不为试玩代装或授权。本次只核对说明和发行入口，未验证设备兼容性或断网游玩；存档和模组版本请备份。",
        meta: ["建议 20–30 分钟 · 4X 回合制", "MPL-2.0 主代码 · 素材多许可", "Android / 桌面 · 单人离线候选未实测"],
        source: "https://github.com/yairm210/Unciv",
        playUrl: "https://github.com/yairm210/Unciv/releases",
        playLabel: "作者官方下载 / 各平台包 ↗"
      },
      {
        category: "浏览器游戏 / 元素合成",
        level: "趣味发现 · 非今日发布",
        title: "Little Alchemy 2：把两个东西拖一起，看看能蹦出什么",
        summary: "从基础元素开始试组合，一边合成一边扩充你的发现目录。既可以认真猜逻辑，也可以纯靠脑洞乱配；建议先体验 5–10 分钟。推荐的快乐很直接：每多解锁一个意料之外的东西，都会想再试一对。",
        why: "仅提供 Recloak 官方网页，不给第三方套壳站。桌面鼠标拖放；官网也有手机 App 入口，但手机网页与触控体验未验证。基础网页入口可直接打开，额外内容、App 的付费和账号条款以官方为准，不承诺全内容免费。整站源码/素材可复用授权未确认，按在线作品推荐；需联网加载，不能当离线包。HTTP 入口可达，文本抽取为空、需 JavaScript，本次未实际合成或确认存档恢复；浏览器缓存可能被清除。",
        meta: ["建议 5–10 分钟 · 拖放组合", "官方在线作品 · 源码许可未确认", "JS 页面可达 · 未试玩/未验证离线"],
        source: "https://littlealchemy2.com/",
        sourceLabel: "官方网页 ↗",
        playUrl: "https://littlealchemy2.com/",
        playLabel: "去合成新东西 ↗"
      }
    ],
    deepDive: {
      title: "VAE 优化应该单独测：估算值、内存搬运和最终画质是三件事",
      text: "ComfyUI 本次优化把局部计算融合、条带处理和缓冲复用放在一起。可借此学一个更长期有用的习惯：模型参数不变，也能从中间张量和内存访问下手。但源码里的内存估算系数调整不是实测结果，更不是整条生图工作流的收益。建议固定一份 latent、分辨率、batch、dtype 和软件版本，单测 VAE 解码的冷/热耗时、峰值显存，再测完整工作流；比较图像误差与边界区域，不能只看是否避免 OOM。分清支持的 CUDA/ROCm 路径，未命中融合分支的硬件不能借用同一结论。本次只核对实现，未在你的显卡上跑实验；以上是建议步骤，不是已经通过的性能或画质验证。",
      source: "https://github.com/Comfy-Org/ComfyUI/commit/d07dff4565ea9804277fff8cdfa0c817e08c3d44"
    },
    noise: "判断而非事实：‘已有模型接入统一工具链’常被高估为‘随便一台机器人零样本即用’。WALL-OSS-0.5 的模型故事不是今天才发生；这次值得看的是真正可加载的权重布局、处理器、相机/关节契约与训练入口。没有目标机器人数据、动作边界检查和实体测试，就不应把旧演示当新部署成绩。相同原则也适用于端侧算子融合：代码合入不自动证明兼容全部手机、速度翻倍或功耗下降。"
  },
  {
    date: "2026-10-22",
    label: "OCT 22",
    pulse: "今天的信号是把隐含条件变成明确接口：视频的运动速度不再混同播放帧率，检索分块保留上下文，机器人训练显式传递分片身份。研究截止北京时间 10 月 22 日 12:03：5 条技术更新，另附 3 项未推荐过的经典趣味发现，合计 8 项。技术部分约 5 分钟，游戏可选阅读；本地可部署/采用计 5 项技术工具与 1 款本地游戏，不代表都能在普通笔记本低门槛运行。未核实到足够重要的独立超分新发布，不强行凑数；Trending 上的安全审计 skill 最近主干更新在 9 月，本期也不伪装成今日 Agent 新闻。",
    metrics: [
      { value: "8", label: "今日条目" },
      { value: "6", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "视频生成",
        level: "OCT 22 MAIN · 非正式发行",
        title: "LTX-2 的 motion_speed：慢动作是生成条件，不是改播放速度",
        summary: "今早 05:23 合入 Diffusers 7e4383c：新增正数 motion_speed，默认 1；模型位置时间轴按 frame_rate / motion_speed 条件化，文件播放帧率、音频长度仍按 frame_rate。示例在 24fps 下取 0.2，形成 5 倍慢动作的生成条件。相较 19 日的 LTX SDK 解码/内存更新，这次是新的运动控制接口。",
        why: "适合视频创作与可复现的 LoRA 工作流。Diffusers 代码 Apache-2.0；示例的 LTX-2.5 22B Slow-Motion-Control LoRA 有门控许可，先核对模型授权。官方例用 BF16、CPU offload、VAE tiling 和 1920×1088；小尺寸效果较弱，未给出可保证的最低显存或 RAM。建议 CUDA 独立环境固定提交；CPU/MPS/XPU 写入示例不等于本次验证了可用速度。远离 1 的速度需相应训练的适配器，不能给任意基础模型加参数就承诺慢动作。两阶段生成都须传同一速度，否则第二阶段可能抵消效果。",
        meta: ["Apache-2.0 代码 · 主干支持", "22B LoRA 门控 · 最低显存未确认", "两阶段同参 · 非插帧/非简单变速"],
        source: "https://github.com/huggingface/diffusers/commit/7e4383c0a2aeb384f3d3e0003b013a40c9b1e843",
        playUrl: "https://huggingface.co/Lightricks/LTX-2.5-22b-LoRA-Slow-Motion-Control",
        playLabel: "LoRA 模型卡 / 许可 ↗"
      },
      {
        category: "RAG / 上下文分块",
        level: "OCT 22 MAIN · 非正式发行",
        title: "vLLM 把 late chunking 接到在线 embedding 服务",
        summary: "12:00 合入 79d5c93，距本期截止约 3 分钟：先编码完整输入，再对各片段的上下文 token 向量求均值；/v1/embeddings 新增 late_chunking_params，返回分块向量及原文范围。区别于 19 日的 MLA 溢出/显存修复，这是本地 RAG 索引服务的新能力，不是新模型或通用推理提速。",
        why: "适合本地文档检索。Apache-2.0，Linux/WSL 的受支持 vLLM 后端更适合试验；示例用 multilingual-e5-small，具体 CPU/GPU、显存与内存依模型/后端，未公布统一最低值。必须配置 token_embed；普通 embed 服务可能忽略此字段。响应 embedding 是矩阵，是 vLLM 扩展，不可直接假设标准 SDK 兼容。仅支持 float 编码；启用分块时要求完整纯文本、不截断/不填充，仍受模型上下文窗口约束。Unicode 原文范围按码点，JavaScript UTF-16 索引需转换。先在小文档集测召回、成本和范围映射，不宣称一定胜过先切块。",
        meta: ["Apache-2.0 · token_embed 服务", "矩阵响应 · 非标准兼容承诺", "完整文本编码 · 仍受上下文上限约束"],
        source: "https://github.com/vllm-project/vllm/commit/79d5c9379600751b189d6e56a2fce3b3c0ddaae1",
        playUrl: "https://github.com/vllm-project/vllm/blob/79d5c9379600751b189d6e56a2fce3b3c0ddaae1/docs/models/pooling_models/token_embed.md",
        playLabel: "在线检索示例与接口限制 ↗"
      },
      {
        category: "FPGA / 形式验证",
        level: "OCT 22 MAIN · 非正式发行",
        title: "Yosys：只有一个元素的 memory，也要导出合法 BTOR2",
        summary: "今早合入的修复处理 write_btor 的零位宽地址：单元素 memory 的 ceil(log2(1)) 为 0，旧输出可能包含非法 bitvec 0、节点 -1。新实现把地址 sort 至少设为 1 位，并在明确目标位宽时把空操作数扩展为零常量。相较 20 日 GateMate I/O pad 修复，这是形式验证后端的边界正确性更新。",
        why: "适合用 Yosys 接 btor2tools、rIC3 或做 refinement miter 的 HDL 开发者。ISC，CPU 工具链即可，Linux/WSL 易于复现；固定 234206e 或其合并提交。应分别检查 memory -nomap 与 memory_map 后的导出，验证单元素索引 0 和零扩展语义；未给目标位宽的零宽信号会报错，不能任意吞掉。没有新增器件、布局布线、时序或 LUT/BRAM 数据；合法导出不等于设计属性已经证明通过。本次未实际编译求解器或上板。",
        meta: ["ISC · BTOR2 导出正确性", "单元素 memory · 映射前后均涉及", "无新器件/PPA 数据 · 未上板"],
        source: "https://github.com/YosysHQ/yosys/commit/234206e9e110a0fe6aeb079d80b4208e43767b3a"
      },
      {
        category: "机器人学习训练",
        level: "OCT 22 MAIN · 软件层进展",
        title: "LeRobot：别让每张卡都流式读取整份机器人数据",
        summary: "03:26 合入 8a12558：训练器把 dp_rank / dp_world_size 显式交给 streaming dataset，优先于进程环境探测。此前某些 launcher 不导出 RANK，且 DataLoader worker 没有初始化 distributed，会使各 rank 都流式读取全量数据。相较昨日可传起始噪声的评测接口，这是多卡训练数据分片修复。",
        why: "适合训练机器人策略、使用流式大数据集的人。代码 Apache-2.0；模型、数据授权与 CPU/GPU/RAM/显存依任务，没有统一最低门槛。此次附带分片接口和训练器传参测试，但无新机器人、传感器、权重、数据集或实体成功率证据，也不是新的仿真基准结果。先在两 rank 小数据上记录 episode 分配与覆盖率，再复跑训练；直接使用 dataset 的原有回退路径保持不变。修正重复读取不等于已经证明收敛更快或机器人更可靠。",
        meta: ["Apache-2.0 · 数据并行身份显式传递", "有接口测试 · 无新增实机结果", "多卡训练适用 · 不承诺性能倍数"],
        source: "https://github.com/huggingface/lerobot/commit/8a125584153240d7511dddfbda440bbee56b134a"
      },
      {
        category: "Python 工具链",
        level: "OCT 22 RELEASE · 0.13.5",
        title: "uv 0.13.5：安全修复延伸到托管 Python 和 pip",
        summary: "北京时间 09:35 发布（Release 内文日期仍写 21 日）。新增的关键点不是重述昨日 0.13.4：更新托管 CPython 3.11+ 构建中的 pip/ensurepip 证书包，并加强拒绝受影响的中间证书链。另正式包含 #22751，处理 20 日提到的复杂 transitive extras 导出性能与可选依赖正确性问题。",
        why: "适合本地开发与 Agent 的 Python 环境维护。Apache-2.0 / MIT，Windows/macOS/Linux CPU 工具，无显存要求。只更新 uv 不会自动更换旧虚拟环境的解释器或 pip；按官方说明评估 uv python upgrade，固定旧 patch 的环境另行处理，已有 venv 的 pip 也须单独更新。新版停止发布 EOL Python 3.9/3.10 的 uv Docker 镜像，应规划迁移而非关闭 TLS 验证。先备份环境配置并跑依赖导出/安装回归；本次仅推荐和核验，没有升级你电脑的软件。",
        meta: ["正式 Release · 09:35 北京时间", "旧 venv 不会自动修复", "extras 修复已进入发行 · 新增进展"],
        source: "https://github.com/astral-sh/uv/releases/tag/0.13.5"
      },
      {
        category: "浏览器游戏 / 工厂流水线",
        level: "趣味发现 · 非今日发布",
        title: "shapez：切圆、染色、叠形状，造一条停不下来的流水线",
        summary: "从传送带把简单形状送到中心开始，慢慢加入切割、旋转、染色与堆叠。好玩在于一开始只是满足一个订单，后来忍不住想把所有生产线整理得更漂亮；建议先留 15–30 分钟。这是初代 shapez 的经典发现，不是 shapez 2 新发布。",
        why: "官方 shapez.io 提供免费在线 Demo，完整商店版收费，不把 Demo 当完整版；优先桌面鼠标和键盘，手机体验未核验。初代仓库 GPL-3.0，已不再活跃维护，开发重心转向续作。浏览器入口需联网加载；自行构建/离线和新版浏览器兼容性未测试。只核对官网 200 与仓库说明，文本抓取停在 Downloading Game，不能声称已进入游戏。长期工厂注意导出存档备份，清缓存可能丢进度。",
        meta: ["建议 15–30 分钟 · 桌面鼠标/键盘", "初代 GPL-3.0 · 免费 Demo / 付费完整版", "加载页可达 · 未实际试玩"],
        source: "https://github.com/tobspr-games/shapez.io",
        playUrl: "https://shapez.io/",
        playLabel: "打开官方 Demo ↗"
      },
      {
        category: "本地游戏 / 回合制地牢",
        level: "趣味发现 · 非今日发布",
        title: "Shattered Pixel Dungeon：每走一步，地牢才跟着走一步",
        summary: "随机地牢里捡装备、辨认药水、管理食物，再为一次贪心开门付出代价。回合制不用拼手速，适合电脑或手机慢慢琢磨，但死亡往往意味着重新开始；建议第一局试 15–20 分钟。当前核验的 v4.0.2 发布于 10 月 7 日，不算今日热点。",
        why: "GPL-3.0，官方 GitHub Release 提供免费 Android APK 和 Windows/Linux/macOS 构建；商店渠道含付费发行及支持选项，iOS 经 App Store，以当地价格为准。官方说明 Android 5.0+，桌面需 OpenGL 2.0+；Android 触控、桌面鼠标/键盘。下载后属于本地单人玩法，不以在线账号为核心，但商店下载/更新或支持功能可能联网；本次未安装或验证断网运行。只给作者发行页，不代装 APK、不索取账号，存档迁移先备份。",
        meta: ["建议 15–20 分钟 · 回合制/永久死亡", "GPL-3.0 · 官方免费构建", "Android / 桌面 · 未安装试玩"],
        source: "https://github.com/00-Evan/shattered-pixel-dungeon",
        playUrl: "https://github.com/00-Evan/shattered-pixel-dungeon/releases/tag/v4.0.2",
        playLabel: "作者官方下载 / 平台说明 ↗"
      },
      {
        category: "互动音乐 / 声画即兴",
        level: "趣味发现 · 非今日发布",
        title: "Patatap：把键盘当成会画画的打击垫",
        summary: "按字母键或触碰屏幕，让声音和几何动画一起冒出来；无需先学编曲，也没有输赢目标，随手敲出一小段节奏就够快乐。和 20 日的 Song Maker 网格编曲不同，它更像即时声画玩具；建议体验 2–5 分钟。",
        why: "官网可达，网页基础入口免费，未见强制注册；桌面键盘和移动触控是官方描述的交互方式，本次没有实测各设备。需联网加载素材，离线、音频延迟与手机浏览器表现未核验。使用开源 Two.js 不等于整站音频/素材都开放授权：当前整站源码许可未确认，按在线作品推荐。官方明确警告有闪烁画面，对闪光敏感者请跳过；先调低音量。未实际试玩或录制声音。",
        meta: ["建议 2–5 分钟 · 键盘/触控", "免费在线作品 · 整站授权未确认", "闪烁画面警告 · 未试玩"],
        source: "https://patatap.com/",
        sourceLabel: "作者官网 / 功能与提示 ↗",
        playUrl: "https://patatap.com/",
        playLabel: "打开声画打击垫 ↗"
      }
    ],
    deepDive: {
      title: "一个元素的数组，为什么值得修形式验证工具？",
      text: "数学上给 N 个元素编码需要 ceil(log2(N)) 位；N=1 时得 0。但 BTOR2 要求正位宽 sort，不能直接把 HDL 的空地址搬进文件。Yosys 这次不是给逻辑随意加状态：导出用至少一位地址，实际端口仍只访问索引 0；有明确目标宽度的空值用零常量表达，没有目标就拒绝输出。长期价值在于工具之间的语义契约：设计很小也可能碰到表示法的边界。建议用一元素数组延迟参考模型，分别导出保留 memory 和映射后的版本，再用解析器检查格式、求解器检查预期属性，并加上多元素对照。解析成功、属性成立、FPGA 能综合和板上时序达标是四件不同的事。本次阅读了补丁，没有代替你跑这些验证；这是建议的复现步骤，不是已通过的实验结果。",
      source: "https://github.com/YosysHQ/yosys/commit/234206e9e110a0fe6aeb079d80b4208e43767b3a"
    },
    noise: "判断而非事实：‘兼容 /v1/embeddings’容易被误解成任何现成客户端都能无缝接入。vLLM 的 late chunking 返回矩阵和范围元数据，是扩展协议；分块也不突破模型的上下文窗口，未必提升每个数据集的检索质量。先测接口、中文/emoji 范围映射、召回率和资源占用，比只看演示更有意义。榜单同样只当线索：今天热度高的 Cloudflare 审计 skill 最近提交在 9 月，未找到新发布就不塞进当日技术信号。"
  },
  {
    date: "2026-10-21",
    label: "OCT 21",
    pulse: "今天最值得追的是视觉模型的可控编辑与低显存落地，而不是再多一张排行榜。研究截止北京时间 10 月 21 日 10:28：6 条技术信号，另附 3 个不与昨日重复的经典趣味发现；uv 的证书信任修复建议优先处理。先看技术约 5 分钟，游戏按兴趣加餐。6 项计入本地部署/采用，包括需模型与算力的机器人离线评测工具；3 个在线游戏不冒充离线安装包。本期没有核实到值得单列的超分新发布，也不以普通依赖更新凑 Agent 新闻。",
    metrics: [
      { value: "9", label: "今日条目" },
      { value: "6", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 工作流",
        level: "OCT 21 MAIN · 非正式发行",
        title: "Fibo 2.0 接入 ComfyUI：生成与编辑共用一个模型",
        summary: "今早 08:00 合入的 87ed5a0 新增 Fibo 2.0 模型、文本编码器与节点支持；这是相较昨日 MOSS 条件控制的新增模型接入，不是重发 0.42。Fibo 2.0 为约 8B 统一生成/编辑模型，Dev 是完整基础版，Edit Turbo 面向少步编辑；Diffusers 的对应管线也已于昨晚合入。",
        why: "适合图像编辑工作流与微调研究。ComfyUI 代码 GPL-3.0；权重需在 Hugging Face 登录接受门控条款，模型卡标示 bria-fibo / CC BY-NC 4.0，商业使用另需协议，不能称为无条件商用开源。CUDA/PyTorch 是当前代码示例路径；未见可据此保证的消费卡最低显存、量化方案或手机支持。先隔离安装 main，核对节点、编码器与权重版本；不要把主干合入当稳定版已发布。",
        meta: ["ComfyUI 主干 · 08:00 北京时间", "Dev / Edit Turbo · 门控权重", "非商业许可 · 最低显存未确认"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/87ed5a066d9c4660ef42100fd01a888da6994856",
        playUrl: "https://huggingface.co/briaai/Fibo-2.0-dev/blob/main/README.md",
        playLabel: "模型卡 / 权重许可 ↗"
      },
      {
        category: "扩散模型工具链",
        level: "OCT 20 UPDATE · 非今日发布",
        title: "DiffSynth 的 MOSS 路线：低比特、训练与 offload 编译一起补齐",
        summary: "20 日新增 MOSS-Image Base/SFT 推理和训练支持，并提供 EntroPack 预量化包；同日晚 b34c837 修复 CPU offload 与编译配合。与昨日 ComfyUI 的颜色/深度条件节点不同，这次关注显存管理和训练链路。项目宣称 3.5-bit 方案最低可在 4GB 显存运行，但这不是本次实测或所有配置的最低值。",
        why: "适合想在消费级 NVIDIA GPU 试 MOSS 或 LoRA 的人。代码 Apache-2.0，模型/量化包授权须分别核对。低显存示例用 CUDA、磁盘卸载、浮点 VAE；默认实际选择 INT8 GEMM 的 6-bit 包，并非 3.5-bit，不能原样运行就承诺 4GB。内存、磁盘与吞吐仍受卸载影响，未给出统一 RAM 下限或同条件速度。优先 Linux/WSL 的独立 Python 环境，固定提交与量化配置，比较显存峰值、耗时及中文文字质量。",
        meta: ["Apache-2.0 代码 · CUDA 示例", "4GB 为项目方特定配置宣称", "默认示例 6-bit ≠ 3.5-bit"],
        source: "https://github.com/modelscope/DiffSynth-Studio/blob/b34c83793f783b8bf0c7e82142e06dda01f98d27/docs/en/Model_Details/MOSS-Image.md",
        playUrl: "https://github.com/modelscope/DiffSynth-Studio/blob/b34c83793f783b8bf0c7e82142e06dda01f98d27/examples/moss_image/model_inference_low_vram/MOSS-Image-EntroPack.py",
        playLabel: "低显存配置原例 ↗"
      },
      {
        category: "本地语音 / 流式转写",
        level: "OCT 21 MAIN · 非正式发行",
        title: "llama.cpp 新增实时转写 WebSocket，不是所有模型自动能听写",
        summary: "06:04 合入 1242be6：新增 /v1/realtime 流式语音转写端点，提供文本增量与完成事件。区别于昨日 llamaconnect 的远程连接层，这是服务端音频处理能力；只适用于带流式音频编码器的模型，不是普通文字 GGUF 的通用升级。",
        why: "适合做本地字幕、语音笔记和端侧客户端。MIT 代码；模型许可、量化、CPU/GPU、内存/显存依具体检查点，不能给出统一门槛。输入是 PCM16 单声道，采样率要读取 session.created；clear 为兼容接口，已送入模型的音频不能撤回，断句提交还可能有延迟字词归入下一项。API key 验证在 WebSocket 升级前执行，但并不替代 TLS、网络隔离和音频隐私控制。先用本机录音测试延迟、清空和断连，不直接暴露公网。",
        meta: ["MIT · 流式音频模型限定", "PCM16 mono · 采样率由会话告知", "clear 不撤回已处理音频"],
        source: "https://github.com/ggml-org/llama.cpp/commit/1242be66f65d5d8a3d996ba56d6de106ced98cf6"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 21 MAIN · 非正式发行",
        title: "Verilator 补 $readmemh 动态数组/关联数组支持",
        summary: "07:00 合入 8b8b32a，新增动态数组读取回归测试并更新关联数组处理。对用十六进制文件装载参考数据的 SystemVerilog testbench 很实用；相较前两天的数组方向与 signed dtype 修正，这是新的文件 I/O 覆盖。",
        why: "适合 HDL 仿真与验证，不是 FPGA 器件支持或综合加速新闻。CPU 上编译运行，Linux/WSL 是方便的复现路径，无 GPU 需求；工具采用 LGPL-3.0 / Artistic-2.0 双许可。新增测试先 new[N] 分配动态数组，覆盖起始地址、窄位宽、宽位宽与写回；不要假设读文件会自动增长数组。建议固定提交跑 t_sys_readmem_dyn，再替换自己的测试数据。没有新的 LUT/BRAM、Fmax 或板卡实测，不能把仿真支持写成硬件性能提升。",
        meta: ["LGPL-3.0 / Artistic-2.0", "仅仿真能力 · 非综合/PPA", "动态数组先分配 · 有回归用例"],
        source: "https://github.com/verilator/verilator/commit/8b8b32a80f8ec198474c5da126ab2d09a586fabe"
      },
      {
        category: "Python 工具链",
        level: "OCT 21 ADVISORY · 安全优先",
        title: "uv <0.13.4：检查内置证书信任，别用关 TLS 验证绕过",
        summary: "官方高危公告 GHSA-hq85-5cpj-mr62 于今早 00:48 发布：emSign ECC Root CA – G3 下中间证书密钥被视为已泄露，旧版默认内置 CA 信任可能导致被冒充的服务器通过验证。0.13.4 移除该根；版本在昨日 23:24 发布，明确是非今日 Release。",
        why: "使用 uv 下载 Python、依赖或运行 Agent 工具环境的人应优先评估升级至 0.13.4 或以上的已修复版本。跨平台 CPU，Apache-2.0 / MIT，不涉及显存。若使用系统或自定义 CA，还必须确认相应信任库也不再信任受影响链；换成系统证书并非自动安全。不要禁用证书校验。新增点是供应链信任修复，和昨日 0.13.3 extras 导出性能回退不同，本条不声称修好了导出正确性问题。本次仅核验公告，没有改动你的 Python 环境。",
        meta: ["HIGH · <0.13.4 受影响", "修复版昨晚发布 · 公告今早发布", "系统/自定义 CA 也须核对"],
        source: "https://github.com/astral-sh/uv/security/advisories/GHSA-hq85-5cpj-mr62",
        playUrl: "https://github.com/astral-sh/uv/releases/tag/0.13.4",
        playLabel: "修复版 Release ↗"
      },
      {
        category: "机器人学习评测",
        level: "OCT 20 MAIN · 非今日发布",
        title: "LeRobot 可传入起始噪声：让策略导出前后的比较更公平",
        summary: "昨晚 22:32 合入 afbf3f1，为多类扩散/流匹配策略统一 keyword-only noise 输入，修正部分接受却忽略输入的路径，并处理原地修改输入的问题。和昨日 G1-23 的实体机器人接口进展不同，这次是评测与推理接口变化：用相同初始扰动比较 eager、编译或导出策略。",
        why: "适合策略部署和离线回放；代码 Apache-2.0，模型权重、数据、GPU/显存依策略另选。此次没有新机器人平台、传感器、开放数据或新增实体成功率证据，算作软件层具身进展，不能推导硬件成本降低。DDPM 每步还会采样噪声，只固定初始 noise 不保证逐位复现；还需固定观察、随机源与后端。新增接口回归也不等于全部策略已通过真实机器人对齐验证，先做离线误差检查再上机。",
        meta: ["Apache-2.0 · 主干接口变化", "软件评测 · 无新增实体实验", "初始噪声固定 ≠ DDPM 全程确定"],
        source: "https://github.com/huggingface/lerobot/commit/afbf3f14a13bdad3e5990e2bed629c6539605658"
      },
      {
        category: "生态沙盒 / 水族模拟",
        level: "趣味发现 · 非今日发布",
        title: "Orb Farm：养一罐会自己折腾的小生态",
        summary: "往小小的水族罐里放材料、藻类和水蚤，看它们繁殖、吃东西，再观察环境怎么变化。没有宏大任务，试着让这罐生命保持平衡就足够上头；建议先拨 10–15 分钟。是本次新发现的经典项目，不是今天的新发布。",
        why: "免费浏览器入口，基础玩法无需注册；桌面鼠标最稳妥，手机触控表现未实测。作者公开 Rust/WASM 与网页代码，MIT；自行构建需要开发环境，不等于官网可保证断网运行。存档使用浏览器 localStorage，清缓存/隐私模式可能丢失，重要布置别只留在临时浏览器。本次核对官网 HTTP 可达、源码与存档实现，未实际试玩或验证生态平衡。",
        meta: ["建议 10–15 分钟 · 鼠标", "MIT · Rust/WASM", "在线免费 · 离线未核验"],
        source: "https://github.com/MaxBittker/orb.farm",
        playUrl: "https://orb.farm/",
        playLabel: "打开生态罐 ↗"
      },
      {
        category: "物理沙盒 / 轨道绘制",
        level: "趣味发现 · 非今日发布",
        title: "Line Rider：画一条线，看雪橇能不能活着滑过去",
        summary: "自己画坡、弯道和跳台，再播放雪橇运动；摔倒就改线，成功后继续把轨道弄得更离谱。随手画两分钟也有反馈，认真做可以发展成整段音乐轨道；建议首轮 5–15 分钟。",
        why: "只给 linerider.com 官方免费网页版入口；桌面鼠标/触控板绘制，手机端手感未验证。页面当前需要 JavaScript，文本抓取只得到 Loading，本次未实际试玩、未确认离线或账号功能。没有确认到当前官网完整源码及可复用许可证，按授权未确认的在线作品推荐，不标开源；手机商店版可能另有费用，以官方渠道为准。作品最好主动导出备份，不依赖浏览器缓存。",
        meta: ["建议 5–15 分钟 · 桌面绘图", "官网免费网页版 · 授权未确认", "JS 加载页可达 · 未试玩"],
        source: "https://www.linerider.com/",
        sourceLabel: "官方介绍与入口 ↗",
        playUrl: "https://www.linerider.com/",
        playLabel: "去画雪橇轨道 ↗"
      },
      {
        category: "浏览器游戏 / 反重力竞速",
        level: "趣味发现 · 非今日发布",
        title: "HexGL：几分钟一局的未来飞船冲线",
        summary: "沿悬空赛道驾驶反重力飞船，找加速带、贴弯、再挑战自己的圈速。不需要先学建造或配队，适合脑子想休息时来一局；建议 3–8 分钟。与昨天的本地卡丁车不同，这是老派 WebGL 浏览器竞速。",
        why: "官方游戏页可达，免费浏览器入口，无需为体验安装软件；优先桌面键盘方向键，需 WebGL，手机控制与现代浏览器兼容性未实测。代码和资源默认 MIT，单文件另有声明时优先遵从；开发处于 hiatus，官方排行榜已关闭，别期待现代联机服务。仓库可供本地自托管，但没有在此搭建或验证离线，不能把旧 appcache 当可用保证。本次仅核对官方说明、仓库和入口，未实测帧率或完成比赛。",
        meta: ["建议 3–8 分钟 · 键盘/WebGL", "MIT 默认许可 · 项目暂停活跃开发", "免费在线 · 排行榜已关闭"],
        source: "https://github.com/BKcore/HexGL",
        playUrl: "https://hexgl.bkcore.com/play/",
        playLabel: "进入反重力赛道 ↗"
      }
    ],
    deepDive: {
      title: "把图像提示词变成可版本化的场景说明，而不是继续堆形容词",
      text: "今日深挖 Fibo 2.0 背后的 VGL 工程思路。它把对象、背景、照明、相机与文字拆成带类型的 JSON，编辑时比较字段变化，更适合记录实验和做批量控制；这不意味着没有随机性或绝对保留所有像素。Bria 的 bria-vgl 包提供生成、描述、修改场景与带遮罩编辑的接口，代码 MIT，但默认调用 Gemini，也可配置 Vertex/Bedrock：开源提示词工具并不等于整条流程离线，API 成本与参考图隐私仍要计算。建议下一步先人工保存一份小 JSON，只改光线或一个对象，固定图片、噪声和软件版本，比较主体漂移与耗时；再决定是否接在线 LLM。自建本地 provider 的效果和兼容性须另测，不能由可填写模型 ID 推断已验证。多图数量限制也要按具体层核对：VGL 包例子最多 4 张，Diffusers Fibo2 管线文档最多 5 张，两者不能混写。模型权重非商业限制仍独立于工具代码。",
      source: "https://github.com/Bria-AI/vgl/blob/5eeecc20531068b80166bc7545a04c3810daf242/README.md"
    },
    noise: "判断而非事实：‘4 步’或‘4GB’容易被当作人人可实时使用的结论。步数不包含文本编码、加载、VAE 与卸载开销，低比特也可能改变文字和细节质量；MOSS 示例默认 6-bit，不能拿它直接证明 3.5-bit 的 4GB 宣称。Fibo 的少步版针对编辑，也不是全部任务都同样快。更有价值的下一步是记录同分辨率、同提示词下的峰值显存、首张/热启动耗时与失败样本。趣味加餐则没有性能背书：官网返回 200 不等于已试玩成功，三项均明确保留验证边界。"
  },
  {
    date: "2026-10-20",
    label: "OCT 20",
    pulse: "今天的技术信号聚焦接口契约：图像参考尺寸、机器人关节槽位、FPGA 顶层 I/O 与依赖导出的正确性。本期技术研究截止北京时间 10 月 20 日 10:07，原 7 条保留；另扩充 12 项可选阅读的经典趣味发现，合计 19 项。趣味项均非今日发布：解谜、沙盒、互动音乐、因果涂鸦、运输经营和竞速都可以按分类挑着玩。10 项计入本地部署/采用（原 6 项技术工具与 4 款本地游戏），在线网页不冒充离线版，G1 仍需实体硬件。已核对官方介绍与入口，未实际安装试玩或通关。",
    metrics: [
      { value: "19", label: "今日条目" },
      { value: "10", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 条件控制",
        level: "OCT 20 MAIN BRANCH · 实验节点",
        title: "ComfyUI：MOSS-Image 新增区域色块与深度条件接入",
        summary: "相较昨日 0.42.0 的基础模型支持，主分支新增 MOSSImageControl，并适配经 LoRA loader 加载的控制 adapter。色块只表示区域 ID，不是目标调色板；深度图近处为白，可调强度与生效采样区间。该提交在 0.42.0 之后，不能只安装该 tag 就期待已有。",
        why: "适合本地布局、空间结构与文字海报实验。GPL-3.0 代码；还需兼容 MOSS 模型、VAE 和控制权重，adapter 许可/可获取性要另核对，本次不宣称权重同步开放。Windows/Linux/macOS 按 PyTorch 后端配置，未提供统一 RAM/VRAM 下限或量化性能表。节点标记 experimental；控制图应与目标尺寸对应，先固定 seed 比较无控制、单图和双图输入，并记录显存与结构偏差，不能以接口存在代替画质评测。",
        meta: ["GPL-3.0（代码）", "区域 ID / 深度 · 需兼容 adapter", "主分支 · experimental · 非 0.42.0"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/e3bee7ffcb7d6547ed0bcd15221792f3b8646b17"
      },
      {
        category: "扩散模型工具链",
        level: "OCT 19 MAIN BRANCH · 非今日发布",
        title: "Diffusers：FLUX.3 单图保留完整构图，多参考图另走尺寸规则",
        summary: "与 17 日 prompt 扩写块不同，这次对齐 BFL 参考图预处理：单图缩到填充画布约 4MP 以内、边长不超过 4096，镜像补至 16 像素网格，默认输出再裁回预处理参考范围；多图则各自约 1MP 并裁到网格，默认尺寸跟随首图，显式宽高可覆盖。",
        why: "适合编辑、细字保留和不同实现间的回归比较。Apache-2.0 代码，FLUX 权重按相应授权；Python/PyTorch，显存取决于实际画布、参考图数量及驻留组件，没有新增消费卡最低配置。超大输入仍会缩小，并非无损恢复原始大图；默认画布较大也可能增加显存。固定提交，用非 16 倍数、窄长和多参考样例检查边缘、尺寸与峰值内存，保存预处理参数，不把构图差异误判成模型升级。",
        meta: ["Apache-2.0（代码）", "单参考 padding / 多参考 crop", "主分支 · 尺寸变化需重测显存"],
        source: "https://github.com/huggingface/diffusers/commit/4df4a5b35748bab1d967c0ff49ad1a144d094322"
      },
      {
        category: "FPGA / 综合工具链",
        level: "OCT 19 MERGED · 非今日发布",
        title: "Yosys：GateMate 保留层级时，只给顶层端口插入 I/O pad",
        summary: "synth_gatemate 将 iopadmap 限定到顶层，避免 keep_hierarchy 或 -noflatten 下给子模块边界错误加 pad；新增两套层级测试，检查子模块仍在、子模块无 I/O buffer、顶层 buffer 数量正确。相较 17 日 FSM undef 转移修复，这是器件综合流程的新修复。",
        why: "适合 Cologne Chip GateMate 的层级 RTL 和模块化综合用户。ISC；Linux/WSL 普通 CPU 源码构建，无显存要求。先跑 tests/arch/gatemate 的 keep_hierarchy/noflatten 测试，再对比自有设计网表的层级、pad 数量并继续布局布线。这里没有新增器件型号，也未报告 LUT/FF、时序或板上 Fmax 改善；综合测试通过不等于任意保层级设计已能完成后端流程。",
        meta: ["ISC", "GateMate · keep_hierarchy / -noflatten", "已合入 · 无新资源 / Fmax 数据"],
        source: "https://github.com/YosysHQ/yosys/commit/344b62966928ca397c1ec79113b7576864a86dc2"
      },
      {
        category: "机器人驱动 / 遥操作",
        level: "OCT 20 MAIN BRANCH · G1-23",
        title: "LeRobot：G1-23 保留稀疏 DDS 槽位，报告有限条件实机验证",
        summary: "新增显式 g1_23/g1_29 embodiment，默认仍为 29；23 个关节保持原 29 槽 DDS 索引，清空不存在关节的命令并保留完整反馈。相较 17 日串口舵机总线，这是 Unitree 人形平台接入；允许 GR00T/Holosoma locomotion，拒绝 G1-23 的 SONIC、重力补偿和尚无原生模型的 MuJoCo 仿真。",
        why: "适合已有 G1-23 与安全场地的团队。Apache-2.0 接入代码，控制策略/权重另核对；需 Unitree SDK、关节反馈/遥控器与机器人计算环境，摄像头用于视觉任务但不能据此推断本次测试用了 VLA。作者报告 75 项聚焦测试，并在吊挂/监护/急停条件下，用 Holosoma 验证零输入、小幅单轴命令、闲置槽和断连；不是自由行走、抓取成功率或独立复现。未新增数据集/策略权重，也未给整机成本或通用显存下限，不是低成本入门方案。",
        meta: ["Apache-2.0（接入代码）", "G1-23 · 29 槽传输 / 23 活跃关节", "作者有限实机测试 · 非 G1-23 仿真"],
        source: "https://github.com/huggingface/lerobot/commit/3991580a5673f5f0219a4e8835a5f973eeccf9a7"
      },
      {
        category: "本地 LLM 服务 / 远程访问",
        level: "OCT 20 MAIN BRANCH · experimental",
        title: "llama.cpp：可选 llama-connect 让手机浏览器访问家中推理服务",
        summary: "llama-server 新增 --connect，经独立 llama-connect 子进程提供 WebRTC 访问及分享码；程序退出会关闭管道并尝试终止隧道进程。相较昨日 Hexagon 注意力内核，这是访问本地服务的入口变化：手机是远端客户端，不是模型搬到手机执行。",
        why: "适合跨网络访问自有推理机的实验。两项目 MIT；需含子进程支持的新版 llama-server 与独立二进制，或配置 LLAMA_CONNECT 构建获取。模型可沿原 CPU/GPU 后端运行，RAM/VRAM 与 GGUF/KV 配置有关，无新增硬件下限。源码明确标记实验性并警告持码者可使用服务；不要公开分享码、日志或 props，也别把 P2P 等同无外部网络依赖或安全审计完成。先在非敏感环境检查鉴权、断连/重启和进程清理，不为体验而关闭防火墙或暴露未保护端口。",
        meta: ["MIT · 独立 llama-connect 二进制", "WebRTC · 手机为客户端", "实验性远程入口 · 分享码属敏感信息"],
        source: "https://github.com/ggml-org/llama.cpp/commit/7adf160c411e7a55d9ee75b5d41deb497969dac4"
      },
      {
        category: "Python 工具链",
        level: "OCT 20 RELEASE · 0.13.3",
        title: "uv 0.13.3：导出性能热修复有代价，可选依赖正确性仍需核验",
        summary: "北京时间 09:15 发布。0.13.3 包含 #22750 的回退以缓解 extras 导出严重变慢；维护者在同一 frozen lock 上报告原改动超过 60 秒、回退后 0.25 秒，但明确承认重新引入‘不兼容环境路径仍激活可选依赖’问题。它不是 18 日决策图优化的简单重复。",
        why: "适合大型 Python/AI 环境及导出 requirements 的 CI。Apache-2.0/MIT，Windows/macOS/Linux CPU 二进制，无 GPU 要求；量化不适用，RAM 随依赖图变化。该数字仅是作者用例，不是通用加速倍率。发布标签已核对包含回退；兼顾性能与正确性的 #22751 在本次截止仍未合入。若升级，固定原 lock 与 extras/平台矩阵，比较导出包集合、安装行为和耗时，不把‘恢复速度’写成‘语义已完全修复’。",
        meta: ["Apache-2.0 / MIT", "正式 0.13.3 · 临时回退", "导出正确性有已知取舍 · 后续修复未合入"],
        source: "https://github.com/astral-sh/uv/pull/22750"
      },
      {
        category: "开发环境",
        level: "OCT 19 RELEASE · 非今日发布",
        title: "mise 2026.10.15：默认 24 小时冷却覆盖所有后端，补 Windows 安装器",
        summary: "版本于 19 日发布，不能按 tag 中的 10.15 回填日期。相较 18 日只读 config explain，新版将默认 minimum_release_age 应用于全部后端，补更多日期来源，并在安装未能确定日期的版本时告警；同时发行无管理员权限要求的 PowerShell 安装器。",
        why: "适合管理 Python/Node/CLI 与编码 Agent 工具版本。MIT、跨平台 CPU；新安装器需 PowerShell 5.1+，校验下载的 SHA256，默认选至少 24 小时前的发行。冷却不是恶意包检测：未知日期仍可能放行，精确指定版本也不等于经过隔离验证。新版本列表来源/缓存行为可能影响代理和离线 CI；先对照固定版本、过新版本、缺日期和私有 registry，检查警告与 lock，不为消除报错直接全局取消冷却。",
        meta: ["MIT · 正式 Release", "全后端冷却 · 未知日期仍可能放行", "Windows PowerShell 5.1+ · 无需管理员"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.10.15"
      },
      {
        category: "电路解谜 / 数字逻辑",
        level: "趣味发现 · 非今日发布",
        title: "NandGame：从接线小谜题，一关关拼出计算机",
        summary: "从最基本的元件和 NAND 逻辑开始，每关完成的组件又成为下一关的积木。最适合你 FPGA/VHDL 兴趣的轻松入口：先玩 15 分钟，再试着把解出的电路写成 HDL。本次是经典项目发现，不是新版本新闻。",
        why: "浏览器在线玩，建议电脑鼠标/键盘，免本地安装；未确认官方离线包、源码开放与授权，不把网页能访问当成开源。它是逻辑解谜，不替代 HDL 仿真、时序分析或板上验证。官网已核对，但未实际通关或验证手机体验；长时间进度请留意站点自己的保存方式，别先清理浏览器数据。",
        meta: ["浏览器 · 电路 / 接线解谜", "建议先体验 15 分钟", "经典发现 · 开源授权未确认"],
        source: "https://nandgame.com/",
        sourceLabel: "在线玩 / 官方网站 ↗"
      },
      {
        category: "物理沙盒 / 元胞自动机",
        level: "趣味发现 · 非今日发布",
        title: "Sandspiel：随手画沙和水，看像素世界自己演化",
        summary: "不追求通关，直接把材料画到画布里，看粒子和流体相互作用；适合休息时玩 3–5 分钟。它用 Rust/WASM、WebGL 和 JavaScript 实现，也能顺手研究元胞自动机与 GPU 画面表现。经典项目，非今日首发。",
        why: "优先打开官方网页体验，无需下载来路不明的程序。源码 MIT；自行构建要 Rust/wasm-pack 与 Node/npm，比在线玩门槛高，分享/社区功能不能据此认定离线可用。需要浏览器相应图形支持，未做手机或低端设备性能测试，也没有统一 RAM/VRAM 最低值。它是创意沙盒而非精确工程物理模拟；本次核对官方介绍和源码，未实际试玩。",
        meta: ["MIT · Rust / WASM / WebGL", "在线沙盒 · 建议 3–5 分钟", "经典发现 · 自建需开发工具链"],
        source: "https://github.com/MaxBittker/sandspiel",
        playUrl: "https://sandspiel.club/",
        playLabel: "在线玩 ↗"
      },
      {
        category: "本地游戏 / 工厂塔防",
        level: "趣味发现 · 非今日发布",
        title: "Mindustry：让传送带、生产线和炮塔形成闭环",
        summary: "搭矿物加工和弹药供给链，同时抵挡敌人；有地图编辑器，也支持联机。推荐给喜欢自动化、资源调度与系统搭建的人，先用半小时做一套不会断料的小基地。它比前两项更像完整游戏，不是几分钟就能看完的网页玩具。",
        why: "官方 itch 页面提供 Windows/macOS/Linux/Android 版本，自定价格下载；Steam 是另一个付费发行渠道，别把商店功能混作所有版本共有。源码 GPL-3.0，使用官方预编译包不必先装开发工具，源码构建则按 README 使用 JDK 17。单机可在本地运行，联机需要网络；大型基地性能随规模变化，不承诺任意手机或集显都流畅。先备份存档再升级或装模组，仅从官方渠道下载；本次未安装试玩。",
        meta: ["GPL-3.0（源码）", "桌面 / Android · 工厂 + 塔防", "官方 itch 自定价格 · 建议半小时"],
        source: "https://github.com/Anuken/Mindustry",
        playUrl: "https://anuke.itch.io/mindustry",
        playLabel: "官方下载 ↗"
      },
      {
        category: "物理沙盒 / 热力与粒子",
        level: "趣味发现 · 非今日发布",
        title: "The Powder Toy：把桌面变成像素材料实验台",
        summary: "堆材料、加热、观察气压和重力，还能画电子元件、搭小机器。比 Sandspiel 更偏细节和折腾，建议先玩 10–20 分钟，挑一个简单装置改改看。",
        why: "免费，代码 GPL-3.0；官方提供 Windows/macOS/Linux/Android 渠道，优先下载成品，不必自行编译。基础沙盒可本地运行，在线分享/存档社区需联网与账号；复杂作品性能另看规模。这是游戏模拟，不用于真实材料、工程或危险实验的结论。",
        meta: ["GPL-3.0 · C++ / SDL", "本地沙盒 · 10–20 分钟", "在线社区需账号 · 非工程仿真"],
        source: "https://github.com/The-Powder-Toy/The-Powder-Toy",
        playUrl: "https://powdertoy.co.uk/Download.html",
        playLabel: "官方下载 ↗"
      },
      {
        category: "互动可视化 / 因果回路",
        level: "趣味发现 · 非今日发布",
        title: "LOOPY：画几个圈和箭头，看你的脑洞自己跑起来",
        summary: "随手画节点、连正负反馈，然后点节点给系统一点扰动。可以做一个‘咖啡—精神—工作量’的胡闹回路，也可以认真画一个生态系统；建议 5–10 分钟，不必写代码。",
        why: "浏览器即用，电脑鼠标更方便；项目主体 CC0/public domain，第三方库按原许可。没有承诺商业系统模拟的准确性，箭头关系是你设定的假设。官网 HTTP 检查通过；源码可镜像，但官方分享链接与自建的离线行为应分开看。",
        meta: ["主体 CC0 · 第三方库另计", "因果涂鸦 / 正负反馈", "浏览器 · 5–10 分钟"],
        source: "https://github.com/ncase/loopy",
        playUrl: "https://ncase.me/loopy/",
        playLabel: "在线玩 ↗"
      },
      {
        category: "互动叙事 / 博弈论",
        level: "趣味发现 · 非今日发布",
        title: "The Evolution of Trust：合作还是背叛，亲手改规则看结果",
        summary: "先与不同性格的对手玩小游戏，再调整重复轮数、收益和犯错概率，看策略怎样演化。不是做题，而是一篇能用鼠标玩的互动故事；原作建议约 30 分钟。",
        why: "免费网页，原作为英语，仓库列出社区中文译本。主体 public domain，音乐/音效含不同 CC 授权，不能把全部素材说成无条件可商用。是简化模型，不是现实人际关系的预测器；浏览器需声音/动画支持，页面已核对，未实际通关。",
        meta: ["主体 public domain · 素材另核对", "合作 / 背叛 / 策略演化", "浏览器 · 约 30 分钟"],
        source: "https://github.com/ncase/trust",
        playUrl: "https://ncase.me/trust/",
        playLabel: "在线玩 ↗"
      },
      {
        category: "创意编程 / 流体涂鸦",
        level: "趣味发现 · 非今日发布",
        title: "WebGL Fluid Simulation：用鼠标搅一团发光彩墨",
        summary: "拖动就产生彩色流体与涡旋，没有分数和输赢，纯粹看颜色卷起来。最适合只想摸鱼 2–5 分钟，也能作为图形效果与交互灵感库。",
        why: "代码 MIT，作者仓库直接链接官方演示；电脑鼠标或支持相应功能的触屏浏览器可尝试。依赖 WebGL/GPU，若设备发热、掉帧可降低效果或退出，未提供统一显存要求。视觉模拟不是真实流体计算，浏览器加载成功不等于任意手机都流畅。",
        meta: ["MIT · WebGL", "鼠标 / 触屏涂鸦", "在线演示 · 2–5 分钟"],
        source: "https://github.com/PavelDoGreat/WebGL-Fluid-Simulation",
        playUrl: "https://paveldogreat.github.io/WebGL-Fluid-Simulation/",
        playLabel: "在线玩 ↗"
      },
      {
        category: "互动音乐 / 网格编曲",
        level: "趣味发现 · 非今日发布",
        title: "Song Maker：不会乐理，也能点格子做一段小曲",
        summary: "在彩色网格里点出旋律和节奏，改速度、换音色，再把作品分享给朋友。Chrome Music Lab 的轻量实验，建议用 5–10 分钟做一个循环；想更随意也可逛同站其他音乐玩具。",
        why: "官方说明无需账号，浏览器即可开始；初次发声可能需手动点击，耳机或音箱更合适。官网及 Song Maker 入口返回正常，未实际试听；完整成品/素材授权未逐项确认，不把所用开放 Web 技术等同整站 MIT，也不承诺分享服务离线可用。",
        meta: ["浏览器 · 无需账号（官方说明）", "网格旋律 / 节奏 · 5–10 分钟", "分享功能需联网 · 成品授权未确认"],
        source: "https://musiclab.chromeexperiments.com/",
        sourceLabel: "项目官网 / 说明 ↗",
        playUrl: "https://musiclab.chromeexperiments.com/Song-Maker/",
        playLabel: "在线做首歌 ↗"
      },
      {
        category: "本地游戏 / 运输经营",
        level: "趣味发现 · 非今日发布",
        title: "OpenTTD：给城市铺铁路，顺手把整张地图搞成交通网",
        summary: "修车站、铺线路、设计铁路交汇和货运网络，看列车与城市一起长起来。适合喜欢规划、调度和‘再优化一下就睡’的人；建议先留半小时，它并非一分钟小游戏。",
        why: "免费开源，代码 GPL-2.0，第三方组件与基础素材另有许可；官方提供 Windows/macOS/Linux 等版本。选稳定版与自由基础资源，单机本地玩，联机/下载附加内容才需要网络。官方成品比源码构建简单，旧存档先备份；地图和车辆规模会影响性能，未统一测最低 RAM。",
        meta: ["GPL-2.0 · 素材 / 依赖另计", "本地单机 / 可联机", "经营与调度 · 30 分钟起"],
        source: "https://github.com/OpenTTD/OpenTTD",
        playUrl: "https://www.openttd.org/downloads/openttd-releases/latest",
        playLabel: "官方下载 ↗"
      },
      {
        category: "本地游戏 / 卡丁车竞速",
        level: "趣味发现 · 非今日发布",
        title: "SuperTuxKart：不必讲道理，先跑一圈卡通赛车",
        summary: "开卡丁车、吃道具、跑不同主题赛道，适合暂时不想思考技术时换换脑子。单人先跑一场约 5–10 分钟，也可再研究多人模式；重点是好玩，不是写实驾驶。",
        why: "免费开源，代码 GPL，资源按各自许可；官方提供 Windows/macOS/Linux/Android 渠道。需支持相应 OpenGL/OpenGL ES 的图形设备，画质和帧率按设备调整，不是完全不吃 GPU 的网页小玩具。单机与在线模式分开，下载请用官网，未实际安装或验证手柄/手机体验。",
        meta: ["代码 GPL · 游戏资源另计", "桌面 / Android · 需图形支持", "卡丁车 / 道具 · 5–10 分钟"],
        source: "https://github.com/supertuxkart/stk-code",
        playUrl: "https://supertuxkart.net/Download",
        playLabel: "官方下载 ↗"
      },
      {
        category: "浏览器游戏 / 文字探索",
        level: "趣味发现 · 非今日发布",
        title: "A Dark Room：从点一团火开始，不剧透它会变成什么",
        summary: "极简界面、文字和少量按钮，随着操作逐渐展开。建议先给它 10 分钟，不要急着看攻略；如果被吸引再慢慢玩，适合喜欢探索与留白的人。",
        why: "免费浏览器版，代码 MPL-2.0，仓库列出简体中文入口；手机商店版不据此当成免费或与网页版完全一致。在线页已核对，存档依赖浏览器环境，建议使用游戏的导入/导出功能并避免清理站点数据。可看源码但不必编译，不宣称已验证所有离线/跨设备存档行为。",
        meta: ["MPL-2.0 · 免费浏览器版", "简体中文入口 · 文字探索", "先体验 10 分钟 · 留意存档"],
        source: "https://github.com/doublespeakgames/adarkroom",
        playUrl: "https://adarkroom.doublespeakgames.com/?lang=zh_cn",
        playLabel: "在线玩 / 简体中文 ↗"
      },
      {
        category: "浏览器游戏 / 数字合并",
        level: "趣味发现 · 非今日发布",
        title: "2048：老朋友也留一个官方入口，随时开局滑几下",
        summary: "滑动棋盘，让相同数字合并，在有限空间里留住下一步。没门槛、短局、规则清楚，适合 3–5 分钟；如果嫌经典，还能拿 MIT 源码改成自己的数字或图案版。",
        why: "源码 MIT，项目仓库链接官方在线版本；桌面用方向键，手机用滑动。网页入口已返回正常，未实际游玩；当前站点的推广、存储或外链行为不能由旧源码推定。先用网页，不必下载第三方同名 APK；浏览器记录可能随清理数据丢失。",
        meta: ["MIT · JavaScript", "方向键 / 滑动 · 3–5 分钟", "经典发现 · 官方入口"],
        source: "https://github.com/gabrielecirulli/2048",
        playUrl: "https://play2048.co/",
        playLabel: "在线玩 ↗"
      }
    ],
    deepDive: {
      title: "23 个物理关节，为什么仍要传 29 个槽位？",
      text: "事实：LeRobot 的 G1-23 接入保留 Unitree 的 29 槽 DDS 契约，活跃手臂索引是 15–19 与 22–26，不把它们重新压成连续序号；缺失关节的增益/默认值为零，发命令前清空闲置槽，但控制器仍可获得完整传输反馈。动作/观测特征则只暴露活跃关节。判断：可复现机器人软件的关键不只是策略网络，而是物理关节、消息索引和策略输入的映射不漂移。局限：G1-23 尚不支持文档中的 MuJoCo 原生模型、SONIC 或重力补偿；G1-29 的教程不能无差别照抄。下一步：先在纯软件契约测试里检查索引、无效向量和闲置槽，再由有资质团队按厂商安全流程验证；不要用错型号仿真通过替代实体兼容性证据。",
      source: "https://github.com/huggingface/lerobot/blob/3991580a5673f5f0219a4e8835a5f973eeccf9a7/docs/source/unitree_g1.mdx"
    },
    noise: "判断：‘ComfyUI 新增超分节点’不等于‘新开源超分模型可离线部署’。本次 Crystal Video Upscaler 改动在 Partner API 路径，涉及上传与外部服务，故未作为本地超分项目重点推荐。类似地，P2P 远程浏览器不等于手机端推理，dependency hotfix 不等于导出语义无误，G1 接入也不等于新的通用 VLA。今天保留原有超分与具身技术分类，不用这些概念偷换来凑数。"
  },
  {
    date: "2026-10-19",
    label: "OCT 19",
    pulse: "今天的信号是从‘能跑’转向‘运行边界可验证’：视频生成优化同时改变结果与接口，手机 DSP 改善注意力数据搬运，RTL 与推理服务修复错误，常驻 Agent 补强恢复与审批。本期研究截止北京时间 10 月 19 日 10:10；先查 GitHub Daily / All languages，再核对官方 Release、提交和迁移文档，收录 7 条。‘本地可部署’表示可自行运行，并不表示所有项目都适合普通电脑；没有新权重或实机证据的方向不凑数。",
    metrics: [
      { value: "7", label: "今日信号" },
      { value: "7", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "视频生成",
        level: "OCT 18 SDK 1.5.0 · 非今日发布",
        title: "LTX-2：视频解码与 DFR 内存优化，同时有破坏性接口迁移",
        summary: "官方代码和 changelog 更新到 1.5.0：去噪减少逐步 CPU 同步，多 GPU 解码直接流向 MP4，DiffVAE 降低预留显存，并修复旧 PyTorch 下长 1080p 片段从第 128 帧出现灰尾的问题。相较此前 DFR 管线接入，这是 SDK、解码与接口的新进展，不是新一代模型首发。",
        why: "适合本地视频工作流与多卡维护者。Python ≥3.10、PyTorch；最快 natten 路径是 Linux/CUDA，其他平台回退不代表同速。可用 FP8 与 CPU/磁盘 offload，RAM/VRAM 随帧数、组件和分辨率变化，无统一最低值；LTX Community License 按模型版本核对，不能当 Apache/MIT。关键帧改用显式 replace/guide，旧独立插值入口已移除；DFR 分块/FP8 和解码舍入令输出不再逐位一致。先固定旧版短片作质量、显存和耗时回归。",
        meta: ["SDK 1.5.0 · 10/18", "FP8 / offload · 无统一显存下限", "LTX Community License · 有破坏性变更"],
        source: "https://github.com/Lightricks/LTX-2/blob/e98f6d927d83c92ef2be6aec76c8440b19306e39/CHANGELOG.md"
      },
      {
        category: "图像生成 / 工作流",
        level: "OCT 19 RELEASE · v0.42.0",
        title: "ComfyUI 0.42.0：MOSS-Image 进入正式版本，修正 CPU 量化路径判断",
        summary: "北京时间 06:10 发布。相较 16 日的 0.41 与 17 日的 MOSS 模型介绍，新版本正式纳入 MOSS-Image、Qwen 3.x 性能调整、TextGenerate think-block 修复和摄像头修复；设备判断不再把 CPU 视为可执行相关 FP8/NVFP4/MXFP8/INT8 计算的后端。",
        why: "适合搭建本地图像与文本联动工作流的用户。GPL-3.0 代码，模型各自授权；Windows/Linux/macOS 的具体 GPU 与 PyTorch 组合需按官方安装路径核对。可选量化和卸载不等于 CPU 能原生加速所有低比特格式，也不能由模型文件大小推算整栈 RAM。先备份 workflow/custom nodes，固定组件并测试文字、摄像头和设备回退。Partner API 节点仍可能依赖云端与费用，不能把它们算成离线模型；发布后新增的 MOSS RoPE 改动也不混入该 tag。",
        meta: ["GPL-3.0（代码）", "正式 Release · MOSS / Qwen", "模型与插件另核对 · API 节点非离线"],
        source: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.42.0"
      },
      {
        category: "端侧 LLM 推理",
        level: "OCT 19 MAIN BRANCH · Hexagon 注意力",
        title: "llama.cpp：跳过完全遮蔽的 KV 块，改善 DSP 长上下文路径",
        summary: "Hexagon FLASH_ATTN_EXT 扫描 mask，减少无效 KV 块的 DMA 搬运，并调整 HMX/HVX 内核选择阈值；同一窗口另解除多流注意力的一项限制。相较昨日 Q1_0/Q2_0 算子覆盖，这是注意力访存和滑动窗口模型的新路径，不是新的量化格式。",
        why: "适合支持 Hexagon HTP 的 Snapdragon Android/Linux 开发者。MIT，需兼容设备/运行库及源码构建；模型、KV cache、上下文长度决定 RAM，未给跨芯片 tokens/s、功耗或统一最低配置。全遮蔽块跳过不会让所有上下文等比例加速，多流支持也不保证整模型完全卸载。固定 GGUF、芯片与实际后端，分别测 prefill/decode、长短上下文、正确性、温升和 CPU 回退，再决定是否采用。",
        meta: ["MIT", "Snapdragon HTP · HMX / HVX / DMA", "主分支 · 不承诺统一加速倍率"],
        source: "https://github.com/ggml-org/llama.cpp/commit/31288c9c66e59377f7788d920678a565bb89dd37"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 19 MAIN BRANCH · 有符号运算",
        title: "Verilator：保留内联后的扩展类型，修复 signed 比较错误",
        summary: "C++ 函数内联重绑定局部变量引用时保留既有 dtype，避免覆盖之前扩宽的引用类型；新增拼接前导 0/1 后做 signed 比较的回归。与昨日 unpacked 数组方向修复不同，这是位宽扩展与符号语义的正确性问题。",
        why: "适合参数化 RTL、比较器及位宽转换 testbench 作者。LGPL-3.0 或 Artistic-2.0；Linux/WSL 普通 CPU 源码构建，无 GPU 门槛。固定提交，运行新增 t_inline_cfuncs_extend 用例，再以边界值对照另一仿真器及原回归；不能将该修复写成所有 signed/unsigned 问题均已消除。本项不增加 FPGA 器件支持，也没有综合资源、时序或板上 Fmax 数据。",
        meta: ["LGPL-3.0 / Artistic-2.0", "dtype / 位宽 / signed · 有新增回归", "主分支 · 仿真非综合"],
        source: "https://github.com/verilator/verilator/commit/45b5e1dcf9b8ce5018e4889e2989aa3601e4ab69"
      },
      {
        category: "机器人仿真",
        level: "OCT 19 DEVELOP · Newton 重构 1/N",
        title: "Isaac Lab：物理管理器从全局类状态改为每个仿真实例拥有",
        summary: "SimulationContext 持有 sim.backend_manager；资产、传感器与 MDP 访问该实例，views 也改为每实例按路径索引。与 17 日 contact reset 修复不同，这是 PhysX/OVPhysX/Newton 的 API 与状态所有权迁移；只是系列第一步，不能提前宣称后续整步 CUDA graph 或同步消除已交付。",
        why: "适合维护自定义仿真后端、传感器或 RL 环境的团队。BSD-3-Clause；算力/显存取决于后端和场景，无新增最低配置。常见类级调用有弃用转发，但类身份判断、views 键及重写类方法等有不兼容项。作者报告 kitless 与契约测试；需 Isaac Sim 的 PhysX 资产/传感器/环境测试并未在该验证环境运行。这里没有新增机器人平台、实体传感器、VLA 权重/数据或实机成功率，硬件成本不适用；先迁移自有插件并重跑各后端回归。",
        meta: ["BSD-3-Clause", "仿真 API / 状态隔离 · 非实体结果", "develop · 有破坏性项 / 验证范围限制"],
        source: "https://github.com/isaac-sim/IsaacLab/commit/31cb07303c37a02e64c64f555f31f5b31a7636b5"
      },
      {
        category: "LLM 推理服务",
        level: "OCT 19 MAIN BRANCH · Triton MLA",
        title: "vLLM：修复解码偏移溢出，并把 logits workspace 纳入显存预估",
        summary: "Triton decode 的批次偏移改用 int64，避免大批次与 split-KV 工作区越过 int32 范围；MLA 在 memory profiling 阶段预留持久工作区，避免 KV cache 挤占后续所需内存。新增超 2³¹ 偏移场景的测试，对照整批末项与单项输出。",
        why: "适合管理支持该后端的 GPU 推理服务，尤其长 max_model_len、大 decode batch 或并行配置。Apache-2.0，通常 Linux/CUDA 或 ROCm；显存取决于模型/量化、batch、KV 与工作区，不是 CPU/手机部署更新。没有新的吞吐倍率或所有后端均受影响的结论。固定提交与实际 attention backend，重新做容量/图捕获/输出一致性回归；正确计入工作区后可分配 KV 容量可能变化，不能只复用旧的并发上限。",
        meta: ["Apache-2.0", "Triton MLA · int64 / workspace", "主分支 · GPU 服务容量需重测"],
        source: "https://github.com/vllm-project/vllm/commit/689effee6d07bfeb0afe42d44046141657238c23"
      },
      {
        category: "Agent 运行时 / 权限",
        level: "OCT 19 RELEASE · v2026.10.5",
        title: "OpenClaw：稳定版强调重启恢复，以及改写工具参数后的二次审批",
        summary: "北京时间 05:47 发布，版本号中的 10.5 不是发布日期。相较已有日报的编码工具与凭据 UI，新增关注点是更新中断/租约恢复、Gateway 重启后续跑和已批准工具参数被普通 hook 改写时重新申请审批；否则阻止调用。",
        why: "适合在个人电脑运行常驻 Agent 的用户。MIT，官方安装器支持 macOS/Linux/Windows；自管运行时要求 Node 24.16+ 或 26.1+，推荐 26。Gateway 不等于内置本地模型，云模型/渠道仍有费用与数据流出，本地权重另计 RAM/VRAM。主会话工具默认可在宿主运行，需主动配置 sandbox，不能把升级当成沙箱隔离或 exactly-once 保证。先备份状态，在测试工作区演练重启、插件参数改写、拒绝/超时及重复外部动作，核对执行记录后再接敏感权限。",
        meta: ["MIT · 正式 Release", "跨平台 Gateway · 模型成本另计", "恢复 / 审批增强 ≠ 默认沙箱"],
        source: "https://github.com/openclaw/openclaw/releases/tag/v2026.10.5"
      }
    ],
    deepDive: {
      title: "Agent 审批应绑定最终参数，而不是只批准工具名字",
      text: "事实：OpenClaw 的策略文档把审批绑定到参数快照；普通 hook 若改变 trusted policy 已获批的参数，必须带最终参数重新请求批准，否则阻止。较低优先级 hook 仍可否决；原生工具中继的契约可能更窄，不能照搬参数改写。after_tool_call 只是执行后观测，既不能撤回执行，也不能由没有 error 字段推断成功。判断：这比‘全自动演示’更值得精读，因为插件链里批准 A、最后执行 B 是容易忽略的权限漏洞。局限：它不是操作系统沙箱、外部副作用回滚或恰好执行一次。下一步：在无真实凭据的临时工作区，测试原参通过、改参无审批被拦、改参另行批准、后续否决和超时；同时核对审计记录中的最终参数与实际动作。",
      source: "https://github.com/openclaw/openclaw/blob/v2026.10.5/docs/plugins/hooks/tool-policy.md"
    },
    noise: "判断：‘低比特文件更小’与‘恢复后能继续’都容易被包装成全链路可靠。前者还取决于算子、KV 和阶段工作区，后者不保证外部写入不会重复；应测实际设备与失败路径。今天也排除了搜索结果看似新鲜、但官方发布时间已在窗口外的 Rulesync 版本，不能把网页抓取时间当技术发布日期。本期未筛到足够强的独立超分或新增实体机器人验证，保留这些历史技术分类，但不凑项目。"
  },
  {
    date: "2026-10-18",
    label: "OCT 18",
    pulse: "今天最值得动手的是运行与正确性边界：FLUX.2 的 VAE 分块降低阶段性内存压力，Hexagon 补齐低比特算子，RTL 数组方向与 Python 依赖条件表达式也有实质修复。本期于 10 月 18 日整理，研究截止北京时间 23:05；GitHub Daily / All languages 仅作候选入口，最终按一手提交筛选。今天收录 5 条，不重复昨天的模型发布，也不为具身或超分凑数。",
    metrics: [
      { value: "5", label: "今日信号" },
      { value: "5", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成 / 工作流",
        level: "OCT 18 MAIN BRANCH · 分块 VAE",
        title: "InvokeAI：FLUX.2 编码与解码加入分块及 OOM 重试",
        summary: "新增 VAE Tiled/Tile Size 控制、分块工作内存估算与一次 OOM 后的分块重试；自动预分块还照顾 Windows 可能分页而非直接 OOM 的情形。与前期 InvokeAI 7 alpha 和昨日 FLUX.3 扩写块不同，这是 FLUX.2 编解码阶段的具体内存路径。",
        why: "适合本地大图或编辑时 VAE 成为瓶颈的用户。Apache-2.0 代码、模型权重另核对；CUDA/MPS/CPU 路径视配置而定，显存和 RAM 仍依赖分辨率、tile 与驻留组件，未给统一最低配置。分块并非 pixel-identical，差异可能遍布图像而不只在接缝；固定 seed 对比纹理、色调、边缘和峰值内存，不能把它写成主模型也被量化或任意小显存都能跑。当前为主分支。",
        meta: ["Apache-2.0（代码）", "FLUX.2 VAE · 分块 / 工作内存", "主分支 · 非逐像素等价"],
        source: "https://github.com/invoke-ai/InvokeAI/commit/38884a8527b6fbd0b4c8104609f0906b27f2d261"
      },
      {
        category: "端侧 LLM 推理",
        level: "OCT 18 MAIN BRANCH · Hexagon",
        title: "llama.cpp：Hexagon 扩展 Q1_0 / Q2_0 与 Hadamard 算子",
        summary: "在同日加入 Q1_0/Q2_0 基础支持后，进一步补齐 flat/tiled GET_ROWS 与 Hadamard MUL_MAT 路径，并调整相关量化内核。相较 10 月 12 日 IM2COL_3D 和 16 日 OCR 预处理，这是新的 Snapdragon 低比特算子覆盖。",
        why: "适合维护支持 Hexagon HTP 的 Snapdragon Android/Linux 端侧部署。MIT；需兼容设备、运行库及源码构建，内存/量化质量取决于具体模型，未公布跨芯片 tokens/s、功耗或最低 RAM。算子支持不是所有 1/2-bit 模型均能完整卸载的证明；固定 GGUF 和芯片，检查实际后端与 CPU 回退，测输出质量、温度和持续吞吐后再评估。",
        meta: ["MIT", "Snapdragon Hexagon HTP · Q1_0 / Q2_0", "主分支 · 无统一速度/能耗结论"],
        source: "https://github.com/ggml-org/llama.cpp/commit/848bbda9041decd87904f7eb5a2990863ecce03b"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 18 MAIN BRANCH · 数组方向",
        title: "Verilator：修复相反索引方向的 unpacked 数组赋值与比较",
        summary: "处理 unpacked array 在升序/降序范围之间赋值、比较时的映射，修改常量求值、实例连接与生成 C++ 的相关路径。提交只称部分解决关联问题；与 16 日层级 inout 接口、15 日线程调度是不同进展。",
        why: "适合混用 [0:N] / [N:0] 数组的参数化 RTL 和 testbench 作者。LGPL-3.0 或 Artistic-2.0，Linux/WSL 普通 CPU 源码构建，无 GPU 门槛。先用带明显元素标签的最小例子，比较赋值、相等判断及端口连接，再跑原有回归；不要将索引方向修复扩大成所有数组语义均已完整。未涉及器件支持、综合资源或板上 Fmax。",
        meta: ["LGPL-3.0 / Artistic-2.0", "unpacked array · 方向映射", "主分支 · 仿真正确性"],
        source: "https://github.com/verilator/verilator/commit/4e971401ea56a9fbe10a95eac09f3db9c1a0d695"
      },
      {
        category: "Python 工具链",
        level: "OCT 18 MAIN BRANCH · 解析器算法",
        title: "uv：处理 extras 与可达性时直接操作条件决策图",
        summary: "环境 marker 原本虽以决策图存储，部分运算仍先展开成 DNF，紧凑表达式可能膨胀成指数级子句。新实现直接在图上替换 extra 条件、检查 Python/平台可达性并复用共享节点；渲染输出时仍需要 DNF。",
        why: "适合维护复杂跨平台依赖、可选 GPU extras 与大型 lockfile 的团队，也值得作为系统算法源码精读。Apache-2.0/MIT、跨平台 CPU 工具；此处没有给出某个真实项目的 RAM 或耗时降幅，不能承诺所有安装更快。固定同一 lock/导出条件，检查导出语义、解析时间与内存，再升级共享 CI。它不同于 0.13.1 的卸载/并发修复，尚未据此确认新的稳定版已发布。",
        meta: ["Apache-2.0 / MIT", "决策图 / DNF · extras / markers", "主分支 · 无统一性能倍率"],
        source: "https://github.com/astral-sh/uv/commit/8f8d72eac1349f79d750f9a75690fd8edeab6141"
      },
      {
        category: "开发环境",
        level: "OCT 18 MAIN BRANCH · 只读诊断",
        title: "mise：config explain 按行解释配置，指出不生效的键",
        summary: "新增 mise config explain [KEY]，展示配置键、行号、schema 说明及未知/弃用提示，支持 JSON 和指定文件；即使 mise 拒绝加载配置，也能将其作为普通 TOML 读取。与 16 日的元数据缓存和远程模板 trust 修复不同。",
        why: "适合 CI、跨平台环境及让编码 Agent 修改 mise.toml 的用户。MIT、普通 CPU，无显存要求，源码构建版本才包含该主分支功能。它是只读解释器，不会运行修复或证明任务脚本安全；目前也不解释多层配置最终由哪个值胜出。先在临时目录演练拼错键、带点任务名、弃用项和 JSON 输出，再接入自动化检查。",
        meta: ["MIT", "config explain · 只读 / JSON", "主分支 · 不解释跨文件覆盖胜者"],
        source: "https://github.com/jdx/mise/commit/08e16b2718ad5f3888c6c3df139fac1954bf93a0"
      }
    ],
    deepDive: {
      title: "分块 VAE：为什么省下显存，却不能要求相同 seed 完全同图",
      text: "事实：InvokeAI 的新路径只针对 FLUX.2 编码/解码，按 tile 估算工作内存，必要时提前分块或 OOM 后重试。VAE 的归一化和注意力会看到不同范围，因此 tiled 与整图单次运行并不逐像素等价，差异不局限于拼接处。判断：长期有价值的是把模型驻留、阶段性激活与回退策略分别测量，而不是只看模型文件大小。局限：分块可能以速度和细节一致性为代价，也不解决整个扩散主干的内存门槛。下一步：用同一 checkpoint、seed、分辨率与输入图，比较未分块/不同 tile 的峰值 VRAM、系统 RAM、编码/解码耗时及全图差异；同时记录自动预分块或重试是否实际发生，避免把 Windows 分页变慢误判成算法慢。",
      source: "https://github.com/invoke-ai/InvokeAI/commit/38884a8527b6fbd0b4c8104609f0906b27f2d261"
    },
    noise: "判断：版本号、提交标题和演示都不是完成度证据。今天看到 chaiNNer 主分支将版本改为 0.26.0，但公开 Release 列表仍未提供对应发行，因此不把它包装成已发布稳定版；同理，端侧低比特内核合入不等于所有模型都更快。今天没有足够强的新增实体机器人或独立超分发布，就不重复昨日项目凑数。"
  },
  {
    date: "2026-10-17",
    label: "OCT 17",
    pulse: "补报：图像与机器人模型的开放程度需要逐项核对——MOSS-Image 提供 Base/SFT 与布局控制，REKI 把近期记忆压进动作专家；同一窗口还有接触观测跨 episode 污染与舵机总线边界修复。本期在 10 月 18 日补写，内容仅取北京时间 10 月 17 日结束前已存在的代码/公告；近期非当日发布均另作标注。无法完整还原 17 日 Trending 快照，不声称这是当日热度排名。",
    metrics: [
      { value: "7", label: "今日信号" },
      { value: "7", label: "本地可部署" },
      { value: "3", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成",
        level: "OCT 16 发布 · 非当日发布",
        title: "MOSS-Image：5B DiT 的 Base/SFT、文字渲染与 JSON 布局控制",
        summary: "OpenMOSS 公开模型与推理代码，主打较长提示词、图中文字及结构化布局。Base 用于适配研究，SFT 用于经过后训练的生成；默认是 50 步 flow-matching Euler，并非宣传帖里所有第三方少步蒸馏版本的同一基线。",
        why: "适合本地海报、中文文字和空间布局实验。代码与官方权重为 Apache-2.0；Python/PyTorch、Gradio/ComfyUI 入口已给出，文本编码与 VAE 的成本仍需计入。官方提供 GPU 常驻、组件搬移和 sequential 三种模式，但未给适用于所有 checkpoint/分辨率的最低显存表。先固定 SFT 与官方采样参数，对比文字错误率、布局偏差和 RAM/VRAM；低显存模式以速度换空间，不能只按 5B 主干估计整栈。",
        meta: ["Apache-2.0（官方代码/权重）", "5B 主干 · 50 步默认采样", "布局 / 文字 · 显存下限未统一给出"],
        source: "https://github.com/OpenMOSS/MOSS-Image/tree/c1355e6b1986dfe8fba3c0455783a05899212342"
      },
      {
        category: "具身智能",
        level: "OCT 16 首发代码 · 非当日发布",
        title: "REKI：2.4B VLA 用缓存 register tokens 保存近期观测",
        summary: "Kyutai 以 Qwen3.5-2B VLM 加 flow-matching 动作专家，每帧保存 32 个 register tokens；公开预训练/基准微调权重、推理和评测入口。作者报告 H100、两路 256² 图像、编译后预测动作 chunk 为 21.8ms，不能转成任意消费卡或机器人闭环帧率。",
        why: "适合可复现 VLA 与短期记忆研究。Linux x86-64、CUDA 12、pixi/Python 3.12；最低显存及机器人完整成本未给出。代码 MIT，部分第三方 Apache-2.0；权重 CC-BY-NC-SA 4.0，数据各自保留许可。Panda/ALOHA/PandaOmron 权重对应仿真基准，另有实机服务接口；项目报告实机实验不等于所有平台可直接部署。首发 README 明确预训练代码/数据流水线仍待后续发布，不能写成完整预训练已可重跑；先做离线回放与仿真，再按自有机器人数据微调。",
        meta: ["代码 MIT / 部分 Apache-2.0", "权重 CC-BY-NC-SA 4.0", "H100 性能报告 · 非通用实机保证"],
        source: "https://github.com/kyutai-labs/reki/tree/12dd1e24acfc01c817e03ecd43f37cc5f9f6b2d1"
      },
      {
        category: "扩散模型工具链",
        level: "OCT 17 MAIN BRANCH · 相较 10/16 新增",
        title: "Diffusers：FLUX.3 原生扩写块与模块化加载说明补齐",
        summary: "16 日新增 prompt_upsampler block，17 日文档明确 FLUX.3 是 ModularPipeline、组件延迟加载、可返回扩写后的 prompt，并说明拆出扩写器及 callbacks 的方法。相较上一期“需另行扩写”，这个新版本已将扩写作为管线前置步骤，旧版行为不能混用。",
        why: "适合做可编辑 prompt、分阶段部署与生成审计的工作流作者。Apache-2.0 代码，FLUX 图像权重许可另核对；Python/PyTorch，额外扩写模型也占显存/内存。固定提交后用 load_components 及文档所示输出方式，不照搬 DiffusionPipeline 的加载/回调假设；可拆出扩写块单独服务，但没有新增消费卡速度或内存基准。保存实际扩写文本，才便于比较不同版本。",
        meta: ["Apache-2.0（代码）", "ModularPipeline · 延迟组件加载", "主分支 · 扩写行为相较前期有变"],
        source: "https://github.com/huggingface/diffusers/commit/b800f828f3951c4d206e154411bcbfa693cd322e"
      },
      {
        category: "机器人仿真",
        level: "OCT 17 MAIN BRANCH · reset 正确性",
        title: "Isaac Lab：reset 后不再读回上个 episode 的接触缓冲",
        summary: "修复 OVPhysX 与 PhysX 的 ContactSensor：部分环境 reset 后、下一物理步前读 observation，旧力、摩擦历史或接触点会重新灌入。新内核按 reset 时间戳跳过，保持零力/历史及 NaN 接触点直到传感器下次更新。",
        why: "适合并行 RL、接触奖励和重置观测研究。BSD-3-Clause；维护者在 Isaac Sim 6.1、OVPhysX 0.6.4 的 CPU/CUDA 与聚焦测试中复现并验证，不是实体传感器测试。所需 GPU/RAM 随仿真规模变化，无新最低显存结论；重跑局部 reset、CUDA graph 回放和 reward 检查，不能把重置后的 NaN 接触点当成故障数据擅自填入旧值。与此前 MicroDuck 建模不同，这是跨 episode 状态隔离。",
        meta: ["BSD-3-Clause", "PhysX / OVPhysX · 仿真传感器", "reset 后观测 · 有聚焦回归"],
        source: "https://github.com/isaac-sim/IsaacLab/commit/0ab97e9c811a7ddabc4fcc08e32ca48b5722d15a"
      },
      {
        category: "机器人 / 舵机总线",
        level: "OCT 16 MAIN BRANCH · 非当日发布",
        title: "LeRobot：Feetech 与 Dynamixel 统一到 rustypot 串口总线",
        summary: "SerialMotorsBus 以 Rust 协议实现替代厂商 Python SDK 表面，事务期间释放 GIL；按精确舵机型号处理寄存器、符号、字节序、校准及扭矩。旧家族类保留为弃用别名，新增 serial-motors extra，依赖 rustypot≥1.13.1。",
        why: "适合 SO-100/101、LeKiwi 等串口执行器链路维护者。Apache-2.0 代码，需电脑/板端、兼容串口适配器及实际舵机；无新 GPU 要求或 BOM 成本数据。提交覆盖模型识别、失联时释放端口、尽量关闭各电机扭矩等边界，但内存总线 mock 不能代替实机时延与安全验收。保留旧环境和校准备份，先无负载验证型号、方向、断开与失败清理，再迁移整机；没有通用加速倍率。",
        meta: ["Apache-2.0", "rustypot · serial-motors", "硬件相关 · 先台架校准/故障验证"],
        source: "https://github.com/huggingface/lerobot/commit/146d8474932c8b566717eb2738ba459337ab71c4"
      },
      {
        category: "FPGA / 综合优化",
        level: "OCT 16 MAIN BRANCH · 非当日发布",
        title: "Yosys：FSM 提取保留 next-state 含 undef 的转移",
        summary: "更新 fsm_extract，对部分位未定义的 next state 按已定义位匹配可选状态，避免直接丢失相关转移，并加入 fsm-undef-next 回归。与 14 日 mcm 常数乘法优化不同，这是状态机提取语义的正确性更新。",
        why: "适合使用 don't-care、状态机自动提取与等价检查的 RTL 团队。ISC、普通 CPU，Linux/WSL 源码构建；提交未提供具体器件资源/时序改进，也不保证保留所有 X 的仿真意义。固定约束，对比提取前后可达性、状态转移和形式等价，重点检查综合 don't-care 与仿真未知值的区别；不应仅因综合通过就认定原 RTL 定义完整。",
        meta: ["ISC", "FSM / undef · 提取正确性", "主分支 · 无器件 PPA 结论"],
        source: "https://github.com/YosysHQ/yosys/commit/8996248bafdd511f353b752be8e94e1f1c36e713"
      },
      {
        category: "编码 Agent",
        level: "OCT 17 MAIN BRANCH · 凭据交互",
        title: "OpenHands：请求凭据改为聊天中的专用卡片",
        summary: "request_secret 从全局弹窗转为对话内的专用输入卡，并补充组件/服务测试。完成结果返回给 Agent 的消息仅携带是否可用等状态，而非凭据值；这是凭据请求流程更新，不是把密钥直接贴进普通 prompt。",
        why: "适合部署编码 Agent、需按需提供第三方凭据的团队。MIT，本地应用/后端按现有环境运行，无新增 GPU 门槛，模型 API 成本另算。专用卡片不等于凭据不会被工具或环境访问；仍需审计存储、注入范围、日志、取消/重复完成及请求归属，并用假 token 验证。与 13 日正式版的 ACP/Docker 进展不同，本项仍为主分支，不宣称已有完整安全认证。",
        meta: ["MIT", "request_secret · 状态回传", "主分支 · 最小权限仍需单独配置"],
        source: "https://github.com/OpenHands/OpenHands/commit/045290739f0af2ae4cc89d2a209c6bd930bb81ee"
      }
    ],
    deepDive: {
      title: "REKI 的记忆在动作专家里：小缓存不等于低复现成本",
      text: "事实：每帧的少量 register tokens 留在动作专家缓存，后续动作可读取近期上下文，而不是反复把所有历史图像送入 VLM；首发 API 要求每个 episode 开始调用 reset 清缓存。作者在 H100 编译路径报告较低额外读取开销，属于特定测试而非任意硬件保证。判断：长期价值在于可以消融“历史是否真的帮助减少动作振荡”，而不只比较模型参数。局限：公开数据来源、开放权重和完整可重跑预训练是三件事，首发快照仍留有后续代码发布项，权重还有非商业许可限制。下一步先固定初始 commit 和基准权重，验证相机方向、state/action 顺序与归一化；比较有/无记忆、跨 episode 清缓存及长任务失败模式，再考虑自有硬件微调，不能将仿真成功率直接套到实机。",
      source: "https://github.com/kyutai-labs/reki/tree/12dd1e24acfc01c817e03ecd43f37cc5f9f6b2d1"
    },
    noise: "判断：“5B 图像模型”“2.4B VLA”容易让人低估整栈成本。MOSS 仍有文本编码器、VAE 与采样成本，第三方少步蒸馏不能混作官方 50 步基线；REKI 的 H100 动作 chunk 延迟不是从相机到实体执行器的闭环延迟。补报宁可标注非当日发布与未开放项，也不把演示、仿真分数或网页抓取时间写成当日实机突破。"
  },
  {
    date: "2026-10-16",
    label: "OCT 16",
    pulse: "今天最强的信号是可控图像生成进一步开放：FLUX 3 Image Klein 释出权重并进入本地工具链，但参数规模、整管线显存和消费级量化工作流必须分开看。其他值得动手的变化落在视觉模型并行、机器人规划边界、RTL 层级仿真及开发环境信任。已浏览 GitHub Daily / All languages，并核对过去 24–72 小时一手资料；日期按北京时间，研究窗口截至 10 月 16 日 10:14。7 项本地可部署包含研究级组件，不代表全部适合普通电脑。",
    metrics: [
      { value: "7", label: "今日信号" },
      { value: "7", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像生成",
        level: "10/15 权重 · 10/16 工具接入",
        title: "FLUX 3 Image Klein：5.6B 开放权重，文生图与多参考编辑统一",
        summary: "权重于 10 月 15 日发布（非今日发布），支持最多 10 张参考图与框选布局；5.6B 仅指图像 Transformer。蒸馏版默认 16 步，Base 面向训练。今日 Diffusers 接入和 ComfyUI 0.41.0 发行让本地尝试有了明确入口，不是昨日 LightVAE 新闻的重复。",
        why: "适合本地生图、编辑与 LoRA 研究。维护者称 ComfyUI int8 可在 RTX 3070 级 8GB 显卡运行；这不能套用到参考代码：后者在 B200、1024²、关闭扩写器时测得 BF16/FP8/NVFP4 峰值 31/26/25GB，NVFP4 还要求 Blackwell。完整流程另有文本编码器与提示词扩写器，RAM/磁盘仍要实测。参考代码 Apache-2.0，图像权重为自定义 FLUX Kommunity License，商用与衍生用途须逐项核对，不是无条件 Apache/MIT 权重。",
        meta: ["ComfyUI int8：官方称 8GB 可运行", "参考代码显存数据 ≠ ComfyUI 门槛", "代码/模型许可分开核对"],
        source: "https://huggingface.co/black-forest-labs/flux-3-image-klein"
      },
      {
        category: "图像生成 / 多设备推理",
        level: "OCT 15 MAIN BRANCH · 非今日发布",
        title: "Diffusers：Qwen-Image-2.1 加入张量并行计划",
        summary: "对注意力与 SwiGLU 的线性投影配置列/行分片，修正分片后仍按完整 head 数 reshape 的问题，并加入 Neuron 张量并行测试；输入投影、共享 modulation 与输出层仍复制。与前期 FLUX2 缓存兼容不同，这是多设备分担模型计算。",
        why: "适合已有多加速器工作站或 Neuron 环境的部署开发者，不是单张消费级显卡直接减半显存的开关。Python/PyTorch 分布式，代码 Apache-2.0、模型许可另查；此次没有跨硬件吞吐、通信开销或最低显存表。固定提交与模型，先核对分片/复制层、数值一致性及每设备峰值，再比较端到端延迟；不要把“有 TP 测试”写成所有 GPU/TPU 后端均已验证。",
        meta: ["Apache-2.0（代码）", "Tensor Parallel · Neuron 测试", "主分支 · 无通用加速倍率"],
        source: "https://github.com/huggingface/diffusers/commit/ee849197ce45360e4f13b5c6bf6bf2e8e0b0ee78"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 16 MAIN BRANCH · 层级边界",
        title: "Verilator：层级仿真边界支持 inout 端口",
        summary: "在层级与库封装路径处理双向端口：内部以输入、输出值和逐位 enable 表示，SystemVerilog wrapper 按选项保留 inout，或暴露拆分端口。新增层级/三态/库封装回归；昨日是少量激活任务的线程调度，本次是接口兼容能力。",
        why: "适合拆分大型 RTL、封装受保护库及含双向总线的 testbench 团队。Linux/WSL CPU 源码构建，LGPL-3.0 或 Artistic-2.0。仍有 unpacked-array inout 的报错回归，不能推断任意三态设计已完整支持。先比较驱动、enable、释放与冲突场景，并交叉核对另一仿真器；没有新增 FPGA 器件支持、LUT/DSP 或布局布线时序数据。",
        meta: ["LGPL-3.0 / Artistic-2.0", "hierarchical / lib wrapper / inout", "仿真兼容 ≠ 器件实现结果"],
        source: "https://github.com/verilator/verilator/commit/1272f73557191b4028d24cfa4c5667e92087a8d2"
      },
      {
        category: "具身智能",
        level: "OCT 15 MAIN BRANCH · 非今日发布",
        title: "LeRobot：外部 VLM 可做问答与子任务规划，保留人工接管边界",
        summary: "新增 external planner，为 /vqa 和 /autosteer 提供兼容 API 的视觉语言规划器；可显式限制子任务词表、保留观测/命令历史，并丢弃人工 /subtask 之后迟到的旧回复。这不同于前期 G1 推理传输与昨日 MicroDuck 舵机仿真。",
        why: "适合已有相机、机器人策略与 rollout 的开发者，可另起本地 Qwen3-VL-8B 服务，或选择托管 VLM；前者的 GPU/量化显存、后者费用与图像外发要另评估。Apache-2.0 代码，策略权重/数据许可分别核对。文档仅称本地 inference 路径经过硬件尝试，未给机器人型号、成本、任务成功率或远程路径实机验证。规划接收不等于动作成功，首次 autosteer 等待、动作队列失效与 hold 支持都必须验证；词表读取失败还可能退回自由文本，远程策略应显式提供词表。",
        meta: ["Apache-2.0（代码）", "相机 + VLA + 独立 VLM", "局部硬件尝试 · 无通用实机保证"],
        source: "https://github.com/huggingface/lerobot/commit/297774fca4e3ad0aa34e7425fbf937111637e77b"
      },
      {
        category: "本地 OCR",
        level: "OCT 16 MAIN BRANCH · 图像预处理",
        title: "llama.cpp：LightOnOCR 不再把小图长边强行放大到 1540",
        summary: "将最长边设为上限，而不是固定目标；小图按原尺寸附近处理，仍按视觉 patch/merge 要求对齐。新增测试包括 448×280 保持不变、463×300 对齐到 476×308、2000×1000 缩到 1540×784。与昨日 CPU SET_ROWS 缓冲修复不同。",
        why: "适合本地文档 OCR 和视觉输入管线作者，可避免无必要的输入放大；这不是超分模型，也未证明 OCR 准确率统一提升。MIT、CPU/GPU 后端视构建而定；模型、视觉投影器、量化和输入尺寸共同决定内存，提交未给硬件下限。固定 GGUF/投影器与测试文档，对比预处理尺寸、文本误差、布局和延迟，尤其覆盖小截图、细字与大页面。",
        meta: ["MIT", "LightOnOCR / mtmd · patch 对齐", "主分支 · 无统一精度/性能结论"],
        source: "https://github.com/ggml-org/llama.cpp/commit/2f729cfa4ca6f55b8bacf67bb2ba92cb9548e291"
      },
      {
        category: "开发环境",
        level: "OCT 15 RELEASE · 非今日发布",
        title: "mise v2026.10.11：减少 GitHub API 请求，并堵上远程任务模板信任缺口",
        summary: "公开版本元数据改从 mise-versions 获取并复用缓存；维护者单台 Linux x64 冷缓存测试中，Python 版本列表查询由 961ms 降至 93ms，不能推广为所有安装快十倍。远程任务头中带模板表达式时，现在先要求信任引用它的配置。",
        why: "适合管理 Python/Node/CLI 版本、CI 和 Agent 工作区的人。MIT，普通 CPU、Linux/macOS/Windows 各自验证；无需 GPU。此前仅列出/查看/验证远程任务，也可能渲染带 exec 的头模板；今天新增的是这个具体信任修复，区别于前期全局自更新。升级后核对 metadata 来源、离线缓存、私有仓库与 paranoid 模式例外，固定 lockfile；不要为了自动化方便跳过 trust，也不要把版本缓存当安装产物验证。",
        meta: ["MIT", "正式版 · 版本管理 / 任务信任", "速度数字仅限给定机器和命令"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.10.11"
      },
      {
        category: "Python 静态分析",
        level: "OCT 15 RELEASE · 非今日发布",
        title: "Ruff 0.17.1：修正无效 comprehension 建议与可变容器判定",
        summary: "修复 PERF401/PERF403 给出无效推导式建议、多个前导注释下的 dedent，以及部分类型注解误报；更多 collections/weakref 容器被视为可变。相较 10 月 10 日的 0.17.0 默认规则与签名变化，这是新的分析正确性补丁。",
        why: "适合让 CI 或编码 Agent 依据 lint 建议改代码的人；不是普通依赖刷新。Apache-2.0/MIT，跨平台 CPU 预编译包，无显存门槛，内存随代码规模变化。建议先固定版本、只跑检查并审阅差异，再在测试分支启用修复；规则无误报不等于重写保留所有业务语义，仍需单元测试。",
        meta: ["Apache-2.0 / MIT", "正式版 · CPU 跨平台", "PERF401 / PERF403 · 修复前审阅"],
        source: "https://github.com/astral-sh/ruff/releases/tag/0.17.1"
      }
    ],
    deepDive: {
      title: "FLUX 3 Klein：真正的本地工作流是“扩写—编码—生成—解码”",
      text: "事实：模型接收完整场景描述，官方要求先用提示词扩写器（其自带版本或其他合适 LLM）组织短请求与参考图；Diffusers 不自动做这一步。ComfyUI 模型卡也提醒：编辑模板没有扩写分支，须先获得描述再送入。判断：长期价值不只是新权重，而是文生图、多参考和布局控制的统一接口；可复现评测必须保存扩写后的 prompt、seed、精度及工作流。局限：框坐标是布局引导而非硬 mask，编辑仍可能改变目标区域外内容。建议先用固定小样本比较原短句与固定扩写描述，独立测扩写、加载、采样耗时及 RAM/VRAM；8GB 路线从官方 ComfyUI int8 模板起步，不把参考代码的 FP8/NVFP4 当同一方案，也不要只按单个权重文件大小购置硬件。",
      source: "https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy"
    },
    noise: "判断：“开放权重 + 更小参数量”容易被过度解读为免费、低门槛且各平台同速。FLUX 3 的图像主干、文本编码与扩写器是不同成本项，参考代码和 ComfyUI 的内存路径也不同；厂商演示、API 延迟和消费级离线端到端延迟不能混比。今天未找到足够强、已核验的独立超分新发布，保留昨日工具而不重复凑数；机器人规划器能给出指令也不等于策略已成功完成。"
  },
  {
    date: "2026-10-15",
    label: "OCT 15",
    pulse: "今天的有效信号集中在运行边界：长视频超分用磁盘分段控制内存，视频 VAE 支持拆分加载，Agent 审批细化到单次工具调用，机器人仿真开始认真建模舵机延迟与齿隙。已浏览 GitHub Daily / All languages，再回到一手仓库核验；日期按北京时间，研究窗口截至 10 月 15 日 10:51。7 项“本地可部署”包含源码与研究组件，不代表普通电脑都能即装即用。",
    metrics: [
      { value: "7", label: "今日信号" },
      { value: "7", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "超分辨率",
        level: "OCT 12 近期新项目 · 非今日发布",
        title: "RTX VSR Long Video：为 ComfyUI 长视频做磁盘分段超分",
        summary: "这是 NVIDIA RTX VSR 的独立集成，不是新扩散模型：逐帧/分块处理，将临时编码段写入磁盘，再拼接输出并保留音轨，避免把整条未压缩视频留在 RAM；提供放大、去噪、去模糊和视频预览。仓库最近提交为 10 月 12 日，处于本期 72 小时研究窗口内。",
        why: "适合已有 RTX 和 ComfyUI、处理长片时被内存卡住的人。代码 Apache-2.0，NVIDIA SDK/模型另有条款；需要兼容 CUDA/PyTorch、nvidia-vfx≥0.2 和 FFmpeg，NVENC 还要求对应编码器。当前仅 SDR 8-bit；H.264 NVENC 每轴上限 4096，更大输出需另选编码路径。未给显存/RAM 下限或对照基准，先用短片核对音画、帧率、细节和临时磁盘峰值；低 RAM 是架构目标，不是零内存或零磁盘成本。",
        meta: ["Apache-2.0（集成代码）", "NVIDIA RTX · SDK / FFmpeg", "SDR 8-bit · 无统一硬件基准"],
        source: "https://github.com/tritant/ComfyUI_NVIDIA_RTX_VSR_Long_Video/tree/b20565455379998d3a22c07eb959d0a235034bde"
      },
      {
        category: "图像生成 / 工作流",
        level: "OCT 15 MAIN BRANCH · 视频 VAE",
        title: "ComfyUI：接入 MiniMax-H3 LightVAE，允许独立编码器/解码器",
        summary: "加载器识别 LightVAE Lite 中剪枝后只保留 shortcut 的编码模块，并按权重是否包含对应部分构建 encoder 或 decoder。相较昨日 0.40.0 正式版，这是今天主分支新增的 VAE 兼容能力，不应混写成该稳定版自带。",
        why: "适合拆分视频编码、采样、解码或评估轻量 VAE 的工作流作者。GPL-3.0 代码，VAE 权重许可另查；Python/PyTorch，GPU 与显存需求取决于权重精度、分辨率和时序长度。此次没有端到端速度、质量或显存节省数字，“Light”不等于已证明低显存。固定提交和原始 VAE，对照时间一致性、重建误差、峰值内存及独立加载行为。",
        meta: ["GPL-3.0（代码）", "MiniMax-H3 · encoder / decoder 拆分", "主分支 · 无通用提速结论"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/1d9cec9e8cab32f26360254031c967d25e3fbc6b"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 15 MAIN BRANCH · 多线程仿真",
        title: "Verilator：少量激活逻辑直接串行执行，避免唤醒工作线程",
        summary: "为触发条件记录静态逻辑代价；当当前被触发的宏任务总代价很低时，在调用线程按拓扑顺序执行，仅处理激活任务，不唤醒其余线程。它不同于前期交叉覆盖支持和昨日 GHDL TEXTIO 修复，是运行时调度优化。",
        why: "适合多线程 RTL 仿真中大量周期只有少量逻辑活动的团队。Linux/WSL CPU 源码构建，LGPL-3.0 或 Artistic-2.0；没有指定器件、综合资源或板上时序变化，也未给通用仿真加速倍率。固定设计、线程数、激励和 tracing 配置做墙钟时间/正确性对照；profiling 模式禁用此串行捷径，测试也可用 VL_THREADS_SERIAL_COST=0 强制比较并行路径。",
        meta: ["LGPL-3.0 / Artistic-2.0", "CPU · 触发代价 / 调度", "仿真性能 ≠ FPGA Fmax"],
        source: "https://github.com/verilator/verilator/commit/96ccc7f432e84badd5f74d5f3d7ed9fe924f1aa4"
      },
      {
        category: "低成本机器人 / 强化学习",
        level: "OCT 15 MAIN BRANCH · 仿真验证",
        title: "Isaac Lab：BAM 舵机模型与 MicroDuck 平地/粗糙地形任务",
        summary: "将小型智能舵机的电压、摩擦、供电下垂、指令延迟及齿隙带入 Newton/MJWarp，提供 MicroDuck 14 舵机任务。维护者在 RTX 5090、4096 环境的特定测试中，合并模型变化通知后 step 中位数由 20.8ms 降至 15.9ms；这不是所有机器人任务的加速结论。",
        why: "适合低成本双足 sim-to-real 研究，区别于昨日 G1 远程实机配方。BSD-3-Clause 代码，USD/舵机辨识数据需按各自许可与来源核对；要求 Newton+MJWarp，CPU MuJoCo/PhysX 不支持这套驱动。维护者给出记录摆运动与模型对照、仿真回放及边界测试，但没有新增 MicroDuck 实机行走成功率，也未给最低显存、完整 BOM 或新增训练权重。现有 checkpoint 能运行不等于动力学完全等价，更不等于可直接上机。",
        meta: ["BSD-3-Clause（代码）", "Newton / MJWarp · RTX 5090 验证", "仿真 / 记录轨迹对照 · 非新增实机结果"],
        source: "https://github.com/isaac-sim/IsaacLab/commit/fd87722147bc3297ae33943044b21e0bbc15b838"
      },
      {
        category: "Agent 工具审批",
        level: "OCT 15 RELEASE · LangChain 1.4.6",
        title: "LangChain：逐工具调用暂停审批，附带响应 schema",
        summary: "HumanInTheLoopMiddleware 新增可选 interrupt_mode=per_call：每个被管控的调用单独暂停，审批按 interrupt ID 回答，并在保存前校验允许的决定及 Pydantic 参数。默认仍为 batched；LangGraph 下限升至 1.2.12，异步运行要求 Python≥3.11。",
        why: "适合实现审批卡片、文件写入/外发控制的 Agent 应用。MIT，CPU 可跑编排，模型 API 成本或本地推理算力另算；它不是权限沙箱或整批事务。原始 JSON schema 工具的编辑参数未获同等校验；一次恢复多个审批若部分无效，其他工具可能已执行，重试可能重复副作用。先在假工具上验证拒绝、编辑、恢复和幂等，不要用真实删除/发送操作试错。",
        meta: ["MIT", "逐调用审批 · 可选启用", "schema 校验 ≠ 沙箱 / 事务"],
        source: "https://github.com/langchain-ai/langchain/commit/ac2f5e355e74aa3da53fcd0e7c5aec9d3ba00ccd"
      },
      {
        category: "LLM 推理服务",
        level: "OCT 15 MAIN BRANCH · 兼容性变化",
        title: "vLLM：移除 Medusa 与 MLP speculator 支持",
        summary: "主分支删除这两类推测解码模型、配置及相关测试/文档路径。重点不是新增跑分，而是已有部署可能需要迁移；与前期 Granite 接入 EAGLE3 / DFlash 是不同进展。",
        why: "适合仍在使用这两类 draft/speculator 配置或跟随 main 自动构建的服务维护者。Apache-2.0，主要面向 Linux 与支持的加速设备；显存/量化由基础模型和替代方法决定，删除本身没有吞吐收益证明。升级前检索配置及模型架构，固定可工作的旧版本做回滚基线，再评估受支持方案的输出、接受率、P99 和显存；不要把旧教程直接套到新主分支，也不要误以为现有稳定版已全部删除。",
        meta: ["Apache-2.0", "推测解码 · 移除兼容路径", "主分支 · 先审查配置再升级"],
        source: "https://github.com/vllm-project/vllm/commit/8530aed2b78a19eb00e242031c22bb78d615eea2"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 14 MAIN BRANCH · 非今日发布",
        title: "llama.cpp：修复 CPU SET_ROWS 多线程转换缓冲越界",
        summary: "SET_ROWS 原按单任务规划临时缓冲，但混合图中每个线程都可能执行并使用自己的 F16→F32 转换行，导致线程 0 以外写出工作区；提交改为按线程数规划。它不是昨天 Ollama CUDA 内核移植，也不同于前期 FA 回退修复。",
        why: "适合维护 CPU 推理、自定义 GGML 图和多线程部署的人。MIT，普通 CPU 即可复现相关路径；RAM 与量化取决于模型，补丁不代表更低内存或普遍加速。没有 CVE、利用性或影响全部模型的证据，不将其夸大为已确认远程漏洞。固定提交，用相同模型和图比较单/多线程结果，并在开发构建中配合内存检查；确认发行构建包含补丁后再推广。",
        meta: ["MIT", "CPU · F16→F32 · 工作缓冲", "正确性修复 · 非通用性能更新"],
        source: "https://github.com/ggml-org/llama.cpp/commit/5cdadfc326163ed1fa66cf609fb1761f7928900c"
      }
    ],
    deepDive: {
      title: "逐工具审批：真正难的是恢复后的副作用，而不是弹出确认框",
      text: "事实：LangChain 的 per_call 把审核对象从整轮数组改成有独立 ID 与响应 schema 的工具调用，Pydantic 工具的错误编辑可在保存前拦截；未被管控的工具仍可能立即执行。判断：这对可靠 Agent 比再多一个演示更重要，因为审批、执行和重试的边界终于可以独立测试。局限：多条审批一起恢复时，某条校验失败不保证其余工具尚未执行，整批重试可能造成重复发送或重复写入；原始 JSON schema 的编辑校验也有缺口。下一步：先用只记录日志的假工具，覆盖批准/拒绝/错误编辑/断线恢复，客户端先校验 schema，必要时逐个回答；真正有副作用的工具再加幂等键和执行审计。它仍不替代最小权限、工作区隔离、超时或回滚。",
      source: "https://github.com/langchain-ai/langchain/commit/ac2f5e355e74aa3da53fcd0e7c5aec9d3ba00ccd"
    },
    noise: "判断：把“低内存视频超分”或“轻量 VAE”读成免费画质/速度升级，可能高估进展。RTX VSR 集成的主要新意是分段 I/O 与工作流，算法与模型仍来自 NVIDIA，SDR 8-bit 和磁盘成本都要考虑；LightVAE 接入尚无统一端到端基准。机器人方向同理：更细的舵机建模与仿真回放不是新增实机行走证明。本期不把旧论文、演示或 README 最近被抓取的时间当成今天发布。"
  },
  {
    date: "2026-10-14",
    label: "OCT 14",
    pulse: "今天更值得动手的不是新模型榜单，而是已有工具变得更可控：FLUX2 缓存兼容、ComfyUI 正式版、常数乘法综合优化，以及机器人远程推理的等待与故障边界。已浏览 GitHub Daily / All languages，并核对过去 24–72 小时的一手更新；日期按北京时间，研究截止 10 月 14 日 21:38。8 项均可本地安装或部署组件，但包含研究级代码及需要额外机器人硬件的方案。",
    metrics: [
      { value: "8", label: "今日信号" },
      { value: "8", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "2", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "扩散模型工具链",
        level: "OCT 14 MAIN BRANCH · 缓存兼容",
        title: "Diffusers：MagCache 接入 FLUX2 / Klein，参数仍需重校准",
        summary: "注册 FLUX2 的双流/单流模块，并修复文本与图像拼接后缓存残差形状不匹配的问题；新增模型及两类管线测试。相较昨日 SANA-WM 接入，这是现有图像模型的推理缓存进展。",
        why: "适合已有 FLUX2 本地工作流的开发者。MagCache 以复用残差跳过计算换速度，可能损失质量；随包的 FLUX_MAG_RATIOS 来自 FLUX.1，不能直接当 FLUX2 参数。Python/PyTorch，代码 Apache-2.0，权重许可、显存和量化另取决于 checkpoint；此次没有消费级 GPU 加速倍率。固定模型/调度器重新校准，比较同 seed 的细节、耗时和显存；FirstBlockCache 的同类问题仍留待后续处理。",
        meta: ["Apache-2.0（代码）", "主分支 · 需模型专用校准", "无通用速度/画质保证"],
        source: "https://github.com/huggingface/diffusers/commit/7c6eb783060f82cd912fb5f51eb204810cf71f66"
      },
      {
        category: "图像生成 / 工作流",
        level: "OCT 14 RELEASE · 0.40.0",
        title: "ComfyUI 0.40.0：原生 LoRA 栈、相机信息节点与资产流程",
        summary: "正式版收录原生 LoRA stack loader、CreateCameraInfo / CameraAngle、EXR 输出预览及多项低显存修复。昨日只有 NVIDIA ARM64 便携包构建合入，今天新增的是可固定版本的正式发行；本期不重复把该打包改动作为独立新闻。",
        why: "适合日常本地生图与节点工作流作者。GPL-3.0；Windows/Linux/macOS 的 GPU 能力取决于后端，显存由模型、分辨率和 offload 决定，未给统一最低配置。建议备份环境与工作流，验证自定义节点和资产开关后再升级。Release 也包含 Partner Nodes：例如 Crystal Upscaler 是服务接入，不是附带可离线运行的超分权重；费用、数据上传和服务条款须另查。",
        meta: ["GPL-3.0", "正式版 · LoRA / 相机 / EXR", "本地节点与外部 API 须区分"],
        source: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.40.0"
      },
      {
        category: "FPGA / 综合优化",
        level: "OCT 13 RELEASE · 非今日发布",
        title: "Yosys 0.70：mcm 将常数乘法改写为共享加法图",
        summary: "新增 mcm pass，把常数乘法单元改成共享的移位、加减网络；同时加入实验性 optbarriers、flatten/prep 的 barriers 选项，并移除 read_xaiger2。对 FIR、定点 DSP 和硬件加速的数据通路设计，值得专门做一次资源对照。",
        why: "ISC 许可证，普通 CPU 上可源码构建，Linux/WSL 适合复现实验，无需 GPU。mcm 可限制加法深度及搜索预算，但发布说明没有给出特定器件的 LUT/DSP/Fmax 改善，也未证明所有综合流程自动启用它。固定器件、约束与后端，对比启用/不启用后的等价性、资源和布局布线时序；已有脚本还要检查被移除的命令。",
        meta: ["ISC", "正式版 · 常数乘法共享", "器件收益需综合与布线实测"],
        source: "https://github.com/YosysHQ/yosys/releases/tag/v0.70"
      },
      {
        category: "FPGA / VHDL",
        level: "OCT 14 MAIN BRANCH · TEXTIO 修复",
        title: "GHDL：带前导零的负整数不再被 TEXTIO 读成正数",
        summary: "INTEGER READ 改为单独记住负号，避免 -012、-00012 等输入在累积遇到零后丢失符号；仍保留负向累积以支持 integer'low。新增 VHDL 2008/2019 下两个 READ 重载、边界值与剩余文本的回归用例。",
        why: "适合从文本喂入定点测试向量的 VHDL 用户，这是会影响期望值的正确性问题。GPL-2.0，CPU 本地仿真，无 GPU 要求；当前是主分支，不代表已进入你安装的稳定包。更新时要确认使用新构建的标准库，重跑含负数和前导零的数据集。此修复与 FPGA 器件支持、综合资源及板上时序无关。",
        meta: ["GPL-2.0", "VHDL 2008 / 2019 · std.textio", "主分支 · 标准库需匹配"],
        source: "https://github.com/ghdl/ghdl/commit/1e3c5ab06c9f712a52e343c7eb935a5623d42513"
      },
      {
        category: "具身智能",
        level: "OCT 14 MAIN BRANCH · G1 远程推理",
        title: "LeRobot：G1 + SONIC 给出远程推理与动作断粮契约",
        summary: "新增 Unitree G1 的 SONIC 配方：GPU 主机运行策略服务，G1 Jetson 保留解码器及 50Hz 底层控制，交换 64 维动作 token；等待时重发完整 token，首包前使用解码器中性 token 而非全零。与昨日 Lance 数据读取优化不同，这是 rollout 部署能力。",
        why: "维护者称配方经过硬件验证，但没有新任务成功率、跨网络延迟统计或成本清单。公开代码/配置及 nepyope/sonic_walk 权重引用可查，代码 Apache-2.0，权重与数据许可另核对；需 G1、Jetson、头部 RGB 相机及 CUDA GPU 主机，未给最低显存。示例仅容许动作缓冲断粮后保持最多 1 秒，随后故障退出；原始关节/其他 locomotion 控制器仍不支持。文档禁止把 token 插值当作安全回位，不能把这套接口等同于实机安全认证。",
        meta: ["Apache-2.0（代码）", "G1 / Jetson + GPU 主机 · RGB", "维护者报告实机验证 · 非安全保证"],
        source: "https://github.com/huggingface/lerobot/commit/8ce006c20e644612b2468e93bb6ab29c7f60eb68"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 14 MAIN BRANCH · CUDA 内核移植",
        title: "Ollama：将 MLX runner 的三类 Metal 自定义内核移到 CUDA",
        summary: "mamba2_scan、depthwise_conv_silu、gated_delta 及相关变体新增 CUDA 实现，替代此前 CUDA 上的图算子回退；一致性测试扩展到 Metal 与 CUDA，bf16 允许因归约顺序出现约一个 ULP 的差异。",
        why: "适合跟踪混合架构/递归模型 NVIDIA 推理的人。MIT，CUDA GPU 与兼容构建环境；这是 runner 内核改动，不是所有模型、系统或旧版二进制都自动加速。没有通用吞吐/显存数字，量化与内存仍取决于模型。先固定 commit，对比支持算子的模型输出、长上下文状态与 prefill/decode；不要把“移植完成”写成“已经证明更快”。",
        meta: ["MIT", "MLX runner · NVIDIA CUDA", "主分支 · 有一致性测试无统一倍率"],
        source: "https://github.com/ollama/ollama/commit/63b4f61ca926d382b9010e6e15aee93449eab2ac"
      },
      {
        category: "Python 工具链",
        level: "OCT 14 RELEASE · 0.13.1",
        title: "uv 0.13.1：优先关注卸载边界与并发环境修复",
        summary: "防止工具/托管 Python 卸载误删存储目录旁的无关文件，修复半写入 lockfile 可见、真实/符号链接路径的并发操作、与 cache clean 竞态等问题。相较 10 月 10 日收录的 0.13.0 默认 Python/ARM64 变化，今天的重点是环境可靠性。",
        why: "适合多项目、CI 和 Agent 同时操作 Python 环境的人；不是普通依赖更新。Apache-2.0/MIT，Windows/Linux/macOS 有预编译 CPU 包，无 GPU 门槛；RAM 随依赖解析规模变化。建议固定 Python 与 lockfile，在临时环境验证并发 sync、卸载路径及离线缓存，再升级共享环境。wheel-variants 仍属预览，不能当成所有 GPU wheel 已自动适配。",
        meta: ["Apache-2.0 / MIT", "跨平台 CPU 工具 · 正式版", "卸载边界 / 原子写入 / 并发"],
        source: "https://github.com/astral-sh/uv/releases/tag/0.13.1"
      },
      {
        category: "异步运行时",
        level: "OCT 14 RELEASE · 1.53.3",
        title: "Tokio 1.53.3：把唤醒移到锁外，修补暂停时间与 I/O 交互",
        summary: "DuplexStream 的唤醒/销毁和关闭 semaphore 时的唤醒改到锁外；修复 current_thread 上 I/O 唤醒任务导致暂停时间自动前进。新增 AsyncFd::register 系列并弃用旧构造接口，io_uring 的失败提交生命周期修复仍标为 unstable。",
        why: "适合 Rust 服务、并发库作者与使用暂停时间的测试；这是比热度更有价值的源码精读入口。MIT、CPU 本地编译，无显存要求，平台与功能受 feature/目标系统约束。比前期 1.53.2 新增的是上述具体路径；更新后应跑关闭、取消、重入和模拟时钟测试，并审查 AsyncFd 迁移，不能据此承诺所有服务吞吐提升。",
        meta: ["MIT", "Rust · AsyncFd / semaphore / I/O", "正式版 · io_uring 部分仍 unstable"],
        source: "https://github.com/tokio-rs/tokio/releases/tag/tokio-1.53.3"
      }
    ],
    deepDive: {
      title: "Yosys mcm：把常数乘法看成可共享的数据流图",
      text: "事实：0.70 的 mcm 将常数乘法改写成共享移位/加减图，默认最大加法深度为 3，并提供最小估算收益和搜索预算选项。直观上，同一个 x 的多个常数倍可以复用中间结果，而非各自独立实现；这对 FIR 系数组尤其值得试。判断：长期价值在于把算术重构变成可复现的编译优化，而不只是手写移位技巧。局限：加法数量只是代价模型，真实器件还有 DSP 映射、扇出和布线代价，较少的算子未必带来更高 Fmax。下一步：挑一个已有定点 FIR，固定位宽、截断/溢出语义、器件和时钟，保留原流程与 mcm 对照；先做等价验证，再比较 LUT/FF/DSP、关键路径和布局布线结果，改变 depth 检查面积与时序的取舍。本期没有可核验的跨器件收益百分比，不补想象数字。",
      source: "https://github.com/YosysHQ/yosys/blob/v0.70/passes/techmap/mcm.cc"
    },
    noise: "判断：把“新增后端/缓存/节点”直接当成免费性能升级，容易高估进展。FLUX2 缓存仍需重新校准且可能影响画质，Ollama CUDA 内核移植未提供统一加速数字，ComfyUI 的 Partner 超分节点也不等于离线开源模型。今天未核验到足够强的独立离线超分新发布，不凑数；榜单项目仍需回到原仓库核对，精选列表或演示不构成可靠性背书。"
  },
  {
    date: "2026-10-13",
    label: "OCT 13",
    pulse: "今天的信号是“控制与复现”走到台前：视频生成接入相机轨迹控制，Windows ARM64 获得新的视觉工作流打包路径，机器人数据与柔性物体仿真更具体；但实验室跑通、主分支合入和消费级机器可用，仍是三件不同的事。日期按北京时间，研究截止 10 月 13 日 11:49；从 GitHub Daily / All languages 出发，以下按一手提交与 Release 筛选，而非热度排名。",
    metrics: [
      { value: "7", label: "今日信号" },
      { value: "7", label: "本地可部署" },
      { value: "2", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像 / 视频生成",
        level: "OCT 13 MAIN BRANCH · 尚未正式发布",
        title: "Diffusers：SANA-WM 相机控制图生视频管线合入",
        summary: "新增 SANA-WM 管线与 1.6B Transformer：输入图像、提示词及相机动作/内参，先用带相机条件的线性注意力生成，再交给 LTX-2 分块细化。相较昨日 Anima 模块化去噪修复，这是新的可控视频模型接入。",
        why: "适合研究视角控制与视频工作流。维护者报告 H100 80GB、CPU offload 的 81 帧端到端 smoke test；没有消费级 GPU 最低显存或统一速度/画质基准。代码 Apache-2.0，SANA-WM 与 LTX-2/Gemma 权重许可须另查；Python/PyTorch/CUDA/Triton 路径应固定提交，先跑短片并记录显存、内存与磁盘占用，不应把 1.6B 主干当成整管线大小。",
        meta: ["Apache-2.0（代码）", "H100 80GB 验证 · bf16 / CPU offload", "消费级显存下限未给出"],
        source: "https://github.com/huggingface/diffusers/commit/1628cb1c331741b64f67c97209ab49018e71ac70"
      },
      {
        category: "图像生成 / 工作流",
        level: "OCT 13 MAIN BRANCH · 打包流程新增",
        title: "ComfyUI：新增 Windows NVIDIA ARM64 便携包构建",
        summary: "发布工作流加入 ARM64 架构参数、Windows 11 ARM runner 和 NVIDIA ARM64 依赖缓存，计划打包嵌入式 Python 3.14.8，并使用 NVIDIA 提供的 PyTorch nightly 源；不是普通 x64 包换个文件名。",
        why: "适合评估 Windows ARM64 + NVIDIA 组合上的本地视觉生成。此次证据是构建流程合入，尚不能保证对应稳定成品或所有自定义节点已验证；它也不等于 Snapdragon Adreno/NPU 支持。GPL-3.0 代码，显存/内存由模型决定，未提供新平台最低配置或性能基准。先核对实际 artifact、驱动和 torch wheel，再在独立目录测试最小工作流，暂不迁移生产环境。",
        meta: ["GPL-3.0", "Windows ARM64 · NVIDIA", "PyTorch nightly · 节点兼容性待测"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/d0ef06b6f6a5a6d9c5e861a438ae2eb4acf0aaaa"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 13 PRE-RELEASE · 新增 CUDA 修复",
        title: "llama.cpp b11576：避免特定无缓存注意力回退",
        summary: "在 no-cache attention 路径将 mask 与 K/V 维度补齐到 256 的倍数，处理 CUDA Flash Attention 在 head size 512 下的约束；此前部分 token 长度会走回退路径，单 token 自动探测还可能关闭 FA。与昨日 Hexagon IM2COL_3D 是不同进展。",
        why: "适合维护相关模型或 CUDA 推理路径的人，不是所有 GGUF 模型普遍提速。MIT、预发布构建；项目支持多平台，但此次修复的收益限定于特定 CUDA/no-cache 形状。量化与所需显存取决于具体模型，无统一硬件或加速数字。固定模型、输入长度和 -fa 设置，对比日志中的实际后端、输出一致性与延迟，再决定升级。",
        meta: ["MIT", "CUDA · no-cache · head size 512", "预发布 · 非通用加速结论"],
        source: "https://github.com/ggml-org/llama.cpp/releases/tag/b11576"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 13 MAIN BRANCH · 功能覆盖增强",
        title: "Verilator：交叉覆盖支持 with 条件筛选",
        summary: "新增 cross cover 的 with filter 支持与回归用例，可按覆盖点值组合筛选 bins，并检查不合法类型。相较昨日复杂左值 NBA 修复，今天补的是验证表达能力；读取非整数覆盖点值等情况仍会提示不支持。",
        why: "适合使用 SystemVerilog covergroup 的 FPGA/RTL 验证团队，可减少把大量无关组合纳入覆盖目标的手工处理。Linux/WSL 源码构建，许可证 LGPL-3.0 或 Artistic-2.0；这是仿真覆盖功能，不改变器件支持、综合资源或时序。建议固定 commit，用最小 cross/ignore_bins 用例核对覆盖率及警告，再与既有仿真器和完整 testbench 比较。",
        meta: ["LGPL-3.0 / Artistic-2.0", "SystemVerilog covergroup", "仿真覆盖 ≠ 综合/时序"],
        source: "https://github.com/verilator/verilator/commit/b8e7f1e4b508f7827894784145cf52cffc3d08d5"
      },
      {
        category: "具身智能 / 数据集",
        level: "OCT 12 MAIN BRANCH · 非今日发布",
        title: "LeRobot：Lance RGB 按批解码，控制中间内存",
        summary: "同一视频文件的多样本请求先去重帧索引，再批量解码、分发回样本；中间解码按最多 64 帧、估算 64MiB 分块，并保留时间戳容差检查。单样本请求走低开销路径。相较 10 月 9 日 GPU 图像变换，这是上游数据读取优化。",
        why: "适合用 Lance 格式多相机/时序数据训练策略的人；无需实体机器人，RGB 来自录制数据。Python/PyTorch、Apache-2.0，训练 GPU 和 RAM 取决于策略/批大小。64MiB 不是整个进程内存上限：并发文件、最终输出及 decoder 内部内存不计入预算；没有公开吞吐倍率或新实机成功率。先用自己的数据比较 DataLoader 吞吐、RSS 和帧/时间戳一致性。",
        meta: ["Apache-2.0", "Lance · RGB 批量读取", "数据管线 · 无新增实机验证"],
        source: "https://github.com/huggingface/lerobot/commit/24f15b92b556cb861ca65e989462e23505a701bd"
      },
      {
        category: "具身智能",
        level: "OCT 13 MAIN BRANCH · 仅仿真",
        title: "Isaac Lab：双 Franka 解鞋带任务与柔性接触仿真",
        summary: "新增双 Franka 任务，将 MJWarp 刚体与 VBD 绳索通过 ADMM 耦合，提供 14 维相对 TCP/夹爪动作、64 维观测、接触信号和 RSL-RL PPO 配置。验证覆盖 7 种鞋型短步数 GPU smoke test、有限观测/奖励与重置隔离。",
        why: "适合研究双臂协作与柔性物体操纵。当前是仿真状态/接触观测，没有实体 Franka、真实相机测试、完整训练成功率或现成策略权重。额外 USD 鞋/绳资产不在仓库内，永久托管仍待补齐；缺资产时 smoke test 会跳过。BSD-3-Clause 代码，资产许可另核对；需 Newton 1.7.0.dev0 及 GPU 环境，未给出最低显存或实机成本，不建议直接采购硬件复现。",
        meta: ["BSD-3-Clause（代码）", "双 Franka · Newton / MJWarp / VBD", "资产外置 · 无实机结果"],
        source: "https://github.com/isaac-sim/IsaacLab/commit/4d4eb449186ab0f7b3e59d2eef9604486339b62b"
      },
      {
        category: "编码 Agent",
        level: "OCT 13 RELEASE · 含昨日版本进展",
        title: "OpenHands 1.27.1：修复 Docker 组件缺失，1.27 引入本地 ACP Agent",
        summary: "1.27.1 修复 Docker 包缺失 MARS web bridge 模块；昨日 1.27.0 已加入本地 OpenCode/Pi ACP Agent、由 Agent 提供模型列表，以及 mock-LLM 端到端流程对 DeepSeek 的核验与差距记录。相较昨日事件失败展示修复，今天有正式发行与新的本地接入方式。",
        why: "适合把不同编码 Agent 接入同一工作流的人。MIT；本地应用/容器不要求本地 GPU，但模型 API 有成本，改用本地推理需另配算力。发行和真实模型测试不等于任意任务可靠或自动隔离；先在一次性工作区验证工具权限、容器挂载、拒绝操作、超时恢复和 Git 回滚，避免直接给凭据或重要目录。1.27.0 与 1.27.1 的原始说明均可由该版本页导航查看。",
        meta: ["MIT", "本地 ACP / Docker", "模型费用与隔离需单独验证"],
        source: "https://github.com/OpenHands/OpenHands/releases/tag/v1.27.1"
      }
    ],
    deepDive: {
      title: "SANA-WM：可控视频真正的工程门槛在第二阶段",
      text: "事实：主干用线性注意力及相机条件生成视频，默认 LTX-2 refiner 按 3 帧块、有限 KV 历史细化，避免把整段视频一次性送入与训练不符的全序列路径；还支持分块保存状态以便中断恢复。1.6B 仅描述第一阶段，细化模型、Gemma 文本编码器与 VAE 仍有很大的加载成本，断点保存的 KV 也可能占数 GB。判断：最有长期价值的是把相机控制、滑窗细化和恢复状态变成可检查接口，而非又一个视频演示。局限：目前证据是高端 GPU smoke test，不能推出 24GB 显卡可顺畅跑，也不能推出物理一致性或机器人闭环可用。下一步：固定提交，先生成 81 帧短片，逐阶段记录加载时间、峰值 RAM/VRAM、细化耗时；比较相同 seed 下不同轨迹的相机响应，再测试中断恢复与不中断结果是否一致。",
      source: "https://github.com/huggingface/diffusers/commit/1628cb1c331741b64f67c97209ab49018e71ac70"
    },
    noise: "判断：把“世界模型”名称或相机可控视频直接等同于可交互、物理可靠的机器人环境，可能高估了能力。本期 SANA-WM 证明的是管线接入和生成 smoke test；双 Franka 证明的是仿真运行与数值检查。二者都尚不足以证明长时物理一致性、策略泛化或实体任务成功。今天未找到足够扎实的超分新发布，不用旧项目凑数；7 项“本地可部署”也包含研究级源码，绝不意味着普通电脑都能运行。"
  },
  {
    date: "2026-10-12",
    label: "OCT 12",
    pulse: "今天值得关注的改动集中在可复现与正确性：视觉生成补齐模块化去噪路径，端侧推理扩展 Hexagon 3D 卷积算子，机器人策略联调给出明确的仿真验证边界，仿真器、Agent 和服务端也继续修复会悄悄改变结果的状态问题。",
    metrics: [
      { value: "7", label: "今日信号" },
      { value: "7", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像 / 视频生成",
        level: "OCT 12 MAIN BRANCH · 尚未正式发布",
        title: "Diffusers：Anima 的双文本编码器输出可进入独立去噪模块",
        summary: "主分支为 Anima 的 Qwen/T5 正负提示输出显式标记 denoiser 输入字段，并修正不带 VAE 时的比例属性访问；新增模块化管线测试覆盖独立 core denoising。相较 10 月 10 日的 LoKr 适配器支持，这是新的模块组合正确性进展。",
        why: "适合拆分文本编码、去噪和 VAE 的工作流作者，而不是普通用户必须立即升级的画质突破。提交只证明接口和测试得到修复，没有统一速度、显存或生成质量结论；Python/PyTorch 本地运行，硬件门槛取决于 Anima 模型权重、精度和分辨率。建议固定提交，对比整管线和拆分管线在同一 seed 下的输出与峰值显存。",
        meta: ["Apache-2.0", "Python / PyTorch", "主分支 · 模块化管线测试"],
        source: "https://github.com/huggingface/diffusers/commit/e1a6c67dc724e7c1a5ae8eb0c1964c9f47325217"
      },
      {
        category: "端侧 LLM 推理",
        level: "OCT 12 PRE-RELEASE · 相较 10/11 有新增",
        title: "llama.cpp b11560：Hexagon 后端加入 IM2COL_3D",
        summary: "每日预发布版为 Snapdragon Hexagon NPU 路径加入 3D IM2COL，并调整 DMA 双缓冲、非连续 view 与旧版设备的 FP16 转换和循环内 spill；这是端侧多维算子覆盖的进展。昨天收录的是 llama-server 的 slot 并发修复，改动范围不同。",
        why: "对在支持 Hexagon 的 Snapdragon 设备上跑含 3D 卷积或相关视觉/视频算子的模型开发者有直接意义；不能据此推断普通文本 LLM 普遍加速。发布页提供 Android arm64 与 Linux arm64 Snapdragon 构建，但没有跨芯片吞吐和能耗基准。内存取决于模型与量化；应固定模型、输入形状和设备，对比回退 CPU 的结果、延迟、功耗和内存。",
        meta: ["MIT", "Android / Linux arm64 Snapdragon", "Hexagon NPU · 预发布"],
        source: "https://github.com/ggml-org/llama.cpp/releases/tag/b11560"
      },
      {
        category: "具身智能",
        level: "OCT 12 MAIN BRANCH · 仿真验证",
        title: "Isaac Lab：GR00T N1.5 改用隔离环境与本机策略服务完成 rollout",
        summary: "维护者将 GR00T N1.5 的转换、训练和推理放入独立、固定版本的 Python 3.12 环境，Isaac Lab 通过 localhost 策略服务与轻量客户端连接，规避 NumPy、Transformers 和 Hugging Face Hub 的依赖冲突；新增超时、协议和有界 rollout 测试。",
        why: "这是具身项目少见的具体复现证据：在 RTX 6000 Ada 与 Isaac Sim 6.1 上，维护者验证了八帧数据转换、公开 G1 数据集的两步训练及 checkpoint 恢复、真实推理返回有限动作，以及 50 秒仿真 rollout。这里的 G1 是仿真/公开数据平台；没有实体 G1 测试，较长 rollout 也未成功放置物体。新基线未完整重跑，Blackwell 未测；传感器依赖仿真相机，算力门槛是高端工作站 GPU，权重/数据许可还需分别核对。",
        meta: ["BSD-3-Clause（Isaac Lab）", "Isaac Sim 6.1 · RTX 6000 Ada", "仿真通过 ≠ 实机成功"],
        source: "https://github.com/isaac-sim/IsaacLab/commit/7b0d3ab655688a0228ead0c0792c6466a17dd76e"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 12 MAIN BRANCH · 相较 10/11 有新增",
        title: "Verilator：修正可挂起进程中数组元素结构体成员的 NBA",
        summary: "继昨天修复整块 unpacked array 的 nonblocking assignment 后，新提交继续处理数组元素下的 struct member 选择，按 IEEE 1800-2023 的执行时选择语义捕获索引，并加入专门的 SystemVerilog 回归用例；同一窗口还修复过度激进的 DFG peephole 模式。",
        why: "适合使用 fork、可挂起任务和复杂左值的 RTL 验证团队，能减少仿真结果与其他工具不一致的风险。它仍是主分支修复，不是综合或 FPGA 实现结论，因此无器件时序/资源数字；应固定 commit，跑最小复现及完整 testbench，并与另一仿真器比较事件顺序和最终值。",
        meta: ["LGPL-3.0 / Artistic-2.0", "SystemVerilog 仿真", "主分支 · 带回归用例"],
        source: "https://github.com/verilator/verilator/commit/d748ed144cd8b64e836f5e2f184ca517b45f41a8"
      },
      {
        category: "编码 Agent",
        level: "OCT 12 MAIN BRANCH · 失败状态",
        title: "OpenHands：被拒绝或报错的动作不再在事件分组中失踪",
        summary: "前端事件分组现在能正确呈现 rejected 和 errored action，相关消息、导出 transcript 与 UI 处理一并调整，并新增多层测试。相较 10 月 9 日的验证清单，这次直接改善操作者检查失败步骤时看到的证据。",
        why: "对需要审阅 Agent 命令和工具调用的人，这关系到能否看到失败、拒绝与后续恢复的完整链条；它不是新的权限沙箱或自动回滚。仍需在隔离工作区中运行，核对密钥、网络和命令权限，并在自己常见的拒绝、超时、工具错误场景下检查事件顺序与导出记录。当前是主分支提交，正式安装包可能尚未包含。",
        meta: ["MIT", "本地 / Docker / 远端后端", "主分支 · 事件审计"],
        source: "https://github.com/OpenHands/OpenHands/commit/efa2e78a47ee606cdb3029f0b584e3990b1a8cbc"
      },
      {
        category: "LLM 推理服务",
        level: "OCT 12 MAIN BRANCH · 分布式正确性",
        title: "vLLM：接收端先持有共享内存缓冲区，再释放读取槽",
        summary: "分布式消息队列修正 out-of-band buffer 的生命周期，避免读取槽被回收后接收端仍引用可复用的共享内存；提交新增多进程广播和环形缓冲区重复利用测试。昨天的 MiniMax-M3 稀疏注意力优化与此属于不同层面的改动。",
        why: "适合多进程、多 GPU 推理服务维护者；此类错误可能只在并发压力下表现为内容损坏或偶发失败。主分支修复没有端到端吞吐声明，也不改变模型显存基本需求；应固定版本，以大 tensor、连续 ring 回收、不同进程启动方式做压力与一致性测试，再考虑在生产环境提前跟进。",
        meta: ["Apache-2.0", "Linux / 多进程 GPU 服务", "主分支 · 广播回归"],
        source: "https://github.com/vllm-project/vllm/commit/74f4404f58c0fb16821b34c16343486eeaf164a5"
      },
      {
        category: "数据库内核",
        level: "OCT 11 MAIN BRANCH · 近 24 小时",
        title: "Redis：模块线程与多 IO 线程并用时避免触发主线程断言",
        summary: "持有 RedisModule_ThreadSafeContextLock 的模块线程调用 CLIENT LIST、CLIENT KILL、ACL 等命令时，可能接触由 IO 线程管理的客户端并触发仅允许主线程暂停 IO 的断言。修复允许持有 GIL 的模块线程暂停/恢复相关 IO 线程，且新增多线程模块回归。",
        why: "这是自托管 Redis 使用模块和 io-threads>1 时的稳定性修复，不应误称为已发布的安全补丁。官方提交包含四 IO 线程下的 CLIENT、CONFIG、ACL、异步清理及 tracking 测试；生产采用仍要等稳定发布或自行固定 commit 编译、运行原有模块回归。Redis 当前仓库许可证需按实际版本和分发方式核对，普通单线程部署不受这一具体崩溃路径影响。",
        meta: ["源码许可按版本核对", "模块线程 + io-threads>1", "主分支 · 非正式发布"],
        source: "https://github.com/redis/redis/commit/7939a8b204f03033d7cd8a54cbd81c35dc7a380e"
      }
    ],
    deepDive: {
      title: "今日深挖：GR00T N1.5 与 Isaac Lab 的接口，终于有可检查的复现边界",
      text: "这次修复没有宣称新策略能力，而是把两个依赖冲突的生态拆成独立 Python 环境，再用 localhost 策略服务传动作。价值在于研究者可以分别验证数据转换、训练、checkpoint、协议超时和仿真 rollout，定位失败究竟来自环境、传输、模型还是控制器。维护者报告的 RTX 6000 Ada/Isaac Sim 6.1 验证只覆盖八帧数据、两步训练和最长 50 秒仿真；策略没有完成放置任务，也没有实体机器人测试。下一步应先按固定修订复现公开 G1 数据与仿真动作，再延长 rollout、记录成功率与失败轨迹；只有补齐控制调参、真实传感器映射和实体安全边界后，才谈实机部署。",
      source: "https://github.com/isaac-sim/IsaacLab/commit/7b0d3ab655688a0228ead0c0792c6466a17dd76e"
    },
    noise: "判断：今日 Trending 的 airllm 主打在有限显存上运行很大参数量模型，方向值得观察，但仅凭参数规模和榜单热度无法判断交互速度。分层卸载可能把瓶颈转移到内存、磁盘和 PCIe；在固定硬件上取得首 token、持续 tokens/s、功耗和质量数据前，不宜把‘能载入’等同于‘能日常使用’。"
  },
  {
    date: "2026-10-11",
    label: "OCT 11",
    pulse: "今天的强信号不是更大的模型，而是本地工具开始修补真实使用中的数据迁移、并发上下文、显存余量、GPU 兼容和终端安全边界；可部署性正在从‘能跑’转向‘不会悄悄跑错或破坏旧环境’。",
    metrics: [
      { value: "8", label: "今日信号" },
      { value: "8", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "图像 / 视频生成",
        level: "OCT 11 ALPHA RELEASE",
        title: "InvokeAI 7 alpha 2：GGUF 视觉模型、AMD ROCm 10 与显存预留一起推进",
        summary: "新版支持 krea2 Q8_CR、Ideogram 4 与 ERNIE-Image 的 GGUF transformer，补强 MiniMax H3 与 LTX-2 视频输入，引入 reserve_vram_gb 为中间张量预留显存；多用户部署可改用 MySQL/MariaDB，AMD 路径升级到 ROCm 10。",
        why: "它对想在本机或工作站整合 FLUX、GGUF 图像模型与视频工作流的人很有吸引力，但仍是明确标注会坏的 alpha。v7 数据库迁移不可逆，v6 无法重新打开；官方要求使用全新的 root 目录，虽然迁移前会备份，也不应拿唯一素材库试。显存门槛仍取决于模型、量化、分辨率与缓存，reserve_vram_gb 只是避免 OOM 的调度余量，不会降低模型本体占用。",
        meta: ["Apache-2.0", "Windows / Linux / macOS", "新 root 测试 · 数据库单向迁移"],
        source: "https://github.com/invoke-ai/InvokeAI/releases/tag/v7.0.0-alpha.2"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 11 PRE-RELEASE · 相较 10/10 有新增",
        title: "llama.cpp b11552：修复固定 slot 请求污染正在生成的上下文",
        summary: "当请求指定一个忙碌的 id_slot 时，旧逻辑会在等待前仍更新该 slot 的 prompt cache；若 RAM cache 命中更好上下文，正在生成的请求可能继续在错误上下文上运行。新版让忙碌 slot 保持不动，后来的请求等待。",
        why: "这是多会话 llama-server 的正确性修复，比单次 tokens/s 更重要：错误可能不是显式崩溃，而是生成内容悄悄串上下文。相较昨天的 SYCL MXFP4 性能改动，这是新的服务端并发边界。发布仍是每日预发布，但提供 CPU、CUDA、ROCm、Vulkan、OpenVINO、SYCL、Snapdragon、iOS/Android 构建；生产用户应固定版本并用并发固定-slot、cache 命中和长上下文压力测试复现。",
        meta: ["MIT", "桌面 / 服务器 / 移动端", "并发正确性 · 预发布"],
        source: "https://github.com/ggml-org/llama.cpp/releases/tag/b11552"
      },
      {
        category: "本地 LLM 推理",
        level: "OCT 11 PRE-RELEASE · 0.40.3",
        title: "Ollama 0.40.3：暂停每次请求触发的后台模型升级检查",
        summary: "维护版暂停本地模型兼容性后台升级流程，因为它会给每个请求增加固定开销，在 embeddings 等高请求量场景尤其明显；同时移除启动 Claude/Codex 时已经过时的连接器与 service tier 警告。",
        why: "它适合用 Ollama 做本地 embedding 服务或高频 API 网关的人，改动针对请求路径开销，不代表单次生成内核变快。模型 RAM/VRAM 仍由模型大小、量化与上下文决定，Windows、Linux、macOS 均可用；这是预发布版，应比较升级前后的 QPS、P95/P99、冷启动与模型兼容，而不是只看交互聊天体感。",
        meta: ["MIT", "Windows / Linux / macOS", "高频请求路径 · 预发布"],
        source: "https://github.com/ollama/ollama/releases/tag/v0.40.3"
      },
      {
        category: "超分辨率",
        level: "OCT 11 MAIN BRANCH · TensorRT",
        title: "chaiNNer：修复 TensorRT 超分缓冲区类型与固定尺寸切片",
        summary: "主分支现在按 engine 实际输入/输出 tensor dtype 分配和转换 host buffer，避免 FP32 ONNX 以 FP16 构建时出现半尺寸缓冲区；固定 shape engine 改用精确 tile，并检查 set_input_shape，另对计算能力低于 7.5 或驱动低于 580 的 CUDA 13/TensorRT 包显式禁用。",
        why: "这直接影响本地 TensorRT 超分是否算对、是否在不支持的显卡上误启动。适合 NVIDIA RTX/Turing 及更新架构用户在隔离环境验证；它是主分支提交，不是正式 release，也没有统一画质或吞吐数据。应固定同一模型、tile、重叠和输入，比较输出像素、显存、耗时与边缘接缝；老 GPU 不应绕过新门槛强装。",
        meta: ["GPL-3.0", "NVIDIA · compute capability 7.5+", "TensorRT / CUDA 13 · 主分支"],
        source: "https://github.com/chaiNNer-org/chaiNNer/commit/45b6661af7f0fd4e35013e29cdc5a3650233f73e"
      },
      {
        category: "编码 Agent",
        level: "OCT 11 RELEASE · 1.19.0",
        title: "OpenCode 1.19.0：PTY 连接先验来源与 ticket，再查会话",
        summary: "核心修复调整 PTY 连接检查顺序，先验证 origin 与 ticket，再判断目标 PTY 是否存在；TUI 也停止自动安装更新，改为由用户执行 /update，且可显式升级到 OpenCode 2。",
        why: "对能执行本地命令的编码 Agent，终端连接的授权顺序和更新控制比新模型入口更重要。来源/ticket 校验减少未授权探测或连接的边界风险，手动更新也降低工作中途版本漂移；但这不是完整 sandbox。采用前仍要限制工作目录、网络、密钥和可执行命令，并验证失败后进程清理、文件回滚和会话恢复。",
        meta: ["MIT", "桌面 / 终端", "PTY 校验 · 手动更新"],
        source: "https://github.com/anomalyco/opencode/releases/tag/v1.19.0"
      },
      {
        category: "CLI / 终端",
        level: "OCT 11 SECURITY RELEASE",
        title: "fzf 0.74.5：修补 tmux 参数求值与可预测 FIFO",
        summary: "fzf-tmux 不再把附加布局尺寸交给 Bash 算术求值，避免命令执行或 tmux 参数注入；zsh completion 的 FIFO 改建在私有 mktemp -d 目录。版本还修复 tmux 3.8 popup、Unicode grapheme 截断、未知 escape sequence 与 reload 后 focus 事件。",
        why: "这是应优先于普通功能升级的终端安全修复，尤其适合把 fzf 集成进共享脚本、tmux 与 zsh 补全的人。fzf 是跨平台单二进制、无 GPU 需求；tmux 3.7 仍因上游崩溃问题会取消 zoom。升级后应回归自定义 --bind reload/focus、fzf-tmux 尺寸参数和 shell completion，不要继续信任来自外部输入的布局参数。",
        meta: ["MIT", "Linux / macOS / Windows", "两项 GHSA 安全修复"],
        source: "https://github.com/junegunn/fzf/releases/tag/v0.74.5"
      },
      {
        category: "LLM 推理服务",
        level: "OCT 11 MAIN BRANCH · 相较 10/10 有新增",
        title: "vLLM：MiniMax-M3 稀疏注意力 prefill 改用 E4M3 query",
        summary: "主分支更新 Blackwell sm100 的 MSA 依赖，让 MiniMax-M3 的 MSA prefill 以 E4M3 query 进入稀疏注意力，并补对应 kernel 测试；同一窗口还修复跨 KV cache group 的推测 block 预留。",
        why: "这是面向特定模型与 Blackwell 稀疏注意力路径的工程优化，不能外推为所有 vLLM 模型都加速。相较昨天 Granite 的 EAGLE3/DFlash 接口，这是新的 MiniMax-M3 与 KV cache 正确性进展。提交没有给出可泛化的端到端吞吐数字，适合已有 sm100 环境的服务团队固定 commit，测 prefill、decode、P99、显存、推测接受率与精度回归。",
        meta: ["Apache-2.0", "Linux / NVIDIA Blackwell", "主分支 · 模型专用优化"],
        source: "https://github.com/vllm-project/vllm/commit/2eb491e18b1ce5b8a25e4c88f32dbb5d028d525c"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 11 MAIN BRANCH · 相较 10/10 有新增",
        title: "Verilator：修正 suspendable process 中整块 unpacked array 的 NBA",
        summary: "当可挂起进程或 fork 对整个 unpacked array 做 nonblocking assignment 时，旧 shadow-variable 策略的 pre 逻辑可能在恢复后覆盖新值；新版改用 unique flag 路径并加入回归。同一窗口还修复 descending $readmem/$writemem、按名 disable 的 function port 与参数特化命名内部错误。",
        why: "这对含协程式 testbench、fork/join 与数组 NBA 的 SystemVerilog 验证环境是明确语义修复。它仍是主分支、尚无正式 release；也没有综合、时序或 FPGA 资源数据，因为 Verilator 是仿真/编译器而非实现工具。应固定 commit 跑最小复现和完整回归，尤其比较数组更新时序与其他仿真器结果。",
        meta: ["LGPL-3.0 / Artistic-2.0", "SystemVerilog 仿真", "主分支 · 带回归测试"],
        source: "https://github.com/verilator/verilator/commit/87f76381f71c411811942d29ed4fb5877b623b5b"
      }
    ],
    deepDive: {
      title: "今日深挖：InvokeAI 7 的关键不是新模型，而是把不可逆迁移当成部署边界",
      text: "InvokeAI 7 alpha 2 同时加入 GGUF 视觉模型、ROCm 10、外部数据库和显存预留，表面上像一次功能堆叠；真正值得借鉴的是发布说明把数据库单向迁移、备份与独立 root 写成首要约束。生成工作台保存的不只是图片，还有模型登记、工作流、画板与索引，一次 alpha 迁移失败的代价远大于重新下载程序。reserve_vram_gb 也体现同一思路：不要把全部显存交给模型缓存，要给中间张量留出明确预算。下一步应复制少量真实项目到全新 root，记录迁移时间、数据库大小、模型扫描、峰值显存、失败恢复和 v6 备份还原；只有这些都通过，才考虑扩大测试范围。",
      source: "https://github.com/invoke-ai/InvokeAI/releases/tag/v7.0.0-alpha.2"
    },
    noise: "判断：今天 Trending 里的各类 agent skills / knowledge-work plugins 很醒目，但提示词、模板和精选技能集合本身不等于 Agent 具有权限隔离、可重复评测或失败恢复。它们可以作为工作流参考入口，只有回到具体工具与原仓库验证执行边界、版本、测试和数据来源后，才值得当成技术信号。"
  },
  {
    date: "2026-10-10",
    label: "OCT 10",
    pulse: "今天最清晰的趋势是‘优化开始贴近真实部署边界’：本地推理继续针对 Intel、Snapdragon 与推测解码补后端，生成工具把适配器兼容和采样阶段控制做细，Agent 与 Python 工具链则把评测原因、成本、签名和可复现升级放到功能之前。",
    metrics: [
      { value: "9", label: "今日信号" },
      { value: "9", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "本地 LLM 推理",
        level: "OCT 10 PRE-RELEASE",
        title: "llama.cpp b11540：SYCL 的 MXFP4 MoE 不再逐值解码",
        summary: "今日预发布版为 SYCL 后端加入 MXFP4 MoE 的算术解码与权重重排，目标是减少低比特专家权重在执行时的解码开销；同时继续提供 Windows、Linux、macOS、iOS、Android，以及 CPU、Vulkan、CUDA、ROCm、OpenVINO、SYCL 和 Snapdragon CPU/GPU/NPU 的现成构建。",
        why: "最适合 Intel GPU/SYCL 上跑 MXFP4 MoE 的用户先做针对性 A/B，而不是所有 llama.cpp 用户无条件追每日构建。官方发布说明没有给出统一 tokens/s、功耗或质量数据；模型内存仍由参数量、量化、上下文和 KV cache 决定。它是预发布版，生产环境应固定 commit，并同时测首 token、生成吞吐、峰值内存与输出一致性。",
        meta: ["MIT", "Windows / Linux / macOS / 移动端", "SYCL MXFP4 · 预发布"],
        source: "https://github.com/ggml-org/llama.cpp/releases/tag/b11540"
      },
      {
        category: "图像生成适配器",
        level: "OCT 09 MAIN BRANCH · 近 24 小时",
        title: "Diffusers：Z-Image 与 Flux2/Klein 原生接入 LoKr",
        summary: "主分支新增 LyCORIS LoKr 权重转换、alpha/rank 缩放处理和 PEFT 注入路径，并把 checkpoint 格式测试落到 Flux2 与 Z-Image 的模型测试类；这让 Kronecker 分解适配器不必先手工改造成普通 LoRA。",
        why: "适合训练或分发 LoKr 的视觉模型作者，以及希望在标准 Diffusers 管线里复用社区适配器的人。它仍是主分支提交而非稳定 release，实际显存由基础模型、精度、分辨率和 offload 决定；合入代码只证明格式与加载路径被测试，不等于所有第三方权重都兼容，建议固定 commit 对比加载日志、输出和峰值显存。",
        meta: ["Apache-2.0", "PyTorch / PEFT", "主分支 · Z-Image / Flux2"],
        source: "https://github.com/huggingface/diffusers/commit/78bf2c6266668a1c7185b28053b807f786b6f34e"
      },
      {
        category: "图像 / 视频生成",
        level: "OCT 10 MAIN BRANCH · 尚未正式发布",
        title: "ComfyUI：潜空间操作可限定在去噪时间窗",
        summary: "LatentApplyOperationCFG 新增 start_percent 与 end_percent，可把潜空间操作只施加在指定去噪区间；同时加入 LatentOperationBlend，把两个 latent operation 按比例混合。当天还修复 MiniMax H3 单图解码，并让 Qwen3.5 图像输入可启用 MTP。",
        why: "这给工作流作者一个比‘全程开/关’更细的实验旋钮，适合把结构、颜色或引导操作限制在早期或后期采样阶段。它没有声称质量必然提升，也未给出显存增量；目前是主分支，Windows、Linux、macOS 用户应在副本工作流固定 commit，逐步扫描时间窗并保存 seed、耗时和输出对照。",
        meta: ["GPL-3.0", "Windows / Linux / macOS", "主分支 · 工作流级控制"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/e450673ef21ad87456c138f7cbd1332e296b91a9"
      },
      {
        category: "Agent 评测",
        level: "OCT 10 RELEASE · 1.15.27",
        title: "CrewAI：评测终于记录‘为何没有得出结论’",
        summary: "1.15.27 为评测加入停止原因、部署尝试前满足的条件，以及 crewai eval --models 的逐次成本与耗时；同时修复 GitHub loader 来源归属、SQLite flow 初始化争用和部分模型不应接收 stopSequences 的问题。",
        why: "对需要比较多个模型或复盘 Agent 失败的人，这些字段比一张总分榜更实用：无 verdict、超时或前置条件不足不应被混成模型质量差。框架可本地安装，但外部模型与工具仍带来费用和权限风险；新增记录不是隔离或回滚机制，仍需保存输入、工具调用、模型版本和副作用，并用预算上限验证失败路径。",
        meta: ["MIT", "Python · 本地编排", "成本 / 时间 / 停止原因"],
        source: "https://github.com/crewAIInc/crewAI/releases/tag/1.15.27"
      },
      {
        category: "LLM 推理服务",
        level: "OCT 10 MAIN BRANCH · 推测解码",
        title: "vLLM：Granite 接入 EAGLE3 / DFlash 辅助隐藏状态",
        summary: "Granite 模型实现开始暴露 EAGLE3 与 DFlash 所需的辅助隐藏状态，并接入相应模型接口，为这两类推测解码方法在 Granite 上工作补齐模型侧通路；同日还加入 Mamba-family 算子的可中断 CUDA Graph 路径。",
        why: "适合已经在 GPU 服务端部署 Granite、并愿意跟踪主分支做吞吐实验的团队。提交只补齐兼容能力，没有给出统一接受率或端到端加速数字；收益取决于 draft 配置、批量、序列长度和 GPU，显存还会增加。它不是消费级一键工具，应先在独立环境固定 commit，测接受率、P50/P99、吞吐、显存与输出一致性。",
        meta: ["Apache-2.0", "Linux / NVIDIA GPU 为主", "主分支 · 无通用加速结论"],
        source: "https://github.com/vllm-project/vllm/commit/46fb84c2d4ef1f89cf472c62b8c964819a9e512a"
      },
      {
        category: "Python 工具链",
        level: "OCT 10 RELEASE · 0.13.0",
        title: "uv 0.13.0：默认转向 Python 3.15，Windows ARM64 优先原生解释器",
        summary: "大版本把默认稳定 Python 从 3.14 提到 3.15，Windows ARM64 从优先 x86_64 模拟改为优先原生 aarch64；included constraints 中的 --require-hashes 现在会真正生效，缓存格式也为性能更新，升级后可能重新下载或构建依赖。",
        why: "适合维护跨平台 Python 环境的人，但这是需要先读迁移说明的升级。未 pin Python 的自动下载会改变，缺哈希的安装可能从成功变成失败，uv_build 上限也要允许 0.13；好处是 ARM Windows 更贴近端侧原生运行。建议先在 CI 固定 0.13.0 与 Python 版本，比较 lock、缓存重建、wheel 可用性和离线安装。",
        meta: ["Apache-2.0 / MIT", "Windows / Linux / macOS", "破坏性默认值 · 先 pin"],
        source: "https://github.com/astral-sh/uv/releases/tag/0.13.0"
      },
      {
        category: "Python 静态分析",
        level: "OCT 10 RELEASE · 0.17.0",
        title: "Ruff 0.17.0：发行二进制开始签名，默认规则与 Python 版本发生变化",
        summary: "macOS 与 Windows 发布包以及 Ruff wheels 现在带代码签名；默认 target 从 Python 3.10 调到 3.11，语法检查上限到 3.15，多条 datetimez 规则退出默认集，F406 进入默认集，JUnit 输出字段也发生变化。",
        why: "签名能改善企业 allowlist 与来源验证，但 0.17.0 不是透明升级：未显式配置 target-version 的项目、依赖默认规则集的 CI，以及解析 JUnit 的脚本都可能变。Ruff 本身是跨平台单二进制、无需 GPU；先固定版本运行一次全仓库检查，审查规则增减和基线差异，再更新 CI。",
        meta: ["MIT", "Windows / Linux / macOS", "已签名二进制 · 默认规则变化"],
        source: "https://github.com/astral-sh/ruff/releases/tag/0.17.0"
      },
      {
        category: "开发环境",
        level: "OCT 10 RELEASE · 相较 10/9 有新增",
        title: "mise v2026.10.7：工具可在 shell 提示符后静默自更新",
        summary: "相较昨天收录的 2026.10.5，新版让 activated shell 在检查到期后用后台进程更新启用 auto_update 的工具，并新增全局开关；下载改为内容寻址缓存、复用前重新校验哈希，并用 ETag/Last-Modified 做条件请求。",
        why: "这能减少 Claude、Node、Python 等全局工具长期漂移，但‘下一条命令自动用新版本’也扩大了不可预期升级面。精确版本、offline、CI、locked 与 minimum_release_age 仍会阻止自动移动；建议关键开发机默认关闭 global_auto，只对低风险工具开启，并用 lockfile、最小发布时间和 mise doctor 保留恢复路径。",
        meta: ["MIT", "Windows / Linux / macOS", "后台更新 · 可逐工具退出"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.10.7"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 10 MAIN BRANCH · 相较 10/9 有新增",
        title: "Verilator：继续修正 conditional case 与覆盖率边界",
        summary: "继昨天的 clocking block 修复后，主分支进一步处理 case item 中由三元条件生成的 X/Z 分支，并补回归用例；还修复 cover sequence 中 sampled value function 的内部错误、VPI range 对象泄漏，以及 iff=false 时不必要的覆盖率采样。",
        why: "这对包含复杂 case、SVA cover sequence 或长期 VPI 联调的 SystemVerilog 验证环境有直接价值，且相关变化带最小回归。它们仍未进入正式 release，也没有综合、时序和 FPGA 资源数据——Verilator 是仿真/编译工具，不是实现签核工具。建议固定 commit 跑自己的 testcase 与完整回归，再决定是否提前采用。",
        meta: ["LGPL-3.0 / Artistic-2.0", "SystemVerilog 仿真", "主分支 · 带回归测试"],
        source: "https://github.com/verilator/verilator/commit/c265bd444cd9307fad42f03b45068d7662c3adfc"
      }
    ],
    deepDive: {
      title: "今日深挖：MXFP4 MoE 的价值，取决于解码是否还在内存路径上",
      text: "llama.cpp 这次针对 SYCL 的改动把 MXFP4 专家权重的解码变成算术路径，并配合权重重排；长期价值在于低比特 MoE 的瓶颈不只来自矩阵乘，权重如何读取、解码并送入计算单元同样决定实际吞吐。它没有给出跨硬件基准，也只直接影响 SYCL/MXFP4 MoE，不能外推为所有 Intel GPU 或所有 GGUF 都变快。建议下一步在同一模型、量化、上下文和 batch 下，对比上一构建与 b11540 的 prompt/decode tokens/s、首 token、峰值内存、功耗和固定样本输出；只有性能提升且数值质量可接受，才把每日预发布提升为生产基线。",
      source: "https://github.com/ggml-org/llama.cpp/releases/tag/b11540"
    },
    noise: "判断：LiteLLM 今天进入 GitHub Trending，统一多模型网关的需求确实强，但榜单热度无法证明生产可靠性；其主分支仍在密集修正 hard 429、guardrail 阻塞和流式回放等边界。它值得进入候选清单，却不应只凭 stars 或 provider 数量直接放进关键链路，应固定发布版并对限流、重试、流式、审计与故障转移做压测。"
  },
  {
    date: "2026-10-09",
    label: "OCT 09",
    pulse: "今天最明显的趋势不是又多了一个大模型，而是性能、安全和可验证性继续下沉到运行时与工具链：推理插件开始处理稀疏注意力和 INT2 MoE，机器人训练把图像增强搬上 GPU，Agent 与 EDA 项目则用可复现测试替代单纯演示。",
    metrics: [
      { value: "8", label: "今日信号" },
      { value: "8", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "1", label: "FPGA / EDA" }
    ],
    items: [
      {
        category: "本地 LLM 推理",
        level: "OCT 09 RELEASE",
        title: "ONNX Runtime CUDA Plugin EP 0.3.0：稀疏注意力与 INT2 MoE 进入插件层",
        summary: "CUDA Plugin EP 新增 Qwen4-Exp QSA、DeepSeek V4 CSA 的稀疏注意力与索引算子，支持 packed continuous batching、更多分页推测解码路径，以及统一 INT2 和混合 INT2/INT4 的 QMoE 执行；Blackwell 消费卡上的 MXFP4 路径也得到改进。",
        why: "它适合正在把新模型结构接入 ONNX Runtime 服务端的人，而不是普通桌面用户的一键升级。插件最低兼容 core 1.24.4，但官方明确建议与本版匹配的 1.31.0 从同一 revision 构建；contrib-op schema 不一致可能静默算错或崩溃。需要 NVIDIA CUDA，具体显存仍由模型、KV cache、批量与量化决定，发布说明没有给出通用端到端吞吐结论。",
        meta: ["MIT", "NVIDIA CUDA", "core / plugin schema 必须匹配"],
        source: "https://github.com/microsoft/onnxruntime/releases/tag/plugin-ep-cuda/v0.3.0"
      },
      {
        category: "图像 / 视频生成",
        level: "OCT 09 MAIN BRANCH · 尚未正式发布",
        title: "ComfyUI：LoRA 可以逐层替换注意力配置",
        summary: "主分支允许 LoRA 覆盖模型的 per-layer attention 配置，可让 turbo LoRA 在部分或全部层选择不同注意力实现；同一时间段还修复了 Qwen 2.1 低显存路径、Qwen 3.5 MTP embedding offload 与 fused LoRA bypass。",
        why: "这比新增一个节点更接近推理基础设施变化：LoRA 可以携带与自身匹配的注意力策略，低显存和融合路径也更不容易互相踩状态。但这些是主分支提交，不是新的稳定版；Windows、Linux、macOS 用户若依赖自定义节点，应等 release 或在隔离环境固定 commit 测峰值显存、输出一致性与节点兼容。",
        meta: ["GPL-3.0", "Windows / Linux / macOS", "主分支 · 固定 commit 测试"],
        source: "https://github.com/Comfy-Org/ComfyUI/commit/f49c531e5494b65d5ce6d1cca5ed578227da7ece"
      },
      {
        category: "机器人学习训练",
        level: "OCT 09 MAIN BRANCH · 训练侧",
        title: "LeRobot：把逐样本图像增强搬到策略 GPU",
        summary: "新增 opt-in 的 image_transforms.backend=gpu：DataLoader worker 只解码，图像增强按 batch 在策略设备执行，并用显式 torch.Generator 保持各样本随机参数与多帧相机历史的一致性；评测、rollout、checkpoint 和策略预处理器不受影响。",
        why: "官方在 ACT + LIBERO、batch 160 的测试中报告 H100 425→1200、A100 188→615、L4 60→179 samples/s，峰值分配显存均约 13 GB；但当 L4 的 8 个 CPU worker 已能供满数据时，GPU 路径反而从 192 降到 182。它只证明训练数据管线提速，不是策略成功率或真实机器人效果提升；应在自己的相机数、CPU/GPU 配比和增强组合上 A/B。",
        meta: ["Apache-2.0", "CUDA 训练 · opt-in", "LIBERO 基准 ≠ 实机验证"],
        source: "https://github.com/huggingface/lerobot/commit/b9cb121cb7d4e3e26ec5c906d08dda68d151ba52"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "OCT 09 MAIN BRANCH · 仿真器修复",
        title: "Verilator：修正 clocking block 的驱动语义与封装生成",
        summary: "主分支修复多个 SystemVerilog 边界：同一信号由多个 clocking block 驱动时不再误报 MULTIDRIVEN，并按 IEEE 1800-2023 的“最后一次驱动生效”语义增加 DDR 回归；同时修复带 skew 的 clocking output 和 --lib-create 生成 wrapper 的端口声明。",
        why: "这对使用 clocking block 写验证平台、DDR 行为模型或把 Verilated 模型封成库的人有直接价值，相关提交都带回归用例。它们尚未成为正式 release，也没有综合、时序或 FPGA 资源数据，因为 Verilator 关注仿真/编译而非实现签核；建议固定 commit 跑自己的最小复现和完整 testbench，再决定是否提前跟主分支。",
        meta: ["LGPL-3.0 / Artistic-2.0", "SystemVerilog 仿真", "主分支 · 非综合结果"],
        source: "https://github.com/verilator/verilator/commit/1ab944aecc0ec440a44e3a4409e7cfcdb07ca287"
      },
      {
        category: "编码 Agent",
        level: "OCT 09 RELEASE · 相较 10/6 有新增",
        title: "OpenHands v1.26.0：开始用验证清单审计自己的 Agent 能力",
        summary: "相较 10 月 6 日的 v1.25.0，新版加入 verify-openhands skill 与 control-openhands CLI，把功能映射、daily pass、live recipe 和已复现缺陷放进同一套验证流程；还修复云端 sandbox 恢复重试、本地自动化日志读取、MCP STDIO 安装身份和 Git Sync 凭据展示。",
        why: "值得关注的不是功能数量，而是项目终于把“这个 Agent 功能是否真的还能跑”变成可重复执行的维护任务。它仍支持本机、Docker、VM 或远端后端；Docker 能隔离执行，但共享宿主工作区仍需独立目录或 worktree。验证清单也不是安全证明，权限、网络、密钥和失败回滚仍要按部署环境单独测试。",
        meta: ["MIT", "Node.js 24+ · Docker 可选", "验证清单 ≠ 安全认证"],
        source: "https://github.com/OpenHands/OpenHands/releases/tag/v1.26.0"
      },
      {
        category: "CLI / 基准测试",
        level: "OCT 08 RELEASE · 近 24 小时",
        title: "hyperfine v2.0.0：从计时器升级为轻量性能计数器",
        summary: "正式版除 wall-clock 外可测峰值内存、指令数、CPU cycles、cache miss 和 branch miss，并让绘图脚本与 JSON 导出覆盖多指标；--env 可在无中间 shell 时设置变量，适合比较线程数和运行配置。",
        why: "它让本地推理、图像处理和编译任务的对比不再只看耗时，但硬件计数器是否可用取决于操作系统与权限。2.0 默认直接执行命令而不经过 shell，含 &&、重定向或变量展开的旧脚本需显式 -S；JSON 升级为 schema v2，现有分析器也必须迁移。支持 Linux、macOS、Windows，安装成熟，但这是破坏性大版本。",
        meta: ["Apache-2.0 / MIT", "Linux / macOS / Windows", "默认无 shell · JSON schema v2"],
        source: "https://github.com/sharkdp/hyperfine/releases/tag/v2.0.0"
      },
      {
        category: "开发环境",
        level: "OCT 09 RELEASE",
        title: "mise v2026.10.5：dotfiles 同步开始主动防止秘密泄漏",
        summary: "dotfiles 新增按机器历史、仅本地历史和 merge=missing，并在同步前扫描 provider token、私钥块和常见 KEY/TOKEN/SECRET/PASSWORD 赋值；远程任务缓存的环境变量、vars 与参数也改为 BLAKE3 摘要，packslip 可限定签名 release 的 GitHub Actions workflow。",
        why: "适合在多台电脑同步开发环境的人，尤其是同时管理 Codex、Claude Code 和终端配置时。升级边界很明确：java@21/lts/latest 默认从 jdk.java.net OpenJDK 改为 Temurin，旧 lockfile 可能需要保留 vendor 或重锁；实验性功能也真正要求 experimental=true。跨平台可用，安全扫描只是防呆，不能替代 secret manager。",
        meta: ["MIT", "Windows / Linux / macOS", "Java 默认 vendor 破坏性变化"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.10.5"
      },
      {
        category: "Agent 框架",
        level: "OCT 09 RELEASE",
        title: "LangChain 1.4.4：摘要溢出可重试，IPv6 SSRF 检查收紧",
        summary: "langchain 1.4.4 让 SummarizationMiddleware 在摘要步骤再次遇到上下文溢出时重试；同一发布窗口的 langchain-core 1.6.8 加固 scoped 与兼容 IPv6 地址的 SSRF 判断，随后 1.6.9 让 with_retry 接受 callable。",
        why: "对长会话 Agent，摘要本身失败是常见的二次故障；对会访问用户 URL 的工具，IPv6 形式绕过又是实际边界。它们都是 Python 库补丁，不会自动提供隔离、权限审批或完整失败恢复；采用时应锁定 langchain 与 core 的兼容组合，并用超长上下文、内网/环回 IPv6 和重试副作用做回归。",
        meta: ["MIT", "Python", "补丁发布 · 需配套回归"],
        source: "https://github.com/langchain-ai/langchain/releases/tag/langchain%3D%3D1.4.4"
      }
    ],
    deepDive: {
      title: "今日深挖：LeRobot 的 3× 不来自新模型，而来自消除数据饥饿",
      text: "这项改动把增强从 DataLoader 的逐样本 CPU 路径移到策略 GPU 的批处理路径，并用 gpu_chunk_size 控制瞬时开销。它的长期价值是让机器人学习训练的瓶颈可被显式定位：当相机多、CPU worker 少时，GPU 原本有 63–68% 时间在等数据，搬迁后 H100/A100/L4 的样本吞吐在给定配置下提高约 2.8–3.3 倍；但 CPU 已能供满的 L4 反而变慢，说明这不是通用开关。局限还包括约 13 GB 的测试显存、JPEGCompression 仍会回 CPU、改变尺寸的增强不能在多样本 batch 中使用，而且整个证据只覆盖训练数据管线。下一步应在目标数据集上同时记录 GPU 利用率、samples/s、峰值显存、增强可视化、固定 seed 可重复性和最终策略指标；只有管线与策略质量都不退化，才值得默认开启。",
      source: "https://github.com/huggingface/lerobot/commit/b9cb121cb7d4e3e26ec5c906d08dda68d151ba52"
    },
    noise: "判断：ArtCraft 今天进入 GitHub Trending，视觉工作台和 2D/3D 场景控制值得观察，但其最新标记版本仍是 9 月 26 日，当前榜单热度本身不是今天的新技术发布；README 中的大量模型也来自第三方云服务。它可以作为产品体验候选，却不应仅凭 stars 被描述成本地生成模型或当日基础设施突破。"
  },
  {
    date: "2026-10-08",
    label: "OCT 08",
    pulse: "今天的强信号集中在本地推理与 Agent 运行边界：运行时补齐跨后端性能和 Windows 稳定性，编码 Agent、编辑器与计算机操作工具则把隔离、会话一致性、失败恢复和可审阅性放到了功能之前。",
    metrics: [
      { value: "6", label: "今日信号" },
      { value: "6", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "5", label: "Agent / 开发工具" }
    ],
    items: [
      {
        category: "本地 LLM 推理",
        level: "OCT 07 RELEASE · WINDOWS FIX",
        title: "Ollama v0.40.1：修复 Windows 大模型读取越界",
        summary: "补丁版修复 Clef 模型头部在 Windows 上读取超过 2 GiB 时的越界问题，并避免在 Windows 模型清单中使用符号链接；Apple MLX 路径也移除了已被上游吸收的 Metal residency 临时补丁。",
        why: "这是小版本但影响真实可用性，尤其适合在 Windows 上运行大文件模型的人。Ollama 仍提供 macOS、Windows、Linux 与部分 JetPack 构建，硬件和内存门槛取决于具体 GGUF/MLX 模型；本次没有统一性能提升声明，非 Clef 或非 Windows 用户无需仅因版本号急升级。",
        meta: ["MIT", "Windows / macOS / Linux", "2 GiB 读取修复 · 非性能大版本"],
        source: "https://github.com/ollama/ollama/releases/tag/v0.40.1"
      },
      {
        category: "AI 编程编辑器",
        level: "OCT 07 RELEASE",
        title: "Zed v1.23.2：Agent 会话状态与 MCP 工具结果更可靠",
        summary: "新增 idle Agent 线程保留上限，改进 ACP Agent 计划状态刷新与过载自动重试；并修复 MCP 可选字段被误判为必填、工具输出缺失或过期、旧响应清空新提示词，以及关闭中的外部 Agent 会话仍驻留内存等问题。",
        why: "这些变化不炫，但直接影响长时间编码会话是否可审阅、是否把旧状态误当新结果。版本还加入 JSONL/NDJSON 表格预览、远程 terminal.shell 和企业代理证书修复。适合已经用 Zed Agent/ACP 的用户升级验证；外部 Agent 的权限边界和费用仍由对应后端决定，编辑器修复不能替代仓库隔离与人工 review。",
        meta: ["GPL-3.0-or-later（部分 Apache-2.0）", "macOS / Linux / Windows", "ACP · MCP · 会话恢复"],
        source: "https://github.com/zed-industries/zed/releases/tag/v1.23.2"
      },
      {
        category: "计算机使用 Agent",
        level: "OCT 08 MAIN BRANCH · DAILY TRENDING",
        title: "Cua Driver：把‘后台点击’失败改成显式拒绝",
        summary: "今天的主分支连续修复后台 GUI 操作：当 LibreOffice 无法接收后台像素点击、Chromium 地址栏无法安全后台提交时直接拒绝；run_actions 也增加陈旧目标恢复、同名元素按角色消歧，并修复宿主机通过 HTTP 代理连接。",
        why: "这类失败语义比演示成功率更重要：Agent 若在错误窗口悄悄点击，后果往往比任务失败更糟。Cua Driver 可在 macOS、Windows、Linux 本地运行并通过 CLI/MCP/SDK 接入，Cua Bench 可先用模拟任务评测；但后台输入能力受应用与平台限制。仓库大部分为 MIT，Cua Spaces 属 FSL-1.1-MIT，模型和数据还需逐项核对许可。",
        meta: ["MIT / FSL 分区许可", "macOS / Windows / Linux", "显式失败 · 陈旧目标恢复"],
        source: "https://github.com/trycua/cua"
      },
      {
        category: "Agent 记忆",
        level: "OCT 06 RELEASE · DAILY TRENDING",
        title: "claude-mem v13.34.2：为提示缓存一致性撤回历史裁剪",
        summary: "修复 OpenRouter、Gemini 等 OpenAI 兼容观察器中的回归：此前每轮改写已发送的旧工具消息，导致提示前缀不再一致、缓存无法复用；新版停止在同一 generation 内裁剪历史，让后续请求只追加而不改写已发送前缀。",
        why: "这是 Agent 记忆系统常被忽略的工程问题：压缩上下文不一定省钱，若破坏 provider 的 prefix cache，反而会重复计费与增加延迟。项目需要 Node.js 20+，可本地观察或接 OpenRouter/Gemini/Anthropic；官方明确没有生产成本测量，且回归套件 881 项仍有 1 项既有 socket timing 失败，因此应先对自己的长会话测缓存命中、token 与隐私边界。",
        meta: ["Apache-2.0", "Node.js 20+", "前缀缓存 · 成本未实测"],
        source: "https://github.com/thedotmack/claude-mem/releases/tag/v13.34.2"
      },
      {
        category: "自托管 Git",
        level: "OCT 06 RELEASE · 相较 9/29 有新增",
        title: "Gitea v28.1.0：并发 repack 与数据库隔离细节补强",
        summary: "继 9 月 29 日收录 v28.0.0 后，维护版修复 go-git 在并发 repack 删除 pack 时的索引恢复与容错，并调整 MySQL/MariaDB 为 READ COMMITTED、MSSQL 为 READ_COMMITTED_SNAPSHOT；还补上多处 API/Web handler 检查和受保护分支 Actions 推送回归。",
        why: "对小团队自托管而言，这些是比新增页面更实际的可靠性改进，尤其是后台维护与 Web 请求同时访问仓库时。升级前仍应备份仓库与数据库，并在所用数据库上验证事务与 Actions；这是维护版而非安全公告，不能仅凭‘新增检查’推断存在已修复漏洞。",
        meta: ["MIT", "Go · 自托管", "并发 repack · DB 隔离"],
        source: "https://github.com/go-gitea/gitea/releases/tag/v28.1.0"
      },
      {
        category: "CLI / 终端",
        level: "OCT 08 MAIN BRANCH · DAILY TRENDING",
        title: "cmux：面向多编码 Agent 的原生 macOS 终端工作台",
        summary: "基于 Ghostty 的 Swift/AppKit 终端把多 Agent 会话放进垂直标签、分屏与统一通知面板，并附带可脚本化浏览器、CLI/socket API、SSH 工作区和 Git/PR 状态。今天的主分支修复了 Claude Computer Use MCP 守护进程认证、后台浏览器输入和启动崩溃。",
        why: "适合同时跑多条 Claude Code、Codex 或 OpenCode 会话、又不想进入重型编排平台的 macOS 用户；它的价值是注意力管理，不是替 Agent 提供权限隔离。当前是 macOS 原生应用，Linux/Windows 用户无法直接受益；README 标为 GPL，但 GitHub 元数据未识别 SPDX，发布包还捆绑 LGPL-2.1+ 的 gettext 组件，二次分发前需检查完整许可文件。",
        meta: ["macOS · Swift/AppKit", "Ghostty · 浏览器自动化", "许可需按包核对"],
        source: "https://github.com/manaflow-ai/cmux"
      }
    ],
    deepDive: {
      title: "今日深挖：Agent 记忆的成本问题，本质上是前缀不变性",
      text: "claude-mem 这次回退历史裁剪，说明上下文压缩并不天然等于成本下降：只要系统改写已经发送过的前缀，provider 的提示缓存就可能整体失效，后续每轮都重新计算。长期更可靠的设计应把不可变历史、可追加记忆和可重新生成的摘要分开，并为缓存命中、token、延迟和隐私建立真实测量。该项目没有给出生产成本结论，因此下一步应在自己的长会话上做 A/B：固定任务与模型，对比缓存命中率、输入 token、首 token 延迟、摘要偏差和本地保存边界。",
      source: "https://github.com/thedotmack/claude-mem/releases/tag/v13.34.2"
    },
    noise: "判断：agent-skills 今天在 Trending 很显眼，但仓库最近一次推送是 10 月 3 日，且技能文本本质上是工作流约束，不是隔离、评测或失败恢复能力本身。它可作为检查清单参考，却不应仅凭榜单热度被包装成今天出现的新 Agent 基础设施。"
  },
  {
    date: "2026-10-07",
    label: "OCT 07",
    pulse: "今天最清晰的趋势是‘可运行边界’正在变具体：生成工具公开了离线、显存与消费级 GPU 路径，推理服务补上重启与安全控制，机器人项目则开始主动标明仿真证据不能替代实机验收。",
    metrics: [
      { value: "5", label: "今日信号" },
      { value: "5", label: "本地可部署" },
      { value: "2", label: "具身进展" },
      { value: "1", label: "EDA 新工具" }
    ],
    items: [
      {
        category: "音视频生成",
        level: "OCT 06 OPEN SOURCE",
        title: "Kandinsky 6：同步视频与 44 kHz 音频的消费卡路径",
        summary: "新公开的 3B Lite 与 29B Pro 扩散模型可生成 5 秒同步音视频，支持文生音视频、图生音视频，并通过独立超分模块输出 1920×1080；仓库给出 RTX 4090、5060 Ti、5080、5090、A100 与 H100 的预设和基准。",
        why: "消费级 GPU 确实进入官方支持表，但离实时很远：官方热启动测试中，RTX 4090 生成 Lite Full HD 约 578 秒、Pro Full HD 约 1,247 秒，且不含载权重与 MP4 编码。要求 NVIDIA GPU、Python 3.13/3.14、CUDA 13；Ampere/Ada/消费级 Blackwell 还需本机 nvcc 编译 SageAttention。代码为 MIT，下载权重前仍应单独核对模型卡许可。",
        meta: ["MIT（代码）", "NVIDIA GPU · CUDA 13", "3B / 29B · 5 秒音视频"],
        source: "https://github.com/kandinskylab/kandinsky-6"
      },
      {
        category: "CAD 自动化",
        level: "OCT 06 RELEASE · DAILY TRENDING",
        title: "text-to-cad v0.7.15：给编码 Agent 一个可检查的 CAD 执行层",
        summary: "本地工具让 Claude Code、Codex、Cursor、Gemini 等 Agent 通过插件或 MCP 生成 STEP、GLB、STL、3MF，并提供参数化几何、DFM 检查和工程图。v0.7.15 增加封闭网格的圆角扫掠茶杯示例，并收紧按影响范围运行的 CI 与发布分支安装流程。",
        why: "它的价值不是保证一句话得到可制造零件，而是把 Agent 生成的 Python/几何操作落到 OpenCASCADE 与 build123d 的确定性执行链上。需要 Python 3.11+、Node.js 20+，首次运行会联网下载运行时；尺寸、公差、封闭性和 DFM 结果仍必须人工或脚本复核。",
        meta: ["MIT", "Python 3.11+ · Node 20+", "STEP / STL / 3MF · MCP"],
        source: "https://github.com/earthtojake/text-to-cad/releases/tag/v0.7.15"
      },
      {
        category: "EDA / 低功耗设计",
        level: "OCT 06 NEW REPOSITORY",
        title: "Power Intent Studio：把 RTL 层级与 UPF / CPF 放到同一张图上",
        summary: "新开源桌面工具可展开 Verilog、SystemVerilog、VHDL 和 Liberty 宏层级，交互定义电源域、供电集合、开关、隔离、保持、级联电平转换与电源状态表，并导入/导出 UPF 3.0/3.1 与 CPF 2.0/2.1。",
        why: "对低功耗 RTL 设计与评审很实用：仓库附带混合层级示例和约 2,500 个测试，但当前验证主要是规范对照、参考文件与自身往返，不等同于主流商业 EDA 的签核。Python 3.10+ 可在 Windows、Linux、macOS 运行；VHDL 额外依赖 GHDL 与 ghdl-yosys-plugin。代码 Apache-2.0，但打包分发还要考虑依赖许可。",
        meta: ["Apache-2.0", "Verilog / SystemVerilog / VHDL", "UPF 3.1 · CPF 2.1"],
        source: "https://github.com/mikespyke17/power-intent-studio"
      },
      {
        category: "机器人学习评测",
        level: "OCT 05 NEW REPOSITORY · 仿真",
        title: "OCBench：面向离线到在线控制的可扩展操控基准",
        summary: "新公开基准提供 5 类环境、28 个操控任务，覆盖状态与像素观察、行为克隆与强化学习；接口兼容 Gymnasium，默认用 MJWarp 做 GPU 并行，也提供 CPU MuJoCo 变体和可自动下载/生成的数据集。",
        why: "它适合比较数据驱动控制算法，示例可并行运行 1,024 个环境，CPU 版也能低门槛试用。必须明确：这是 UR5e + Robotiq 2F-85 描述上的仿真基准，没有真实机器人闭环或 sim-to-real 成功证据；像素版、GPU 吞吐和训练结果应按自己的硬件重新测。",
        meta: ["MIT · Python 3.10+", "MuJoCo / MJWarp", "28 tasks · 仿真无实机"],
        source: "https://github.com/seohongpark/ocbench"
      },
      {
        category: "低成本机器人 / 强化学习",
        level: "OCT 06 NEW REPOSITORY · 仿真验证",
        title: "MicroDuck HD1910M：板端运行链完整，但动作验收仍在仿真",
        summary: "围绕 Radxa ZERO 3W、15 个飞特 HD1910M 舵机、BNO08x IMU 与 CSI 相机构建，公开 Rust 底层/后端、MuJoCo 与 RL 训练、四个 ONNX 动作模型、ARM64 运行包和 Android APK，并给出布线、零位、模型哈希和部署步骤。",
        why: "可复现细节较多，但仓库自己也明确：当前起身与翻滚证据是 App 触发的独立仿真，其他倒地初态未全部通过，不能宣称实机或全工况验收；默认 API 无令牌，只应放可信局域网。Linux 板端需 glibc 2.35+、Rust 1.89 与实际校准文件；仓库未声明许可证，第三方权重再分发/商用也需逐项确认。",
        meta: ["许可证未声明", "Radxa ZERO 3W · ARM64", "MuJoCo 验证 ≠ 实机验收"],
        source: "https://github.com/zhuoligetu123/microduck-hd1910m"
      }
    ],
    deepDive: {
      title: "今日深挖：Power Intent Studio 把低功耗意图从 Tcl 文本变成可审查结构",
      text: "它最有价值的地方，是把 RTL/Liberty 层级、电源域、隔离、保持和电源状态表放到同一个可视模型里，再导入导出 UPF/CPF；这让低功耗意图更容易进入代码评审和自动化回归。局限是当前证据主要来自规范对照、示例和自身往返测试，不等同于商业 EDA 的语义一致性或签核。下一步应选一个真实混合语言模块，在工具与现有 EDA 间双向往返，逐项核对层级绑定、域边界、隔离/保持条件和错误诊断，再决定是否进入正式流程。",
      source: "https://github.com/mikespyke17/power-intent-studio"
    },
    noise: "判断：DeepGEMM 今天进入 GitHub Trending 很显眼，但仓库最近一次推送仍停在 9 月 30 日，当前榜单位置本身不是 24–72 小时内的新技术进展。它仍值得关注内核质量，却不应仅凭当日 stars 或排名重复包装成‘今天发布’。"
  },
  {
    date: "2026-10-06",
    label: "OCT 06",
    pulse: "这一天的主线是本地 AI 工具从“支持更多模型”进入“统一执行语义与可恢复工作流”：图像工具补离线边界，推理运行时重做批处理，多 Agent 控制台开始认真处理监听地址与会话密钥。",
    metrics: [
      { value: "5", label: "今日信号" },
      { value: "5", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "2", label: "视觉工具链" }
    ],
    items: [
      {
        category: "本地 LLM 推理",
        level: "OCT 06 RELEASE（中国时区）",
        title: "llama.cpp v0.6.0：统一 token、embedding 与状态批处理",
        summary: "扩展 batch API 新增 llama_process，可在同一批次处理 token、embedding 与 MTP/deepstack 状态；同时支持 GLM-5.3-Flash、Clef 视觉决策模型、Qwen4Exp MTP，并升级 ggml 0.26。",
        why: "Metal、Vulkan、CUDA、WebGPU、OpenCL、SYCL、Hexagon 与 Windows ARM64 都有新增路径；官方报告 Apple GPU 小批量矩阵内核最高约 3×，但该数字不是所有模型的端到端速度。session/state 版本与 C API 同时变化，嵌入式应用应先验证旧会话恢复、批尺寸、峰值内存和数值一致性。",
        meta: ["MIT", "CPU / Metal / CUDA / Vulkan / WebGPU", "API 与 session 格式变更"],
        source: "https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0"
      },
      {
        category: "图像 / 视频生成",
        level: "OCT 06 RELEASE（中国时区）",
        title: "ComfyUI v0.39.0：离线开关与模型资产库加固",
        summary: "加入 --offline 与 --disable-partner-nodes，自动在集成显卡上关闭 pinned memory；修复 Qwen-Image 2.1 int8/int4 缓存崩溃、MiniMax H3 VAE 卸载，并改善 16-bit EXR、视频保存和资产扫描事务。",
        why: "对本地优先用户，明确关闭联网节点比新增云模型更重要。Windows、Linux、macOS 都能使用，显存取决于模型与量化；升级前仍需备份环境并检查自定义节点，因为前端和资产数据库改动较多。",
        meta: ["GPL-3.0", "Windows / Linux / macOS", "离线模式 · int8/int4 修复"],
        source: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.39.0"
      },
      {
        category: "扩散模型工具链",
        level: "OCT 06 RELEASE",
        title: "Diffusers v0.41.0：Qwen-Image 2.1 与分片加载",
        summary: "集成 Qwen-Image 2.1 的文生图、编辑、多参考图、原生 RGBA、LoRA 训练与单文件加载；另加入 LTX-2.5 DFR、Cosmos 3 SeaCache 和 W8A8/W8A16 去噪。",
        why: "张量并行加载让每个 rank 只读取自己的权重分片，降低加载阶段内存，但它仍是 Python/PyTorch 工具链而非一键桌面应用。ONNX 支持已弃用，依赖 ONNX Runtime 的现有流程应迁移到 Optimum 并做兼容回归。",
        meta: ["Apache-2.0", "Python / PyTorch", "Qwen-Image 2.1 · TP 分片加载"],
        source: "https://github.com/huggingface/diffusers/releases/tag/v0.41.0"
      },
      {
        category: "编码 Agent",
        level: "OCT 06 RELEASE",
        title: "OpenHands v1.25.0：多后端控制台补齐会话边界",
        summary: "Agent Canvas 增加批量模型配置、启动时模型路由、服务端工具目录和原生 Git 自动化入口，并修复移动端 WebSocket、云端限流、委派任务追踪和监听地址上的会话密钥暴露。",
        why: "它能本地、Docker、VM 或远端运行 OpenHands、Claude Code、Codex、Gemini 与 ACP Agent。无沙箱模式会让 Agent 直接访问主机文件；多 Docker 对话隔离执行，但共享同一宿主工作区仍会冲突，应该配独立目录或 worktree。",
        meta: ["MIT", "Node.js 24+ · Docker 可选", "loopback 会话密钥 · 工作区隔离"],
        source: "https://github.com/OpenHands/OpenHands/releases/tag/v1.25.0"
      },
      {
        category: "CLI / 终端",
        level: "OCT 06 RELEASE（中国时区）",
        title: "Lazygit v0.66.0：分支栈操作进入主视图",
        summary: "可直接在主视图 stage、unstage、discard，按栈顺序展示分支，并一次推送重写后的分支栈；还可判断分叉来自本地重写还是上游重写，并在不 checkout 的情况下快进分支。",
        why: "适合频繁 rebase、worktree 与 stacked branches 的终端用户。新版同时加入动态深浅主题和更准确的提交图字符，但批量推送/丢弃仍是高影响操作；应先在非关键仓库熟悉确认提示和自定义键位。",
        meta: ["MIT", "Windows / Linux / macOS", "分支栈 · worktree · TUI"],
        source: "https://github.com/jesseduffield/lazygit/releases/tag/v0.66.0"
      }
    ],
    deepDive: {
      title: "今日深挖：llama.cpp 的 v0.6 不只是新增模型",
      text: "扩展 batch API 把 token、embedding 与每 token 状态放进同一执行语义，为 MTP、多模态和 decision-model 服务端接口提供共同基础；ggml 0.26 再把稀疏注意力、W4A4、BF16 与移动 DSP 后端向下铺开。长期价值在统一，而风险也来自统一：API、session 格式和多个后端同时改变。下一步最值得做的是在固定量化文件上对照 v0.5/v0.6 的首 token、持续吞吐、会话恢复和峰值内存，而不是只跑一次启动测试。",
      source: "https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0"
    },
    noise: "判断：把“新增某个 300B+ 模型支持”直接解读为普通电脑可部署，是这一天最容易出现的误导。运行时能识别模型结构，不等于消费级内存、带宽和量化质量已经满足实际使用。"
  },
  {
    date: "2026-10-05",
    label: "OCT 05",
    pulse: "这一天值得关注的不是单纯提速，而是服务恢复、仿真物理语义和开发环境秘密管理都开始把失败模式写进正式版本。",
    metrics: [
      { value: "5", label: "今日信号" },
      { value: "4", label: "本地可部署" },
      { value: "1", label: "具身进展" },
      { value: "2", label: "可靠性更新" }
    ],
    items: [
      {
        category: "LLM 推理服务",
        level: "OCT 05 RELEASE",
        title: "vLLM v0.31.0：GPU 权重常驻与请求隔离",
        summary: "新增 vllm preload 权重缓存守护进程，让量化后权重跨引擎重启保留在 GPU；另有实验性 CRIU 初始化快照、更多推测解码、并行调度和 KV 压力控制。",
        why: "生产价值还包括默认拒绝每请求多模态处理参数、补强 prefix cache 与 LoRA 路径隔离。提供 CUDA 13/12.9、ROCm、XPU、CPU 和 macOS CPU 构建，但破坏性变更多；应先测重启时间、常驻显存、p95 延迟、并发和失败回滚。",
        meta: ["Apache-2.0", "GPU / CPU 服务端", "preload · CRIU · 安全边界"],
        source: "https://github.com/vllm-project/vllm/releases/tag/v0.31.0"
      },
      {
        category: "机器人仿真",
        level: "OCT 05 RELEASE · 仿真",
        title: "MuJoCo 3.15.0：执行器阻尼语义发生破坏性变化",
        summary: "dampratio 改用运行点 qpos0 的操作空间惯量，纳入耦合、腱和 armature；同时加入实验性 Stable Neo-Hookean 3D 柔性体、胶囊 multicontact、insidesite protrusion 传感，以及超过 2 GiB 模型序列化支持。",
        why: "这会改变多关节链、腱和 site actuator 的实际阻尼，旧策略即使代码能跑，动态响应也可能不同。它是仿真引擎更新，不代表真实机器人性能；迁移前应对相同初态、控制器增益、能量和接触轨迹做回归，并单独标注 sim-to-real 重新验证。",
        meta: ["Apache-2.0", "CPU / GPU 仿真", "dampratio breaking change · 非实机"],
        source: "https://github.com/google-deepmind/mujoco/releases/tag/3.15.0"
      },
      {
        category: "开发环境",
        level: "OCT 05 RELEASE",
        title: "mise v2026.10.3：秘密不再进入会话差异与环境缓存",
        summary: "秘密值改为在 __MISE_DIFF / __MISE_SESSION 中保存摘要，包含秘密的环境不再写入 env cache；同时加入 Stow 风格 dotfile groups、可模板化 Compose bootstrap 和冲突检测。",
        why: "适合用同一工具管理语言版本、任务、dotenv、机器初始化和 dotfiles 的团队。摘要仍不是 keyed hash，低熵秘密理论上可被猜测；旧 shell 会在下一次提示符重写状态，升级后仍应检查进程环境、缓存目录和插件的 redact 行为。",
        meta: ["MIT", "Windows / Linux / macOS", "secret cache · dotfile groups"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.10.3"
      },
      {
        category: "计算机使用 Agent",
        level: "OCT 05 RELEASE",
        title: "Cua SDK v0.4.1：跨进程 token refresh 改为 single-flight",
        summary: "补丁将认证 token 刷新合并为跨进程 single-flight，并保持已有 session 存活，降低多个 Agent/工作进程同时刷新导致的竞态和重复认证。",
        why: "这是小改动但直接关系长任务可靠性，尤其是本地 sandbox、桌面驱动和并发 Agent 共用凭据时。Cua SDK/Driver 主体可本地运行，许可按组件区分；认证稳定不等于操作权限安全，仍要限制可见目录、桌面会话和网络出口。",
        meta: ["MIT 为主 · 组件许可分区", "Python / TypeScript / Rust", "认证竞态修复"],
        source: "https://github.com/trycua/cua/releases/tag/cua-sdk-v0.4.1"
      },
      {
        category: "CLI / 基准测试",
        level: "OCT 05 RELEASE",
        title: "hyperfine v1.21.0：峰值内存与导出统计更可信",
        summary: "Unix 上改为逐命令采集峰值内存，Windows 保留 100ns CPU 时间精度；修复 reference 导出比较、Welch t-test 解读、负 parameter step 导致的挂起与导出残留字节。",
        why: "适合比较编译器、CLI、推理启动或数据处理命令，但它测的是进程级命令，不自动解释缓存、热身和 GPU 异步。新版提供 Windows ARM64 与 Linux ARM64 musl 构建；建议显式设置 warmup、随机化顺序和固定输入。",
        meta: ["Apache-2.0 / MIT", "Windows / Linux / macOS", "峰值内存 · 统计修复"],
        source: "https://github.com/sharkdp/hyperfine/releases/tag/v1.21.0"
      }
    ],
    deepDive: {
      title: "今日深挖：vLLM 的快速重启是一种状态管理能力",
      text: "preload 的核心不是让稳态推理更快，而是把“已量化权重”从单个引擎生命周期中抽离出来，让更新与故障恢复少付一次装载成本；CRIU 快照则进一步尝试恢复已初始化引擎。局限是常驻权重会长期占用 GPU，快照仍实验性且范围有限。建议用真实模型记录冷启动、preload 重启、显存驻留、并发 p95 和回滚五组数据，再决定是否用于生产。",
      source: "https://github.com/vllm-project/vllm/releases/tag/v0.31.0"
    },
    noise: "判断：把“快速重启”当成“更低稳态显存”是误读。权重缓存恰恰依赖显存常驻，价值在恢复时间，不是空闲资源占用。"
  },
  {
    date: "2026-10-04",
    label: "OCT 04",
    pulse: "这一天的共同主题是可恢复性：视觉工具把项目状态与导出放进工作台，Python/Node 工具开始支持只靠锁文件复现，异步运行时则集中修补关停、锁与溢出边界。",
    metrics: [
      { value: "5", label: "今日信号" },
      { value: "5", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "2", label: "工具链修复" }
    ],
    items: [
      {
        category: "图像 / 视频生成",
        level: "OCT 04 ALPHA",
        title: "InvokeAI 7.0 alpha 1：生成、画布、视频与超分合并为工作台",
        summary: "新项目模型会保存画布、生成设置、工作流、队列和独立图库；可导出 .invk。新 Canvas 支持图层组、16 种混合模式、非破坏调整、压感笔刷、选择、文字、自定义字体、历史回看与 PSD 导出，Video 面板覆盖 MiniMax H3 与 LTX-2.5 音视频路径。",
        why: "这是对本地视觉工作流的重大重构，但明确属于 alpha。v7 需要 Python 3.12，数据库迁移不可回退给 v6；测试必须使用全新 root，不能指向现有生产图库。显存仍由所选图像/视频模型决定，界面统一不等于低配硬件能运行所有模型。",
        meta: ["Apache-2.0", "Python 3.12 · 本地 GPU", "alpha · 数据库迁移单向"],
        source: "https://github.com/invoke-ai/InvokeAI/releases/tag/v7.0.0-alpha.1"
      },
      {
        category: "Python 工具链",
        level: "OCT 04 RELEASE（中国时区）",
        title: "uv 0.12.23：只靠 uv.lock 做 frozen 恢复",
        summary: "预览功能允许在没有 workspace manifest 时，用 frozen-lockfile 对 uv.lock 执行 sync、export、tree 与 workspace metadata；同时加入 CPython 3.15 rc3。",
        why: "适合构建产物或缓存层只携带锁文件的复现流程。该能力仍是 preview，且锁文件无法替代业务配置与私有索引凭据；Windows ARM64 上还修复了 x86-64 Python 仿真环境误编译 win_amd64 wheel 的问题。",
        meta: ["Apache-2.0 / MIT", "Windows / Linux / macOS", "frozen lockfile · preview"],
        source: "https://github.com/astral-sh/uv/releases/tag/0.12.23"
      },
      {
        category: "Node.js 工具链",
        level: "OCT 04 RELEASE（中国时区）",
        title: "pnpm v12.9.1：WebContainer WASM 拆包，主包回到约 4 MB",
        summary: "StackBlitz WebContainer 的 WASM 构建独立为 @pnpm/wasm，pnpm 主包从约 55 MB 回到约 4 MB；同时修复 GitLab CI provenance 发布、私有 registry 重定向 TLS 和 frozen lockfile 兼容。",
        why: "浏览器容器需显式安装 @pnpm/wasm，原生环境仍使用本地可执行文件。对 monorepo 和 CI，包体缩小是真实收益，但这是安装分发变化；升级前要核对 WebContainer 镜像与自更新策略，避免同时存在 Homebrew 与自更新副本。",
        meta: ["MIT", "Node.js / WebContainer", "WASM 拆包 · provenance"],
        source: "https://github.com/pnpm/pnpm/releases/tag/v12.9.1"
      },
      {
        category: "异步运行时",
        level: "OCT 04 RELEASE",
        title: "Tokio 1.53.2：集中修补关停、锁与 mpsc 边界",
        summary: "修复 buffered relative seek 整数溢出、Windows child handle 关闭前未注销 wait、blocking pool 关停锁顺序、mpsc 索引回绕与 Permit 发送，以及 timer/waker 在锁内释放的问题。",
        why: "这些不是普通依赖刷新：它们落在高并发服务最难复现的停机、取消和 wraparound 路径。使用 Tokio 进程、文件 I/O、定时器或 channel 的服务应升级后跑关停与压力测试；io_uring 与 taskdump 的若干修复仍属于 unstable。",
        meta: ["MIT", "Rust · 跨平台", "shutdown · mpsc · timer"],
        source: "https://github.com/tokio-rs/tokio/releases/tag/tokio-1.53.2"
      },
      {
        category: "终端 / Shell",
        level: "OCT 04 RELEASE",
        title: "Nushell 0.116.1：跨平台修复版",
        summary: "0.116.1 为 Windows、Linux、macOS 提供完整构建，是 0.116 系列的补丁版本，重点修补前一版本的回归并更新依赖要求说明。",
        why: "适合把表格化数据管道作为日常 shell 的用户，但官方简短 release note 没有给统一性能数据。它是跨平台可直接下载的维护版；依赖外部插件或自定义命令的环境应先在副本配置中验证兼容。",
        meta: ["MIT", "Windows / Linux / macOS", "结构化数据 Shell"],
        source: "https://github.com/nushell/nushell/releases/tag/0.116.1"
      }
    ],
    deepDive: {
      title: "今日深挖：InvokeAI 7 把生成工具改造成可恢复项目系统",
      text: "它不再把生成、画布、工作流、视频和超分视为互不相干的页面，而是把它们放进一个可自动保存、可导出的项目状态中；这比单纯新增模型更接近长期创作工具。风险同样清楚：数据库迁移不可逆、界面和画布引擎重写、alpha 明示会破坏数据。最合理的下一步是在新 root 中导入一套非关键工作流，测试崩溃恢复、双窗口同步、PSD/.invk 导出和显存峰值，绝不原地升级 v6。",
      source: "https://github.com/invoke-ai/InvokeAI/releases/tag/v7.0.0-alpha.1"
    },
    noise: "判断：把 InvokeAI 7 alpha 当成可直接替换 v6 的稳定升级，会低估单向数据库迁移和新画布引擎的风险。功能跨度大不等于迁移成本小。"
  },
  {
    date: "2026-10-03",
    label: "OCT 03",
    pulse: "这一天的高价值更新主要在“输入不可信”这条线上：推理运行时修内存越界，包管理器修凭据重定向，自托管相册和视觉训练工具则补数据一致性与恢复路径。",
    metrics: [
      { value: "5", label: "今日信号" },
      { value: "5", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "2", label: "安全修复" }
    ],
    items: [
      {
        category: "端侧模型运行时",
        level: "OCT 03 RELEASE（中国时区）",
        title: "ONNX Runtime 1.28.3：集中修复内存安全与图校验",
        summary: "修复 EmbedLayerNormalization shape inference 越界、sub-byte buffer 复用造成 heap overflow、Loop/Scan initializer 越界，以及 ConvTransposeWithDynamicPads 等路径；同时拒绝不合法 graph/subgraph 结构。",
        why: "这类补丁对桌面、移动和边缘部署比新增算子更重要，因为模型文件可能来自外部。版本还修复 plugin EP 单 tensor 传输的 stream 保留，并补 ARM64、Android、NuGet 等打包基础设施；采用方应重新跑模型加载、恶意/损坏模型和目标 EP 回归。",
        meta: ["MIT", "CPU / GPU / NPU / Mobile", "内存安全 · 模型校验"],
        source: "https://github.com/microsoft/onnxruntime/releases/tag/v1.28.3"
      },
      {
        category: "Node.js 工具链",
        level: "OCT 03 RELEASE（中国时区）",
        title: "pnpm v12.9.0：登录凭据不再随跨域重定向转发",
        summary: "pnpm login 修复把请求体凭据转发到另一 origin 的问题；同时加入 per-registry networkConcurrency、StackBlitz WebContainer WASM 路径和更完整的 store 项目记录。",
        why: "安全修复影响使用私有 registry、镜像与 SSO 重定向的开发环境。新版也修复 Android store lock、frozen lockfile、hoisted filtered install 和 optional dependency 失败处理；升级后应检查内部 registry 的重定向与 CA 配置。",
        meta: ["MIT", "Node.js · 跨平台", "credential redirect · registry 限流"],
        source: "https://github.com/pnpm/pnpm/releases/tag/v12.9.0"
      },
      {
        category: "自托管相册",
        level: "OCT 03 RELEASE CANDIDATE",
        title: "Immich v3.3.0-rc.2：ML 内存路径与移动备份继续收敛",
        summary: "设置 MACHINE_LEARNING_MODEL_REVISION=v2 可启用新内存/性能路径；RC2 修复 TensorRT-RTX session 串行化、half-precision 空数组、OpenVINO 2026.4.1，以及 iOS 后台批次、重复上传、缩略图和共享相册信息。",
        why: "适合愿意测试的人，不适合直接覆盖家庭唯一图库。官方明确是 RC，要求先备份数据库和媒体库；服务端用 Docker Compose，移动端通过 APK/TestFlight。性能和内存收益未给统一硬件基准，应在副本库测人脸识别、视频转码和后台同步。",
        meta: ["AGPL-3.0", "Docker · Android / iOS", "RC · ML revision v2"],
        source: "https://github.com/immich-app/immich/releases/tag/v3.3.0-rc.2"
      },
      {
        category: "开发环境",
        level: "OCT 03 RELEASE",
        title: "mise v2026.10.1：超时与 Ctrl-C 真正终止任务树",
        summary: "mise run --timeout 现在停止实际任务，Windows 使用 taskkill /F /T；单次 Ctrl-C 允许任务清理后以 130 退出。还修复 Windows daemon、Node IPC shim、Rust lockfile 和 GitHub asset 误选 sidecar。",
        why: "对把 mise 当任务编排器的项目，这是失败恢复而不是小体验改进。raw=true 任务不受整轮 timeout 终止，Windows daemon 还依赖新版 pitchfork；升级后应专测嵌套任务、Docker Compose、Ctrl-C 与超时后的孤儿进程。",
        meta: ["MIT", "Windows / Linux / macOS", "timeout · Ctrl-C · daemon"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.10.1"
      },
      {
        category: "视觉模型部署",
        level: "OCT 03 RELEASE",
        title: "Ultralytics 8.4.172：OBB 裁剪、AMP 匹配与 INT8 校准修复",
        summary: "旋转框 crop 现在按 OBB 对齐；RT-DETR Hungarian cost 改用 float32 避免 AMP 精度误配，AIFI 修非方形特征图，NaN 恢复与 resume 状态也得到修正；小数据集可完成 OpenVINO INT8 calibration。",
        why: "适合检测、跟踪和边缘导出的工程用户，特别是 OBB 与小样本校准。JetPack 5 Docker 的 OpenBLAS NaN 也有修复；Ultralytics 采用 AGPL/企业双轨许可，商用集成需核对条款，且这些修复不等于所有任务精度提升。",
        meta: ["AGPL-3.0 / 企业许可", "Python · JetPack / OpenVINO", "OBB · INT8 · AMP"],
        source: "https://github.com/ultralytics/ultralytics/releases/tag/v8.4.172"
      }
    ],
    deepDive: {
      title: "今日深挖：ONNX Runtime 把模型文件当成不可信输入",
      text: "1.28.3 的多个修复都发生在执行之前：shape inference、sub-byte buffer、Loop/Scan initializer 和非法子图校验。这说明端侧运行时的攻击面不只在算子执行，加载、推断形状和内存复用同样关键。对接收用户模型或自动下载模型的应用，下一步应把模型 hash、来源、最大尺寸、加载超时和崩溃隔离纳入部署流程，并用损坏模型做负向测试。",
      source: "https://github.com/microsoft/onnxruntime/releases/tag/v1.28.3"
    },
    noise: "判断：Immich RC 的“内存/性能改进”容易被理解为稳定版收益，但官方没有给统一硬件基准且明确要求备份。RC 适合验证，不适合把家庭唯一图库当测试环境。"
  },
  {
    date: "2026-10-02",
    label: "OCT 02",
    pulse: "这一天最强的信号来自开发工具供应链：项目级信任、签名身份、锁文件哈希和 Agent 团队状态压缩开始成为默认工程问题，而不是事后补丁。",
    metrics: [
      { value: "5", label: "今日信号" },
      { value: "5", label: "本地可部署" },
      { value: "0", label: "具身进展" },
      { value: "2", label: "供应链修复" }
    ],
    items: [
      {
        category: "开发环境",
        level: "OCT 02 SECURITY RELEASE（中国时区）",
        title: "mise v2026.10.0：补上 .tool-versions 信任与签名身份校验",
        summary: "带 inline options 的 .tool-versions 现在必须显式 trust，避免恶意 api_url 把 GITHUB_TOKEN 发往其他主机；keyless cosign 会核对固定 signer identity，GitHub attestation workflow 匹配也改为路径段锚定。",
        why: "这是实际供应链修复，不只是新功能。使用 mise 管理 GitHub/aqua 工具和 CI 安装的用户应尽快升级并审计已信任项目；MISE_SAFE=1 仍会跳过 trust 检查，不应作为日常默认。版本还修复 musl、SLSA lock 和 backend switch。",
        meta: ["MIT", "Windows / Linux / macOS", "GHSA · cosign · attestation"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.10.0"
      },
      {
        category: "Python 工具链",
        level: "OCT 02 RELEASE（中国时区）",
        title: "uv 0.12.22：workspace group 信息进入锁文件",
        summary: "锁文件开始记录 workspace member 的默认 dependency groups 与 Python 要求，frozen sync 会使用各成员记录的默认组；重新锁定时也会校验未变化 requirement 的既有 hash。",
        why: "这让 monorepo 的 CI 与本地环境更接近可复现，但不是自动安全审计。版本加入 CPython 3.10.22–3.14.8 和 UV_PYTHON_ARCH，覆盖 Windows ARM64 等场景；构建 uv 本身的最低 Rust 版本升至 1.97，使用源码构建者要先升级工具链。",
        meta: ["Apache-2.0 / MIT", "Windows / Linux / macOS", "lock hash · workspace groups"],
        source: "https://github.com/astral-sh/uv/releases/tag/0.12.22"
      },
      {
        category: "Python 工具链",
        level: "OCT 02 RELEASE（中国时区）",
        title: "Ruff 0.16.10：不在不可信工作区自动运行 uv format",
        summary: "Ruff server 停止在未信任工作区触发 uv format，并降低 diagnostics 内存；新增 Python 3.15 支持和 context-manager iterator annotation 预览规则。",
        why: "编辑器打开陌生仓库时，自动调用外部工具会扩大执行面，这项默认行为修正比新增 lint 规则更重要。预编译包覆盖 Windows、Linux、macOS 与多种架构；自己编译则要求 Rust 1.97+。",
        meta: ["MIT", "Windows / Linux / macOS", "untrusted workspace · LSP"],
        source: "https://github.com/astral-sh/ruff/releases/tag/0.16.10"
      },
      {
        category: "编码 Agent",
        level: "OCT 02 RELEASE",
        title: "Cline CLI 3.0.68：长时间 Agent Team 状态不再无限膨胀",
        summary: "团队成员流式输出时不再为每个 chunk 重写整份 team state；旧行为会让运行逐渐变慢，并让 ~/.cline/data/db/teams.db 增长到 GB 级。升级后首次打开会自动 compact 既有数据。",
        why: "这直接影响多 Agent 长任务的成本与失败恢复，而不是单纯换模型目录。自动压缩前仍应备份关键会话；模型目录默认值的变化不代表团队协作质量提升，权限、工作区冲突和任务回滚仍需单独设计。",
        meta: ["Apache-2.0", "CLI · 本地状态库", "Agent Team · 自动 compact"],
        source: "https://github.com/cline/cline/releases/tag/cli-v3.0.68"
      },
      {
        category: "计算机使用 Agent",
        level: "OCT 02 RELEASE（中国时区）",
        title: "Cua Sandbox 0.9.0：默认改为本地执行",
        summary: "Sandbox.create 改为默认 local，底层迁移到统一 Cua SDK，并移除 localhost module、computer_server 以及旧 http/local/websocket transports。",
        why: "默认本地有利于离线和数据边界，但这是 breaking change：依赖远端 sandbox 或旧 transport 的代码必须显式 local=False 并迁移 API。运行位置改变不等于权限自动收紧，仍要限制挂载目录、网络与桌面控制能力。",
        meta: ["MIT 为主 · 组件许可分区", "本地 sandbox", "breaking API change"],
        source: "https://github.com/trycua/cua/releases/tag/sandbox-v0.9.0"
      }
    ],
    deepDive: {
      title: "今日深挖：mise 的修复说明“签过名”不等于“签对人”",
      text: "旧 keyless cosign 路径只确认 bundle 能追溯到 Fulcio，任何 GitHub Actions workflow 都可能拿到这种证书；新版本才把 registry 声明的 signer identity、issuer 和 workflow 信息真正用于核验。配合 .tool-versions trust 修复，这提醒我们供应链验证至少要回答三个问题：谁签的、为哪个仓库/工作流签的、项目配置是否被用户信任。下一步应升级 mise、清点 trust 列表，并复核 MISE_SAFE 与 CI 中的例外。",
      source: "https://github.com/jdx/mise/releases/tag/v2026.10.0"
    },
    noise: "判断：Cline 同期更新的模型目录很容易吸引注意，但真正重要的是 team state 从 GB 级膨胀中恢复。模型名称变化不是 Agent 可靠性证据，状态持久化、隔离和回滚才是。"
  },
  {
    date: "2026-10-01",
    label: "OCT 01",
    pulse: "今天最明显的信号不是更大的模型，而是更可验证的执行层：视觉工具在压缩显存与提高确定性，LLM 运行时持续细化 GPU、WebGPU 与移动 DSP 路径，FPGA 项目则把物理采样和原始证据一起公开。",
    metrics: [
      { value: "8", label: "今日信号" },
      { value: "4", label: "本地可部署" },
      { value: "2", label: "硬件项目" },
      { value: "1", label: "具身进展" }
    ],
    items: [
      {
        category: "图像 / 视频生成",
        level: "SEP 29 RELEASE · 非今日发布",
        title: "ComfyUI v0.38.0",
        summary: "本地节点式生成工作流的大版本更新：改进 Qwen Image 2.1 的 KV 缓存位置、Transformer 编译、Tiny VAE 与 Union ControlNet，加入 w6a8 量化、NPU 异步权重卸载，并优化 SeedVR2、Lumina、Ming-image 和 Wan ID-V2V/VACE 路径。",
        why: "它把今天最相关的几条线索集中到一个成熟入口：更低内存、更灵活量化、图像修复/放大和视频工作流。Windows、Linux、macOS 均可本地运行，但显存取决于具体模型与量化；升级前应备份环境并核对自定义节点兼容性，因为同一版本也包含 API 节点和前端依赖更新。",
        meta: ["GPL-3.0", "Windows / Linux / macOS", "w6a8 · Tiny VAE · NPU offload"],
        source: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.38.0"
      },
      {
        category: "视频工具",
        level: "SEP 30 RELEASE · TRENDING",
        title: "HyperFrames v0.8.99",
        summary: "把 HTML、CSS、媒体和可寻址动画确定性渲染成 MP4 的开源框架，提供本地 CLI 与面向 Agent 的工作流。新版本修复 Studio 中拖拽、旋转、裁剪、时间线移动和场景视频帧同步，并避免读取半写入的项目文件。",
        why: "适合把产品演示、讲解、字幕和 PR 变更自动做成可重复渲染的视频；Node.js 22+ 即可起步，Linux 版还固定了静态 FFmpeg。它不是文本生成视频模型，价值在可编辑、可重跑的渲染层；本地安装仍依赖浏览器/FFmpeg 工具链，快速迭代期要留意项目格式变化。",
        meta: ["Apache-2.0", "Node.js 22+ · 本地 CLI", "确定性渲染 · 非生成模型"],
        source: "https://github.com/heygen-com/hyperframes/releases/tag/v0.8.99"
      },
      {
        category: "FPGA / SystemVerilog",
        level: "SEP 30 PHYSICAL VALIDATION",
        title: "Open RF IP：可移植 DDS / FMCW Chirp",
        summary: "一套厂商无关的 SystemVerilog DDS/NCO 与 FMCW chirp 软核，在 Lattice CrossLink-NX LIFCL-40-EVN 上以 12 MHz 实测；通过 FT2232H 读取前 1,024 个 I/Q 样本，与独立 Python 模型逐样本完全一致。",
        why: "证据链难得完整：147 个测试、16 个 RTL/板卡运行器，公开原始二进制和 CSV；实现占 349 COMB、155 FF、3 EBR、0 DSP。nextpnr 给出的约 198.93 MHz 只是估算而非实测上限，验证也仅覆盖数字输出前缀，尚未测 DAC、频谱与相噪；仓库未声明许可证，复用前必须先确认授权。",
        meta: ["CrossLink-NX LIFCL-40", "Verilator · Yosys · nextpnr", "实板 1,024 样本 bit-exact"],
        source: "https://github.com/Cortex-Wave-Research/open-rf-ip"
      },
      {
        category: "FPGA / 边缘视觉",
        level: "SEP 30 VERIFIED PACKAGE",
        title: "VWW_B8：INT8 MobileNetV1 全网络上板",
        summary: "在 Kintex UltraScale+ xcku3p 上实现 96×96 的 INT8 MobileNetV1 人体存在检测，公开 bitstream、UART 程序、XSA 与模型哈希；20 张实图上板时，620 个逐层 CRC 和 80 个最终 INT8 输出均与 TFLite 参考一致。",
        why: "核心推理约 33.55 ms/图，但 115200 波特率 UART 上传与回传平均约 4.65 秒；20 张样本只得到 85% 准确率、70% person recall，不能代表通用精度。流程依赖 Vivado/Vitis/HLS 2020.1 和匹配板卡，本次包保留既有验证而非重新综合；未声明许可证，也未提供浮点训练权重。",
        meta: ["Kintex UltraScale+", "INT8 · 31 operators", "实板逐层 CRC 一致"],
        source: "https://github.com/Mosen-zhou/VWW_B8"
      },
      {
        category: "具身智能",
        level: "SEP 30 EXPERIMENTAL",
        title: "JEV Sees v0.1.0",
        summary: "一个面向机器人场景状态的视觉前端：本地 YOLO/CLIP 可处理图像、视频和 RGB-D，并维护目标跟踪与场景状态；在 RTX 4070 Ti Super 上，YOLOv8s 框检测约 19.5–22 ms，完整 RGB 流水线约 92–103 ms。",
        why: "它适合探索‘感知结果如何进入具身决策’，但不是 VLA，也没有公开真实机器人闭环验证。无 API key 时只能运行本地感知与跟踪，结构化判断依赖远程 JEV 服务；RGB-D 路径约 379–408 ms，首次使用还需下载权重。因此当前应视为实验组件，而非离线可部署的机器人栈。",
        meta: ["MIT · Python 3.10+", "YOLO / CLIP 本地感知", "无实机闭环证据"],
        source: "https://github.com/CharlesFeng0314/JEV_sees"
      },
      {
        category: "LLM 推理服务",
        level: "OCT 01 MAIN BRANCH",
        title: "vLLM：Kimi-K3 推测解码与 SM120 优化",
        summary: "主分支加入 Kimi-K3 的 FlashInfer speculative KDA 后端、面向 SM120 的 occupancy-adaptive Triton split-K，并减少流水线并行中已离开引擎请求的 sampled-token 广播；容器构建也开始预编译 Python bytecode。",
        why: "这是一组面向高吞吐服务端的细粒度更新，适合追踪新模型、Blackwell 级 GPU 和分布式推理的落地节奏；它不是正式 Release，也没有随提交给出统一端到端吞吐基准。生产环境应固定提交、复跑自己的延迟与并发测试，不能把单项内核优化直接等同于整体提速。",
        meta: ["Apache-2.0", "NVIDIA / CUDA · 服务端", "主分支提交 · 非正式版"],
        source: "https://github.com/vllm-project/vllm/commit/766b4ae54c491497306224ee4b316d9c2d57cd30"
      },
      {
        category: "端侧 LLM 推理",
        level: "OCT 01 BUILD b11310",
        title: "llama.cpp：WebGPU 与 Hexagon 路径继续收敛",
        summary: "b11310 附近的提交修复 WebGPU SSM_SCAN 绑定别名问题，并在前一批次优化 Qualcomm Hexagon 的 ALLREDUCE 安全 scatter；同时修复 CUDA 短行 iq4_nl 反量化和多模态投影下载参数。",
        why: "价值在于同一 C/C++ 运行时继续覆盖桌面 GPU、浏览器 WebGPU 和移动 DSP，而不只是新增模型名。llama.cpp 构建号发布非常频繁，单个自动构建不代表稳定版或普遍性能提升；端侧采用前应按目标后端固定版本，验证模型兼容、数值误差、内存峰值和持续吞吐。",
        meta: ["MIT", "CPU / CUDA / WebGPU / Hexagon", "高频构建 · 需锁定版本"],
        source: "https://github.com/ggml-org/llama.cpp/releases/tag/b11310"
      },
      {
        category: "精选资源 / Go",
        level: "SEP 27–OCT 01 CURATION",
        title: "Awesome Go：MCP、AI 与 SQL 工具条目更新",
        summary: "这一周期新增 protoc-gen-mcp、claude-code-go 与 dba SQL Query Builder 等条目，分别落在协议工具、AI 开发和数据库工具链方向，适合作为 Go 生态的低成本扫描入口。",
        why: "精选列表适合发现项目，不适合替代技术尽调：条目被合入只说明符合维护规则，并不证明安全、性能或长期维护性。建议把它当候选池，再回到原仓库核对许可证、发布节奏、测试、依赖和真实使用案例。",
        meta: ["MIT", "Go 生态索引", "收录不等于背书"],
        source: "https://github.com/avelino/awesome-go/commit/680bbe3cfbe964f3b51b76653bd87046a75120ef"
      }
    ],
    deepDive: {
      title: "今日深挖 · Open RF IP",
      text: "这个项目的长期价值不在仓库热度，而在验证方式：DDS/NCO 与 FMCW chirp 的 Python 参考、cocotb/Verilator 回归、Yosys/nextpnr 实现和 CrossLink-NX 物理采样被串成同一条可审计链。默认配置用 32 位相位累加器、10 位 LUT 地址和 14 位有符号 I/Q，在 12 MHz 下生成 500 kHz 到 2 MHz、10,000 样本的 chirp；板上抓取的前 1,024 个样本与独立模型零偏移、零误差。局限也必须保留：物理验证只覆盖数字路径和采样前缀，约 198.93 MHz 是工具估算而非测得 Fmax，生成 bitstream 未纳入仓库，且没有许可证。建议下一步先离线重跑 147 个测试并从源码重建 bitstream，再改变 chirp 配置与时钟做多组抓取；真正用于 RF 系统前，还要补 DAC、滤波、频谱纯度、杂散和相噪测量，并让维护者明确许可。",
      source: "https://github.com/Cortex-Wave-Research/open-rf-ip"
    },
    noise: "判断而非事实：今天 Trending 里最容易被高估的是把 HyperFrames 的高热度理解成‘新的生成式视频模型’。它实际是把已经创作好的 HTML/CSS/媒体确定性渲染成视频的工程层，价值真实但类别不同；同样，RoboDK 的 Agent Skills 仓库目前仍写着 Coming soon、尚无可用技能，因此没有纳入今日具身进展。"
  },
  {
    date: "2026-09-30",
    label: "SEP 30",
    pulse: "今天最清晰的增量来自工程可复现性：视觉与 FPGA 项目公开运行边界，AI 编辑器和编码 Agent 开始补强多代理、签名与会话可靠性，SQLite 的浏览器存储路径也在加固并发锁语义。",
    metrics: [
      { value: "9", label: "今日信号" },
      { value: "4", label: "本地可部署" },
      { value: "2", label: "硬件项目" },
      { value: "2", label: "具身进展" }
    ],
    items: [
      {
        category: "图像修复",
        level: "SEP 30 RELEASE",
        title: "Klarity v0.7.5.1",
        summary: "本地离线的图像/视频修复工具，把 NAFNet 去噪与去模糊、Real-HAT/Real-ESRGAN 超分和 RIFE 插帧放进 GUI 与 CLI；今天的版本提供 Windows、Linux CPU 安装包，并补上 FFmpeg 9 兼容、双平台 CI 和安装器修复。",
        why: "这是今天最容易直接试用的一项：预编译包不需要 Python 或 GPU，Lite 模型约 204 MB、最低约 4 GB 内存；Heavy 模型约 888 MB、建议 16 GB 内存。视频处理仍需 FFmpeg，CPU 输出质量不变但速度会明显慢于从源码配置 CUDA。",
        meta: ["MIT 主程序", "Windows / Linux CPU 包", "Lite 204 MB · Heavy 888 MB"],
        source: "https://github.com/HAKORADev/Klarity/releases/tag/v0.7.5.1"
      },
      {
        category: "超分辨率",
        level: "SEP 29 CODE + WEIGHTS",
        title: "FluxFlow",
        summary: "面向天文图像的保守流匹配超分，公开了训练、推理、评测代码和 2×/4× 的 epoch-300 权重；推理用观测一致性修正约束生成结果，并同时评估 PSNR/SSIM、源通量误差与目标检测 F1。",
        why: "它的价值在于没有只给视觉样例，而是把物理观测模型和源检测指标放进复现路径。默认环境是 Python 3.10+、PyTorch CUDA 11.8，CPU 理论可装但不适合批量；训练数据未随仓库提供，根目录也未声明许可证，因此更适合研究验证，暂不宜直接用于生产。",
        meta: ["2× / 4× 权重开放", "Python + CUDA 11.8", "数据与许可证需另核对"],
        source: "https://github.com/I2WM/FluxFlow"
      },
      {
        category: "FPGA / VHDL",
        level: "SEP 29 NEW",
        title: "ChromatiX",
        summary: "把 ModRetro Chromatic 的 Gowin GW5A-25 FPGA 设计重建为 LiteX 工程：开放 PSRAM、视频、系统监控和 USB 2.0 路径，并增加 320×288 UVC 采集、虚拟卡带、USB 调试桥及 VexRiscv BIOS 模式。",
        why: "它把硬件、固件、Verilator/GHDL 仿真和自动截图/按键测试连成一条可检查链路；但完整综合仍要求 Gowin EDA 1.9.12.04，README 所称预编译 bitstream 在当前 GitHub Releases 中尚未见到对应资产，刷写前应先确认文件、备份原始镜像并验证恢复流程。",
        meta: ["GW5A-25 · LiteX", "Gowin EDA + openFPGALoader", "GPL-3.0 / BSD-2-Clause"],
        source: "https://github.com/enjoy-digital/chromatix"
      },
      {
        category: "FPGA / VHDL",
        level: "SEP 28 · 非今日发布",
        title: "RTL MBIST Fault Coverage",
        summary: "一套 64×8 March C− 内存自测控制器与独立事务检查器，在 Artix-7 XC7A35T 上完成 50 MHz 实现，并用 XSim/Icarus 自动覆盖四类共 2,048 个单故障实例；还给出 Nangate45 综合与门级回归。",
        why: "证据比热度更重要：无 ILA 的正常构建为 98 LUT、63 寄存器、1 个 RAMB18，WNS +14.474 ns；三次正常板测 PASS、两次受控故障 FAIL，ILA 核对全部 640 个请求。限制是故障模型仍不含耦合故障，ASIC 结果只是布局前估计，仓库尚未声明许可证。",
        meta: ["Artix-7 · 50 MHz", "实板 ILA + 2,048 故障实例", "许可证未声明"],
        source: "https://github.com/HugoHuang-dev/rtl-mbist-fault-coverage"
      },
      {
        category: "具身智能",
        level: "SEP 29 LEARNING KIT",
        title: "robolings",
        summary: "把机器人学习拆成 43 个可补全的小函数，覆盖旋转、运动学、灵巧手、控制、模仿学习、扩散策略和流匹配；只依赖 NumPy，完整测试不到一秒，并提供中文题面与参考解。",
        why: "适合想真正理解 action chunking、DDIM、阻抗控制等基础组件的人，在普通电脑上即可运行；它明确没有 GPU、仿真器、感知或实体机器人闭环，因此应视为教学与单元测试材料，而不是可部署的 VLA 或实机控制栈。",
        meta: ["MIT", "Python 3.10+ · NumPy", "无 GPU / 无仿真 / 无实机"],
        source: "https://github.com/12-Twelve-12/robolings"
      },
      {
        category: "具身智能",
        level: "SEP 30 SOURCE UPDATE",
        title: "Autonomous OS 关机可靠性更新",
        summary: "面向 Autonomous Lamp、Reachy Mini 等实体平台的机器人软件栈，今天修复 HAL 关机完成状态与延迟 RGB 帧重新点亮 LED 的问题，并加入 HAL 退出后的 Lamp LED blackout 服务及自动测试。",
        why: "这类关机边界处理不如新模型醒目，却是实体设备安全与可预期行为的一部分。项目支持 Raspberry Pi 4/5、CM4、OrangePi 4 Pro 等板卡，但模型推理可依赖远程服务；本次是主分支提交而非新标签，公开证据以代码和自动测试为主，未见针对该改动的新实机测试报告。",
        meta: ["Lamp / Reachy Mini 等", "Pi / OrangePi", "源码更新 · 非新 Release"],
        source: "https://github.com/autonomous-ai/autonomous-os/commit/92fffbd"
      },
      {
        category: "AI 编程编辑器",
        level: "SEP 30 RELEASE",
        title: "Zed v1.22.0",
        summary: "Zed 的稳定版为新 subagent 增加按次选模型与自动上下文压缩，动态获取 OpenCode 模型列表，并加入命令行 diff 的 unified/split 切换；Windows 同时补上 Mica 背景和多项高 DPI、UNC 路径与任务路径修复。",
        why: "这是 AI 编程从单对话走向多代理编排的具体产品化信号，且编辑器本体仍能本地运行；模型能力通常需要外部提供商或自带密钥。版本也调整了 Threads Sidebar 配置和部分快捷键，升级前应查看 breaking notices，并用真实仓库测试子代理、终端和 worktree 行为。",
        meta: ["GPL-3.0", "Windows / macOS / Linux", "Subagent · BYOK · OpenCode"],
        source: "https://github.com/zed-industries/zed/releases/tag/v1.22.0"
      },
      {
        category: "编码 Agent",
        level: "SEP 30 RELEASE",
        title: "OpenCode v1.18.34",
        summary: "开源终端编码 Agent 的维护版为模型请求补上命名空间、会话和父会话身份头，并重新签名 macOS 27+ 的本地构建与发布二进制；还修复 Windows 路径分隔符下的插件名解析。",
        why: "更新不大，但会直接影响多会话追踪、插件状态和 macOS 可执行性。它并没有带来新的自主编程能力；真正采用时仍应关注模型成本、命令审批、工作区隔离和失败恢复，而不是把版本号或演示等同于可靠自动化。",
        meta: ["MIT", "终端 / 桌面", "会话身份 · macOS 签名"],
        source: "https://github.com/anomalyco/opencode/releases/tag/v1.18.34"
      },
      {
        category: "数据库内核 / WASM",
        level: "SEP 30 SOURCE UPDATE",
        title: "SQLite：浏览器 kvvfs 锁语义加固",
        summary: "SQLite 的 JS/WASM kvvfs 路径重做 xLock、xUnlock、xCheckReserved 与 xSleep，并补充同一存储被多个连接访问时的锁错误测试；同时新增不抛异常的 Stmt.resetNoThrow()。",
        why: "这类改动展示了经典数据库如何把文件锁语义映射到浏览器存储，是源码精读的好切口；提交说明也明确早期重构本身并不能证明正确性，测试随后才补上。kvvfs 的并发边界不同于原生文件系统，应用仍要验证多标签页、崩溃恢复和持久化语义。",
        meta: ["Public Domain", "SQLite WASM / JavaScript", "源码提交 · 非 Release"],
        source: "https://github.com/sqlite/sqlite/commit/ca9a8adfa422a633ec2267dc09c815a51ceb8376"
      }
    ],
    deepDive: {
      title: "今日深挖 · ChromatiX",
      text: "ChromatiX 值得长期跟踪，因为它不只是移植一个 Game Boy 核，而是在消费级 FPGA 产品上把 LiteX SoC、PSRAM、USB 2.0、视频、固件和自动化测试串起来。USB CDC 调试桥可以模拟按键、读取状态和 PSRAM，UVC 能捕获画面，Verilator/GHDL 仿真还能复用 ROM、按键脚本与 PNG 帧，这让回归测试有机会从‘看屏幕’变成可自动判定。局限同样明确：目标器件是特定的 GW5A-25，完整构建仍依赖指定版本的 Gowin EDA；Game Boy 核及生成 bitstream 受 GPL 约束；当前 Releases 页面只见媒体资产，README 所述预编译 bitstream 尚需维护者补齐或用户自行构建。建议下一步先跑 Verilator 的 stripes ROM 测试并确认 CI，再核对 release 校验值；只有在备份原厂 flash、确认 JTAG 恢复和 USB 枚举后，才在实机上尝试 standard 构建。",
      source: "https://github.com/enjoy-digital/chromatix"
    },
    noise: "判断而非事实：今天 Trending 仍主要由通用 Agent、下载器和课程项目占据，昨日已收录的 VoiceStudio 继续上榜但没有足够新的技术进展，因此不重复。另一个容易被高估的信号是把 README 中的‘预编译可用’直接当成已经可下载：ChromatiX 当前 Releases 页面只显示媒体包，真正可刷写资产仍需核验；文档承诺不能替代可校验的发布物。"
  },
  {
    date: "2026-09-29",
    label: "SEP 29",
    pulse: "今天的高价值更新集中在“把能力变成可执行工具”：超分出现自包含二进制，Agent 开发开始沉淀规范驱动流程，自托管 Git 与 Kubernetes 则把安全边界和下一代基础设施变化推到可测试版本。",
    metrics: [
      { value: "8", label: "今日信号" },
      { value: "5", label: "本地可部署" },
      { value: "0", label: "硬件项目" },
      { value: "1", label: "具身进展" }
    ],
    items: [
      {
        category: "超分辨率",
        level: "SEP 28 RELEASE",
        title: "swin2sr-rs v0.2.0",
        summary: "用 Rust 和 CUDA 独立实现 Swin2SR 推理，提供单一自包含二进制、CPU 回退、自动分块和 safetensors 权重，覆盖经典、真实世界、压缩图像与轻量模型的 2×/4× 超分。",
        why: "它不要求 Python、PyTorch、ONNX Runtime，甚至运行时不要求安装 CUDA Toolkit，适合离线 CLI 与批处理；但当前预编译版仅面向 Linux x86-64，GPU 至少需计算能力 6.1，项目很新且尚缺跨平台与广泛质量基准。",
        meta: ["MIT", "Linux x86-64", "CPU / CUDA · 19–82 MiB 权重"],
        source: "https://github.com/jacobsparts/swin2sr-rs/releases/tag/v0.2.0"
      },
      {
        category: "图像生成",
        level: "SEP 27 RELEASE",
        title: "InvokeAI 6.14.2",
        summary: "成熟的本地生成式视觉工作台加入 Canvas 自定义字体与 Krea-2 参考图风格迁移，并修复路径穿越校验、量化 Qwen2.5-VL 编码器显存回收、GGUF orig_shape 兼容等问题。",
        why: "这次不是模型级突破，而是会直接影响生产稳定性和显存占用的维护版；适合已经在本机用节点工作流、局部重绘和画布编辑的创作者，Windows、macOS、Linux 可通过 Launcher 安装，实际显存仍取决于所选模型与量化。",
        meta: ["Apache-2.0 主代码", "Win / macOS / Linux", "本地 Web UI · 安装成熟"],
        source: "https://github.com/invoke-ai/InvokeAI/releases/tag/v6.14.2"
      },
      {
        category: "视频 / 3D",
        level: "CODE RELEASE",
        title: "VGGT-Diff",
        summary: "把视觉几何模型与扩散视频模型结合，用稀疏多视图和相机轨迹生成新视角视频；官方示例以 6 张来源图和一条 80 帧轨迹作为输入。",
        why: "几何条件有望减少纯视频扩散在视角变化时的结构漂移，但目前项目自己的半分辨率、全分辨率权重仍标为 TODO，无位姿版本也未开放；还需申请 1B 规模基础权重并配置 Python/CUDA，现阶段更适合研究复现而非即装即用。",
        meta: ["研究用途 / 非商业", "Python + CUDA", "关键项目权重待发布"],
        source: "https://github.com/chenkangjie1123/VGGT-Diff"
      },
      {
        category: "具身智能",
        level: "REAL ROBOT STACK",
        title: "Franka Stack",
        summary: "一套面向 Franka Panda 的端到端实机工程栈，串起 GELLO/VR 示教、LeRobot v2.1 数据转换、OpenPI π0.5 训练与部署，并给出 1 kHz 底层控制、双 RGB 采集和 20 Hz 轨迹记录配置。",
        why: "比单个演示更有价值的是 shadow→armed 安全门控、看门狗、急停与回环检查都进入部署路径；但仓库目前只有早期提交，ROS 2、生产 GPU 训练和可直接复用的结果权重仍不完整，作者也明确说明实体复现依赖具体硬件与网络配置。",
        meta: ["Apache-2.0", "Franka Panda + PREEMPT_RT", "实机路径开放 · 结果权重未给"],
        source: "https://github.com/Loule0-0/franka-stack"
      },
      {
        category: "Agent 开发方法",
        level: "SEP 29 RELEASE",
        title: "GitHub Spec Kit v1.0.13",
        summary: "规范驱动开发工具新增内置 GitHub 扩展，把 taskstoissues 从核心能力逐步迁出，并补充 MiniMax Code 集成、OpenSpec 与测试验证扩展，以及 Windows 上 copilot.exe 检测和非 ASCII 配置合并修复。",
        why: "它关注的是在编码 Agent 之前先固定意图、规范、计划和任务，而不是再造一个模型客户端；适合多人项目或需要审计的 Agent 工作流。扩展目录仍是快速增长的生态，安装社区扩展前要核对维护者、脚本权限和版本锁定。",
        meta: ["MIT", "Python CLI · uv 安装", "规范驱动 Agent SDLC"],
        source: "https://github.com/github/spec-kit/releases/tag/v1.0.13"
      },
      {
        category: "自托管 Git",
        level: "SEP 29 MAJOR RELEASE",
        title: "Gitea v28.0.0",
        summary: "自托管 Git 平台的大版本把 Git 网络操作统一通过内部代理并新增 egress 配置，拒绝 push 中无效或重复对象；Actions 增加旧运行记录保留天数，同时包含大量仓库、Diff、包注册表和前端重构。",
        why: "对内网代码托管，出站控制和 Git 对象校验比新界面更关键。该版本含 breaking changes，不能直接当普通补丁升级；应先备份数据库与仓库，在副本环境核对反向代理、Actions runner、对象存储、迁移任务和自定义配置。",
        meta: ["MIT", "Go · Linux / Docker", "大版本 · 需迁移演练"],
        source: "https://github.com/go-gitea/gitea/releases/tag/v28.0.0"
      },
      {
        category: "云原生 / Kubernetes",
        level: "SEP 29 ALPHA",
        title: "Kubernetes v1.38.0-alpha.1",
        summary: "Kubernetes 1.38 开发周期的首个 alpha 二进制与变更日志开放，为集群管理员和生态维护者提供早期兼容性测试入口。",
        why: "它适合验证 CRI、CSI、网络插件、控制器和 API 兼容，不适合生产集群。alpha 标签意味着功能、API 与行为仍可能改变；应只在隔离测试集群中运行，并以官方 CHANGELOG 和增强提案为准，不要用发布日期推断稳定性。",
        meta: ["Apache-2.0", "控制面 / 节点二进制", "Alpha · 禁止生产"],
        source: "https://github.com/kubernetes/kubernetes/releases/tag/v1.38.0-alpha.1"
      },
      {
        category: "Python 工具链",
        level: "SEP 29 RELEASE",
        title: "uv 0.12.21",
        summary: "Python 项目与环境工具更新内置 CPython 的 OpenSSL 至 3.5.9，修复 uv python pin --rm 误删全局 .python-versions 的风险，并继续精简 lockfile 中的冗余运行时约束。",
        why: "对日常开发最直接的价值是跨 Windows、macOS、Linux 的单文件安装和可验证制品；本次属于稳健维护而非性能跃迁。团队升级时仍应提交 uv.lock、在 CI 重建环境，并验证私有索引、预发布约束与 Python pin 行为。",
        meta: ["Apache-2.0 / MIT", "Win / macOS / Linux", "预编译二进制 + attestation"],
        source: "https://github.com/astral-sh/uv/releases/tag/0.12.21"
      }
    ],
    deepDive: {
      title: "今日深挖 · swin2sr-rs",
      text: "swin2sr-rs 的长期价值不在提出新的超分网络，而在把已有 Swin2SR 权重做成低摩擦的本地执行层：模型用 safetensors，CPU 与 CUDA 共用一个二进制，自动分块可控制峰值内存，部署时不再携带整套 Python/深度学习框架。代价也很清楚：分块边缘缺少全图上下文，结果可能与整图模式存在可测差异；当前输入输出聚焦 PNG，预编译平台主要是 Linux，模型质量上限仍受既有 Swin2SR 检查点限制。建议先用 realworld-x4 在自己的退化图像上记录延迟、峰值 RAM/VRAM、接缝和 NIQE/LPIPS，再决定是否接入生产；视频场景则应与 fast-rtxvsr 的全 GPU 管线分开评估。",
      source: "https://github.com/jacobsparts/swin2sr-rs"
    },
    noise: "判断而非事实：今天 GitHub Trending 的热度仍被通用 Agent 与课程/效率工具占据，star 增长与本期关注方向的技术增量关系很弱。VGGT-Diff 的展示也可能被高估：代码开放是积极信号，但关键项目权重仍是 TODO，不能把演示等同于第三方已经可复现。过去 24–72 小时未发现同时具备器件支持、工具链、时序/资源数据与复现条件的高信号 FPGA/VHDL 发布，因此今天不强行凑项。"
  },
  {
    date: "2026-09-28",
    label: "SEP 28",
    pulse: "今天最清晰的信号是本地能力开始分层：Ollama 把决策模型做成结构化 API，CrewAI 补齐评测与追踪，自托管相册则继续用小版本修复长期运行稳定性；生成与具身工具仍在向个人设备靠拢。",
    metrics: [
      { value: "8", label: "今日信号" },
      { value: "6", label: "本地可部署" },
      { value: "1", label: "硬件项目" },
      { value: "1", label: "具身进展" }
    ],
    items: [
      {
        category: "本地部署",
        level: "TRENDING TODAY",
        title: "VoiceStudio",
        summary: "今天 GitHub Trending 中与个人设备最相关的项目：把语音克隆、语音设计、视频配音、听写、转录和有声书制作收进同一个本地优先桌面应用，并提供本地 API 与 MCP。",
        why: "它覆盖 Windows、macOS、Linux 与 Docker，默认工作流在本机运行，远程服务可选；但各语音引擎的显存、磁盘与许可证并不统一，项目宣称的 646 种语言也不代表每个引擎都具备同等质量。",
        meta: ["AGPL-3.0", "Win / macOS / Linux", "模型许可需单查"],
        source: "https://github.com/debpalash/VoiceStudio"
      },
      {
        category: "具身智能",
        level: "RECENT · 非今日发布",
        title: "FluxVLA",
        summary: "面向 VLA 的一站式工程平台，覆盖数据、训练、仿真评测与真实机器人部署；公开了移动操作、桌面整理、叠衣与取包等实体机器人演示，并给出 LIBERO 对比结果。",
        why: "价值在于工程闭环而非单个 SOTA 数字。公开基准主要来自仿真，实体演示尚不足以证明跨场景鲁棒性；评估时应继续核对机器人平台、传感器同步、控制频率与失败案例。",
        meta: ["Apache-2.0", "代码开放", "仿真基准 + 实机演示"],
        source: "https://github.com/InternRobotics/FluxVLA"
      },
      {
        category: "3D 生成",
        level: "SEP UPDATE · 非今日发布",
        title: "Pixal3D 多视图推理",
        summary: "Pixal3D 在 9 月开放多视图推理：输入带相机位姿的多张环绕图，直接生成 GLB；单图、训练代码、数据准备工具和低显存模式也已开放。",
        why: "相较单图猜测遮挡区域，多视图更接近可用于资产制作的输入条件。安装仍依赖 TRELLIS.2、CUDA、NATTEN 与独立权重，低显存模式只说明降低峰值，并未给出消费卡最低显存承诺。",
        meta: ["MIT", "NVIDIA CUDA", "1024 低显存 / 1536 标准"],
        source: "https://github.com/TencentARC/Pixal3D"
      },
      {
        category: "图像生成",
        level: "NEW · EXPERIMENTAL",
        title: "Ming Image Prompt Builder",
        summary: "9 月 26 日新建的 ComfyUI 节点，用画框和图层顺序构造 Ming-Image-0.1-Design 的结构化 JSON 提示，并输出布局预览与边界框。",
        why: "它把复杂版式提示变成可视化编辑，适合海报与含文字画面；但目前只有少量提交，不负责模型加载、采样或增强，几何框也只是提示而非确定性约束。",
        meta: ["GPL-3.0", "ComfyUI 自定义节点", "无额外模型下载"],
        source: "https://github.com/NidAll/comfyui-ming-image-prompt-builder"
      },
      {
        category: "FPGA / VHDL",
        level: "SEP 20 · 非今日发布",
        title: "NEORV32 v1.13.6",
        summary: "VHDL RISC-V 软核的 9 月维护版，优化比较运算时序与多个外设面积，重做 AXI bridge 并加入数据缓冲以处理 back pressure，同时扩展 Verilog 流程和 GPIO 回环验证。",
        why: "这是可复现的 RTL 与总线可靠性改进，而不是概念演示；不过发布说明没有给出具体 FPGA 型号上的 Fmax、LUT/FF 或功耗增量，迁移前仍应在目标器件上重新综合和跑回归。",
        meta: ["BSD-3-Clause", "VHDL 软核", "AXI / 面积 / 时序改进"],
        source: "https://github.com/stnolting/neorv32/releases/tag/v1.13.6"
      },
      {
        category: "本地 LLM 推理",
        level: "SEP 28 RELEASE",
        title: "Ollama v0.35.0：Decision Models API",
        summary: "Ollama 新增 /v1/systemone，为 Nimble、Tev1 等 decision model 返回选项、概率与分数，而不是自由文本；可用于工单分类、模型路由和内容判定，并修复 MLX 模型下载卡死与 macOS 更新状态问题。",
        why: "结构化概率输出比提示大模型生成 JSON 更容易进入规则与监控系统，且服务仍可在本机运行。可用模型、内存和加速后端决定实际门槛；概率也不是天然校准的置信度，上线前应在自己的数据上测准确率、校准误差与拒答阈值。",
        meta: ["MIT", "Windows / macOS / Linux", "本地 API · MLX / GPU / CPU"],
        source: "https://github.com/ollama/ollama/releases/tag/v0.35.0"
      },
      {
        category: "多 Agent 框架",
        level: "SEP 28 RELEASE",
        title: "CrewAI 1.15.23",
        summary: "多 Agent 编排框架加入 Gemini 3.8 Flash，支持对最近一次追踪运行执行 crewai eval，并在 trace 中记录声明的输出格式与实际结果；同时修复限流重试、Bedrock 异步回退、SQLite 连接和 Selenium 复用。",
        why: "真正值得关注的是评测与追踪进入 CLI/TUI，而不是 Agent 数量。框架本身可本地安装，但模型通常来自本地或云端提供商；复杂 crew 仍可能放大延迟、成本和不可预测性，采用前应从单 Agent 基线与可重复任务集开始。",
        meta: ["MIT", "Python 3.10–3.13", "Tracing · Eval · Flow"],
        source: "https://github.com/crewAIInc/crewAI/releases/tag/1.15.23"
      },
      {
        category: "自托管相册",
        level: "SEP 28 PATCH",
        title: "Immich v3.2.4",
        summary: "自托管照片与视频管理平台的小版本主要通过依赖更新修复用户观察到的内存泄漏，并修复移动端同步状态页在计数查询失败后空白的问题。",
        why: "这不是新功能发布，却直接关系到家庭服务器的长期稳定性。Immich 仍建议在升级前完整备份数据库与媒体库；该版本紧邻 v3.3 候选版，稳健用户应先看迁移说明并观察后续补丁，而不是因为版本新就立即跨大版本。",
        meta: ["AGPL-3.0", "Docker · Linux 服务器", "内存泄漏修复"],
        source: "https://github.com/immich-app/immich/releases/tag/v3.2.4"
      }
    ],
    deepDive: {
      title: "今日深挖 · VoiceStudio",
      text: "VoiceStudio 的长期价值在于把分散的本地语音模型包装成桌面工作台，而不是绑定单一模型：用户可以在同一界面完成克隆、配音、批处理，并让本机 Agent 通过 API/MCP 调用。隐私和离线性因此更可控，但‘一站式’也带来模型碎片化：例如某些引擎需要约 12–16 GB CUDA 显存或约 9–12 GB 磁盘，Apple Silicon 可走 MPS/MLX，而 Intel Mac 的本地后端受限；代码为 AGPL-3.0，各模型仍有独立商业条款。建议先从默认引擎和短音频 smoke test 开始，确认语言质量、实时系数、显存峰值与授权，再下载更大的克隆模型；若开放远程访问，还要为 API 加密钥并限制可信网络。",
      source: "https://github.com/debpalash/VoiceStudio"
    },
    noise: "判断而非事实：今天 Trending 的巨大 star 增量仍主要集中在通用 Agent 管理与记忆项目，热度不能替代与你关注方向的技术增量；即使是 VoiceStudio，‘646 种语言’也更像多引擎覆盖范围，不能直接等同于 646 种语言都达到可用质量。今天未发现值得强行收录的 24–72 小时内超分新发布；FPGA 项仅保留一条 9 月 20 日的实质更新并明确标注日期。"
  },
  {
    date: "2026-09-27",
    label: "SEP 27",
    pulse: "视觉生成与具身智能正在共同转向端侧推理；与此同时，开发环境与终端工具也在优化高频交互和安全回滚，真正的竞争点从功能清单移向运行时、硬件适配与可复现性。",
    metrics: [
      { value: "9", label: "今日信号" },
      { value: "6", label: "本地可部署" },
      { value: "2", label: "硬件项目" },
      { value: "3", label: "具身进展" }
    ],
    items: [
      {
        category: "具身智能",
        level: "HIGH SIGNAL",
        title: "Embodied.cpp",
        summary: "面向 VLA 与世界—动作模型的 C++ 推理运行时，支持 CPU、CUDA、NPU 和 GGUF。9 月新增 Xiaomi-Robotics-0、TurboVLA 与 X-VLA，并提供 LIBERO 评测。",
        why: "像具身智能领域的 llama.cpp：重点不在发布另一个模型，而在让现有模型更容易量化、部署和比较。",
        meta: ["Apache-2.0", "Q4–Q8", "CPU / GPU / NPU"],
        source: "https://github.com/SEU-PAISys/Embodied.cpp"
      },
      {
        category: "图像生成",
        level: "DEPLOYABLE",
        title: "MFLUX",
        summary: "Apple MLX 原生的图像与视频生成工具链，覆盖 FLUX.2、Z-Image、Qwen Image 2.1、Ming-Image，并可用 SeedVR2 做超分。",
        why: "对 M 系列 Mac 用户，这是绕开 CUDA 重型环境、快速尝试新视觉模型的实用途径。",
        meta: ["Apple Silicon", "量化", "LoRA / ControlNet"],
        source: "https://github.com/mflux-community/mflux"
      },
      {
        category: "移动部署",
        level: "EXPERIMENTAL",
        title: "Nightmare Mobile",
        summary: "在 Android 手机上运行的节点式图像工作流，支持文生图、局部重绘、超分、FLUX.2、Z-Image 与视频生成，计算由高通 Hexagon NPU 完成。",
        why: "端侧生成正在从单一按钮应用走向可组合工作流，但高端 Snapdragon 门槛和非商业许可证需要注意。",
        meta: ["Android 12+", "Snapdragon", "CC BY-NC 4.0"],
        source: "https://github.com/AbrahamPaulJ/nightmare-mobile"
      },
      {
        category: "超分辨率",
        level: "BENCHMARKED",
        title: "fast-rtxvsr",
        summary: "面向 Windows RTX 显卡的视频超分 CLI，解码、VSR 与编码全程留在 GPU，避免 PNG 往返和额外服务器。",
        why: "作者在 RTX 5060 Ti 16GB 上报告 768×1344 到 1080×1920 约 26.7 fps，适合实际批处理。",
        meta: ["Windows", "NVIDIA RTX", "CUDA / VFX"],
        source: "https://github.com/glarsson/fast-rtxvsr"
      },
      {
        category: "FPGA / VHDL",
        level: "WATCH",
        title: "OpenCircuitX",
        summary: "把 VHDL/Verilog 编辑、GHDL 仿真、波形、RTL 视图和 FPGA 工具链收拢到一个桌面应用，Windows 已提供安装包。",
        why: "目标是降低开源 FPGA 工具链的使用门槛；当前重点器件为 iCE40 与 ECP5，成熟度仍需实际项目验证。",
        meta: ["MIT", "Windows", "iCE40 / ECP5"],
        source: "https://github.com/openlab-x/OpenCircuitX"
      },
      {
        category: "FPGA / VHDL",
        level: "VERIFIED",
        title: "OpenJLS",
        summary: "开放的 VHDL JPEG-LS 无损编码器 IP，强调跨厂商综合，并以独立参考编码器进行逐字节验证。",
        why: "相比只展示波形或板上演示的项目，它把验证报告和工具链依赖写得更完整，适合评估图像链路硬件加速。",
        meta: ["VHDL", "JPEG-LS", "多工具链"],
        source: "https://github.com/isentropic-fpga/OpenJLS"
      },
      {
        category: "具身智能",
        level: "DATA RELEASE",
        title: "AGIBOT WORLD 2026",
        summary: "开放 11,430 条真实机器人轨迹，包含专家示范、自主成功与失败、干扰和人工纠正，而不是只保留成功样本。",
        why: "失败状态和人工接管数据，能直接支持奖励模型、错误识别、恢复策略与风险预警研究。",
        meta: ["真实机器人", "11,430 轨迹", "含失败与纠正"],
        source: "https://agibot.com/article/231/detail/95.html"
      },
      {
        category: "开发环境 / CLI",
        level: "SEP 27 RELEASE",
        title: "mise v2026.9.15",
        summary: "多语言版本、任务与环境管理工具开始把 vfox 安装的工具打进 OCI 镜像，并显著缩短 shell prompt、cd 与设置加载路径；dotfiles 的 include/exclude 改为更接近 .gitignore 语义，修复回滚可能误删活动文件的边界情况。",
        why: "它适合替代一部分 nvm、pyenv、asdf 与零散任务脚本，但功能面很宽，配置错误也会影响整个开发环境。该版改变任务校验与模式匹配行为，升级前应运行 mise doctor 和任务验证，在测试目录演练 dotfiles capture/rollback，并固定团队使用的插件来源。",
        meta: ["MIT", "Windows / macOS / Linux", "工具版本 + 任务 + 环境"],
        source: "https://github.com/jdx/mise/releases/tag/v2026.9.15"
      },
      {
        category: "终端 / Shell",
        level: "SEP 27 MAIN BRANCH",
        title: "Starship：Jujutsu VCS 状态进入提示符",
        summary: "Starship 主分支为 vcs 模块加入 Jujutsu 支持，并修复指向仓库子目录的符号链接渲染及 Nim 项目目录检测；更新面向高频 shell 提示符，而不是新增独立命令。",
        why: "对采用 jj 或混合 Git/Jujutsu 工作流的人很实用，但这是主分支提交，尚不能等同于稳定版已包含。提示符每次执行都会进入交互热路径，建议等正式发布或自行固定提交后，测量大型仓库、网络文件系统和多模块配置下的启动延迟。",
        meta: ["ISC", "跨 Shell / 跨平台", "Jujutsu · 未发布提交"],
        source: "https://github.com/starship/starship/commit/131bf9552d7e927607e155ea3a9b8c8a170a0356"
      }
    ],
    deepDive: {
      title: "今日深挖 · Embodied.cpp",
      text: "具身模型正在经历与早期大语言模型相似的阶段：研究代码能跑，但部署环境碎片化、显存需求高、不同实现难以公平比较。Embodied.cpp 的价值在于把 VLA 与世界模型转换为 GGUF，并为多种模型提供统一的 C++ 运行时和评测边界。它报告的延迟与显存下降很有吸引力，但目前主要证据仍来自标准基准和项目演示；真实机械臂的控制频率、传感器同步、安全停机及跨平台迁移仍需要单独验证。建议先用 LIBERO 或 RoboTwin 复现实验，再决定是否接入实体硬件。",
      source: "https://github.com/SEU-PAISys/Embodied.cpp"
    },
    noise: "高 stars 不等于高相关性。今日 GitHub Trending 前列主要是通用 Agent 管理与记忆项目；它们很热门，但与视觉生成、FPGA 或具身部署没有直接技术增量，因此不进入核心推荐。"
  }
];
