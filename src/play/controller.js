// 控制游戏的关卡跳转

const types = require('../config/types')
const config = require('../config/config')
import * as initmap from '../map/initmap'
import * as load from '../utils/load'
import * as animation from './animation'

export let Level = null;
/**
 * 切换关卡，流程：重新渲染关卡背景和和人物、场景
 * @param {关系} level 
 */
export default function switchLevel(stage,level) {
  switch(level) {
    case 0:
      Level = 0;
      toStartScreen(stage);
      break;
    default:
      Level = level;
      load.loadResources(level,(name,progress) => {
        console.log(name,'is loading...',progress+'%')
      },() => {
        to(stage,level);
      })
  }
}

function toStartScreen(stage) {
  initmap.initGameStartScreen(stage);
}

function to(stage,level) {
  initmap.initBackground(stage, level);
  initmap.initGameItems(stage,level)
}

/**
 * 将给定位置的精灵按照给定的方向，动画的形式移动一个格子
 * @param {目标位置x} x 
 * @param {*} y 
 * @param {方向} direction
 */
export function move(x,y,direction) {
  let sprite = initmap.map[x][y].sprite,frames = 12;
  if(!sprite) {
    throw new Error('sprite is null');
  }
  let speedx,speedy,newX=x,newY=y;
  switch(direction) {
    case types.direction.TOP:
      speedx = 0;speedy=-config.global.cellSize/frames;newY-=1;
      break;
    case types.direction.BOTTOM:
      speedx = 0;speedy=config.global.cellSize/frames;newY+=1;
      break;
    case types.direction.LEFT:
      speedy = 0;speedx=-config.global.cellSize/frames;newX-=1;
      break;
    case types.direction.RIGHT:
      speedy = 0;speedx=config.global.cellSize/frames;newX+=1;
      break;
  }
  animation.addAnimation(sprite,frames,speedx,speedy, function() {
    let temp = initmap.map[x][y];
    initmap.map[newX][newY].type = temp.type;
    initmap.map[newX][newY].sprite = temp.sprite;
    temp.type = types.celltypes.BACKGROUND;
  });
}

/**
 * 按照给定的方向移动主角
 * @param {方向，取值为types中的值} direction 
 */
export function rotateRole(direction) {
  switch(direction) {
    case types.direction.TOP:
      initmap.role.rotation = 0;
      break;
    case types.direction.BOTTOM:
      initmap.role.rotation = Math.PI;
      break;
    case types.direction.LEFT:
      initmap.role.rotation = -Math.PI/2;
      break;
    case types.direction.RIGHT:
      initmap.role.rotation = Math.PI/2;
      break;
  }
}