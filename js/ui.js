import { MOVE_CATEGORIES, MOVE_BY_ID } from './moves.js';
import { getLogs, addLog, deleteLogById } from './db.js';

// ---- Snackbar ----
let snackbarTimer = null;

export function showSnackbar(message) {
  const el = document.getElementById('snackbar');
  el.innerText = message;
  el.style.display = 'block';

  if (snackbarTimer) clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() => {
    el.style.display = 'none';
    snackbarTimer = null;
  }, 2000);
}

// ---- 工具函数 ----
export function formatTime(ts) {
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return '--';
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  return `${mm}-${dd} ${hh}:${mi}`;
}

// ---- 动作选择器 ----
export function renderMovePicker() {
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
      card.addEventListener('click', () => openForm(move.id));
      grid.appendChild(clone);
    });

    mount.appendChild(grid);
  });
}

// ---- 表单 (记录新增/编辑) ----
let _selectedMove = null;
let _currentSets = [0];

export function openForm(moveId) {
  _selectedMove = MOVE_BY_ID[moveId] || null;

  if (!_selectedMove) {
    showSnackbar('动作不存在');
    return;
  }

  const overlay = document.getElementById('view-form');
  overlay.classList.add('active');

  const mount = document.getElementById('form-mount');
  mount.innerHTML = '';
  mount.appendChild(document.getElementById('tpl-form').content.cloneNode(true));

  mount.querySelector('.form-header').innerText = _selectedMove.name;

  const select = document.getElementById('level-select');
  select.innerHTML = _selectedMove.steps
    .map((step, idx) => `<option value="${idx + 1}">第 ${idx + 1} 式：${step}</option>`)
    .join('');

  _currentSets = [0];
  _renderSets();

  document.getElementById('add-set-btn').addEventListener('click', _addSetField);
  document.getElementById('cancel-form-btn').addEventListener('click', closeForm);
  document.getElementById('save-log-btn').addEventListener('click', _saveLog);
}

export function closeForm() {
  document.getElementById('view-form').classList.remove('active');
  _selectedMove = null;
  _currentSets = [0];
}

function _renderSets() {
  const container = document.getElementById('sets-inputs');
  container.innerHTML = _currentSets
    .map((value, idx) => (
      `<input type="number" min="0" class="set-input" placeholder="0" value="${value || ''}" data-idx="${idx}">`
    ))
    .join('');

  container.querySelectorAll('.set-input').forEach((input) => {
    input.addEventListener('input', (e) => {
      const idx = Number(e.target.dataset.idx);
      _currentSets[idx] = Number(e.target.value) || 0;
    });
  });
}

function _addSetField() {
  _currentSets.push(0);
  _renderSets();
  const inputs = document.querySelectorAll('.set-input');
  if (inputs.length) inputs[inputs.length - 1].focus();
}

async function _saveLog() {
  if (!_selectedMove) {
    showSnackbar('请先选择动作');
    return;
  }

  const sets = _currentSets
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v) && v > 0)
    .map((v) => Math.floor(v));

  if (!sets.length) {
    showSnackbar('请输入次数');
    return;
  }

  const level = Number(document.getElementById('level-select').value);
  if (!Number.isFinite(level) || level < 1 || level > _selectedMove.maxStep) {
    showSnackbar('阶段数据无效');
    return;
  }

  const note = (document.getElementById('note-input').value || '').trim();

  await addLog({
    move_id: _selectedMove.id,
    move_name: _selectedMove.name,
    level,
    sets,
    note,
    created_at: Date.now()
  });

  closeForm();
  showSnackbar('记录已保存（离线）');

  // 重新渲染当前视图
  const activeTab = document.querySelector('.tab.active').dataset.tab;
  if (activeTab === 'stats') renderStats();
  if (activeTab === 'history') renderHistory();
}

// ---- 统计总览 ----
export function renderStats() {
  const mount = document.getElementById('stats-mount');
  const tplItem = document.getElementById('tpl-stats-item');
  const tplTitle = document.getElementById('tpl-cat-title');
  mount.innerHTML = '';

  const logs = getLogs();
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

// ---- 历史记录 ----
export function renderHistory() {
  const mount = document.getElementById('history-mount');
  const tpl = document.getElementById('tpl-history-item');
  mount.innerHTML = '';

  const logs = getLogs();

  logs.forEach((log) => {
    const clone = tpl.content.cloneNode(true);
    clone.querySelector('.title').innerText = `${log.move_name} · 式 ${log.level}`;
    clone.querySelector('.time').innerText = formatTime(log.created_at);
    clone.querySelector('.data').innerText = log.sets.join(' / ');
    if (log.note) clone.querySelector('.note-text').innerText = log.note;

    clone.querySelector('.history-delete').addEventListener('click', async () => {
      const ok = window.confirm(`确认删除这条记录吗？\n${log.move_name} · 式 ${log.level}`);
      if (!ok) return;

      await deleteLogById(log.id);
      renderHistory();
      renderStats();
      showSnackbar('记录已删除');
    });

    mount.appendChild(clone);
  });
}

// ---- 导航切换 ----
export function bindNav() {
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