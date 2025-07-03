'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const result = await db.collection("dish")
	.doc(event.dishId) 
	.get();
	return result.data
};
