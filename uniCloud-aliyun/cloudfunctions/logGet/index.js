'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 1. 获取原始数据
  const result = await db.collection("log").get();
  
  // 2. 对数据进行排序（不修改字段）
  const sortedData = [...result.data].sort((a, b) => {
    // 解析时间字符串 "2025年8月9日" → Date 对象
    const parseTime = (str) => {
      const [year, month, day] = str.match(/(\d+)年(\d+)月(\d+)日/).slice(1);
      return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    };
    return parseTime(b.time) - parseTime(a.time); // 降序排序
  });

  // 3. 返回原始结构（仅顺序变化）
  return {
    data: sortedData
  };
};