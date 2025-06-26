'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const result = await db.collection("log")
	.doc(event.logId) 
	.get();
	
	//返回数据给客户端
	return result.data
};