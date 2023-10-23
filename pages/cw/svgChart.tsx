import React, { useEffect, useRef } from 'react';
import { select, axisLeft, scaleLinear } from 'd3';

const CustomSVG = ({ data }: {data:any}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // Define variables for positioning
    let x = 50; // X-coordinate of the blocks
    let y = 50; // Initial Y-coordinate of the blocks

    // Create scales for the y-axis
    const yScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([50, 550]);

    // Render y-axis
    const yAxis = axisLeft(yScale);
    svg.append('g').call(yAxis).attr('transform', `translate(${x}, 0)`);

    // Loop through each tipset in the data
    data.forEach((tipset:any) => {
      // Render the ChainBlocks
      tipset.ChainBlocks.forEach((block:any) => {
        // Render the block as a rectangle
        svg
          .append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', 100)
          .attr('height', 50)
          .attr('fill', 'blue');

        // Render the height text
        svg
          .append('text')
          .attr('x', x + 10)
          .attr('y', y + 30)
          .text(`Height: ${block.Height}`)
          .attr('fill', 'white');

        // Render the miner text
        svg
          .append('text')
          .attr('x', x + 10)
          .attr('y', y + 45)
          .text(`Miner: ${block.Miner}`)
          .attr('fill', 'white');

        // Check if OrphanBlocks exist
        if (tipset.OrphanBlocks) {
          // Loop through each OrphanBlock
          tipset.OrphanBlocks.forEach((orphanBlock:any) => {
            // Check if the _id matches with the ChainBlock _id
            if (orphanBlock._id === block._id) {
              // Render a dashed line connecting the blocks
              svg
                .append('line')
                .attr('x1', x + 100)
                .attr('y1', y + 25)
                .attr('x2', x + 150)
                .attr('y2', y + 25)
                .attr('stroke', 'white')
                .attr('stroke-dasharray', '5,5');
            }
          });
        }

        // Update the X-coordinate for the next block
        x += 150;
      });

      // Reset the X-coordinate for the next tipset
      x = 50;

      // Update the Y-coordinate for the next tipset
      y += 100;
    });
  }, [data]);

  return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default CustomSVG;
