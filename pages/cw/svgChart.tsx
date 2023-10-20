import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
const Chart = ({ newData }: {newData:any}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);

      // 转换数据为数组形式
      const data = Object.values(newData).flatMap((block:any) => block?.orphanBlock);

      // 创建比例尺
      const xScale = d3.scaleBand()
        .domain(data.map((d:any) => d?.miner))
        .range([0, 300]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d:any) => d?.height)!])
        .range([300, 0]);

      // 创建坐标轴
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // 添加坐标轴到 svg
      svg.append('g')
        .attr('transform', `translate(0, 300)`)
        .call(xAxis);

      svg.append('g')
        .call(yAxis);

      // 添加数据点
      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d:any) => xScale(d?.miner)!)
        .attr('cy', (d:any) => yScale(d?.height))
        .attr('r', 5)
        .attr('fill', 'blue');
    }
  }, []);

  return (
    <svg ref={ref} width={400} height={400} />
  );
};

export default Chart;
