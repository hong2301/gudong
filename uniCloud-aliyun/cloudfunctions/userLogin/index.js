'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const rows=await db.collection("user").get()
	const userItem = rows.data.filter(item => item.name === event.name)
	let sendData={}
	let status=0
	if(!event?.passWord){
		if (userItem.length!==0) {
			// 检查是否有密码
			if (userItem[0].passWord && userItem[0].passWord !== "") {
				status=1
			} else {
				sendData=userItem[0]
				status=3
			}
		
		} else {
			sendData={
				name: event.name,
				profile: "/static/shouye.png",
				startText: "你好呀",
				role: 1,
				eatNum: 0,
				writeNum: 0,
				passWord: ''
			}
			await db.collection("user").add(sendData)
			status=2
		}
	}else{
		const result = rows.data.some(item =>
			item.name === event.name && item.passWord === event.passWord
		);
		if (result) {
			rows.data.forEach(item => {
				if (item.name === event.name) {
					sendData = item
					status=3
				}
			})
		}else{
			status=1
		}
	}
	
	
	//返回数据给客户端
	return {
		status:status,
		data:sendData
	}
};
