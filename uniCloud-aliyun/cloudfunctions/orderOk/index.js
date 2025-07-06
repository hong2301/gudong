'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('order');
	const {_id,...data}=event.item
	const result=await collection.doc(_id).update(data);
	
	// 用户次数
	const order=await collection.doc(_id).get();
	const {userId}=order.data[0]
	const userData=await db.collection('user').doc(userId).get();
	userData.data[0].eatNum++;
	await db.collection('user').doc(userId).update({
		eatNum:userData.data[0].eatNum
	});
	
	// 食物次数
	const dishCollection = db.collection('dish');
	data.dish.forEach(dItem=>{
		dItem.num++
		dItem.updateTime=Date.now()
		const {_id,...data}=dItem
		dishCollection.doc(_id).update({
			  num: data.num,
			  updateTime:data.updateTime,
		});
	})
	
	
	return result
};
