const MOVE_CATEGORIES = [
  {
    id: 'big6',
    label: '囚徒 1 · Big Six',
    moves: [
      { id: 'pushup', name: '俯卧撑', en: 'Push-up', color: '#7a5c1e', maxStep: 10, steps: ['墙壁俯卧撑','上斜俯卧撑','膝盖俯卧撑','半俯卧撑','标准俯卧撑','窄距俯卧撑','偏重俯卧撑','单臂半俯卧撑','杠杆俯卧撑','单臂俯卧撑'] },
      { id: 'squat', name: '深蹲', en: 'Squat', color: '#2e6644', maxStep: 10, steps: ['肩倒立俯卧撑','折刀俯卧撑','支撑深蹲','半深蹲','标准深蹲','窄距深蹲','偏重深蹲','单腿半深蹲','单腿辅助深蹲','单腿深蹲'] },
      { id: 'pullup', name: '引体向上', en: 'Pull-up', color: '#3d4880', maxStep: 10, steps: ['垂直引体','水平引体向上','折刀引体向上','半引体向上','标准引体向上','窄距引体向上','偏重引体向上','单臂半引体向上','单臂辅助引体向上','单臂引体向上'] },
      { id: 'legraise', name: '举腿', en: 'Leg Raise', color: '#7a4214', maxStep: 10, steps: ['坐姿屈膝','平卧抬膝','平卧屈举腿','平卧蛙举腿','平卧直举腿','悬挂屈膝','悬垂屈举腿','悬垂蛙举腿','悬垂半举腿','悬垂直举腿'] },
      { id: 'bridge', name: '桥式', en: 'Bridge', color: '#7a2c1c', maxStep: 10, steps: ['短桥','直桥','高低桥','顶桥','半桥','标准桥','下行桥','上行桥','和桥','铁板桥'] },
      { id: 'hspu', name: '倒立撑', en: 'Handstand Push-up', color: '#5a3a7a', maxStep: 10, steps: ['靠墙顶立','乌鸦式','靠墙倒立','半倒立撑','标准倒立撑','窄距倒立撑','偏重倒立撑','单臂半倒立撑','杠杆倒立撑','单臂倒立撑'] },
    ],
  },
  {
    id: 'cc2_all',
    label: '囚徒 2 · 进阶训练',
    moves: [
      { id: 'hang', name: '悬吊', subLabel: '手部', en: 'Hang', color: '#2e6644', maxStep: 8, steps: ['水平悬吊','横杆悬吊','偏重悬吊','单臂横杆悬吊','毛巾悬吊','双毛巾悬吊','偏重毛巾悬吊','单臂毛巾悬吊'] },
      { id: 'fingertip_pushup', name: '指尖俯卧撑', subLabel: '手部', en: 'Fingertip', color: '#1a6b3a', maxStep: 10, steps: ['墙壁指卧撑','上斜指卧撑','膝盖指卧撑','半程指卧撑','标准指卧撑','窄距指卧撑','偏重指卧撑','单臂半程指卧撑','杠杆指卧撑','单臂指卧撑'] },
      { id: 'clutch_flag', name: '抓旗', subLabel: '侧链', en: 'Clutch Flag', color: '#3d4880', maxStep: 8, steps: ['悬吊抓','单蜷腿斜身抓','双蜷腿斜身抓','斜身抓','双蜷腿水平抓','单蜷腿水平抓','屈腿抓旗','抓旗'] },
      { id: 'press_flag', name: '扬旗', subLabel: '侧链', en: 'Press Flag', color: '#1e3a6e', maxStep: 8, steps: ['支撑推举','推举悬吊','蹬地推举','蜷腿竖直推举','竖直推举','单蜷腿扬旗','屈腿扬旗','扬旗'] },
      { id: 'neck_bridge', name: '颈桥', subLabel: '颈部', en: 'Neck Bridge', color: '#7a4214', maxStep: 2, steps: ['反颈桥','正颈桥'] },
      { id: 'calf_raise', name: '提踵', subLabel: '小腿', en: 'Calf Raise', color: '#7a2c1c', maxStep: 8, steps: ['双腿地面提踵（屈腿）','双腿地面提踵（直腿）','单腿地面提踵（屈腿）','单腿地面提踵（直腿）','双腿台阶提踵（屈腿）','双腿台阶提踵（直腿）','单腿台阶提踵（屈腿）','单腿台阶提踵（直腿）'] },
    ],
  },
  {
    id: 'triple',
    label: '三决 · 主动拉伸',
    moves: [
      { id: 'stretch_bridge', name: '桥式', en: 'Stretch', color: '#5a3a7a', maxStep: 5, steps: ['短桥式','直桥式','高低桥式','顶桥式','标准桥式'] },
      { id: 'stretch_langle', name: '直角式', en: 'L-Angle', color: '#5a3a7a', maxStep: 5, steps: ['屈腿式','直腿式','折腿式','偏重折腿式','直角式'] },
      { id: 'stretch_twist', name: '扭转式', en: 'Twist', color: '#5a3a7a', maxStep: 5, steps: ['直腿扭转式','简易扭转式','半扭转式','3/4扭转式','完全扭转式'] },
    ],
  },
];

