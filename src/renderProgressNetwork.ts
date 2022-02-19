import * as d3 from 'd3';

import { Edge, ProgressNetwork } from './types';

const renderProgressNetwork = (
  id: string,
  width: number,
  height: number,
  network: ProgressNetwork,
): void => {
  d3
    .select(`#${id}`)
    .selectAll('*')
    .remove();

  const xScale = d3
    .scaleBand()
    .domain(network.nodes)
    .rangeRound([0, width])
    .padding(0.5);

  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // create group for edges
  const edges = svg
    .selectAll('edge')
    .data(network.edges)
    .enter()
    .append('g');

  /* draw nodes */
  // set node data and position
  const node = svg
    .selectAll('node')
    .data(network.nodes)
    .enter()
    .append('g')
    .attr('transform', (n) => `translate(${xScale(n) + xScale.bandwidth() / 2}, ${height / 2})`);

  // draw node circles
  node
    .append('circle')
    .attr('r', 20)
    .attr('fill', 'none')
    .classed('fill-white', (n) => ['start', 'end'].includes(n))
    .classed('fill-gray-100', (n) => !['start', 'end'].includes(n))
    .classed('stroke-gray-300', (n) => !['start', 'end'].includes(n));
  // draw node text
  node
    .append('text')
    .attr('dy', '0.325em') // center text vertically
    .text((n) => n)
    .attr('font-size', '0.75rem')
    .style('text-anchor', 'middle');

  const getPositionOfNode = (nodeId: string): [number, number] => {
    const nodeEl = node.nodes().find(
      (n) => n.textContent === nodeId,
    );

    const position = svg.node().createSVGPoint();
    const bbox = nodeEl.getBBox();

    position.x = bbox.x + bbox.width / 2;
    position.y = bbox.y + bbox.height / 2;

    const transPos = position.matrixTransform(nodeEl.getCTM());

    return [transPos.x, transPos.y];
  };

  const calculateThirdPoint = (source: [number, number], target: [number, number]): [number, number][] => {
    const x = target[0] - source[0];
    const y = target[1] - source[1];
    const O = Math.atan2(y, x);
    const l = Math.sqrt(x * x + y * y);

    const radius = l; // ?

    if (l === 0) {
      return [
        [target[0] + 10, target[1] + 30],
        [target[0] + 30, target[1] + 30],
        [target[0] + 30, target[1] + 10],
      ];
    }

    const a = Math.asin(l / (2 * radius));
    const h = radius * Math.cos(a);

    return [[
      Math.round(source[0] + x / 2 - h * (y / l)),
      Math.round(source[1] + x / 2 - h * (x / l)),
    ]];
  };

  const getPoints = (e: Edge): [number, number][] => {
    const sourceAndTarget = [
      getPositionOfNode(e.source),
      getPositionOfNode(e.target),
    ];

    return [
      sourceAndTarget[0],
      ...calculateThirdPoint(sourceAndTarget[0], sourceAndTarget[1]),
      sourceAndTarget[1],
    ];
  };

  const curve = d3.line().curve(d3.curveNatural);

  /* draw edges */
  edges
    .append('path')
    .attr('d', (e) => curve(getPoints(e)))
    .attr('marker-end', (_, i) => `url(#end-arrow${i})`)
    .attr('stroke', 'black')
    .attr('stroke-width', (e) => e.weight * 2)
    .attr('stroke-opacity', (e) => e.weight / 2)
    .attr('fill', 'none');

  edges
    .append('text')
    .attr('dx', (e) => getPoints(e)[1][0])
    .attr('dy', (e) => getPoints(e)[1][1])
    .text((e) => e.weight)
    .attr('font-size', '0.75rem')
    .style('text-anchor', 'middle');
};

export default renderProgressNetwork;
