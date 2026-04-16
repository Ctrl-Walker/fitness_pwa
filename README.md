# fitness_pwa

# 基于《囚徒健身1》 和《囚徒健身2》 设计

离线优先的 PWA 版本，数据存储使用 Dexie.js（IndexedDB）。

## 本地启动

必须通过 `http://` 访问（`file://` 下 Service Worker 不可用）：

```bash
cd fitness_pwa
python3 -m http.server 5173
```

然后打开 `http://localhost:5173`。

## 特性

- 完全离线可用（Service Worker 缓存静态资源）
- 本地数据库：Dexie.js + IndexedDB
- 训练记录新增、历史删除
- 总览统计
- JSON 备份导入/导出
- 支持安装为桌面/移动端应用（浏览器支持时显示“安装 App”）