const MOVE_NAME_BY_ID = Object.fromEntries(
  MOVE_CATEGORIES.flatMap((cat) => cat.moves.map((move) => [move.id, move.name]))
);
const MOVE_BY_ID = Object.fromEntries(
  MOVE_CATEGORIES.flatMap((cat) => cat.moves.map((move) => [move.id, move]))
);

const db = new Dexie('fitness_pwa_db');
db.version(1).stores({
  logs: '++id, move_id, created_at'
});

let logs = [];
let selectedMove = null;
let currentSets = [0];
let deferredPrompt = null;
let snackbarTimer = null;

async function init() {
  bindNav();
  bindGlobalActions();
  registerServiceWorker();
  bindInstallPrompt();
  await loadLogs();
  renderMovePicker();
}

function bindGlobalActions() {
  document.getElementById('view-form').addEventListener('click', (e) => {
    if (e.target.id === 'view-form') closeForm();
  });

  document.getElementById('import-btn').addEventListener('click', triggerImportData);
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('import-file-input').addEventListener('change', handleImportFile);
}

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

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (error) {
    showSnackbar('Service Worker 注册失败');
  }
}

function bindNav() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab, .section').forEach((el) => el.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`view-${tab.dataset.tab}`).classList.add('active');
      if (tab.dataset.tab === 'history') renderHistory();
      if (tab.dataset.tab === 'stats') renderStats();
    });
  });
}

function renderMovePicker() {
  const mount = document.getElementById('move-mount');
  const tplCard = document.getElementById('tpl-move-card');
  const tplTitle = document.getElementById('tpl-cat-title');
  mount.innerHTML = '';

  MOVE_CATEGORIES.forEach((cat) => {
    const title = tplTitle.content.cloneNode(true).firstElementChild;
    title.innerText = cat.label;
    mount.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'move-grid';

    cat.moves.forEach((move) => {
      const clone = tplCard.content.cloneNode(true);
      const card = clone.querySelector('.move-card');
      clone.querySelector('.name').innerText = move.name;

      const sub = clone.querySelector('.sub');
      if (move.subLabel) sub.innerText = move.subLabel;
      else sub.remove();

      clone.querySelector('.meta').innerText = `${move.maxStep} 级`;
      card.style.setProperty('--c', move.color);
      card.addEventListener('click', () => selectForm(move.id));
      grid.appendChild(clone);
    });

    mount.appendChild(grid);
  });
}

function renderStats() {
  const mount = document.getElementById('stats-mount');
  const tplItem = document.getElementById('tpl-stats-item');
  const tplTitle = document.getElementById('tpl-cat-title');
  mount.innerHTML = '';

  const bests = {};
  logs.forEach((log) => {
    if (!bests[log.move_id] || log.level > bests[log.move_id]) {
      bests[log.move_id] = log.level;
    }
  });

  const list = document.createElement('div');
  list.className = 'stats-list';

  MOVE_CATEGORIES.forEach((cat) => {
    const title = tplTitle.content.cloneNode(true).firstElementChild;
    title.innerText = cat.label;
    list.appendChild(title);

    cat.moves.forEach((move) => {
      const level = bests[move.id] || 0;
      const clone = tplItem.content.cloneNode(true);
      clone.querySelector('.name').innerText = move.name;
      clone.querySelector('.val').innerText = `${level}/${move.maxStep}`;

      const fill = clone.querySelector('.bar-fill');
      fill.style.setProperty('--p', `${(level / move.maxStep) * 100}%`);
      fill.style.setProperty('--c', move.color);
      list.appendChild(clone);
    });
  });

  mount.appendChild(list);
}

function renderHistory() {
  const mount = document.getElementById('history-mount');
  const tpl = document.getElementById('tpl-history-item');
  mount.innerHTML = '';

  logs.forEach((log) => {
    const clone = tpl.content.cloneNode(true);
    clone.querySelector('.title').innerText = `${log.move_name} · 式 ${log.level}`;
    clone.querySelector('.time').innerText = formatTime(log.created_at);
    clone.querySelector('.data').innerText = log.sets.join(' / ');
    if (log.note) clone.querySelector('.note-text').innerText = log.note;

    clone.querySelector('.history-delete').addEventListener('click', () => deleteLog(log.id, log.move_name, log.level));
    mount.appendChild(clone);
  });
}

function selectForm(id) {
  selectedMove = MOVE_BY_ID[id] || null;

  if (!selectedMove) {
    showSnackbar('动作不存在');
    return;
  }

  const overlay = document.getElementById('view-form');
  overlay.classList.add('active');

  const mount = document.getElementById('form-mount');
  mount.innerHTML = '';
  mount.appendChild(document.getElementById('tpl-form').content.cloneNode(true));

  mount.querySelector('.form-header').innerText = selectedMove.name;

  const select = document.getElementById('level-select');
  select.innerHTML = selectedMove.steps
    .map((step, idx) => `<option value="${idx + 1}">第 ${idx + 1} 式：${step}</option>`)
    .join('');

  currentSets = [0];
  renderSets();

  document.getElementById('add-set-btn').addEventListener('click', addSetField);
  document.getElementById('cancel-form-btn').addEventListener('click', closeForm);
  document.getElementById('save-log-btn').addEventListener('click', saveLog);
}

