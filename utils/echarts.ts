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
