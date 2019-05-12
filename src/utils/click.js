// 监听点击事件，并做出逻辑处理

const types = require('../config/types')
import {Level,move,rotateRole,to} from '../play/controller';
import * as initmap from '../map/initmap'
const config = require('../config/config')
import switchLevel from '../play/controller'
import {isCollideRole, isCollideBox} from './collision'
import {showGamePanel} from '../play/pause'

let tempLevel = null;
export function setLevel(level) {
  tempLevel = level;
}
function dealGameClick(stage,posX,posY) {
  // 先判断是不是点击了主角上下左右的方块，如果是，进行碰撞检测
  let role = initmap.role;
  let roleX = Math.floor(role.x / config.global.cellSize)
  let roleY = Math.floor(role.y / config.global.cellSize)
  let type = isCollideRole(posX,posY);
  if(roleX-posX == 1 && roleY == posY) { // 点击了左边
    rotateRole(types.direction.LEFT);
    if(type == types.celltypes.END){
      move(posX+1,posY,types.direction.LEFT)
      switchLevel(stage,4);
    }else
    if(type==types.celltypes.BACKGROUND) {
      move(posX+1,posY,types.direction.LEFT)
    }else if(type == types.celltypes.BOX && isCollideBox(posX-1,posY)) {
      move(posX,posY,types.direction.LEFT)
      move(posX+1,posY,types.direction.LEFT);
    }
    
  } else if(roleX-posX == -1 && roleY == posY) { // 点击了右边
    rotateRole(types.direction.RIGHT);
    if(type == types.celltypes.END){
      move(posX-1,posY,types.direction.RIGHT)
      switchLevel(stage,4);
    }else
    if(type==types.celltypes.BACKGROUND) {
      move(posX-1,posY,types.direction.RIGHT)
    }else if(type == types.celltypes.BOX && isCollideBox(posX+1,posY)) {
      move(posX,posY,types.direction.RIGHT)
      move(posX-1,posY,types.direction.RIGHT);
    }
  }else if(roleY-posY == -1 && roleX == posX) { // 点击了下面
    rotateRole(types.direction.BOTTOM);
    if(type == types.celltypes.END){
      move(posX,posY-1,types.direction.BOTTOM)
      switchLevel(stage,4);
    }else
    if(type==types.celltypes.BACKGROUND) {
      move(posX,posY-1,types.direction.BOTTOM)
    }else if(type == types.celltypes.BOX && isCollideBox(posX,posY+1)) {
      move(posX,posY,types.direction.BOTTOM)
      move(posX,posY-1,types.direction.BOTTOM);
    }
  }else if(roleY-posY == 1 && roleX == posX) { // 点击了上面
    rotateRole(types.direction.TOP);
    if(type == types.celltypes.END){
      move(posX,posY+1,types.direction.TOP)
      switchLevel(stage,4);
    }else
    if(type==types.celltypes.BACKGROUND) {
      move(posX,posY+1,types.direction.TOP)
    }else if(type == types.celltypes.BOX && isCollideBox(posX,posY-1)) {
      move(posX,posY,types.direction.TOP)
      move(posX,posY+1,types.direction.TOP);
    }
  }

  // 如果点击了面板
  if(posX == 6&&posY==0) {
    showGamePanel(stage);
    tempLevel = 6;
  }
}

let panelLevel = 1;
function dealScreenClick(stage,posX,posY,callback) {
  if(tempLevel == 0) {
    showGamePanel(stage);
    tempLevel = 6;
  } else if(tempLevel < 4) { // 如果是游戏中的点击
    dealGameClick(stage,posX,posY);
  } else if(tempLevel == 4) {
    if(Level+1 > 3)
      switchLevel(stage,0);
    else 
      switchLevel(stage,Level+1);
  } else if(tempLevel == 5) { // 加载界面
    to(stage,Level); // 跳转到对应的关卡
    tempLevel = Level;
  } else if(tempLevel = 6) { // 游戏面板
    if(posY == 3) {
      let cellSize = config.global.cellSize;
      switch(posX) {
        case 2:
          panelLevel = 1;
          showGamePanel(stage,cellSize/2,cellSize+cellSize/2);
          break;
        case 3:
          panelLevel = 2;
          showGamePanel(stage,cellSize+cellSize/2,cellSize+cellSize/2);
          break;
        case 4:
          panelLevel = 3;
          showGamePanel(stage,cellSize*2+cellSize/2,cellSize+cellSize/2);
          break;
      }
    }else if(posY==4&&posX == 3) {
      switchLevel(stage,panelLevel);
    }
  }
  callback && callback(event);
}
export default {
  on(stage,canvas, callback = null) {
    
    // PC鼠标单击
    canvas.addEventListener('click',event => {
      // console.log(Level,event);
      let posX = Math.floor(event.offsetX / config.global.cellSize),
      posY = Math.floor(event.offsetY / config.global.cellSize);
      dealScreenClick(stage,posX,posY,callback);
    },false)

    // 移动端触摸事件
    canvas.addEventListener('touchend',event => {
      // console.log(Level,event);
        let posX = Math.floor(event.changedTouches[0].layerX / config.global.cellSize),
          posY = Math.floor(event.changedTouches[0].layerY / config.global.cellSize);
       dealScreenClick(stage,posX,posY,callback);
    },false)
  }
}