
const config = require('../config/config')
import * as drawUtils from '../utils/draw'
import {Text,Container} from '../config/aliases'
import switchLevel from './controller';

let panelContainer=null,check=null;
export function showGamePanel(stage,checkX,checkY) {
  if(panelContainer == null) {
    panelContainer = new Container();
    panelContainer.position.set(config.global.cellSize*2,config.global.cellSize*2);
    panelContainer.width = config.global.cellSize*3;
    panelContainer.height = config.global.cellSize*3;

    let cellSize = config.global.cellSize;
    let panel = drawUtils.getSprite(0,'metalPanel_green');
    panel.position.set(0,0);
    panel.width = panel.height = cellSize*3;

    let currLevel = 1;

    // panelContainer.addChild(panel);

    let tip = new Text("选择关卡");
    tip.style = {
      fontSize: 15,
      fill: "white",
      align: 'center'
    }
    tip.position.set((cellSize*3-tip.width)/2,(cellSize-tip.height)/2)

    let number1 = drawUtils.getSprite(0,'number1');
    let number2 = drawUtils.getSprite(0,'number2');
    let number3 = drawUtils.getSprite(0,'number3');
    number1.width = number2.width = number3.width = cellSize/2;
    number1.height = number2.height = number3.height = cellSize/2;
    
    number1.position.set(cellSize/4,cellSize+cellSize/4);
    number2.position.set(cellSize/4+cellSize,cellSize+cellSize/4);
    number3.position.set(cellSize*2+cellSize/4,cellSize/4+cellSize);

    check = drawUtils.getSprite(0,'red_check')
    check.visible = false;
    

    panelContainer.addChild(panel,tip,number1,number2,number3,check);
    let startButton = drawUtils.getSprite(0,'green_button');
    startButton.position.set(cellSize,cellSize*2+cellSize/4);
    startButton.width = cellSize;
    startButton.height = cellSize/2;
    startButton.on('pointerdown',event => {
      switchLevel(stage,currLevel);
    })
    let start = new Text("开始");
    start.style = {
      fontSize: 15,
      fill: "white",
      align: 'center'
    }
    start.position.set((cellSize*3-start.width)/2,(cellSize*2+(cellSize-start.height)/2));
    panelContainer.addChild(startButton,start);
  }
  if(checkX&&checkY) {
    check.position.set(checkX,checkY)
    check.width = config.global.cellSize/4;
    check.height = config.global.cellSize/4;
    check.visible = true;
  }
  if(!checkX||!checkY)drawUtils.drawRect(stage,0,0,config.global.width,config.global.height,0.5);
  stage.addChild(panelContainer); // 将面板绘制到屏幕上
}