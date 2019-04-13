let celltypes = { // 地图格子类型，用于碰撞检测
  BACKGROUND: 1, // 背景
  BLOCK: 2, // 不能到达的格子
  BOX: 3, // 盒子
  EDGE: 4, // 边界
  END: 5 ,// 通关的位置,
  ROLE: 6, // 主角
}
let direction = {
  TOP:0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3
}
exports.celltypes = celltypes;
exports.direction = direction;