/** @format */

import { apiUrl } from '@/contents/apiUrl';
import Copy from '@/components/copy';
import { Item } from '@/contents/type';
import fetchData from '@/store/server';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import Link from 'next/link';
import router from 'next/router';

export const pageLimit = 15;
export const detailPageLimit = 10;
export const max_name_length = 10;

export function getShowData(item: any, data: { [key: string]: any }): any {
  const [first, second] = item.type || [];
  let showData: any = data;
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
  num: string | number,
  unit?: string,
  len: number = 0
) {
  if (unit === 'FIL') {
    const showNum = new BigNumber(num).dividedBy(Math.pow(10, 18));
    return Number(Number(showNum)?.toFixed(len));
  } else if (unit === 'nanoFiL') {
    const showNum = new BigNumber(num).dividedBy(Math.pow(10, 9));
    return Number(Number(Number(showNum)?.toFixed(len)));
  }
  return Number(num);
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

  return toLocal
    ? flag + formatNumber(res) + (pure ? '' : unit)
    : flag + res + (pure ? '' : unit);
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

export function isIndent(str: string, unit: number = 5, unitNum: number = 4) {
  const showUnit = unitNum ? unit + unitNum : unit * 2;
  const suffixNum = unitNum || unit;
  return str && unit && str.length > showUnit
    ? str?.slice(0, unit) + '...' + str?.slice(-suffixNum)
    : str;
}

// $ + number
export function get$Number(str: string | number) {
  const showNum = Number(str);
  const newNum =
    showNum < 0
      ? '-$' + formatNumber(Math.abs(showNum))
      : '$' + formatNumber(showNum);
  return newNum;
}

export function getClassName(str: string | number) {
  const showNum = Number(str);
  if (showNum === 0) return '';
  return showNum < 0 ? 'text_red' : 'text_green';
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
export function isMobile() {
  if (process.browser) {
    return window.innerWidth < 1100;
  }
}

//不同账户 ,

//不同账户 ,
export const get_account_type = (value: string = '', unit: number = 6) => {
  return (
    <>
      <span
        className='link_text'
        onClick={() => {
          account_link(value);
        }}>
        {isIndent(value, isMobile() ? 6 : unit)}
      </span>
      {value && <Copy text={value} />}
    </>
  );
};

export const account_link = async (value: string) => {
  let show_type;
  const result: any = await fetchData(apiUrl.searchInfo, { input: value });
  show_type = result?.result?.result_type;

  switch (show_type) {
    case 'miner':
      return router.push(`/miner/${value}`);
    case 'storageminer':
      return router.push(`/miner/${value}`);
    default:
      return router.push(`/address/${value}`);
  }
};
