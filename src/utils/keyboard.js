// 监听键盘事件

/**
 * 监听指定的键的事件
 * @param {监听的键的ascii码} code 
 */
export function keyboard(code) {
  let key = {};
  key.code = code;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler= event => {
    if(event.keyCode === key.code) {
      if(key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  key.upHandler = event => {
    if(event.keyCode === key.code) {
      if(key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  }

  window.addEventListener('keydown',key.downHandler.bind(key),false);
  window.addEventListener('keyup',key.upHandler.bind(key),false);

  return key;
}