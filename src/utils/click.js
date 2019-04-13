// 监听点击事件，并做出逻辑处理

const types = require('../config/types')
import {Level,move,rotateRole} from '../play/controller';
import * as initmap from '../map/initmap'
const config = require('../config/config')
import switchLevel from '../play/controller'
import {isCollideRole, isCollideBox} from './collision'

function dealClick(posX,posY) {
  // 先判断是不是点击了主角上下左右的方块，如果是，进行碰撞检测
  let role = initmap.role;
  let roleX = Math.floor(role.x / config.global.cellSize)
  let roleY = Math.floor(role.y / config.global.cellSize)
  let type = isCollideRole(posX,posY);
  if(roleX-posX == 1 && roleY == posY) { // 点击了左边
    rotateRole(types.direction.LEFT);
    if(type==types.celltypes.BACKGROUND) {
      move(posX+1,posY,types.direction.LEFT)
    }else if(type == types.celltypes.BOX && isCollideBox(posX-1,posY)) {
      move(posX,posY,types.direction.LEFT)
      move(posX+1,posY,types.direction.LEFT);
    }
    
  } else if(roleX-posX == -1 && roleY == posY) { // 点击了右边
    rotateRole(types.direction.RIGHT);
    if(type==types.celltypes.BACKGROUND) {
      move(posX-1,posY,types.direction.RIGHT)
    }else if(type == types.celltypes.BOX && isCollideBox(posX+1,posY)) {
      move(posX,posY,types.direction.RIGHT)
      move(posX-1,posY,types.direction.RIGHT);
    }
  }else if(roleY-posY == -1 && roleX == posX) { // 点击了下面
    rotateRole(types.direction.BOTTOM);
    if(type==types.celltypes.BACKGROUND) {
      move(posX,posY-1,types.direction.BOTTOM)
    }else if(type == types.celltypes.BOX && isCollideBox(posX,posY+1)) {
      move(posX,posY,types.direction.BOTTOM)
      move(posX,posY-1,types.direction.BOTTOM);
    }
  }else if(roleY-posY == 1 && roleX == posX) { // 点击了上面
    rotateRole(types.direction.TOP);
    if(type==types.celltypes.BACKGROUND) {
      move(posX,posY+1,types.direction.TOP)
    }else if(type == types.celltypes.BOX && isCollideBox(posX,posY-1)) {
      move(posX,posY,types.direction.TOP)
      move(posX,posY+1,types.direction.TOP);
    }
  }
}
export default {
  on(stage,canvas, callback = null) {
    
    // PC鼠标单击
    canvas.addEventListener('click',event => {
      // console.log(Level,event);
      if(Level == 0) {
        switchLevel(stage,1);
      } else if(Level < 4) { // 如果是游戏中的点击
        let posX = Math.floor(event.layerX / config.global.cellSize),
          posY = Math.floor(event.layerY / config.global.cellSize);
        dealClick(posX,posY);
      }
      callback && callback(event);
    },false)

    // 移动端触摸事件
    canvas.addEventListener('touchend',event => {
      // console.log(Level,event);
      if(Level == 0) {
        switchLevel(stage,1);
      } else if(Level < 4) { // 如果是游戏中的点击
        let posX = Math.floor(event.changedTouches[0].layerX / config.global.cellSize),
          posY = Math.floor(event.changedTouches[0].layerY / config.global.cellSize);
        // 先判断是不是点击了主角上下左右的方块，如果是，进行碰撞检测
       dealClick(posX,posY);
      }
      callback && callback(event);
    },false)
  }
}