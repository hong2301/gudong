'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	const result = db.collection('log').doc(event.logId).remove();
	return result
};
