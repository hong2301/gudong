export const formatTimestampToDate = (timestamp: number | string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，需+1
    const day = date.getDate();
    return {
        year: year,
        month: month,
        day: day,
        str: `${year}年${month}月${day}日`
    };
};