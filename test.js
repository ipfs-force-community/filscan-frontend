function checkUrl(url) {
  /*
    匹配/xxx#hash
    /xxx/?name=xxx#xxx
    /xxx#xxx?xxx=xxx

    */

  const regex = /^(?!\/#\/).*\/[^\/#?]*?(#[^#\/?]*|\?[^#]*=[^#\/]*|#[^#\/?]*\?[^#]*=[^#\/]*)*$/;
  return regex.test(url);
}
const a = '/tipset/message-list?name=AddBalance&p=4';
const b = '/miner/f01345523';
const c = '/#/home'
const d = 'miner/f01345523?name=ChangeMultiaddrs#traces_list';
const e ='token/0x005e02a4a934142d8dd476f192d0dd9c381b16b4#owner'
console.log(checkUrl(b))

// function truncateDecimalAfterZeros(num, decimalPlaces) {
//   const str = num.toString();
//   const match = str.match(/0\.(0*)(\d{1,2})?/);

//   if (!match) {
//     return parseFloat(num).toFixed(decimalPlaces);
//   }

//   const leadingZeros = match[1];
//   const digits = match[2] || "";

//   return "0." + leadingZeros + digits;
// }

// console.log(truncateDecimalAfterZeros('0.0000000004710931058573958', 2));  // 输出 "0.00000005"
// console.log(truncateDecimalAfterZeros('0.123456789', 2));  // 输出 "0.12"
// console.log(truncateDecimalAfterZeros('0.000123456789', 2));  // 输出

// console.log(truncateDecimalAfterZeros('0.00000005023429172725737,2'))