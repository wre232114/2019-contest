// 工具库，按照关卡和难度加载资源
import {loader} from '../config/aliases'
const imageSources = require('../config/images')

/**
 * @param {关卡} level
 * @param {难度} difficulty
 * @param {回调函数，传两个个参数，加载的文件以及加载的进度} callback
 * @param {回调函数，当资源加载完成时调用} loaded
 */
export function loadResources(level, callback,loaded,difficulty) {
  difficulty = difficulty || '';
  level = level || 0;
  let images = [];
  for(let key in imageSources['level'+level+difficulty]){
    let value = imageSources['level'+level+difficulty][key];
    if(!loader.resources[value]) images.push(value); // 不再在重复 的资源
  }
    loader.add(images)
      .on('progress', function(loader, resource) {
        callback(resource.url, loader.progress);
      })
      .load(()=>{
        loader.off('progress');
        loaded();
      });
}

