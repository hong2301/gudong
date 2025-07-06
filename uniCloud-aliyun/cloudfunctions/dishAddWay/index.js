'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { dishId, way } = event;
	const dishData = await db.collection("dish")
	.doc(dishId) 
	.get();
	dishData.data[0].ways.push(way)
	const {_id,...data}=dishData.data[0]
	const result = await db.collection('dish')
		.doc(_id,)
		.update(data);
	//返回数据给客户端
	return result
};
