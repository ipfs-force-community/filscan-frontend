/** @format */
import { useEffect, useState, useMemo, useContext } from "react";
import { getColor, defaultOpt } from "@/contants/varible";
import { useTranslation } from "react-i18next";
import { charts } from "@/contants/statistic";
import FilscanState from "@/store/content";
import styles from "./index.module.scss";
import Chart from "@/components/echarts";
import { OPT_Value } from "@/types";
import Header from "./Header";

interface Props {
    type: string;
    data:any
}

function Trend(props: Props) {
  const filscanStore: any = useContext(FilscanState);
  const {  type ,data} = props;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };
  
  const color = useMemo(() => {
    return getColor(filscanStore.filscan.theme);
  }, [filscanStore.filscan.theme]);


  const defaultOptions = useMemo(() => {
    return {
        ...defaultOpt("line", filscanStore.filscan.theme),
         grid: {
        top: 50,
        left: 40,
        right: 50,
        bottom: 10,
        containLabel: true,
      },
      yAxis: [
        {
          type: "value",
          position: "left",
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: color.textStyle,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: color.splitLine,
            },
          },
        },
        {
          type: "value",
          position: "right",
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              //  fontSize: this.fontSize,
              color: color.textStyle,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show:false,
            lineStyle: {
              type: "dashed",
              color: color.splitLine,
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: color.toolbox,
        borderColor: "transparent",
        textStyle: {
          color: "#ffffff",
          fontFamily: 'system-ui'
        },
        formatter(v: any) {
            var result = v[0].name;
          v.forEach((item: any) => {
            const showValue = item.data.amount || item.data.value
            const showUnit = item.data.unit
            if (item.data) {
              result +=
                "<br/>" +
                item.marker +
                item.seriesName +
                ": " +
               showValue?.toLocaleString() + ' '+
                item.data.unit;
            }
          });
          return result;
        },
      },
    };
  }, [filscanStore.filscan.theme]);

  const [options, setOptions] = useState<any>({});
    const showData = useMemo(() => {
     return charts[type].list
    }, [type])
    
    const load = () => {
        const { seriesObj,xData} = data
        if (seriesObj && xData.length > 0) {
            const legendList: any = [];
            const newOpt: any = { ...defaultOptions };
            newOpt.xAxis.data = xData;
            newOpt.series = [];
            if (type === 'active_nodes') { 
                newOpt.yAxis[0].splitLine.show = true;
            }
            showData?.forEach(
              (item: { label: string; type: any; yIndex: any, color: string, yUnit?: string }, index: number) => {
               
                    legendList.push(tr(item.label));
                    newOpt.yAxis[item.yIndex].axisLabel.formatter = item?.yUnit ? '{value}' + item?.yUnit : '{value}';
                    newOpt.series.push({
                        type: item.type,
                        data: seriesObj[item.label],
                        name: tr(item.label),
                        yAxisIndex: item.yIndex,
                        smooth: true,
                        symbol: "circle",
                        itemStyle: {
                            color:item.color
                        },
                        barMaxWidth: "30",
                    });
                }
            );
            newOpt.legend.data = legendList;
            setOptions({ ...newOpt });
        }
  };

  useEffect(() => {
    load();
  }, [filscanStore.filscan,data]);

    return (
        <Chart className={styles.charts} propsOption={{ ...options }}  />
  );
}

     


export default Trend;
