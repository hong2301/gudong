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

export const getNowTimeStr = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，所以要加1
    const day = now.getDate();

    const formattedTime = `${year}年${month}月${day}日`;
    return formattedTime
};