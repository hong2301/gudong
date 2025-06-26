'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { id, updateData } = event;
	const result = await db.collection('order')
		.doc(id)
		.update(updateData);
	//返回数据给客户端
	return result
};
