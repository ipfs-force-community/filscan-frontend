export function formatNumber(v: number|string, len = 4) {
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