// 碰撞检测工具函数，判断要到达的位置是不是能够到达
import {map} from '../map/initmap'
const types = require('../config/types')

export function isCollideRole(x,y) {
  if(map[x][y].type !== types.celltypes.BACKGROUND && 
    map[x][y].type !== types.celltypes.BOX) return null;
  else return map[x][y].type;
}

export function isCollideBox(x,y) {
  if(map[x][y].type !== types.celltypes.BACKGROUND) return null;
  else return map[x][y].type;
}