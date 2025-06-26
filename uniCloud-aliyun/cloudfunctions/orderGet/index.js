'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { userId } = event;
	  const result = await db.collection('order')
	    .where({
	      userId: userId
	    })
	    .get();
	//返回数据给客户端
	return result.data
};
