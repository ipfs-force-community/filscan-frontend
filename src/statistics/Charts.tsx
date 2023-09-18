/** @format */
import EChart from "@/components/echarts";
import { Translation } from "@/components/hooks/Translation";
import { fil_charts } from "@/contents/statistic";
import { useFilscanStore } from "@/store/FilscanStore";
import { getColor } from "@/utils/echarts";
import { useEffect, useMemo, useState } from "react";

function Overview() {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'static' });
  const [legendData, setLegendData ] = useState<any>({});
  const [data, setData] = useState<any>({})

  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);
  const defaultOtions: any = useMemo(() => {
    return {
      tooltip: {
        show: false,
      },
      series: [
        {
          type: "pie",
          radius: '50%',
          label: {
            show: true,
            color:color.labelColor,
            formatter:(param: any)=> {
              return param.name +'(' + param.value + '%)';
              //return param.name + '<br />' +`<span style="color:${color.textStyle}">(${param.value}%)</span>`
            }
          },
          data: [],
        },
      ],
    };
  }, [theme]);

  useEffect(() => {
    const seriesData: any = [];
    const legendData: any = {};
    fil_charts.chart.forEach((item: any) => {
      const value = item.value || "--";
      const name = `${tr(item.key)}`;
      legendData[item.key]={
        name,
        color: item.color,
        key:item.key,
        isShow:true
      };
      seriesData.push({
        value,
        name,
        key:item.key,
        itemStyle: {
          color:item.color
        }
      });
    });
    const newOpt = { ...defaultOtions };
    newOpt.series[0].data = seriesData;
    setData(newOpt)
    setLegendData(legendData)
  }, [lang,theme])

  const options = useMemo(() => {
    const newData :any= { ...data };
    const series: any = [];
    if (newData.series && newData.series.length > 0) {
      data.series[0].data?.forEach((v:any) => {
        if (legendData[v.key]?.isShow) {
          series.push(v)
        }
      })
      newData.series[0].data = series;
    }

    return newData
  }, [data, legendData])

  const handleLegend = (legendKey:string) => {
    const newLegend = { ...legendData };
    newLegend[legendKey].isShow = !newLegend[legendKey].isShow;
    setLegendData(newLegend)
  }

  return <div>
    <div className='flex items-center h-9 w-fit font-PingFang font-semibold text-lg pl-2.5 mb-4'>
      { tr('charts_title') }
    </div>
    <div className="card_shadow w-full border border_color rounded-[12px]">

      <div className="flex flex-row border-b border_color">
        <div className="w-2/3 h-[350px] py-5">
          <EChart options={options}/>
        </div>
        <ul className="1/3 flex gap-y-2.5  flex-col justify-center">
          {Object.keys(legendData).map((legendKey: any) => {
            const legend = legendData[legendKey];
            return <li key={legendKey} className='flex gap-x-2 items-center text-xs text_des cursor-pointer'
              onClick={() => { handleLegend(legendKey)}}>
              <span className='block w-4 h-4 rounded-full' style={{ background: legend.isShow ? legend?.color || "":'#d1d5db' }} />
              <span>{ legend?.name||""}</span>
            </li>
          })}
        </ul>

      </div>
      <div className="p-10 text-xs font-DINPro-Medium text_des">
        <ul className="border border_color rounded-[5px]">
          {fil_charts.content.map((v,index) => {
            return <li key={ index} className="flex border-b border_color w-full break-words min-h-[36px] flex items-center last:border-none">
              <div style={{width:'20%'}} className="flex items-center h-full min-h-[36px] px-2.5  border-r border_color" >{tr(v.label)}</div>
              <div style={{width:'25%'}} className="flex items-center h-full min-h-[36px]  px-2.5 border-r border_color">{index === 0 ? tr(v.value): v.value}</div>
              <div style={{width:'40%'}} className="px-2.5" >{ tr(v.description)}</div>

            </li>
          })}
        </ul>

      </div>
    </div>
  </div>
}
export default Overview;