function renderSets() {
  const container = document.getElementById('sets-inputs');
  container.innerHTML = currentSets
    .map((value, idx) => (
      `<input type="number" min="0" class="set-input" placeholder="0" value="${value || ''}" data-idx="${idx}">`
    ))
    .join('');

  container.querySelectorAll('.set-input').forEach((input) => {
    input.addEventListener('change', (e) => {
      const idx = Number(e.target.dataset.idx);
      currentSets[idx] = Number(e.target.value);
    });
  });
}

function addSetField() {
  currentSets.push(0);
  renderSets();
  const inputs = document.querySelectorAll('.set-input');
  if (inputs.length) inputs[inputs.length - 1].focus();
}

function closeForm() {
  document.getElementById('view-form').classList.remove('active');
}

async function saveLog() {
  if (!selectedMove) {
    showSnackbar('请先选择动作');
    return;
  }

  const sets = currentSets
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v) && v > 0)
    .map((v) => Math.floor(v));

  if (!sets.length) {
    showSnackbar('请输入次数');
    return;
  }

  const level = Number(document.getElementById('level-select').value);
  if (!Number.isFinite(level) || level < 1 || level > selectedMove.maxStep) {
    showSnackbar('阶段数据无效');
    return;
  }

  const note = (document.getElementById('note-input').value || '').trim();

  await db.logs.add({
    move_id: selectedMove.id,
    move_name: selectedMove.name,
    level,
    sets,
    note,
    created_at: Date.now()
  });

  closeForm();
  await loadLogs();
  showSnackbar('记录已保存（离线）');

  const activeTab = document.querySelector('.tab.active').dataset.tab;
  if (activeTab === 'stats') renderStats();
  if (activeTab === 'history') renderHistory();
}

async function loadLogs() {
  logs = await db.logs.orderBy('created_at').reverse().toArray();
}

async function deleteLog(id, moveName, level) {
  const ok = window.confirm(`确认删除这条记录吗？\n${moveName} · 式 ${level}`);
  if (!ok) return;

  await db.logs.delete(id);
  await loadLogs();
  renderHistory();
  renderStats();
  showSnackbar('记录已删除');
}

async function exportData() {
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

  // Mobile-friendly path: Android Chrome often handles file exports better via system share sheet.
  if (window.isSecureContext && typeof File !== 'undefined' && navigator.share && navigator.canShare) {
    try {
      const file = new File([content], filename, { type: 'application/json' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: '健身日志备份' });
        showSnackbar('已打开系统分享，可保存到文件');
        return;
      }
    } catch (_) {
      // Ignore and fallback to anchor download.
    }
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

function triggerImportData() {
  document.getElementById('import-file-input').click();
}

async function handleImportFile(event) {
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
    let success = 0;

    await db.transaction('rw', db.logs, async () => {
      await db.logs.bulkAdd(normalizedRows);
      success = normalizedRows.length;
    });

    await loadLogs();
    renderHistory();
    renderStats();
    showSnackbar(`导入完成：成功 ${success} 条，失败 ${failed} 条`);
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

function normalizeImportRow(row) {
  const moveId = typeof row.move_id === 'string' ? row.move_id : '';
  if (!moveId || !MOVE_NAME_BY_ID[moveId]) return null;
  const move = MOVE_BY_ID[moveId];

  const level = Number(row.level);
  if (!Number.isFinite(level) || level < 1 || level > move.maxStep) return null;

  const setsRaw = Array.isArray(row.sets) ? row.sets : [];
  const sets = setsRaw
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v) && v > 0 && v <= 999)
    .map((v) => Math.floor(v));
  if (!sets.length) return null;

  const note = typeof row.note === 'string' ? row.note.slice(0, 1000) : '';

  let createdAt = Date.now();
  if (Number.isFinite(Number(row.created_at_ms))) {
    createdAt = Number(row.created_at_ms);
  } else if (typeof row.created_at === 'string') {
    const parsed = Date.parse(row.created_at);
    if (!Number.isNaN(parsed)) createdAt = parsed;
  }

  return {
    move_id: moveId,
    move_name: move.name,
    level: Math.floor(level),
    sets,
    note,
    created_at: createdAt
  };
}

function formatTime(ts) {
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return '--';
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  return `${mm}-${dd} ${hh}:${mi}`;
}

function showSnackbar(message) {
  const el = document.getElementById('snackbar');
  el.innerText = message;
  el.style.display = 'block';

  if (snackbarTimer) clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() => {
    el.style.display = 'none';
    snackbarTimer = null;
  }, 2000);
}

init();
