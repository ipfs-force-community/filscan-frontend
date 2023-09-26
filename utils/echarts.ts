import * as echarts from 'echarts';

//base charts colors
export const colors = ["#F7C739", "#5AD8A6", "#5B8FF9", "#9270CA"];
//  const lightStyle = {
//       lineStyle: "rgba(0,0,0,0.15)",
//       splitLine: "rgba(0,0,0,0.15)",
//       textStyle: "#000000",
//       itemBorder: "#ffffff",
//       toolbox:'rgba(0,0,0,0.4)'
//     }
//     const blackStyle = {
//       lineStyle: "rgba(255,255,255,0.15)",
//       splitLine: "rgba(255,255,255,0.15)",
//       textStyle: "#ffffff",
//       itemBorder: "#ffffff",
//       toolbox:'rgba(0,0,0,0.4)'
//     }
const lightStyle = {
  lineStyle: "rgba(0,0,0,0.15)",
  splitLine: "rgba(230, 232, 235, 0.6)",
  textStyle: "#000000",
  labelColor:'rgba(0,0,0,0.6)',
  itemBorder: "#ffffff",
  toolbox:'rgba(0,0,0,0.4)'
}
const blackStyle = {
  lineStyle: "rgba(255,255,255,0.15)",
  splitLine: "rgba(255,255,255,0.15)",
  textStyle: "#ffffff",
  itemBorder: "#ffffff",
  labelColor:'rgba(255,255,255,0.6)',
  toolbox:'rgba(0,0,0,0.4)'
}

export const cwStyle = {
  'light': ['rgba(29, 107, 253, 0.08)','rgba(112, 79, 228, 0.08)','rgba(240, 176, 71, 0.08)','rgba(57, 178, 226, 0.08)','rgba(233, 119, 70, 0.08)','rgba(116, 204, 110, 0.08)'],
  'dark': []
}

export const seriesArea= {
  lineStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#179CEE' },
      { offset: 0.5, color: '#1764FF' },
      { offset: 1, color: '#003DB9' },
    ]),
  },
  areaStyle: {
    color: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1, // 渐变方向
      [
        { offset: 0, color: 'rgba(57,128 ,250,0.6)' }, // 渐变起始颜色
        { offset: 0.7, color: 'rgba(57,128 ,250,0.3)' }, // 渐变起始颜色
        { offset: 1, color: 'rgba(57 , 128,  250,0.01)' }, // 渐变结束颜色 rgba(23, 156, 238, 1)
      ]
    ),
  },
  markArea: {
    itemStyle: {
      color: 'trans',
    },
  },
}

export const seriesChangeArea= {
  areaStyle: {
    color: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1, // 渐变方向
      [
        { offset: 0, color: 'rgba(28,106,253,0.2)' }, // 渐变起始颜色
        { offset: 0.7, color: 'rgba(28,106 ,253,0.1)' }, // 渐变起始颜色
        { offset: 1, color: 'rgba(28,106 ,253,0)' }, // 渐变结束颜色 rgba(23, 156, 238, 1)
      ]
    ),
  },
  markArea: {
    itemStyle: {
      color: 'trans',
    },
  },
}

export const get_xAxis=(theme:string)=>{
  const color = getColor(theme);
  return {
    type: 'category',
    axisLabel: {
      color: color.labelColor,
    },
    axisLine: {
      lineStyle: {
        color: color.splitLine,
      },
    },
    lightStyle: {
      color: color.lineStyle,
    },
    axisTick: {
      show: false,
    },
    data: [],
  };
}

export const defaultOpt = (type: string, theme: string = 'light',) => {
  const color = getColor(theme)
  switch (type) {
  case 'line':
    return {
      xAxis: {
        type: "category",
        axisLabel: {
          textStyle: {
            color: color.textStyle,
          },
        },
        axisLine: {
          lineStyle: {
            color: color.splitLine,
          },
        },
        lightStyle: {
          color: color.lineStyle,
        },
        axisTick: {
          show: false,
        },
        data: [],
      // boundaryGap: false
      },
      legend: {
      // data: this.tr("yAxisName"),
        lineStyle: {
          color: "#ffffff",
        },
        textStyle: {
        // fontSize: this.fontSize,
          color: color.textStyle,
        },
        formatter(v: any) {
          return v;
        },
        icon: "circle",
      },

    }
  }
}

export const getColor = (theme:string) => {
  return theme === "light" ? lightStyle : blackStyle
}
