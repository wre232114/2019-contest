// 工具库，封装了一些像画布上显示内容的函数

import {resources,Sprite,Graphics,ParticleContainer} from '../config/aliases'
const images = require('../config/images')
const config = require('../config/config')
const types = require('../config/types')
// 将给定的资源输出到屏幕上的指定位置上
import {resetMap} from '../map/initmap'
/**
 * 
 * @param {图像绘制的舞台} stage 
 * @param {被绘制的精灵对象} sprite
 * @param {x坐标} x 
 * @param {Y坐标} y 
 */
let drawSprite = function drawSprite(container,sprite,x,y,w=config.sprite.width,h=config.sprite.height) {
  sprite.x = x;
  sprite.y = y;
  sprite.width = w;
  sprite.height = h;
  container.addChild(sprite);
}

/**
 * 得到精灵的实例
 * @param {关卡} level 
 * @param {精灵的名字，在config/images中注册} spriteName 
 */
let getSprite = function getSprite(level, spriteName) {
  //console.log(level,spriteName)
  let url = images['level'+level][spriteName];
  // console.log(url)
  return new Sprite(resources[url].texture);
}

let clear = function(stage) {
  resetMap();
  let rectangle = new Graphics();
  rectangle.beginFill(0x000000);
  rectangle.drawRect(0,0,config.global.width,config.global.height)
  rectangle.endFill();
  stage.addChild(rectangle);
}

// 绘制地图的边界
let drawEdge = function(stage,level,spriteName,map) {
  let edgeContainer = new ParticleContainer();
  for(let i = 0;i < config.global.cellNumbers;i++) {
    let sprite = getSprite(level,spriteName);
    let pos = i*config.global.cellSize;
    map[i][0] = {
      type:types.celltypes.EDGE,// 第一行边界
      sprite
    }
    drawSprite(edgeContainer,sprite,pos,0);
    let last = config.global.cellNumbers-1;
    // 最后一行边界
    sprite = getSprite(level,spriteName);
    map[i][last] = {
      type:types.celltypes.EDGE,// 第一行边界
      sprite
    }
    drawSprite(edgeContainer,sprite,pos,last*config.global.cellSize);

    // 第一列边界
    sprite = getSprite(level,spriteName);
    map[0][i] = {
      type:types.celltypes.EDGE,// 第一行边界
      sprite
    }
    drawSprite(edgeContainer,sprite,0,pos);
    // 最后一列边界
    sprite = getSprite(level,spriteName);
    map[last][i] = {
      type:types.celltypes.EDGE,// 第一行边界
      sprite
    }
    drawSprite(edgeContainer,sprite,last*config.global.cellSize,pos);
  }
  stage.addChild(edgeContainer);
}

// 绘制背景
let drawBackground = function(stage,level,spriteName,map) {
  let edgeContainer = new ParticleContainer();
  for(let i = 1;i < config.global.cellNumbers-1;i++) {
    for(let j = 1;j < config.global.cellNumbers-1;j++) {
      let sprite = getSprite(level,spriteName);
      map[i][j]= {
        type:types.celltypes.BACKGROUND,
        sprite
      }
      drawSprite(edgeContainer,sprite,i*config.global.cellSize,j*config.global.cellSize);
    }
  }
  stage.addChild(edgeContainer)
}

/**
 * 
 * @param {*} stage 
 * @param {*} level 
 * @param {要绘制的item数组，在config中制定} items 
 * @param {这个数组中item的类型} type 
 * @param {*} map 
 */
let drawItems = function(stage,level,items,type,map) {
  let container = new ParticleContainer();
  let cellSize = config.global.cellSize;
  for(let item of items) {
    let sprite = getSprite(level,item.name);
    map[item.x][item.y] = {
      type,
      sprite
    };
    drawSprite(container,sprite,item.x*cellSize,item.y*cellSize);
  }
  stage.addChild(container);
}

export { drawEdge,drawSprite,getSprite,clear,drawBackground, drawItems}