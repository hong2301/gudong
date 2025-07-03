'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	const result=await db.collection("dish").add(event)
	return result
};
