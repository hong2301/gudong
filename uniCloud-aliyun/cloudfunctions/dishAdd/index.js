'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let status=0
	let findItem=0
	let findData={}
	const collection = db.collection('tap');
	//event为客户端上传的参数
	const rows=await db.collection("tap").get()
	rows.data.forEach(item=>{
		if(item._id===event.tapId){
			findData=item
			item.dish.forEach(dItem=>{
				if(dItem.name===event.dish.name){
					findItem=item
				}
			})
		}
	})
	
	if(findItem){
		status=2
	}else{
		if (!Array.isArray(findData.dish)) {
		  findData.dish = [];
		}
		event.dish._id=findData.dish.length
		findData.dish.push(event.dish)
		const { _id, ...newObj } = findData
		await collection.doc(event.tapId).update(newObj);
		status=1
	}

	
	//返回数据给客户端
	return {
		status:status
	}
};
