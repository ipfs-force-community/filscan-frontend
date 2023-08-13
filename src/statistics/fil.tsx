/** @format */
import Chart from "@/components/echarts";
import { useMemo, useContext } from "react";
import FilscanState from "@/store/content";
import { useTranslation } from "react-i18next";
import { getColor, defaultOpt } from "@/contants/varible";
import styles from "./index.module.scss";
import { isMobile } from "@/utils/utils";

function Overview({ data,list }: { data: any ,list:Array<any>}) {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };
  const color = useMemo(() => {
    return getColor(filscanStore.filscan.theme);
  }, [filscanStore.filscan.theme]);

  const legObj = {
    orient: 'vertical',
    top: "15%",
    right: "20%",
    textStyle: {
      fontSize: 12,
      fontFamily: 'system-ui',
      color: color.textStyle,
    },
  };

  const defaultOtions: any = useMemo(() => {
    return {
      tooltip: {
        show: false,
      },
      legend: isMobile() ? {
        top: '5%',
        left:'5%',
      }:{
          orient: 'vertical',
         top: "15%",
         right: "20%",
        textStyle: {
          fontSize: 12,
          fontFamily: 'system-ui' ,
          color: color.textStyle,
        },
      },
      series: [
        {
          type: "pie",
              radius: '50%',
          label: {
            show:isMobile()?false: true,
            color:color.textStyle,
              formatter(param: any) {
                  const { percentage,name_show } = param.data;
                  if (percentage) { 
                      return name_show +' (' +percentage+  ')';
                  }
          return param.name + ':'+' (' + param.value + '%)';
        }
      },
        data: [],
         center: isMobile()?['45%','55%']:["25%", "50%"],
        },
      ],
    };
  }, [filscanStore.filscan]);

  const options = useMemo(() => {
    const seriesData: any = [];
    const legendData: any = [];
    list.forEach((item: any) => {
      const value = item.value || "--";
      const name = `${tr(item.key)}: (${value.toLocaleString()} FIL)`;
      legendData.push(name);
        seriesData.push({
        ...item,
            value,
            name,
          name_show:`${tr(item.key)}`,
          itemStyle: {
              color:item.color
          }
      });
    });
    const newOpt = { ...defaultOtions };
    newOpt.series[0].data = seriesData;
      newOpt.legend.data = legendData;
      return { ...newOpt };
      
  }, [data, filscanStore.filscan]);
    
  return <Chart className={styles.fil_chart_pie} style={{height:isMobile()?'550px':'300px'}} propsOption={{ ...options }} />
    
}
export default Overview;
