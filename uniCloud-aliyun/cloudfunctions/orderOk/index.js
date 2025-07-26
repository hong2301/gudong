'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
    const collection = db.collection('order');
    const { _id, ...data } = event.item
    const result = await collection.doc(_id).update(data);

    // 用户次数
    const userData = await db.collection('user').doc(data.userId).get();
    userData.data[0].eatNum = (userData.data[0].eatNum || 0) + 1
    await db.collection('user').doc(data.userId).update({
        eatNum: userData.data[0].eatNum
    });

    // 食物次数
    const dishCollection = db.collection('dish');
    // 使用 for...of 替代 forEach 以便使用 await
    for (const dItem of data.dish) {
        dItem.num++
        dItem.updateTime = Date.now()
        const { _id, ...updateData } = dItem
        await dishCollection.doc(_id).update(updateData);
    }

    return result
};