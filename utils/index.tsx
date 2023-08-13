import BigNumber from "bignumber.js";

export function formatFilNum(showNum: number | string, atto = false, pure = false, len: number | undefined = 4, toLocal: boolean = true): string {
  let baseNum = Number(showNum);
  let num = baseNum;
  let flag =''
  if (atto ) { 
    return num + (pure ? '' : ' attoFIL')
  }
  if (baseNum < 0) { 
    num = Math.abs(baseNum)
    flag ='-'
  }
  let dot = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed().split('.')[1];
  const num1 = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed().split('.')[0];
  const num2 =new BigNumber(Number(num)).dividedBy(Math.pow(10, 9)).toFixed(len).split('.')[0]
  let zero = 1
  let res:string|number = num
  let unit = ' attoFIL'
  if (atto) {
     unit=' attoFIL'
    num = num
  }
  if (dot) {
    for (let v of dot) {
      if (Number(v) !== 0) {
        break
      } else {
        zero++
      }
    }
  }
  
  if (zero <= 5 && Number(num1) || num2.length > 6) {
      res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed(len);
      unit = ' FIL'
      //return num + " FIL";
    } else if (zero <= 13 && Number(num) > Math.pow(10, 7) ) {
      res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 9)).toFixed(len)
      unit = ' nanoFIL'
    } else {
      res = num
      unit = ' attoFIL'
    }
  
  return  toLocal ? flag+ formatNumber(res)+(pure ? '' : unit) : flag + res + (pure ? '' : unit)
}

export const unitConversion = (item: string | number, len?: number,num = 0): string => {
    let showItem: string | number = Number(item)
       let sizes = [
        'Bytes',
        'KiB',
        'MiB',
        'GiB',
        'TiB',
        'PiB',
        'EiB',
        'ZiB',
        'YiB'
      ]
      let positive = true
      if (showItem == 0) {
          let unit = sizes[num];
        if ( unit === 'Bytes') { 
          unit = 'Byte'
        }
        return '0'+ ' ' +unit
      }
      if (showItem < 0) {
        positive = false
        showItem = Math.abs(showItem)
      }
      let k = 1024
   
  let c = num|| Math.floor(Math.log(showItem) / Math.log(k))
      if (c < 0) {
        showItem = 0
      } else {
        let units = sizes[c];
        if (!showItem&& units === 'Bytes') { 
          units = 'Byte'
        }
        showItem =(showItem / Math.pow(k, c)).toFixed(len) + ' ' + units
      }
      return positive ? `${showItem}` : `-${showItem}`
}

export function formatNumber(v: number | string, len = 4) {
      return Number(v).toLocaleString('en', { maximumFractionDigits: len })
}

export function isIndent(str: string, unit: number = 12) { 
    return str&&unit&&str.length > unit*2 ? str?.slice(0,unit)+'...'+ str?.slice(-unit):str
}

// $ + number 
export function get$Number(str: string|number) {
  const showNum = Number(str)
  const  newNum = showNum < 0 ? '-$'+formatNumber(Math.abs(showNum)):'$'+formatNumber(showNum) ;
  return newNum;
} 

export function getClassName(str: string | number) { 
  const showNum = Number(str);
    if (showNum === 0) return '';
   return showNum < 0?'text_red':'text_green';
}

export function isMobile() {
  if (process.browser) {
    return window.innerWidth < 1100
  }
}