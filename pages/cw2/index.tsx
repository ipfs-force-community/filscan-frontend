import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';

import {
  contains,
  randStr,
  tail,
  timeToStr,
  delay,
  isArray,
  setStyle,
  setStyles
} from "mytoolkit";
import leecharts from "@/src/cw/leecharts"
import axios from "axios";
import { cwUrl } from '@/contents/apiUrl';
import useAxiosData from '@/store/useAxiosData';

const colors = ['rgba(29, 107, 253, 0.08)','rgba(112, 79, 228, 0.08)','rgba(240, 176, 71, 0.08)','rgba(57, 178, 226, 0.08)','rgba(233, 119, 70, 0.08)','rgba(116, 204, 110, 0.08)']

const Ajax = axios.create({
  baseURL:'https://api.filscan.io:8700/rpc/v1',
  timeout: 100000,
  validateStatus: () => true
});
Ajax.interceptors.response.use(
  response => {
    // TODO
    let { data } = response
    return data
  },
  error => {
    return Promise.reject(error)
  }
)
interface CWProps {
  tr: (key: string) => string;
}
//@ts-ignore
const CW = () => {
  const { axiosData } = useAxiosData();
  const [key, setKey] = useState('');
  const [processing, setProcessing] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState({});
  const [prefix] = useState("blockHeaderChart");
  const blockList = useRef<any[]>([]);
  const chainList = useRef<BlockChain[]>([]);
  const blockHeightList = useRef([]);
  const blockHeightMap = useRef({});
  const blockMap = useRef<any>({});
  const lastestHeight = useRef(0);
  const bottomHeight = useRef(0);
  const stageClipId = useRef("lc-" + randStr(8));
  const axisXClipId = useRef("lc-" + randStr(8));
  const axisYClipId = useRef("lc-" + randStr(8));
  const minerList = useRef<any>([]);
  const colorList = useRef<string[]>([]);
  const transformX = useRef(0);
  const transformY = useRef(0);
  const k = useRef(1);
  const viewBoxWidth = useRef(null);
  const viewBoxHeight = useRef(null);
  const chainSorted = useRef(false);

  const refresh = useRef(false);
  const waitingData = useRef(false);

  const chartRef = useRef<any>(null);

  useEffect(() => {
    init();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const init = () => {
    chartRef.current = leecharts(chartContainerRef.current)
    getBlocks()
    setColorList()
    let container = chartContainerRef.current
    let cc = window.document.querySelector(".chart-wrapper")
    let innerHeight = window.screen.availHeight
    let containerHeight:any= innerHeight
    containerHeight = cc?.getBoundingClientRect().height
    setStyle(container, "height", containerHeight)
    // setStyles(this.$refs.chartSearch, {})
  }

  const reset = ()=> {
    blockList.current = [];
    chainList.current = [];
    blockHeightList.current = [];
    blockHeightMap.current = {};
    blockMap.current = {};
    lastestHeight.current = 0;
    bottomHeight.current = 0;
    minerList.current = [];
    transformX.current = 0;
    transformY.current = 0;
    k.current = 1;
    viewBoxWidth.current = null;
    viewBoxHeight.current = null;
    refresh.current = false;
  }

  const onResize = () => {
    chartRef.current.resize()
  }

  const setColorList = () => {
    colorList.current = [
      "rgba(66,175,196,1)",
      "rgba(91,51,123,1)",
      "rgba(211,185,33,1)",
      "rgba(174,116,32,1)",
      "rgba(10,122,80,1)",
      "rgba(64,93,98,1)",
      "rgba(16,63,116,1)",
      "rgba(227,152,56,1)",
      "rgba(165,74,41,1)",
      "rgba(198,65,87,1)",
      "rgba(101,95,97,1)",
      "rgba(65,90,115,1)",
      "rgba(117,86,42,1)",
      "rgba(199,160,78,1)",
      "rgba(171,209,40,1)",
      "rgba(117,102,74,1)",
      "rgba(164,136,78,1)",
      "rgba(204,109,40,1)",
      "rgba(138,74,96,1)",
      "rgba(198,67,51,1)"
    ]
  }

  const getMinerColor = (miner:any) => {
    let minerIdx = minerList.current.findIndex((m:any) => m === miner)
    if (minerIdx === -1) {
      minerIdx = minerList.current.length
      minerList.current.push(miner)
    }
    return 'rgba(255,255,255,0.1)'
    //return colorList.current[minerIdx % colorList.current.length]
  }

  const appendBlocks = (list:Array<any>) => {
    if (!list || list.length == 0) {
      return
    }
    let bhl:any = blockHeightList.current
    let bhm:any =blockHeightMap.current
    let preHeight = tail(bhl) ? tail(bhl).height : 0
    for (let i = 0, l = list.length; i < l; i++) {
      let block = list[i]
      let bh:number = block.height
      let groupsInHeight = bhm[bh] || []
      if (bh != preHeight) {
        bhl.push(bh)
        preHeight = bh
      }
      appendBlockToChain(block)
      bhm[bh] = appendBlockToGroupList(groupsInHeight, block)
      blockMap.current[block.cid] = block
    }
  }

  const appendBlockToChain = (block:any) => {
    let shouldMakeNew = true
    if (!chainSorted.current && chainList.current.length > 1) {
      chainList.current = chainList.current.sort((c1, c2) => {
        let d = c1.tail.parent_weight - c2.tail.parent_weight
        return d < 0 ? 1 : d == 0 ? 0 : -1
      })
      chainList.current[0].main = true
      chainSorted.current = true
    }
    for (let i = 0, l = chainList.current.length; i < l; i++) {
      let chain = chainList.current[i]
      if (chain.isMember(block)) {
        let prevtail = chain.tail
        chain.tail = block
        chain.grow()
        block.chain = chain
        shouldMakeNew = false
        // set tail child
        if (prevtail.height - block.height > 0) {
          chain.tailChild = prevtail
        }
        break
      }
    }
    if (shouldMakeNew) {
      let chain = new BlockChain()
      chain.head = chain.tail = block
      chain.grow()
      block.chain = chain
      chainList.current.push(chain);
    }
  }

  const handleSearch = (e: any) =>{
    if (e?.keyCode != 13) {
      return
    }

    const value =e.target.value
    setKey(value);
    let height = parseInt(value) || 0
    refresh.current = true
    chainSorted.current = false
    getBlocks(height)
  }

  const handleBackTop = () =>{
    refresh.current = true
    chainSorted.current = false
    getBlocks(0)
  }

  const getBlocks = (height?:number) => {
    if (waitingData.current) {
      return
    }
    let gap = 60
    let endBlockHeight
    if (height != null || height != undefined) {
      endBlockHeight = height
    } else {
      endBlockHeight = bottomHeight.current
    }
    if (endBlockHeight < 0) {
      return
    }
    //startBlockHeight = Math.max(endBlockHeight - gap, 0);
    setProcessing(true)
    waitingData.current = true
    Ajax({
      method: "post",
      data: {
        id: 1,
        method: "filscan.GraphTipSetTree",
        params: [gap, endBlockHeight],
        jsonrpc: "2.0"
      }
    })
      .then((res:any) => {
        res = res || {}
        let result = res.result
        let error = res.error
        if (!error && result && result.length > 0) {
          let d = result
          if (refresh.current) {
            reset()
          }
          blockList.current = [...blockList.current, ...d]
          appendBlocks(d)
          drawChart()
          // bottomHeight.current = tail(d).height - 1
        }
        if (error) {
          console.log(error)
        }
        delay(() => (waitingData.current = false), 1000)
        setProcessing(false)
      })
      .catch(() => {
        delay(() => (waitingData.current = false), 1000)
        setProcessing(false)
      })
  }

  const maxBlockCountInHeight = () => {
    let bhl =blockHeightList.current
    let bhm = blockHeightMap.current
    let max = 0,
      groupCount = 0
    bhl.forEach(h => {
      let gl:Array<any> = bhm[h]
      let count = 0
      gl.forEach(g => {
        count += g.length
      })
      if (count > max) {
        max = count
        groupCount = gl.length
      }
    })
    return [max, groupCount]
  }

  /*
    tooltip: {
        show: true,
        formatter: data => {
          let p = "<ul style='padding-top: 10px;'>"
            ;(data.parents || []).forEach(item => {
            p += `<li style="padding-left: 20px;margin-bottom: 10px;">${item}</li>`
          })
          p += "</ul>"
          return `
                <div class="tt">
                  <div style="margin-bottom: 10px;">cid: ${data.cid}</div>
                  <div style="margin-bottom: 10px;">miner: ${data.miner}</div>
                  <div style="margin-bottom: 10px;">height: ${data.height}</div>
                  <div style="margin-bottom: 10px;">parent_weight: ${
  data.parent_weight
}</div>
                  <div>
                    parents:
                    ${p}
                  </div>
                  <div style="margin-bottom: 10px;">block time: ${
  data.block_time
    ? timeToStr(data.block_time, "yyyy-mm-dd hh:mm:ss")
    : ""
}</div>
                  <div style="margin-bottom: 10px;">first seen: ${
  data.first_seen
    ? timeToStr(data.first_seen, "yyyy-mm-dd hh:mm:ss")
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
  */

  const drawChart = () =>{
    let textColor = '#ffffff';
    let bci:any = this;
    if (chainList.current.length == 1) {
      chainList.current[0].main = true
    }
    chartRef.current.setOptions({
      grid: {
        top: 40,
        right: 100,
        left: 150,
        bottom: 80
      },
      series: [
        {
          type: "custom",
          draw: (chart:any, layer:any, s:any) => {
            let d3 = chart.d3
            let bhm: any = blockHeightMap.current;
            //let newBlockMap = blockMap.current;
            //             let blockList = this.blockList
            // setChainColor(chainList?.current)
            // resetChainTipset(chainList?.current)
            //let maxChainBlockCount = getMaxChainBlockCount(chainList);
            let emitter = chart.emitter
            let stageWrap = layer.safeSelect("g.stage-wrap")
            let axisYWrap = layer.safeSelect("g.ay-wrap")
            let axisXWrap = layer.safeSelect("g.ax-wrap")

            const blockWidth = 160
            const blockHeight = 100
            const ph = 60

            let ellipseRX = 0.9 * blockWidth
            let ellipseRY = 0.55 * blockHeight

            let heightExtent = [tail(blockList.current).height, blockList.current[0].height];
            let [maxBlockCount, groupCount] = maxBlockCountInHeight()
            let viewBoxWidth = maxBlockCount * blockWidth + groupCount * ph
            let viewBoxHeight =
                (heightExtent[1] - heightExtent[0]) * blockHeight

            let stageWidth = Math.max(viewBoxWidth, chart.containerWidth);
            let stageHeight = Math.max(viewBoxHeight, chart.containerHeight)
            let y = d3
              .scaleLinear()
              .domain(heightExtent)
              .range([stageHeight - chart.gridTop, chart.gridBottom]);
            let clipPath, clipPathId, clipRect
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
            axisXWrap.safeSelect("line.border").attrs({
              stroke: "rgba(243,146,27,1)",
              "stroke-width": "6px",
              x2: chart.containerWidth
            })

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
              stroke: "rgba(243,146,27,1)",
              "stroke-width": "4px",
              y2: chart.containerHeight
            })
            axisYWrap.safeSelect("g.axis-y").call(
              d3
                .axisLeft(y)
                .ticks(Math.round((heightExtent[1] - heightExtent[0]) / 2))
                //.tickFormat(d => d)
            )
            axisYWrap.safeSelect("path.domain").attrs({
              stroke: "rgba(0,0,0,0)"
            })
            let yTicks = axisYWrap.safeSelect("g.axis-y").selectAll("g.tick");
            yTicks.each(function () {
              // 应该是选择组件？
              //@ts-ignore
              let t = d3.select(this)
              t.safeSelect("line").attr("stroke", "rgba(0,0,0,0)")
              t.safeSelect("text").attrs({
                fill: textColor,
                "font-size": 16
              })
              t.safeSelect("circle").attrs({
                r: 5,
                fill: "rgba(255,209,153,1)"
              })
            })
            let stage = stageWrap.safeSelect("g.c-stage");
            // make clip path for stage
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
            let forkEndLinkGroup = stage.safeSelect("g.fork-end-link-group")
            let nodeGroup = stage.safeSelect("g.node-group")
            nodeGroup
              .selectAll("g.block-height")
              .data(s.data)
              .join("g.block-height")
              .each(function (blh: any,numIndex: number) {
                //@ts-ignore
                const self = this; // 👈️ closure of this

                let bhEle: any = d3.select(self)
                let groupList = bhm[blh]
                let groupWidth = getGroupListWidth(groupList, blockWidth, ph);
                let gx = (stageWidth - groupWidth) / 2;
                bhEle
                  .selectAll("g.block-group")
                  .data(groupList)
                  .join("g.block-group")
                  .each( function(blockGroup: any,bhEIndex:number) {
                    //@ts-ignore
                    let bgEle = d3.select(this)
                    let gw = getGroupListWidth(blockGroup, blockWidth, 0)
                    blockGroup.x = gx
                    blockGroup.y =
                      y(blockGroup[0].height) - blockHeight * 0.35
                    blockGroup.width = gw
                    blockGroup.height = blockHeight * 0.7
                    gx += gw + ph;
                    tipsetList.push({
                      x: blockGroup.x,
                      y: blockGroup.y,
                      width: blockGroup.width,
                      height: blockGroup.height,
                      fill: blockGroup[0].chain.main?colors[numIndex % colors.length]:"rgba(255,255,255,0.5)",
                      // fill: blockGroup[0].chain.main
                      //   ? "rgba(124,181,236,.2)"
                      //   : "rgba(255,255,255,0.5)",
                      rx: 10,
                      ry: 10
                    })
                    blockGroup[0].chain.tipsetList.push(blockGroup);
                    bgEle
                      .selectAll("g.block-header")
                      .data(blockGroup)
                      .join("g.block-header")
                      .each(function (d: any, i: number) {
                        let curHeight = d.height
                        let mainColor = getMinerColor(d.miner)
                        //@ts-ignore
                        let bh = d3.select(this)
                        let wrapX = blockGroup.x + (i + 0.5) * blockWidth
                        let wrapY = y(curHeight)
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
                          fill: d.chain.main
                            ? mainColor
                            : "rgba(100,100,100,0.8)",
                          rx: 3,
                          ry: 3,
                          x: -ellipseRX / 2,
                          y: -ellipseRY / 2
                        })

                        bh.safeSelect("text.t-height")
                          .text(`${dotString(d.cid)}`)
                          .attrs({
                            fill: textColor,
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
                          .text(`${d.miner} - ${d.height}`)
                          .attrs({
                            fill: textColor,
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
                            fill: textColor,
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
                          let delta = 100
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
              .each(function (d:any) {
                //@ts-ignore
                d3.select(this).attrs(d)
              })
            let [linkData, forkEndLinkData] = getLinkData(chainList?.current, blockMap.current)
            console.log('----3333',linkData, forkEndLinkData)
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
                p1.y = d.start.y + blockHeight * 0.7
                p2.x = d.end.x + d.end.width / 2
                p2.y = d.end.y

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
                let wtX = p1.x - p2.x
                let angleTan = Math.abs(wtY) / Math.abs(wtX)
                console.log('=====333888',wtY,wtX ,Math.abs(wtY) / Math.abs(wtX))

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
                p1.y = d.start.y + blockHeight * 0.7
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
                let angDegree = getTanDeg(angleTan);
                console.log('--35346',angleTan)
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

            // pan and zoom
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
              let dy = endY - startY
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
                  console.log("load")
                  getBlocks()
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
                    `translate(0, ${transformY.current + 50}) scale(1,${k.current})`
                  )
              }
            }
          },
          data: blockHeightList.current
        }
      ]
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className={ styles['block-header-chart']} ref={chartContainerRef}></div>
      <div className={styles['console']} style={{ position: 'absolute', right: '85px', top: '30px' }}>
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
            value={key}
            onChange={handleSearch}
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
          onClick={handleBackTop}
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
      </div>
      {processing && (
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
  );
};

export default CW;

function getTanDeg(tan:any) {
  let result = Math.atan(tan) / (Math.PI / 180)
  result = Math.round(result)
  return result
}

function dotString(str = "", headLen = 6, tailLen = 6) {
  let strLen = str.length
  if (strLen < headLen + tailLen) {
    return str
  }
  let headStr = str.slice(0, headLen)
  let tailStr = tailLen > 0 ? str.slice(-tailLen) : ""
  return `${headStr}...${tailStr}`
}

// function randColor(){
//   return d3.hsl(randInt(360),randInt(60,100), randInt(20,50)).toString();
// }

function appendBlockToGroupList(gl:any, b:any) {
  let shouldMakeNew = true

  for (let i = 0, l = gl.length; i < l; i++) {
    let g = gl[i]
    let c1 = g[0].chain
    let c2 = b.chain
    if (c1.head.cid == c2.head.cid && c1.tail.cid == c2.tail.cid) {
      shouldMakeNew = false
      g.push(b)
      break
    }
  }
  if (shouldMakeNew) {
    gl.push([b])
  }
  return gl
}

function isSameCids(cids1:any, cids2:any) {
  let len1 = cids1.length
  let len2 = cids2.length
  if (len1 != len2) {
    return false
  }
  for (let i = 0; i < len1; i++) {
    let cid = cids1[i]
    if (!contains(cids2, cid)) {
      return false
    }
  }
  return true
}
class BlockChain {
  head: any;
  tail: any;
  main: boolean;
  tailChild: any;
  blockCount: number;
  tipsetList: any[];

  constructor() {
    this.head = null
    this.tail = null
    this.tailChild = null
    this.blockCount = 0
    this.tipsetList = []
    this.main = false
  }
  isMember(block:any) {
    let tailChild = this.tailChild
    let tailHeight = this.tail.height
    if (block.height == tailHeight) {
      if (tailChild) {
        return contains(tailChild.parents, block.cid)
      }
      return (
        isSameCids(this.tail.parents || [], block.parents || []) &&
        this.tail.parent_weight - block.parent_weight == 0
      )
    } else {
      return contains(this.tail.parents || [], block.cid)
    }
  }
  grow() {
    this.blockCount++
  }
}

function getMainChainLinkCount(chainList:Array<any>) {
  let count = 0
  chainList.forEach(c => {
    if (c.tipsetList.length > count) {
      count = c.tipsetList.length
    }
  })
  return count
}
function getGroupListWidth(gl:any, bw:any, padding:any) {
  let w = (gl.length - 1) * padding
  w += getGroupBlockCount(gl) * bw
  return w
}
function getGroupBlockCount(gl:any) {
  let c = 0
  gl.forEach((g:any) => {
    if (isArray(g)) {
      g.forEach(() => {
        c++
      })
    } else {
      c++
    }
  })
  return c
}
function setChainColor(chainList:Array<any>) {
  let colors = [
    ["rgba(124,181,236,.2)", "rgba(124,181,236,.5)"],
    ["rgba(67,67,72,.2)", "rgba(67,67,72,.5)"],
    ["rgba(144,237,125,.2)", "rgba(144,237,125,.5)"],
    ["rgba(247,163,92,.2)", "rgba(247,163,92,.5)"],
    ["rgba(128,133,233,.2)", "rgba(128,133,233,.5)"],
    ["rgba(241,92,128,.2)", "rgba(241,92,128,.5)"],
    ["rgba(228,211,84,.2)", "rgba(228,211,84,.5)"],
    ["rgba(43,144,143,.2)", "rgba(43,144,143,.5)"]
  ]
  chainList.forEach((item, i) => {
    if (item.color) {
      return
    }
    let idx = i % colors.length
    item.color = colors[idx][0]
    item.linkColor = colors[idx][1]
  })
}
function resetChainTipset(chainList:Array<any>) {
  chainList.forEach(c => {
    c.tipsetList = []
  })
}
function getLinkData(chainList:Array<any>, blockMap:any) {
  let linkData:any = []
  let forkEndLinkData:any = []
  let mainChainLinkCount = getMainChainLinkCount(chainList);
  chainList.forEach(c => {
    let chainTipsetList = c.tipsetList
    let tail = chainTipsetList[0]
    for (let i = 1, l = chainTipsetList.length; i < l; i++) {
      let ts = chainTipsetList[i]
      linkData.push({
        type: l < mainChainLinkCount ? "fork" : "main",
        start: tail,
        end: ts
      })
      tail = ts
    }
    if (tail) {
      ;(tail[0].parents || []).forEach((cid:any) => {
        if (blockMap[cid]) {
          forkEndLinkData.push({
            type: "fork-end",
            start: tail,
            end: blockMap[cid]
          })
        }
      })
    }
  })
  return [linkData, forkEndLinkData]
}