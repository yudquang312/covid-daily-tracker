export const formatNumber = (number) => {
    let result = "";
    let strNum = number + "";
    for (let i = 0; i < strNum.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            result = strNum[strNum.length - i - 1] + "," + result;
        } else {
            result = strNum[strNum.length - i - 1] + result;
        }
    }
    return result;
};
