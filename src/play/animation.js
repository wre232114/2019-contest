// 这里存了所有等待移动的动画，每一帧都会检查动画队列中是否有动画，如果有，则动画移动一帧，
// 并减少动画的计数
const config = require('../config/config')

let animationQueue = new Array();

export function addAnimation(sprite,frames,speedx,speedy,callback) {
  let obj = {
    sprite,
    frames,
    speedx,
    speedy,
    callback // 动画完成后执行的回调函数
  }
  animationQueue.push(obj);
}

export function animateFrame() {
  for(let i = 0;i < animationQueue.length;i++) {
    let item = animationQueue[i];
    item.frames--;
    if(!item.sprite) {
      throw new Error('sprite is null')
      return;
    }
    item.sprite.x += item.speedx;
    item.sprite.y += item.speedy;
    if(item.frames == 0) {
      animationQueue.splice(i,1); // 动画完成，删除
      item.callback && item.callback();
    }
  }
}