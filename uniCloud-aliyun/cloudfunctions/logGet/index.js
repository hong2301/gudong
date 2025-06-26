'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 1. 获取原始数据
  const result = await db.collection("log").orderBy('time', 'desc').get();


  // 3. 返回原始结构（仅顺序变化）
  return result
};