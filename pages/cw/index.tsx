import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';
import leecharts from "@/src/cw/leecharts"
import { cwUrl } from '@/contents/apiUrl';
import loading from '@/assets/images/loading.png'
import useAxiosData from '@/store/useAxiosData';
import Image from 'next/image'
import {
  randStr,
  timeToStr,
  setStyle,
} from "mytoolkit";
import { colors, colorsText, dotString, getGroupListWidth } from '@/src/cw/utils';
import { useFilscanStore } from '@/store/FilscanStore';
import { Translation } from '@/components/hooks/Translation';
import cwStore from '@/store/modules/Cw';
import { observer } from 'mobx-react';
import Search from '@/src/cw/Search';
import { getSvgIcon } from '@/svgsIcon';
import { useRouter } from 'next/router';

const baseYAxis = 30;
const calcHeight = 100;

export default observer(() => {
  const { tr } = Translation({ ns: 'static' });
  const { theme } = useFilscanStore();
  const router = useRouter();
  // const [drawData, setDrawData] = useState<Array<any>>([]);

  const [chartLoading, setChartLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const {finalHeight } = cwStore;
  const { axiosData } = useAxiosData();
  const blockMap = useRef<any>({});
  const transformX = useRef(0);
  const transformY = useRef(30);
  const k = useRef(1);

  useEffect(() => {
    reDrawChart();
  }, [theme])

  const chartColor:any = {
    dark: {
      cidColor:'#ffffff',
      linkColor:`rgba(102,102,102,1)`,
      yLinkColor: `rgba(51, 51, 51, 1)`,
      yCircleColor: '#000000',
      fistText: `rgba(255,255,255,1)`,
      yAxisColor:`rgba(255,255,255,0.6)`,
      textColor: `rgba(255,255,255,0.6)`
    },

    light: {
      cidColor:'#000000',
      linkColor:`rgba(216,216,216,1)`,
      yLinkColor: `rgba(238, 239, 241, 1)`,
      yCircleColor:'#FFFFFF',
      fistText: `rgba(0,0,0,1)`,
      yAxisColor:`rgba(0,0,0,0.6)`,
      textColor:`rgba(0,0,0,0.6)`
    }
  }

  //chart
  const stageClipId = useRef("lc-" + randStr(8));
  const axisXClipId = useRef("lc-" + randStr(8));
  const axisYClipId = useRef("lc-" + randStr(8));
  const bhm = useRef<any>(null)
  const blockHeightList = useRef<any>(null)
  const drawData = useRef<any>([])
  const searchCid = useRef<string>('');
  const searchHeight = useRef<number|null>(null)
  const finalCurrentHeight = useRef<any>(null);
  const endHeight = useRef<any>(null);

  const reset=()=>{
    transformX.current = 0;
    transformY.current = 30;
    k.current = 1;
    blockMap.current = {};
    bhm.current = null;
    blockHeightList.current = null;
    drawData.current = null;
  }

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (finalCurrentHeight.current) {
      init()
    }
    return () => {
      window.removeEventListener("resize", onResize);
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (finalHeight && !finalCurrentHeight.current) {
      finalCurrentHeight.current = finalHeight;
      init();
    }
  },[finalHeight])

  const init = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = leecharts(chartContainerRef.current)
    getBlocks();
    let container = chartContainerRef.current
    let cc = window.document.querySelector(".chart-wrapper")
    let innerHeight = window.screen.availHeight;
    let containerHeight:any= innerHeight
    containerHeight = cc?.getBoundingClientRect().height
    setStyle(container, "height", containerHeight)
  }

  const getBlocks = async (value?: number|string,type?:string) => {
    const end = Number(value) || finalCurrentHeight.current ;
    endHeight.current = end;
    setChartLoading(true);
    let payload :any= {
      filters: {
        start: end-calcHeight,
        end:end
      }
    }
    if (type === 'cid') {
      payload = {
        filters: {
          cid: value,
          len: calcHeight
        }
      }
    }
    const result = await axiosData(cwUrl, payload);
    let resultData = result?.tipset_list || [];
    let newData: any[] = [];
    let bhmObj: Record<string, Array<any>> = {};
    if (type === 'cid' || type === 'height') {
      reset();
    }
    const res:any = [...resultData];
    // resultData.forEach((v:any) => {
    //   if (v?.ChainBlocks) {
    //     res.push(v)
    //   } else if (v?.OrphanBlocks?.length > 0) {
    //     res.push(v)
    //   }
    // });
    if (type === 'up') {
      //滚动条向下请求
      newData = [...drawData.current, ...res]
    }else {
      newData = [...res]
    }
    const blockList: Array<number> = [];
    const calcData: Array<any> = [];
    if (newData.length > 0) {
      newData.forEach((v:any) => {
        //[孤块,高度]｜[高度]
        bhmObj[v.Height] = v.OrphanBlocks ? [v.OrphanBlocks, v.ChainBlocks] : [v.ChainBlocks];
        blockList.push(v.Height)
        let showSearch=false
        if (v.ChainBlocks && v.ChainBlocks.length > 0) {
          v.ChainBlocks.forEach((chainItem: any) => {
            blockMap.current[chainItem._id] = chainItem;
            if (type === 'cid' && chainItem._id === searchCid.current) {
              showSearch=true
              searchHeight.current = Number(chainItem.Epoch)
            }
          })
          calcData.push(v)
        } else if (v?.OrphanBlocks?.length > 0) {
          calcData.push(v)
        }
        if (!showSearch &&v?.OrphanBlocks?.length >0) {
          v.OrphanBlocks.forEach((orphanItem:any) => {
            if (type === 'cid' && orphanItem._id === searchCid.current) {
              showSearch = true;
              console.log('----333',orphanItem)
              searchHeight.current = Number(orphanItem.Epoch)
            }
          })
        }
      });
      if (type === 'cid' && calcData.length > 0) {
        endHeight.current = calcData[0].Height-1;
      }
      drawData.current = [...calcData];
      bhm.current = bhmObj;
      blockHeightList.current = blockList
      drawChart(calcData,bhmObj,blockList)
    }
    setChartLoading(false)
  }

  const clearDrawChart = (value: any,type:string) => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = leecharts(chartContainerRef.current);
    getBlocks(value,type);
  }

  const reDrawChart = () => {
    if (drawData?.current && bhm?.current && blockHeightList?.current) {
      drawChart(drawData.current,bhm.current,blockHeightList.current)
    }

  }

  const drawChart = (data: Array<any>, bhm: Record<string, Array<any>> = {},blockHeightList:Array<number>) => {
    let textColor =chartColor[theme]?.textColor;
    let yAxisColor = chartColor[theme].yAxisColor;
    chartRef.current.setOptions({
      grid: {
        top: 0,
        right: 20,
        left: 85,
        bottom: 20
      },
      tooltip: {
        show: true,
        formatter: (toolTipData: any) => {
          let p = "<ul style='padding-top: 10px;'>"
            ;(toolTipData.Parents || []).forEach((item:any) => {
            p += `<li style="padding-left: 20px;margin-bottom: 10px;">${item}</li>`
          })
          p += "</ul>"
          return `
                <div class="tt">
                  <div style="margin-bottom: 10px;">cid: ${toolTipData._id}</div>
                  <div style="margin-bottom: 10px;">miner: ${toolTipData.Miner}</div>
                  <div style="margin-bottom: 10px;">height: ${toolTipData.Epoch}</div>
                  <div style="margin-bottom: 10px;">parent weight: ${
  toolTipData.ParentWeight
}</div>
                              <div>
                                parents:
                                ${p}
                              </div>
                              <div style="margin-bottom: 10px;">block time: ${
  toolTipData.Timestamp
    ? timeToStr(toolTipData.Timestamp, "yyyy-mm-dd hh:mm:ss")
    : ""
}</div>
                              <div style="margin-bottom: 10px;">first seen: ${
  toolTipData.FirstSeen
    ? timeToStr(toolTipData.FirstSeen, "yyyy-mm-dd hh:mm:ss")
    : ""
}</div>
                            </div>
                          `
        },
        styles: {
          background: "rgba(0,0,0,.8)",
          "font-size": "14px",
          padding: "20px",
          color: "#fff",
          "border-radius": "4px",
          "box-shadow": "1px 1px 5px #000"
        }
      },
      series: [
        {
          type: "custom",
          draw: (chart: any, layer: any, s: any) => {
            let d3 = chart.d3
            let emitter = chart.emitter

            let stageWrap = layer.safeSelect("g.stage-wrap")
            let axisYWrap = layer.safeSelect("g.ay-wrap")
            let axisXWrap = layer.safeSelect("g.ax-wrap")
            // stageWrap.attr(
            //   "transform",
            //   `translate(0,20) scale(1)`
            // )
            const blockWidth = 160
            const blockHeight = 100
            const ph = 60

            let ellipseRX = 0.95 * blockWidth
            let ellipseRY = 0.55 * blockHeight

            const heightExtent = [ blockHeightList[blockHeightList.length - 1],blockHeightList[0]];
            const maxBlockCount = 10;
            const groupCount = 1;

            let viewBoxWidth = maxBlockCount * blockWidth + groupCount * ph
            let viewBoxHeight =
              (heightExtent[1] - heightExtent[0]) * blockHeight
            let stageWidth = Math.max(viewBoxWidth, chart.containerWidth)
            let stageHeight = Math.max(viewBoxHeight, chart.containerHeight)
            let yCalc= d3
              .scaleLinear()
              .domain(heightExtent)
              .range([stageHeight - chart.gridTop, chart.gridBottom]);
            let clipPath, clipPathId, clipRect;

            // make clip path axis x
            clipPathId = axisXClipId.current
            clipPath = chart.sections.defs.safeSelect(
              `clipPath#${clipPathId}`
            )
            clipRect = clipPath.safeSelect("rect")
            clipRect.attrs({
              x: chart.gridLeft,
              width: chart.containerWidth - chart.gridRight - chart.gridLeft,
              height: 60
            })
            axisXWrap
              .attr(
                "transform",
                `translate(0,${chart.containerHeight - chart.gridBottom})`
              )
              .attr("clip-path", `url(#${clipPathId})`)
            // axisXWrap.safeSelect("line.border").attrs({
            //   stroke: "rgba(243,146,27,1)",
            //   "stroke-width": "6px",
            //   x2: chart.containerWidth
            // })

            // make clip path axis y
            clipPathId =axisYClipId.current
            clipPath = chart.sections.defs.safeSelect(
              `clipPath#${clipPathId}`
            )
            clipRect = clipPath.safeSelect("rect")
            clipRect.attrs({
              x: -80,
              y: chart.gridTop * 2,
              width: 100,
              height:
                  chart.containerHeight - chart.gridBottom - chart.gridTop + 3
            })
            axisYWrap
              .attr("clip-path", `url(#${clipPathId})`)
              .attr(
                "transform",
                `translate(${chart.gridLeft}, ${baseYAxis})`
                //`translate(${chart.gridLeft}, -${chart.gridTop})`
              )
            axisYWrap.safeSelect("line.border").attrs({
              stroke: chartColor[theme].yLinkColor,
              "stroke-width": "2px",
              y2: chart.containerHeight
            })
            axisYWrap.safeSelect("line.border").attr("stroke-dasharray", "2, 4")
            axisYWrap.safeSelect("g.axis-y").call(
              d3
                .axisLeft(yCalc)
                .ticks(Math.round((heightExtent[1] - heightExtent[0])))
                //.tickFormat(d => d)
            )
            axisYWrap.safeSelect("path.domain").attrs({
              stroke: "rgba(0,0,0,0)"
            })
            let yTicks = axisYWrap.safeSelect("g.axis-y").selectAll("g.tick");
            yTicks.each(function (yData:any) {
              //@ts-ignore
              let t = d3.select(this);
              t.safeSelect("line").attr("stroke", chartColor[theme].yLinkColor)
              t.safeSelect("text").attrs({
                fill: Number(searchHeight.current) === Number(yData) ? 'rgba(29, 107, 253, 1)':yAxisColor, //y轴字体颜色
                "font-size": 14,
              })
              t.safeSelect("circle").attrs({
                stroke:Number(searchHeight.current) === Number(yData) ?'rgba(29, 107, 253, 1)': chartColor[theme].yLinkColor,
                "stroke-width": "2px",
                fill :chartColor[theme].yCircleColor,
                r: 4,
              })
            })
            if (Object.keys(blockMap.current).length === 0) {
              return

            }
            //make clip path for stage
            let stage = stageWrap.safeSelect("g.c-stage");
            clipPathId = stageClipId.current
            clipPath = chart.sections.defs.safeSelect(
              `clipPath#${clipPathId}`
            )
            clipRect = clipPath.safeSelect("rect")
            clipRect.attrs({
              x: chart.gridLeft,
              y: chart.gridTop,
              width: chart.containerWidth - chart.gridRight - chart.gridLeft,
              height: chart.containerHeight - chart.gridBottom - chart.gridTop
            })
            stageWrap.attr("clip-path", `url(#${clipPathId})`)
            let linkGroup = stage.safeSelect("g.link-group")
            let tipsetGroup = stage.safeSelect("g.tipset-group")
            let tipsetList:any = []
            let forkEndLinkGroup = stage.safeSelect("g.fork-end-link-group");
            let nodeGroup = stage.safeSelect("g.node-group");
            nodeGroup
              .selectAll("g.block-height")
              .data(s.data)
              .join("g.block-height")
              .each(function (blh: any,numIndex: number) {
                //@ts-ignore
                const self = this; // 👈️ closure of this

                let bhEle: any = d3.select(self)
                let groupList = bhm[blh]||[];
                let groupWidth = getGroupListWidth(groupList, blockWidth, ph);
                let gx = (stageWidth - groupWidth) / 2;
                bhEle
                  .selectAll("g.block-group")
                  .data(groupList)
                  .join("g.block-group")
                  .each(function (blockGroupData: any, bhEIndex: number) {
                    //@ts-ignore
                    let bgEle = d3.select(this)
                    let blockGroup = blockGroupData ;
                    if (blockGroup) {
                      let gw = getGroupListWidth(blockGroup || [], blockWidth, 0);
                      let showGray = groupList.length === 2 && bhEIndex === 0;

                      blockGroup.x = gx;

                      //数据高度：
                      blockGroup.y = yCalc(blockGroup[0]?.Epoch) - blockHeight * 0.35
                      blockGroup.width = gw
                      blockGroup.height = blockHeight * 0.7;
                      gx += gw + ph;
                      tipsetList.push({
                        x: blockGroup.x - 5,
                        y: blockGroup.y + baseYAxis,
                        width: blockGroup.width + 10,
                        height: blockGroup.height,
                        fill: showGray ? 'rgba(102, 102, 102, 0.1)' : colors[numIndex % colors.length],
                        rx: 10,
                        ry: 10
                      })
                      blockGroup[0].tipsetList = blockGroup[0]?.tipsetList || [];
                      blockGroup[0].tipsetList.push(blockGroup);
                      bgEle
                        .selectAll("g.block-header")
                        .data(blockGroup)
                        .join("g.block-header")
                        .each(function (d: any, i: number) {
                          let curHeight = d.Epoch;
                          const showCid = searchCid.current === d._id;
                          let showColor = colorsText[numIndex % colorsText.length];
                          if (theme === 'light') {
                            // showColor = 'rgba(255,255,255,1)'
                          } if (showCid) {
                            showColor = 'rgba(29, 107, 253, 1)'
                          }
                          //@ts-ignore
                          let bh = d3.select(this)
                          let wrapX = blockGroup.x + (i + 0.5) * blockWidth;
                          let wrapY = yCalc(curHeight) + baseYAxis;
                          d.x = wrapX
                          d.y = wrapY
                          bh.attr("transform", `translate(${wrapX}, ${wrapY})`)
                          // bh.safeSelect("ellipse")
                          //   .attrs({
                          //     rx: ellipseRX,
                          //     ry: ellipseRY,
                          //     fill: mainColor
                          //   })
                          bh.on("mouseover", onMMove).on("mouseout", onMOut)
                          bh.on("click", function () {
                            router.push(`/cid/${d._id}`)
                          })
                          bh.safeSelect("rect").attrs({
                            width: ellipseRX,
                            height: ellipseRY,
                            fill: showGray&&!showCid ? 'rgba(102, 102, 102, 0.6)' : showColor,
                            rx: 3,
                            ry: 3,
                            x: -ellipseRX / 2,
                            y: -ellipseRY / 2
                          })

                          bh.safeSelect("text.t-height")
                            .text(`${dotString(d._id)}`)
                            .attrs({
                              fill: showGray || showCid ? '#ffffff' : chartColor[theme].cidColor,
                              y: -12,
                              "text-anchor": "middle",
                              "font-size": 12
                            })
                            .on("click", function () {
                            // vue中的bci是this，指向的是这个组件，但组件上没有goto方法，需要确认
                            // goto 需要自己实现，看起来是跳转到另一个页面
                            // bci.goTo("tipset", {
                            //   query: { hash: d.cid }
                            // })
                            })

                          bh.safeSelect("text.t-miner")
                            .text(`${d.Miner} - ${d.Epoch}`)
                            .attrs({
                              fill: showGray || showCid ? '#ffffff' : textColor,
                              "text-anchor": "middle",
                              "font-size": 11,
                              y: 5
                            })
                            .on("click", function () {
                            // goto需要自己实现，看起来是跳转到另一个页面
                            // bci.goTo("addressDetail", {
                            //   query: { address: d.miner }
                            // })
                            })
                          bh.safeSelect("text.t-time")
                            .text(
                              `${timeToStr(
                                d.FirstSeen,
                                "yyyy-mm-dd hh:mm:ss"
                              )}`
                            )
                            .attrs({
                              fill: showGray || showCid ? '#ffffff' : textColor,
                              "text-anchor": "middle",
                              "font-size": 10,
                              y: 20
                            })
                          let switchTooltip = makeSwitchTooltip()

                          function onMMove() {
                            switchTooltip(true, d3.event)
                          }
                          function onMOut() {
                            switchTooltip(false, d3.event)
                          }
                          function makeSwitchTooltip() {
                            let timeHandle: any = null
                            let shouldShow = false
                            let delta = 100;
                            return (show: any, d3Event: any) => {
                              shouldShow = show
                              if (timeHandle) {
                                clearTimeout(timeHandle)
                              }
                              timeHandle = setTimeout(() => {
                                let emitData: any = {
                                  type: "item",
                                  data: null
                                }
                                if (shouldShow) {
                                  emitData.data = d
                                  emitData.event = d3Event
                                }
                                emitter.emit("showTooltip", emitData)
                                timeHandle = null
                              }, delta)
                            }
                          }
                        })
                    }
                  })
              });
            tipsetGroup
              .selectAll("rect.tipset")
              .data(tipsetList)
              .join("rect.tipset")
              .each(function (d: any) {
                //@ts-ignore
                d3.select(this).attrs(d)
              });
            //next link
            let [linkData, forkEndLinkData] = getLinkData(data, blockMap.current);
            linkGroup
              .selectAll("g.link")
              .data(linkData)
              .join("g.link")
              .each(function (d: any) {
                //@ts-ignore
                let lg = d3.select(this)
                let p1:any = {},
                  p2:any = {}
                p1.x = d.start.x + d.start.width / 2
                p1.y = d.start.y + blockHeight * 0.7 + baseYAxis
                p2.x = d.end.x + d.end.width / 2
                p2.y = d.end.y+baseYAxis

                let line = lg.safeSelect("line").attrs({
                  stroke: chartColor[theme].linkColor,
                  "stroke-width": 1,
                  x1: p1.x,
                  y1: p1.y,
                  x2: p2.x,
                  y2: p2.y
                })
                if (d.type == "fork") {
                  line.attr("stroke-dasharray", "8, 4")
                }

                let wtY = p1.y - p2.y
                let wtX = p1.x - p2.x;
                let angleTan = Math.abs(wtY) / Math.abs(wtX)
                let angDegree = getTanDeg(angleTan)
                if (wtX < 0) {
                  angDegree = 180 - angDegree
                }

                let arrowSideLength = 9
                let arrowAngle = (25 * Math.PI) / 180
                lg.safeSelect("path").attrs({
                  transform: `translate(${p2.x}, ${p2.y}) rotate(-${angDegree})`,
                  fill: chartColor[theme].linkColor,
                  d: () => {
                    let c1 = arrowSideLength * Math.cos(arrowAngle)
                    let c2 = arrowSideLength * Math.sin(arrowAngle)
                    let d2 = -c2

                    return `M0,0L${c1},${d2}L${c1},${c2}z`
                  }
                })
              })

            forkEndLinkGroup
              .selectAll("g.link")
              .data(forkEndLinkData)
              .join("g.link")
              .each(function (d: any) {
                //@ts-ignore
                let lg = d3.select(this)
                let p1:any = {},
                  p2:any = {}
                p1.x = d.start.x + d.start.width / 2
                p1.y = d.start.y + blockHeight * 0.7+baseYAxis
                p2.x = d.end.x
                p2.y = d.end.y - blockHeight * 0.29

                lg.safeSelect("line").attrs({
                  stroke: chartColor[theme].linkColor,
                  "stroke-width": 1,
                  "stroke-dasharray": "8,4",
                  x1: p1.x,
                  y1: p1.y,
                  x2: p2.x,
                  y2: p2.y
                })

                let wtY = p1.y - p2.y
                let wtX = p1.x - p2.x
                let angleTan = Math.abs(wtY) / Math.abs(wtX)
                let angDegree = getTanDeg(angleTan)
                if (wtX < 0) {
                  angDegree = 180 - angDegree
                }
                let arrowSideLength = 8
                let arrowAngle = (16 * Math.PI) / 180
                lg.safeSelect("path").attrs({
                  transform: `translate(${p2.x}, ${p2.y}) rotate(-${angDegree})`,
                  fill: chartColor[theme].linkColor,
                  d: () => {
                    let c1 = arrowSideLength * Math.cos(arrowAngle)
                    let c2 = arrowSideLength * Math.sin(arrowAngle)
                    let d2 = -c2

                    return `M${c1},${d2}L0,0L${c1},${c2}`
                  }
                })
              })

            //zoom
            let startT:any, startX:any, startY:any, endX:any, endY:any
            startX = startY = endX = endY = null
            if (transformY.current === 0) {
              stage.attr(
                "transform",
                `translate(${transformX.current}, ${transformY.current}) scale(${k.current})`
              )
              axisYWrap
                .select("g.axis-y")
                .attr(
                  "transform",
                  `translate(0, ${transformY.current + 50}) scale(1,${k.current})`
                )
            }
            let zoom = d3
              .zoom()
              .scaleExtent([1, 1])
              .on("start", zoomStart)
              .on("zoom", zoomed)
              .on("end", zoomEnd)
            d3.select(".lc-root").call(zoom)
            function zoomed() {
              let t = d3.event.transform
              let sevent = d3.event.sourceEvent
              if (!sevent) {
                return
              }
              endX = sevent.pageX
              endY = sevent.pageY
              if (startX === null) {
                startX = endX
                startY = endY
              }
              let dx = endX - startX
              let dy = endY - startY;
              k.current = t.k
              stage.attr(
                "transform",
                `translate(${transformX.current + dx}, ${transformY.current +
                    dy}) scale(${t.k})`
              )
              // axisXWrap
              //   .select("g.axis-x")
              //   .attr(
              //     "transform",
              //     `translate(${bci.transformX + dx}, 0) scale(${t.k}, 1)`
              //   );
              axisYWrap
                .select("g.axis-y")
                .attr(
                  "transform",
                  `translate(0, ${transformY.current + dy}) scale(1,${t.k})`
                )
            }
            function zoomStart() {
              startT = d3.event.transform
              let sevent = d3.event.sourceEvent
              if (sevent) {
                startX = sevent.pageX
                startY = sevent.pageY
              }
            }
            function zoomEnd() {
              if (endY && startY) {
                transformX.current += endX - startX
                transformY.current += endY - startY
                startX = startY = endX = endY = null
                let t = d3.event.transform
                let x = transformX.current
                let y = transformY.current
                let gx, gy, direction
                gx = t.x - startT.x
                gy = t.y - startT.y
                if (Math.abs(gx) > Math.abs(gy)) {
                  if (gx > 0) {
                    direction = "right"
                  } else if (gx < 0) {
                    direction = "left"
                  }
                } else {
                  if (gy < 0) {
                    direction = "up"
                  } else if (gy > 0) {
                    direction = "down"
                  }
                }
                if (
                  viewBoxWidth + x + chart.gridRight - chart.containerWidth <
                      0 &&
                    direction === "left"
                ) {
                  //fromBottom = false;
                }
                if (x > 0 && direction === "right") {
                  //console.log("right", x);
                  //fromBottom = true;
                }
                if (y > 0 && direction === "down") {
                  //fromBottom = false;
                }
                if (
                  y -
                  chart.containerHeight +
                  viewBoxHeight +
                  chart.gridBottom <
                  0 &&
                  direction === "up"
                ) {
                  // console.log('====0033',endHeight.current)
                  getBlocks(endHeight.current - calcHeight,'up')
                } else if(direction === 'down' && transformY.current > 30) {
                  // getBlocks(endHeight.current + calcHeight,'down')
                }
              }
              if (transformY.current >= 10) {
                transformY.current = 10
                stage
                  .transition()
                  .duration(200)
                  .attr(
                    "transform",
                    `translate(${transformX.current}, ${transformY.current}) scale(${k.current})`
                  )
                axisYWrap
                  .select("g.axis-y")
                  .transition()
                  .duration(200)
                  .attr(
                    "transform",
                    `translate(0, ${transformY.current}) scale(1,${k.current})`
                  )
              }
            }

            //last
          },
          data: blockHeightList,
        }
      ]
    },
    )
  }

  const getLinkData = (data: Array<any>,blockMap:Record<string,any>) => {
    let linkData:any = []
    let forkEndLinkData: any = [];
    data.forEach((dataItem, index: number) => {
      const endIndex = index + 1;
      if (data[endIndex]) {
        const newObj = {
          start:data[index].ChainBlocks,
          end: data[endIndex].ChainBlocks,
          type:'main'
        }
        linkData.push(newObj);
      }
      if (dataItem.OrphanBlocks && Array.isArray(dataItem.OrphanBlocks)) {

        dataItem.OrphanBlocks.forEach((orpItem:any) => {
          if (orpItem.Parents && Array.isArray(orpItem.Parents)) {
            orpItem.Parents.forEach((parItem: string) => {
              if (blockMap[parItem]) {
                const newPar = {
                  start: dataItem.OrphanBlocks,
                  end: blockMap[parItem],
                  type:'fork-end'
                }
                forkEndLinkData.push(newPar)
              }

            })
          }
        })
      }

    })
    return [linkData,forkEndLinkData]
  }

  function getTanDeg(tan:any) {
    let result = Math.atan(tan) / (Math.PI / 180)
    result = Math.round(result)
    return result
  }

  const onResize = () => {
    if (chartRef.current) {
      chartRef.current.resize()
    }
  }

  const handleSearch = (value: any, type: string) => {
    if (value === '') {
      searchCid.current = '';
      searchHeight.current = null;
      getBlocks();
    } else if (type === 'height') {
      searchCid.current = '';
      searchHeight.current = Number(value)
      clearDrawChart(Number(value) + 1, type);
    } else if (type === 'cid') {
      searchCid.current = value;
      searchHeight.current = null;
      clearDrawChart(value, type);

    }
  }

  const handleClickTop = () => {
    finalCurrentHeight.current = finalHeight;
    clearDrawChart(Number(finalHeight) + 1,'height');
  }

  const hasData = !drawData?.current || drawData?.current?.length === 0;
  return <div className={`main_contain ${styles['cw_contain']} `}>
    <div className={`${styles['block-header']}`}>
      {getSvgIcon('tip')}
      <span>{ tr('cw_des')}</span>
    </div>
    <div className={`${styles['block-header-search']}`}>
      <Search onSearch={ handleSearch} />
    </div>
    <div className={`${styles['block-header-chart']} card_shadow border border_color `} ref={chartContainerRef}>

    </div>
    {!chartLoading&&hasData&& <div className={`${styles['block-header-chart-noData']}`}>
    No Data</div>}
    {chartLoading && (
      <div
        className={styles['loading-wrap']}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      >
        <div className={ styles['donut-wrap']}>
          {/* <div className={ styles['donut']} /> */}
          <Image src={loading} alt='' width={160} />
        </div>
      </div>
    )}
    <div className={styles['top-wrap']} onClick={handleClickTop}>
      {getSvgIcon('upIcon')}
      {tr('cw_top')}
    </div>
  </div>
})

