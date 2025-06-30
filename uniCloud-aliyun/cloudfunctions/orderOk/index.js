'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('order');
	const {_id,...data}=event.item
	const result=await collection.doc(_id).update(data);
	return result
};
