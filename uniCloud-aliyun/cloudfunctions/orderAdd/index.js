'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const result=await db.collection("order").add(event)
	const tap=await db.collection("tap").get()
	const collection = db.collection('tap');
	event.dish.forEach(dItem=>{
		const findItem=tap.data.find(tItem=>tItem.text===dItem.text)
		findItem.dish.forEach(fiItem=>{
			if(fiItem.name===dItem.name){
				fiItem.num++
			}
		})
		const { _id, ...newObj } = findItem
		collection.doc(_id).update(newObj);
	})
	
	//返回数据给客户端
	return event
};
