
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

//切换K, M, B
export const toDollar = (value, quantity) => {
  let q = quantity === "Raw" ? 1 : quantity === "Thousand" ? 1000 : quantity === "Million" ? 1000000 : 1000000000
  let num = Number(value) / q
  if (isNaN(num)) return '-'
  if (num === 0) return '$0'
  // console.log(quantity)
  if (Math.abs(num) < 0.1) return 'N/A'
  if (q === 1000) return numeral(num).format('$0,0.0') + 'K'
  else if (q === 1000000) return numeral(num).format('$0,0.0') + 'M'
  else if (q === 1000000000) return numeral(num).format('$0,0.0') + 'B'
  return numeral(num).format('$0,0.0')
}

// 格式化金额，自动进位切换K，M，B、
export const toDollarAuto = (value) => {
  if (isNaN(value)) return '-'
  if (value === 0) return '$0'
  
  if (value >= 1000000000) return numeral(value/1000000000).format('$0,0.00') + 'B'
  else if (value >= 1000000) return numeral(value/1000000).format('$0,0.00') + 'M'
  else if (value >= 1000) return numeral(value/1000).format('$0,0.00') + 'K'
  return numeral(value).format('$0,0.00')
}

// 格式化数量(三位分隔)
export const toCount = function (val) {
  const decimalAmount = keepTwoDecimal(val);
  return numeral(decimalAmount).format('0,0');
};

// 格式化百分比(三位分隔)
export const toPercentage = function (val) {
  const decimalAmount = keepTwoDecimal(val);
  return numeral(decimalAmount).format('0,0.00') +'%';
};

