module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
     'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转换的单位
      viewportWidth: 1440, // 视口宽度
      unitPrecision: 5, // 单位精度
      propList: ['*'], // 需要转换的属性
      viewportUnit: 'vw', // 转换后的单位
      fontViewportUnit: 'vw', // 字体单位
      selectorBlackList: [], // 要忽略的选择器列表
      minPixelValue: 1, // 最小像素值
      mediaQuery: false, // 是否生成媒体查询
    },
  },
}
