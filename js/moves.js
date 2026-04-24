// 囚徒健身动作数据 (纯数据模块)
export const MOVE_CATEGORIES = [
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

// 快速查找映射表
export const MOVE_NAME_BY_ID = Object.fromEntries(
  MOVE_CATEGORIES.flatMap((cat) => cat.moves.map((move) => [move.id, move.name]))
);

export const MOVE_BY_ID = Object.fromEntries(
  MOVE_CATEGORIES.flatMap((cat) => cat.moves.map((move) => [move.id, move]))
);