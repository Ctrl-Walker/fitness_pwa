import { getLogs, bulkAddLogs, normalizeImportRow } from './db.js';
import { renderHistory, renderStats, showSnackbar } from './ui.js';

/**
 * 导出所有日志为 JSON 文件
 */
export async function exportData() {
  const logs = getLogs();
  const payload = logs.map((item) => ({
    id: item.id,
    move_id: item.move_id,
    move_name: item.move_name,
    level: item.level,
    sets: item.sets,
    note: item.note || '',
    created_at: new Date(item.created_at).toISOString(),
    created_at_ms: item.created_at
  }));

  const content = JSON.stringify(payload, null, 2);
  const filename = `fitness_backup_${new Date().toISOString().slice(0, 10)}.json`;

  if (window.isSecureContext && typeof File !== 'undefined' && navigator.share && navigator.canShare) {
    try {
      const file = new File([content], filename, { type: 'application/json' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: '健身日志备份' });
        showSnackbar('已打开系统分享，可保存到文件');
        return;
      }
    } catch (_) {}
  }

  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 1500);

  showSnackbar('备份文件已导出');
}

/**
 * 触发导入文件选择器
 */
export function triggerImportData() {
  document.getElementById('import-file-input').click();
}

/**
 * 处理导入文件事件
 */
export async function handleImportFile(event) {
  const input = event.target;
  const file = input.files && input.files[0];
  if (!file) return;

  try {
    const text = await readFileAsText(file);
    const payload = JSON.parse(text);
    if (!Array.isArray(payload)) {
      throw new Error('导入失败：JSON 顶层必须是数组');
    }

    const normalizedRows = payload
      .map((row) => normalizeImportRow(row))
      .filter(Boolean);

    const failed = payload.length - normalizedRows.length;

    await bulkAddLogs(normalizedRows);

    renderHistory();
    renderStats();
    showSnackbar(`导入完成：成功 ${normalizedRows.length} 条，失败 ${failed} 条`);
  } catch (error) {
    showSnackbar(error.message || '导入失败，请检查 JSON 格式');
  } finally {
    input.value = '';
  }
}

function readFileAsText(file) {
  if (file && typeof file.text === 'function') {
    return file.text();
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('读取文件失败'));
    reader.readAsText(file);
  });
}
