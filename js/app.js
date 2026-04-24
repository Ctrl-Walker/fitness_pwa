import { MOVE_CATEGORIES } from './moves.js';
import { loadLogs } from './db.js';
import { bindNav, renderMovePicker, renderHistory, renderStats, showSnackbar, closeForm } from './ui.js';
import { exportData, triggerImportData, handleImportFile } from './backup.js';

// ---- 全局安装提示状态 ----
let deferredPrompt = null;

// ---- 初始化入口 ----
async function init() {
  bindNav();
  bindGlobalActions();
  registerServiceWorker();
  bindInstallPrompt();
  await loadLogs();
  renderMovePicker();
}

// ---- 全局事件绑定（弹窗关闭、导入导出） ----
function bindGlobalActions() {
  document.getElementById('view-form').addEventListener('click', (e) => {
    if (e.target.id === 'view-form') closeForm();
  });

  document.getElementById('import-btn').addEventListener('click', triggerImportData);
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('import-file-input').addEventListener('change', handleImportFile);
}

// ---- PWA 安装提示 ----
function bindInstallPrompt() {
  const installBtn = document.getElementById('install-btn');

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.hidden = false;
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });
}

// ---- Service Worker 注册 ----
async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (error) {
    showSnackbar('Service Worker 注册失败');
  }
}

// ---- 启动 ----
init();
