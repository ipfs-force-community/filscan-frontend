/** @format */

import { apiUrl } from '@/contents/apiUrl';
import Copy from '@/components/copy';
import fetchData from '@/store/server';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import router from 'next/router';
import { BrowserView, MobileView } from '@/components/device-detect';
import CopySvgMobile from '@/assets/images/icon-copy.svg';

export const pageLimit = 15;
export const pageHomeLimit = 10;
export const max_name_length = 10;

// 账户类型
/*
account:一般账户

*/
export function parseQueryString(queryString: string) {
  const params: Record<string, any> = new URLSearchParams(queryString);
  const obj: Record<string, any> = {};
  for (const [key, value] of params.entries()) {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

export function getShowData(item: any, data: { [key: string]: any }): any {
  let showData: any = data;

  const [first, second] = item.type || [];
  if (first) {
    if (second) {
      showData = data && data[first] && data[first][second];
    } else {
      showData = data && data[first];
    }
  }

  return showData;
}
export function formatFil(
  number: string | number,
  unit = 'FIL',
  len = 4,
  isAccount?: boolean,
) {
  let returnValue;
  const num = Math.abs(Number(number));
  const flag = Number(number) < 0 ? '-':''
  if (unit.startsWith('FIL')) {
    const showNum = new BigNumber(num).dividedBy(Math.pow(10, 18));
    returnValue = Number(showNum)
  } else if (unit === 'nanoFiL') {
    const showNum = new BigNumber(num).dividedBy(Math.pow(10, 9));
    returnValue = Number(showNum)
  } else {
    returnValue = Number(num);
  }
  if (isAccount) {
    //unit === 'FIL',len=4
    if (returnValue === 0) {
      return `0 ${unit}`
    }
    if (returnValue < 0.0001) {
      return '<0.0001 FIL'
    }
    return len ? flag + Number(returnValue).toLocaleString('en', { maximumFractionDigits: len }) + ' ' + unit:flag + Number(returnValue)
  }
  return len ? flag+ Number(returnValue).toFixed(len):flag + Number(returnValue)
}

export function formatFilNum(
  showNum: number | string,
  atto = false,
  pure = false,
  len: number | undefined = 4,
  toLocal: boolean = true
): string {
  let baseNum = Number(showNum);
  let num = baseNum;
  let flag = '';
  if (atto) {
    return num + (pure ? '' : ' attoFIL');
  }
  if (baseNum < 0) {
    num = Math.abs(baseNum);
    flag = '-';
  }
  let dot = new BigNumber(Number(num))
    .dividedBy(Math.pow(10, 18))
    .toFixed()
    .split('.')[1];
  const num1 = new BigNumber(Number(num))
    .dividedBy(Math.pow(10, 18))
    .toFixed()
    .split('.')[0];
  const num2 = new BigNumber(Number(num))
    .dividedBy(Math.pow(10, 9))
    .toFixed(len)
    .split('.')[0];
  let zero = 1;
  let res: string | number = num;
  let unit = ' attoFIL';
  if (atto) {
    unit = ' attoFIL';
    num = num;
  }
  if (dot) {
    for (let v of dot) {
      if (Number(v) !== 0) {
        break;
      } else {
        zero++;
      }
    }
  }

  if ((zero <= 5 && Number(num1)) || num2.length > 6) {
    res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed(len);
    unit = ' FIL';
    //return num + " FIL";
  } else if (zero <= 13 && Number(num) > Math.pow(10, 7)) {
    res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 9)).toFixed(len);
    unit = ' nanoFIL';
  } else {
    res = num;
    unit = ' attoFIL';
  }

  if (res === 0 && unit === ' attoFIL') {
    return '0 FIL'
  }
  return toLocal
    ? flag + formatNumber(res) + (pure ? '' : unit)
    : flag + res + (pure ? '' : unit);
}

export const unitConversionNum = (str:string) => {
  let sizes:any = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  return sizes.findIndex((v:string)=>v===str)
}

export const unitConversion = (
  item: string | number,
  len?: number,
  num = 0
): string => {
  let showItem: string | number = Number(item);
  let sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let positive = true;
  if (showItem == 0) {
    let unit = sizes[num];
    if (unit === 'Bytes') {
      unit = 'Byte';
    }
    return '0' + ' ' + unit;
  }
  if (showItem < 0) {
    positive = false;
    showItem = Math.abs(showItem);
  }
  let k = 1024;

  let c = num || Math.floor(Math.log(showItem) / Math.log(k));
  if (c < 0) {
    showItem = 0;
  } else {
    let units = sizes[c];
    if (!showItem && units === 'Bytes') {
      units = 'Byte';
    }
    showItem = (showItem / Math.pow(k, c)).toFixed(len) + ' ' + units;
  }
  return positive ? `${showItem}` : `-${showItem}`;
};

export function formatNumber(v: number | string, len = 4) {
  if (Number(v) === 0) {
    return v;
  }
  return v
    ? Number(v).toLocaleString('en', { maximumFractionDigits: len })
    : '--';
}

export function formatDateTime(
  time: number | string,
  str: string = 'YYYY-MM-DD HH:mm:ss'
) {
  if (!time) return '--';
  return typeof time === 'number'
    ? dayjs(time * 1000).format(str)
    : dayjs(time).format(str);
}

