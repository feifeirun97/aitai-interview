
import numeral from 'numeral';

// 保留两位小数
export const keepTwoDecimal = val => Math.floor(val * 100) / 100;

// 格式化金额(三位分隔+保留两位小数) 除以1万
export const formatNumber = function (val) {
  const wan = 1e4;
  const format = '0,0.00';
  const decimalAmount = keepTwoDecimal(val / wan);
  const amount = numeral(decimalAmount).format(format);
  return amount;
};

// 格式化金额(三位分隔+保留两位小数)
export const formatNumber1 = function (val) {
  const format = '0,0.00';
  const decimalAmount = keepTwoDecimal(val);
  const amount = numeral(decimalAmount).format(format);
  return amount;
};

//转换为万  120000 -> 12  falg判断是否保留两位小数
export const toWan = (value) => {
  if (isNaN(Number(value))) return '-'
  return '¥' + numeral(Number(value / 10000).toFixed(2)).format('0,0.00') + '万'
}
