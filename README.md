# 囚徒健身日志 (fitness_pwa)

> 离线优先的 PWA 健身记录应用，基于《囚徒健身1》和《囚徒健身2》的动作体系。

## 本地启动

由于 Service Worker 要求通过 `http://` 协议访问，请使用本地 HTTP 服务器：

```bash
cd fitness_pwa
python3 -m http.server 5173
```

然后在浏览器打开 `http://localhost:5173`。

> 注意：`file://` 协议下 Service Worker 不可用，离线缓存功能无法生效。

## 功能特性

- ✅ **完全离线可用** — Service Worker 缓存所有静态资源，首次加载后无需网络
- ✅ **本地数据存储** — 基于 Dexie.js (IndexedDB)，所有记录保存在浏览器本地
- ✅ **训练记录** — 添加训练记录（选择动作 → 选择阶段/式 → 输入组数 → 可选备注）
- ✅ **历史查看（分页）** — 每页 20 条，支持"加载更多"
- ✅ **记录删除** — 每条历史记录可单独删除
- ✅ **总览统计** — 查看每个动作已解锁的最高阶段/式
- ✅ **JSON 备份导入/导出** — 方便数据迁移和备份
- ✅ **可安装 PWA** — 浏览器支持时显示"安装 App"按钮（manifest + Service Worker）

## 项目结构

```
fitness_pwa/
├── index.html              # 主页面
├── manifest.webmanifest    # PWA 清单
├── sw.js                   # Service Worker (缓存策略)
├── js/
│   ├── app.js              # 入口（注册 SW + 初始化渲染）
│   ├── db.js               # Dexie 数据库操作
│   ├── ui.js               # UI 渲染（选择器/表单/历史/统计/导航）
│   ├── moves.js            # 囚徒健身动作数据（纯数据模块）
│   └── backup.js           # JSON 导入/导出
├── css/
│   └── style.css           # 样式
├── vendor/
│   └── dexie.min.js        # Dexie.js 运行时
└── icons/                  # PWA 图标
```

## 数据格式

备份 JSON 文件格式如下，支持导入和导出：

```json
[
  {
    "move_id": "pushup",
    "move_name": "俯卧撑",
    "level": 3,
    "sets": [10, 10, 8],
    "note": "状态不错",
    "created_at": 1712345678000
  }
]
```

## 技术栈

- 纯 HTML / CSS / JavaScript (ES Modules)
- [Dexie.js](https://dexie.org/) — IndexedDB 封装库
- Service Worker — 离线缓存策略（Cache First）
- PWA Manifest — 支持添加到主屏幕

## 维护

- 作者：Walker
- GitHub：https://github.com/Ctrl-Walker/fitness_pwa

---

*基于《囚徒健身1》和《囚徒健身2》设计。*
