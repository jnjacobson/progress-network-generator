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

  const edgesSortedByWeight = network.edges.sort(
    (a, b) => a.weight - b.weight, // render heavier edges later
  );

  // create group for edges
  const edges = svg
    .selectAll('edge')
    .data(edgesSortedByWeight)
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

  const calculateThirdPoint = (
    source: [number, number],
    target: [number, number],
  ): [number, number][] => {
    const x = target[0] - source[0];
    const y = target[1] - source[1];
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

  const weights = network.edges.map((e) => e.weight);
  const lowestWeight = weights.reduce((pw, w) => pw < w ? pw : w);
  const highestWeight = weights.reduce((pw, w) => pw > w ? pw : w);

  const getWeightFactor = (weight: number): number => (
    (weight - lowestWeight) / (highestWeight - lowestWeight)
  );

  /* draw edges */
  edges
    .append('path')
    .attr('d', (e) => curve(getPoints(e)))
    .attr('marker-end', (_, i) => `url(#end-arrow${i})`)
    .attr('stroke', 'black')
    .attr('stroke-width', (e) => 0.1 + getWeightFactor(e.weight) * 4)
    .attr('stroke-opacity', (e) => 0.6 + getWeightFactor(e.weight) * 4)
    .attr('fill', 'none');

  /* draw weight text */

  const weightTextGroup = edges
    .append('g')
    .attr('transform', (e) => {
      const points = getPoints(e);
      const i = Math.round(points.length / 2 - 1);

      const x = points[i][0];
      const y = points[i][1];

      return `translate(${x}, ${y})`;
    });

  const textBg = weightTextGroup
    .append('rect')
    .attr('fill', 'white')
    .attr('opacity', 0.8);

  weightTextGroup
    .append('text')
    .text((e) => e.weight)
    .attr('font-size', (e) => `${0.5 + getWeightFactor(e.weight) * 0.5}rem`)
    .attr('font-weight', (e) => 400 + getWeightFactor(e.weight) * 200)
    .attr('opacity', (e) => 0.5 + getWeightFactor(e.weight) * 5)
    .style('text-anchor', 'middle');

  const bboxes = weightTextGroup.nodes().map((n) => n.getBBox());

  textBg
    .attr('x', (e, i) => -(bboxes[i].width / 2))
    .attr('y', (e, i) => -(bboxes[i].height * 0.75))
    .attr('height', (e, i) => bboxes[i].height)
    .attr('width', (e, i) => bboxes[i].width);
};

export default renderProgressNetwork;
