'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { _id } = event;
	const result = await db.collection("order")
	.where({
	  _id: db.RegExp({
		regexp: _id
	  })
	})
	.get();
	//返回数据给客户端
	return result.data
};
