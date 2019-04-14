// 游戏配置文件

// 设置最大宽度，移动端的适配
let windowWidth = window.innerWidth
if(windowWidth > 448) windowWidth = 448;

let cellSize = windowWidth / 7;
let config = {
  global: {
    width: cellSize*7,
    height: cellSize*7,
    cellSize: cellSize,
    cellNumbers: 7,
    fps: 60
  },
  sprite: {
    width: cellSize,
    height: cellSize,
    names: {

    }
  },
  level0: {
    background: 'bg_castle'
  },
  // 各关卡各元素的位置
  level1: {
    edge: 'metal_edge',
    background: 'brick_grey',
    role: { // 主角的初始位置
      x: 5,
      y: 5,
      width: cellSize/2,
      height: cellSize/2
    },
    end: {
      x: 1,
      y: 5,
      name: 'end_window'
    },
    blocks: [
      {
        y: 1,
        x: 3,
        name: 'block_stone'
      },
      {
        y: 2,
        x: 2,
        name: 'block_stone'
      },
      {
        y: 2,
        x: 4,
        name: 'block_stone'
      },
      {
        y: 3,
        x: 5,
        name: 'block_stone'
      },
      {
        y: 4,
        x: 2,
        name: 'block_stone'
      },
      {
        y: 4,
        x: 5,
        name: 'block_stone'
      },
    ],
    boxes: [
      {
        y: 3,
        x: 3,
        name: 'wooden_box'
      },
      {
        y: 5,
        x: 4,
        name: 'wooden_box'
      },
    ]
  },
  level3: {
    edge: 'metal_edge',
    background: 'brick_red',
    role: { // 主角的初始位置
      x: 5,
      y: 5,
      width: cellSize/2,
      height: cellSize/2
    },
    end: {
      x: 1,
      y: 1,
      name: 'end_window'
    },
    blocks: [
      {
        y: 1,
        x: 3,
        name: 'block_stone'
      },
      {
        y: 3,
        x: 2,
        name: 'block_stone'
      },
      {
        y: 5,
        x: 2,
        name: 'block_stone'
      },
      {
        y: 2,
        x: 5,
        name: 'block_stone'
      }
      ,
      {
        y: 1,
        x: 4,
        name: 'block_stone'
      }
    ],
    boxes: [
      {
        y: 2,
        x: 3,
        name: 'wooden_box'
      },
      {
        y: 3,
        x: 4,
        name: 'wooden_box'
      },
      {
        y: 5,
        x: 4,
        name: 'wooden_box'
      },
      {
        y: 4,
        x: 3,
        name: 'wooden_box'
      },
      {
        y: 4,
        x: 5,
        name: 'wooden_box'
      },
    ]
  },
  level2: {
    edge: 'level3_edge',
    background: 'land_grass',
    role: { // 主角的初始位置
      x: 4,
      y: 4,
      width: cellSize/2,
      height: cellSize/2
    },
    end: {
      x: 3,
      y: 2,
      name: 'end_window3'
    },
    blocks: [
      {
        y: 1,
        x: 2,
        name: 'box'
      },
      {
        y: 1,
        x: 4,
        name: 'box_red'
      },
      {
        y: 5,
        x: 2,
        name: 'box'
      },
      {
        y: 3,
        x: 3,
        name: 'box_red'
      }
    ],
    boxes: [
      {
        y: 3,
        x: 2,
        name: 'wooden_box'
      },
      {
        y: 3,
        x: 4,
        name: 'wooden_box'
      },
      {
        y: 4,
        x: 3,
        name: 'wooden_box'
      },
      {
        y: 3,
        x: 5,
        name: 'wooden_box'
      },
    ]
  }
}
module.exports = config;