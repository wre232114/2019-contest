// 控制游戏的关卡跳转

const types = require('../config/types')
const config = require('../config/config')
import * as initmap from '../map/initmap'
import * as load from '../utils/load'
import * as animation from './animation'
import {setLevel} from '../utils/click'
export let Level = null; // 当前的关卡
/**
 * 切换关卡，流程：重新渲染关卡背景和和人物、场景
 * @param {关系} level 
 */
export default function switchLevel(stage,level) {
  setLevel(level);
  switch(level) {
    case 0:
      Level = 0;
      toStartScreen(stage);
      break;
    case 4: // 通关
      load.loadResources(level,(name,progress) => {
        console.log(name,'is loading...',progress+'%')
      },() => {
        passLevel(stage);
      })
      break;
    default:
      Level = level;
      setLevel(5); // 设置为正在加载
      let w = config.global.cellSize*3;
      initmap.loading(stage,w,0);
      load.loadResources(level,(name,progress) => {
        initmap.loading(stage,w,progress)
      },() => {
        initmap.loading(stage,w,100);
      })
  }
}

function toStartScreen(stage) {
  initmap.initGameStartScreen(stage);
}

export function to(stage,level) {
  initmap.initBackground(stage, level);
  initmap.initGameItems(stage,level)
}

function passLevel(stage) {
  initmap.initPassLevel(stage);
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