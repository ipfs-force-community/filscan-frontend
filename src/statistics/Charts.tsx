/** @format */
import EChart from "@/components/echarts";
import { Translation } from "@/components/hooks/Translation";
import { fil_charts } from "@/contents/statistic";
import { useFilscanStore } from "@/store/FilscanStore";
import { getColor } from "@/utils/echarts";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import styles from "./Charts.module.scss";
import useWindow from "@/components/hooks/useWindown";
import { BrowserView, MobileView } from "@/components/device-detect";
function Overview() {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: "static" });
  const [legendData, setLegendData] = useState<any>({});
  const [data, setData] = useState<any>({});
  const { isMobile } = useWindow();
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
          radius: "50%",
          label: {
            show: true,
            color: color.labelColor,
            formatter: (param: any) => {
              return param.name + "(" + param.value + "%)";
              //return param.name + '<br />' +`<span style="color:${color.textStyle}">(${param.value}%)</span>`
            },
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
      legendData[item.key] = {
        name,
        value,
        color: item.color,
        key: item.key,
        isShow: true,
      };
      seriesData.push({
        value,
        name,
        key: item.key,
        itemStyle: {
          color: item.color,
        },
      });
    });
    const newOpt = { ...defaultOtions };
    newOpt.series[0].data = seriesData;
    setData(newOpt);
    setLegendData(legendData);
  }, [lang, theme]);

  const options = useMemo(() => {
    const newData: any = { ...data };
    const series: any = [];
    if (newData.series && newData.series.length > 0) {
      data.series[0].data?.forEach((v: any) => {
        if (legendData[v.key]?.isShow) {
          series.push(v);
        }
      });
      newData.series[0].data = series;
      if (isMobile) {
        newData.series[0].radius = "80%";
        newData.series[0].label.show = false;
        newData.tooltip.position = ["40%", "50%"];
        newData.tooltip.show = true;
        newData.tooltip.formatter = (v: any) => {
          const { name, value, data } = v;
          return `${v.marker} ${data.value}% <div>${data.name}</div>`;
        };
        newData.series[0].center = ["50%", "45%"];
      }
    }
    return newData;
  }, [data, legendData, isMobile]);

  const handleLegend = (legendKey: string) => {
    const newLegend = { ...legendData };
    newLegend[legendKey].isShow = !newLegend[legendKey].isShow;
    setLegendData(newLegend);
  };

  return (
    <div>
      <div
        className={classNames(
          "flex items-center h-9 w-fit font-PingFang font-semibold text-lg pl-2.5 mb-4",
          styles.title
        )}
      >
        {tr("charts_title")}
      </div>
      <div
        className={classNames(
          "card_shadow w-full border border_color rounded-[12px]",
          styles.content
        )}
      >
        <div
          className={classNames(
            "flex flex-row border-b border_color",
            styles["chart-wrap"],
            styles["chart-wrap-reset"]
          )}
        >
          <div className={classNames("w-2/3 h-[350px] py-5", styles.chart)}>
            <EChart options={options} />
          </div>
          <ul className="1/3 flex gap-y-2.5  flex-col justify-center">
            {Object.keys(legendData).map((legendKey: any) => {
              const legend = legendData[legendKey];
              return (
                <li
                  key={legendKey}
                  className="flex gap-x-2 items-center text-xs text_des cursor-pointer"
                  onClick={() => {
                    handleLegend(legendKey);
                  }}
                >
                  <span
                    className={classNames(
                      "block w-2 h-2 rounded-full",
                      styles.dot
                    )}
                    style={{
                      background: legend.isShow
                        ? legend?.color || ""
                        : "#d1d5db",
                    }}
                  />
                  <span
                    className={classNames("flex", styles["legend-label-wrap"])}
                  >
                    <span className="flex-shrink-0">{legend?.name || ""}</span>
                    <MobileView>
                      <span className={styles.value}>
                        {" " + `${legend?.value}%`}
                      </span>
                    </MobileView>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <BrowserView>
          <div className="p-10 text-xs font-DINPro-Medium text_des">
            <ul className="border border_color rounded-[5px]">
              {fil_charts.content.map((v, index) => {
                return (
                  <li
                    key={index}
                    className="border-b border_color w-full break-words min-h-[36px] flex items-center last:border-none"
                  >
                    <div
                      style={{ width: "20%" }}
                      className="flex items-center h-full min-h-[36px] px-2.5  border-r border_color"
                    >
                      {tr(v.label)}
                    </div>
                    <div
                      style={{ width: "25%" }}
                      className="flex items-center h-full min-h-[36px]  px-2.5 border-r border_color"
                    >
                      {index === 0 ? tr(v.value) : v.value}
                    </div>
                    <div style={{ width: "40%" }} className="px-2.5">
                      {tr(v.description)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </BrowserView>
        <MobileView>
          {fil_charts.content
            .filter((value) => {
              return value.label !== "Allocation";
            })
            .map((v, index) => {
              return (
                <li
                  key={index}
                  className={classNames(
                    "flex flex-col text_des px-[12px] py-[14px] gap-y-[15px] border-b border_color last:border-none",
                    styles["describe-item"]
                  )}
                >
                  <div className="flex">
                    <span
                      className={classNames(
                        "min-w-[100px] pt-[2px]",
                        styles.label
                      )}
                    >
                      {tr("Allocation")}:
                    </span>
                    <span className="font-DINPro-Medium  text-black">
                      {tr(v.label)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className={classNames("min-w-[100px]", styles.label)}>
                      {tr("value")}:
                    </span>
                    <span className="font-DINPro-Medium  text-black">
                      {index === 0 ? tr(v.value) : v.value}
                    </span>
                  </div>
                  <div className="flex">
                    <span className={classNames("min-w-[100px]", styles.label)}>
                      {tr("description")}:
                    </span>
                    <span className="font-DINPro-Medium  text-black">
                      {tr(v.description)}
                    </span>
                  </div>
                </li>
              );
            })}
        </MobileView>
      </div>
    </div>
  );
}
export default Overview;
