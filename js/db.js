import { MOVE_BY_ID, MOVE_NAME_BY_ID } from './moves.js';

// 初始化 Dexie 数据库
const db = new Dexie('fitness_pwa_db');
db.version(1).stores({
  logs: '++id, move_id, created_at'
});

// 内部状态：所有日志记录（按时间倒序）
let _logs = [];

/**
 * 从数据库加载所有日志，按创建时间倒序排列
 */
export async function loadLogs() {
  _logs = await db.logs.orderBy('created_at').reverse().toArray();
  return _logs;
}

/**
 * 获取当前缓存的日志数据（只读副本）
 */
export function getLogs() {
  return _logs.slice();
}

/**
 * 添加一条新日志
 * @param {Object} data - { move_id, move_name, level, sets, note, created_at }
 * @returns {Promise<number>} 新增记录的 ID
 */
export async function addLog(data) {
  const id = await db.logs.add(data);
  await loadLogs();
  return id;
}

/**
 * 删除一条日志
 * @param {number} id
 */
export async function deleteLogById(id) {
  await db.logs.delete(id);
  await loadLogs();
}

/**
 * 批量添加日志（用于导入）
 * @param {Array<Object>} rows - 标准化后的日志数据数组
 * @returns {Promise<number>} 成功插入的数量
 */
export async function bulkAddLogs(rows) {
  const result = await db.transaction('rw', db.logs, async () => {
    return db.logs.bulkAdd(rows);
  });
  await loadLogs();
  return rows.length;
}

/**
 * 导入数据行校验与归一化
 * @param {Object} row - 原始导入数据
 * @returns {Object|null} 标准化后的日志对象，或 null（无效）
 */
export function normalizeImportRow(row) {
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

export { db };