export function formatTime(from:number, to?:number, ago = true) {
  let startTime = from ||0; // 开始时间
  let endTime = to || new Date().getTime(); // 结束时间
  let usedTime = endTime - startTime; // 相差的毫秒数
  //timeDifference(usedTime)
  // let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
  // let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
  // let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
  // let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
  //  let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
  // let second = runTime % 60

  //计算出相差天数
  let days = Math.floor(usedTime / (24 * 3600 * 1000));
  //计算出小时数
  let leave1 = usedTime % (24 * 3600 * 1000);
  //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000)); // 分
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000); // 秒
  //let second = runTime % 60
  return {
    days,hours,minutes,seconds
  };
}

export function isIndent(str: string, unit: number = 6, unitNum?: number ) {
  const showUnit = unitNum ? unit + unitNum : unit * 2;
  const suffixNum = unitNum || unit;
  return str && unit && str.length > showUnit
    ? str?.slice(0, unit) + '...' + str?.slice(-suffixNum)
    : str;
}

export function formatNumberUnit(number: number | string, len = 2) {
  const num = Number(number);
  if (num >= 1e9) {
    return Number(num / 1e9).toLocaleString('en', { maximumFractionDigits: len }) +'B'
  }
  if (num >= 1e6) {
    return Number(num / 1e6).toLocaleString('en', { maximumFractionDigits: len }) +'M'
  }

  // if (num >= 1e3) {
  //   return Number(num / 1e3).toLocaleString('en', { maximumFractionDigits: len }) +'K'
  // }

  return Number(num).toLocaleString('en', { maximumFractionDigits: len })
}

//连续0后保留几位
function truncateDecimalAfterZeros(num: string | number, decimalPlaces = 2) {
  const strNum =num.toString()
  const match = strNum.match(/0\.(0*)(\d{1,2})?/);
  if (!match) {
    return parseFloat(strNum).toFixed(decimalPlaces);
  }

  const leadingZeros = match[1];
  const digits = match[2] || "";
  return "0." + leadingZeros + digits;
}

// $ + number
export function get$Number(str: string | number, len?: number) {
  const showNum = Number(str);
  let showStr =String(str);
  let flag = ''
  if (showStr.includes('-')) {
    showStr = showStr.split('-')[1];
    flag='-'
  }
  if (str > '0' && str < '1') {
    return flag+'$'+truncateDecimalAfterZeros(showStr, 2);
  }
  const newNum =
    showNum < 0
      ? '-$' + formatNumberUnit(Math.abs(showNum), len)
      : '$' + formatNumberUnit(showNum, len);
  return newNum;
}
//%
export function formatNumberPercentage(num:string|number, decimalPlaces:number =2) {
  return parseFloat((Number(num)*100).toFixed(decimalPlaces));
}

export function getClassName(str: string | number) {
  const showNum = Number(str);
  if (showNum === 0) return '';
  return showNum < 0 ? 'text_red' : 'text_green';
}

//获取当天的日期
export function getCalcTime(startTime?: number): number {
  if (startTime) {
    return (new Date().getTime() - startTime * 24 * 60 * 60 * 1000) / 1000;
  }
  return new Date().getTime() / 1000;
}

//密码校验规则
export function validatePassword(password: string, email: string): boolean {
  // 8-20个字符
  if (password.length < 8 || password.length > 20) {
    return false;
  }

  // 需要同时包含数字、字母
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return false;
  }

  // 密码不能与邮箱地址相同
  if (password === email) {
    return false;
  }

  return true;
}

// 校验验证码
export function validateCode(code: number | string) {
  // 六位验证码 9999 100000
  const newCode = Number(code);
  return newCode > 99999 && newCode < 1000000;
}

//首字母大写,其余不变
export function titleCase(str: string | number | boolean) {
  const Str = String(str);
  const newStr = Str.slice(0, 1).toUpperCase() + Str.slice(1);
  return newStr;
}

//不同账户 ,
export const get_account_type = (value: string = '', unit: number = 6) => {
  return (
    <>
      <MobileView>
        <span className='copy-row'>
          <span
            className='w-28 text'
            onClick={() => {
              account_link(value);
            }}>
            {isIndent(value,unit)}
          </span>
          <Copy text={value} icon={<CopySvgMobile/>} className='copy'/>
        </span>
      </MobileView>
      <BrowserView>
        <span
          className='link_text'
          onClick={() => {
            account_link(value);
          }}>
          {isIndent(value,unit)}
        </span>
        {value && <Copy className='!w-[13px]' text={value} />}
      </BrowserView>

    </>
  );
};

export const account_link = async (value: string) => {
  let show_type;
  const result: any = await fetchData(apiUrl.searchInfo, { input: value });
  show_type = result?.result_type;
  switch (show_type) {
  case 'miner':
    return router.push(`/miner/${value}`, `/miner/${value}`, {scroll:true});
  case 'storageminer':
    return router.push(`/miner/${value}`, `/miner/${value}`, {scroll:true});
  default:
    return router.push(`/address/${value}`, `/address/${value}`, {scroll:true});
  }
};

export const isMobile = ()=>{
  try{
    return window.innerWidth <= 1000;
  }catch(error){
    console.log('Error: Window does not exist!');
    return false
  }
}
