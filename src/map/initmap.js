const config = require('../config/config')
const types = require('../config/types')
import * as drawUtils from '../utils/draw'
import {Text,TextStyle} from '../config/aliases'

// 游戏主角精灵
export let role=null;

// 地图
export let map = [];
// 地图初始化
export function resetMap() {
  map = [];
  for(let i = 0;i < config.global.cellNumbers;i++) {
    map[i] = []
  }
}
resetMap();

// 绘制地图的背景

let initBackground = function(stage,level) {
  // 首先清屏
  drawUtils.clear(stage);
  // 初始化并绘制边界
  drawUtils.drawEdge(stage,level,config['level'+level].edge,map);
  // 初始化并绘制背景
  drawUtils.drawBackground(stage,level,config['level'+level].background,map);
}
// 初始化进入游戏的界面
export function initGameStartScreen(stage) {
  drawUtils.clear(stage);

  // 绘制背景
  let bg = drawUtils.getSprite(0,'bg_castle')
  drawUtils.drawSprite(stage,bg,0,0,config.global.width,config.global.height);
  let brickGrey = drawUtils.getSprite(1,'brick_grey')
  let brickRed = drawUtils.getSprite(2,"brick_red")
  brickGrey.rotation = 0.5;
  brickRed.rotation = -0.3;

  let cellSize = config.global.cellSize; // 装饰块
  drawUtils.drawSprite(stage,brickGrey,1*cellSize,1*cellSize)
  drawUtils.drawSprite(stage,brickRed,4*cellSize,2*cellSize)

  let deco = drawUtils.getSprite(0,'brick_red')
  deco.rotation = 0.7;
  drawUtils.drawSprite(stage,deco,2*cellSize,5*cellSize);

  deco = drawUtils.getSprite(1,'wooden_box')
  deco.rotation = -0.4;
  drawUtils.drawSprite(stage,deco,5*cellSize,4*cellSize);

  let style = new TextStyle({
    fontStyle: 'Italic',
    fontSize: 36,
    fill: "white",
    stroke: 'lime',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  });

  let message = new Text("Pushing Box 1.0", style);
  let posX = (config.global.width - message.width)/2;
  let posY = (config.global.height - message.height)/2;
  message.position.set(posX,posY);
  stage.addChild(message); // 绘制对象

  // 主标题下面的提示
  let tip = new Text()
  tip.text = "click screen to start..."
  tip.style = {
    fontStyle: 'Italic',
    fontSize: 14,
    fill: "white",
  }
  let tipPosX = (config.global.width - tip.width)/2;
  tip.position.set(tipPosX,posY+50)
  stage.addChild(tip)
  
}


/**
 * 初始化游戏中元素
 * @param {舞台} stage 
 * @param {关卡} level 
 */
export function initGameItems(stage,level) {
  // 绘制block
  drawUtils.drawItems(stage,level,config['level'+level].blocks,types.celltypes.BLOCK,map);
  // 绘制箱子
  drawUtils.drawItems(stage,level,config['level'+level].boxes,types.celltypes.BOX,map);

  // 绘制主角
  if(!role) {
    role = drawUtils.getSprite(0, 'role');
    role.anchor.x = 0.5;
    role.anchor.y = 0.5;
  }
  let roleconf = config['level'+level].role
  let roleX = roleconf.x,roleY = roleconf.y;
  let cellSize = config.global.cellSize;
  roleX = roleX*cellSize + (cellSize)/2;
  roleY = roleY*cellSize + (cellSize)/2;
  map[roleconf.x][roleconf.y] = {
    type: types.celltypes.ROLE,
    sprite: role
  }
  drawUtils.drawSprite(stage,role,roleX,roleY,roleconf.width,roleconf.height);
}
export { initBackground }