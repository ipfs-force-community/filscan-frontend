import { isArray } from 'mytoolkit'

export const colors = [
  'rgba(29, 107, 253, 0.08)',
  'rgba(112, 79, 228, 0.08)',
  'rgba(201,78,119,0.08)',
  'rgba(57, 178, 226, 0.08)',
  'rgba(233, 119, 70, 0.08)',
  'rgba(116, 204, 110, 0.08)',
  'rgba(240, 176, 71, 0.08)',
]
export const colorsText = [
  'rgba(29, 107, 253, 0.1)',
  'rgba(112, 79, 228, 0.1)',
  'rgba(201,78,119,0.1)',
  'rgba(57, 178, 226, 0.1)',
  'rgba(233, 119, 70, 0.1)',
  'rgba(116, 204, 110, 0.1)',
  'rgba(240, 176, 71, 0.1)',
]

export function getGroupListWidth(gl: any, bw: any, padding: any) {
  let w = (gl.length - 1) * padding
  w += getGroupBlockCount(gl) * bw
  return w
}
function getGroupBlockCount(gl: any) {
  let c = 0
  if (Array.isArray(gl)) {
    ;(gl || []).forEach((g: any) => {
      if (isArray(g)) {
        g.forEach(() => {
          c++
        })
      } else {
        c++
      }
    })
  }

  return c
}

export function dotString(str = '', headLen = 6, tailLen = 6) {
  let strLen = str.length
  if (strLen < headLen + tailLen) {
    return str
  }
  let headStr = str.slice(0, headLen)
  let tailStr = tailLen > 0 ? str.slice(-tailLen) : ''
  return `${headStr}...${tailStr}`
}

// export function getTanDeg(tan:any) {
//   let result = Math.atan(tan) / (Math.PI / 180)
//   result = Math.round(result)
//   return result
// }
