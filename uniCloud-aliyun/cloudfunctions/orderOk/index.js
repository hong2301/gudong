'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('order');
	const {_id,...data}=event.item
	const result=await collection.doc(_id).update(data);
	
	const dishCollection = db.collection('dish');
	data.dish.forEach(dItem=>{
		dItem.num++
		const {_id,...data}=dItem
		dishCollection.doc(_id).update({
			  num: data.num,
		});
	})
	
	return result
};
