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
import { colors, dotString, getGroupListWidth } from '@/src/cw/utils';
import { useFilscanStore } from '@/store/FilscanStore';
import { Translation } from '@/components/hooks/Translation';
import cwStore from '@/store/modules/Cw';
import { observer } from 'mobx-react';

const baseYAxis = 30;

export default observer(() => {
  const { tr } = Translation({ ns: 'static' });
  const { theme } = useFilscanStore();
  const [drawData, setDrawData] = useState([]);
  const [chartLoading, setChartLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const finalCurrentHeight = useRef<any>(null);
  const endHeight = useRef<any>(null);
  const {finalHeight } = cwStore;
  const { axiosData } = useAxiosData();
  const blockMap = useRef<any>({});
  const transformX = useRef(0);
  const transformY = useRef(30);
  const k = useRef(1);

  useEffect(() => {
    onResize();
  }, [theme])

  const chartColor:any = {
    dark: {
      yLinkColor: `rgba(51, 51, 51, 1)`,
      yCircleColor:'#000000',
      fistText: `rgba(255,255,255,1)`,
      yAxisColor:`rgba(255,255,255,0.6)`,
      textColor:`rgba(255,255,255,1)`},
    light: {
      yLinkColor: `rgba(238, 239, 241, 1)`,
      fistText: `rgba(0,0,0,1)`,
      yCircleColor:'#FFFFFF',
      yAxisColor:`rgba(0,0,0,0.6)`,
      textColor:`rgba(0,0,0,0.6)`
    }
  }

  //chart
  const stageClipId = useRef("lc-" + randStr(8));
  const axisXClipId = useRef("lc-" + randStr(8));
  const axisYClipId = useRef("lc-" + randStr(8));

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
      finalCurrentHeight.current = finalHeight + 1;
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
    let cc = window.document.querySelector(".main_contain")
    let innerHeight = window.screen.availHeight;
    let containerHeight:any= innerHeight
    containerHeight = cc?.getBoundingClientRect().height
    setStyle(container, "height", containerHeight)
  }

  const getBlocks = async (height?: number) => {
    const end = finalCurrentHeight.current || height;
    console.log('-----333',end)
    endHeight.current = end;
    setChartLoading(true)
    const result = await axiosData(cwUrl, {
      filters: {
        start: end-100,
        end:end
      }
    });
    const newData = result?.tipset_list || [];
    let bhm: Record<string, Array<any>> = {};

    if (newData.length > 0) {
      newData.forEach((v:any) => {
        //[孤块,高度]｜[高度]
        bhm[v.Height] = v.OrphanBlocks ? [v.OrphanBlocks, v.ChainBlocks] : [v.ChainBlocks];
        if (v.ChainBlocks) {
          v.ChainBlocks.forEach((chainItem:any) => {
            blockMap.current[chainItem._id] =chainItem
          })
        }
      });
      drawChart(newData,bhm)
    }
    setChartLoading(false)
    setDrawData(height ?[...drawData,...newData]:newData)
  }

  const drawChart = (data: Array<any>, bhm: Record<string, Array<any>> = {}) => {
    let textColor =chartColor[theme]?.textColor;
    let yAxisColor = chartColor[theme].yAxisColor;
    let fistText = chartColor[theme].fistText;
    const blockHeightList:Array<number> = data.map(v => v.Height);

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
                  <div style="margin-bottom: 10px;">parent_weight: ${
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

            const heightExtent = [ data[data.length - 1]?.Height,data[0]?.Height];
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
                `translate(${chart.gridLeft}, -${chart.gridTop})`
              )
            axisYWrap.safeSelect("line.border").attrs({
              stroke: "rgba(51, 51, 51, 1)",
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
            yTicks.each(function () {
              //@ts-ignore
              let t = d3.select(this)
              t.safeSelect("line").attr("stroke", "rgba(0,0,0,0)")
              t.safeSelect("text").attrs({
                fill: yAxisColor, //y轴字体颜色
                "font-size": 14,
              })
              t.safeSelect("circle").attrs({
                stroke: '#333333',
                "stroke-width": "2px",
                fill :"black",
                r: 4,
              })
            })
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
                let groupList = bhm[blh];
                let groupWidth = getGroupListWidth(groupList, blockWidth, ph);
                let gx = (stageWidth - groupWidth) / 2;
                bhEle
                  .selectAll("g.block-group")
                  .data(groupList)
                  .join("g.block-group")
                  .each( function(blockGroup: any,bhEIndex:number) {
                    //@ts-ignore
                    let bgEle = d3.select(this)
                    let gw = getGroupListWidth(blockGroup, blockWidth, 0);
                    let showGray = groupList.length === 2 && bhEIndex === 0;

                    blockGroup.x = gx;

                    //数据高度：
                    blockGroup.y =yCalc(blockGroup[0].Epoch) - blockHeight * 0.35
                    blockGroup.width = gw
                    blockGroup.height = blockHeight * 0.7;
                    gx += gw + ph;
                    tipsetList.push({
                      x: blockGroup.x-5,
                      y: blockGroup.y+baseYAxis ,
                      width: blockGroup.width+10,
                      height: blockGroup.height,
                      fill: showGray ? 'rgba(102, 102, 102, 0.1)':colors[numIndex % colors.length],
                      rx: 10,
                      ry: 10
                    })
                    blockGroup[0].tipsetList = blockGroup[0].tipsetList || [];
                    blockGroup[0].tipsetList.push(blockGroup);
                    bgEle
                      .selectAll("g.block-header")
                      .data(blockGroup)
                      .join("g.block-header")
                      .each(function (d: any, i: number) {
                        let curHeight = d.Epoch
                        let mainColor ='rgba(255,255,255,0.1)'
                        //@ts-ignore
                        let bh = d3.select(this)
                        let wrapX = blockGroup.x + (i + 0.5) * blockWidth;
                        let wrapY = yCalc(curHeight)+baseYAxis;
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
                        bh.safeSelect("rect").attrs({
                          width: ellipseRX,
                          height: ellipseRY,
                          fill: showGray ? 'rgba(102, 102, 102, 0.6)':theme === 'light' ? 'rgba(255,255,255,1)':colors[numIndex % colors.length],
                          rx: 3,
                          ry: 3,
                          x: -ellipseRX / 2,
                          y: -ellipseRY / 2
                        })

                        bh.safeSelect("text.t-height")
                          .text(`${dotString(d._id)}`)
                          .attrs({
                            fill: showGray?'#ffffff':textColor,
                            y: -12,
                            "text-anchor": "middle",
                            "font-size": 11
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
                            fill: showGray?'#ffffff':textColor,
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
                              d.first_seen,
                              "yyyy-mm-dd hh:mm:ss"
                            )}`
                          )
                          .attrs({
                            fill: showGray?'#ffffff':textColor,
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
                          let timeHandle:any = null
                          let shouldShow = false
                          let delta = 100;
                          return (show:any, d3Event:any) => {
                            shouldShow = show
                            if (timeHandle) {
                              clearTimeout(timeHandle)
                            }
                            timeHandle = setTimeout(() => {
                              let emitData:any = {
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
            //next
            let [linkData, forkEndLinkData] = getLinkData(data,blockMap.current);
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
                  stroke: "rgba(102, 102, 102, 1)",
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
                  fill: "rgba(102, 102, 102, 1)",
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
                  stroke: "rgba(102, 102, 102, 1)",
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
                  fill: "rgba(102, 102, 102, 1)",
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
                  `translate(0, ${transformY.current + 50 + dy}) scale(1,${t.k})`
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
                  getBlocks(endHeight.current - 100)
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

  return <div style={{ position: 'relative' }} className='main_contain '>
    <div className={`${styles['block-header-chart']} card_shadow border border_color `} ref={chartContainerRef}>

    </div>
    {/* <div className={styles['console']} style={{ position: 'absolute', right: '85px', top: '30px' }}>
      <div
        className={ styles['bc-search']}
        style={{
          padding: '8px 15px',
          borderRadius: '30px',
          width: '200px',
          height: '38px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <input
          type="text"
          placeholder={('start')}
          value={'key'}
          // onChange={handleSearch}
          style={{ width: '130px', height: '25px', paddingLeft: '10px' }}
        />
        <i
          className={ `${styles['iconfont']} ${styles['icon-sosu']}`}
          style={{ position: 'absolute', color: '#999999', top: '10px', right: '20px' }}
        ></i>
      </div>
    </div>
    <div
      className={ `${styles['back-top-wrap']} ${styles['ignore']}`}
      style={{ position: 'absolute', right: '105px', bottom: '105px' }}
    >
      <div
        className={ styles['back-top']}
        style={{
          width: '200px',
          height: '45px',
          borderRadius: '25px',
          fontSize: '16px',
        }}
        //onClick={handleBackTop}
      >
        <i className={ styles['el-icon-top']} style={{ fontSize: '20px' }} />
        <div style={{ marginLeft: '8px' }}>{('latest')}</div>
      </div>
    </div>
    <div
      className={ styles['tip-wrap']}
      style={{ position: 'absolute', left: '190px', top: '30px', color: 'rgba(153,153,153,1)' }}
    >
      <div className={ styles['tip-show']}>
        <i className={ styles['el-icon-warning-outline']} style={{ fontSize: '16px' }} />
        <div style={{ marginLeft: '8px', color: 'rgba(153,153,153,1)', fontSize: '14px' }}>
          {('op')}
        </div>
      </div>
    </div> */}
    {chartLoading && (
      <div
        className={styles['loading-wrap']}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      >
        <div className={ styles['donut-wrap']}>
          <div className={ styles['donut']} />
        </div>
      </div>
    )}
  </div>
})

