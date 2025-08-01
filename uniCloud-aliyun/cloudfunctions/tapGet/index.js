'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const dishCollection = db.collection('dish');
	//event为客户端上传的参数
	const tapResult = await db.collection("tap")
		.orderBy("sort", "asc")  // 按照sort字段升序排列(从小到大)
		.get();
	
	// 使用 map 代替 forEach，因为 forEach 不支持 async/await
	const promises = tapResult.data.map(async (item) => {
	  const dishResult = await db.collection("dish")
		.where({
		  tapId: item._id // 根据 tapId 匹配 dish 数据
		})
		.get();

		if(event?.isRan){
			item.dish = dishResult.data.sort(() => Math.random() - 0.5);
			item.dish.forEach((item,index)=>{
				item.sort=index
				const {_id,...data}=item
				dishCollection.doc(_id).update(data);
			})
		}else{
			item.dish=dishResult.data.sort((a,b)=>a.sort-b.sort)
		}
		
	  
		return item; // 返回更新后的 item
	});

	// 使用 Promise.all 并行执行所有查询，并等待全部完成
	const results = await Promise.all(promises);
  
	//返回数据给客户端
	return results;
};