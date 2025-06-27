'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  //event为客户端上传的参数
  const result = await db.collection("tap")
    .orderBy("sort", "asc")  // 按照sort字段升序排列(从小到大)
    .get();
  
  //返回数据给客户端
  return result;
};