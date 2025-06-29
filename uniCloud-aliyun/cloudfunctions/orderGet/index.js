'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { userId,userRole } = event;
	let result
	if(userRole===1){
		result = await db.collection('order')
		.orderBy('time', 'desc')
		.get();
	}else{
		result = await db.collection('order')
		.where({
		  userId: userId
		})
		.orderBy('time', 'desc')
		.get();
	}
	//返回数据给客户端
	return result.data
};
