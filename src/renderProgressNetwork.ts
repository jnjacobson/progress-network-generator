import * as d3 from 'd3';

import { Edge, ProgressNetwork } from './types';

const renderProgressNetwork = (
  id: string,
  width: number,
  height: number,
  network: ProgressNetwork,
): void => {
  // clear all children from element to allow rerendering
  d3
    .select(`#${id}`)
    .selectAll('*')
    .remove();

  // define scale to dynamically place nodes based on given width
  const xScale = d3
    .scaleBand()
    .domain(network.nodes)
    .rangeRound([0, width])
    .padding(0.5);

  // define svg
  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', 'white')
    .style(
      'font-family',
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,'
      + '"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,'
      + '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    );

  // append root group to allow centering of network at the end
  const rootGrp = svg.append('g');

  const edgesSortedByWeight = network.edges.sort(
    (a, b) => a.weight - b.weight, // render heavier edges later
  );

  // create group for edges
  const edges = rootGrp
    .selectAll('edge')
    .data(edgesSortedByWeight)
    .enter()
    .append('g');

  /* draw nodes */
  // set node data and position
  const node = rootGrp
    .selectAll('node')
    .data(network.nodes)
    .enter()
    .append('g')
    .attr('transform', (n) => `translate(${xScale(n) + xScale.bandwidth() / 2}, ${height / 2})`);

  const getNodeColor = (nodeName: string) => {
    switch (nodeName) {
      case 'start':
      case 'end': return 'white';
      case 'PASS': return '#D9F99D';
      default: return '#BFDBFE';
    }
  };

  // draw node circles
  node
    .append('circle')
    .attr('r', 20)
    .attr('fill', getNodeColor)
    .attr('stroke', (n) => ['start', 'end'].includes(n) ? 'none' : 'black');
  // draw node text
  node
    .append('text')
    .attr('dy', '0.325em') // center text vertically
    .text((n) => n)
    .attr('font-weight', 600)
    .attr('font-size', '0.75rem')
    .style('text-anchor', 'middle');

  /* draw edges */

  // returns the x,y pos of a node
  // (complex because they are groups that have been transformed)
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

  // calculates the maximum point of a curve
  // (or 3 points when target === source)
  const calculateMaximumPoint = (
    source: [number, number],
    target: [number, number],
  ): [number, number][] => {
    const x = target[0] - source[0];
    const y = target[1] - source[1];
    const l = Math.sqrt(x * x + y * y);

    const radius = l;

    // target === source
    if (l === 0) {
      return [
        [target[0] - 21, target[1] + 25],
        [target[0] - 20, target[1] + 41],
        [target[0], target[1] + 55],
        [target[0] + 20, target[1] + 41],
        [target[0] + 21, target[1] + 25],
      ];
    }

    const a = Math.asin(l / (2 * radius));
    const h = radius * Math.cos(a);

    return [[
      Math.round(source[0] + x / 2 - h * (y / l)),
      Math.round(source[1] + x / 2 - h * (x / l)),
    ]];
  };

  // get points to draw edge curve
  const getPoints = (e: Edge): [number, number][] => {
    const sourceAndTarget = [
      getPositionOfNode(e.source),
      getPositionOfNode(e.target),
    ];

    const copy: [number, number][] = JSON.parse(JSON.stringify(sourceAndTarget));

    const isBackOrRepeatstep = sourceAndTarget[0][0] >= sourceAndTarget[1][0];

    // pad source and target coordinates to show arrows
    sourceAndTarget[0][0] += isBackOrRepeatstep ? -18 : 18; // source x
    sourceAndTarget[0][1] += isBackOrRepeatstep ? 18 : -18; // source y

    sourceAndTarget[1][0] += isBackOrRepeatstep ? 18 : -18; // target x
    sourceAndTarget[1][1] += isBackOrRepeatstep ? 18 : -18; // target y

    return [
      sourceAndTarget[0],
      ...calculateMaximumPoint(copy[0], copy[1]),
      sourceAndTarget[1],
    ];
  };

  const curve = d3.line().curve(d3.curveNatural);

  const weights = network.edges.map((e) => e.weight);
  const lowestWeight = weights.reduce((pw, w) => pw < w ? pw : w);
  const highestWeight = weights.reduce((pw, w) => pw > w ? pw : w);

  // returns a factor between 0 and 1 to style edges depending on weight
  const getWeightFactor = (weight: number): number => (
    (weight - lowestWeight) / (highestWeight - lowestWeight)
  );

  const padCurve = (d: string) => {
    console.log(d);

    return d;
  };

  edges
    .append('path')
    .attr('d', (e) => padCurve(curve(getPoints(e))))
    .attr('marker-end', 'url(#arrow)')
    .attr('stroke', 'black')
    .attr('stroke-width', (e) => 1.5 + getWeightFactor(e.weight) * 2)
    .attr('opacity', (e) => 0.1 + getWeightFactor(e.weight) * 2)
    .attr('fill', 'none');

  rootGrp
    .append('marker')
    .attr('id', 'arrow')
    .attr('orient', 'auto')
    .attr('viewBox', '0 0 40 40')
    .attr('refX', 27)
    .attr('refY', 20)
    .attr('markerWidth', 11)
    .attr('markerHeight', 11)
    .attr('markerUnits', 'userSpaceOnUse')
    .append('path')
    .attr('d', 'M 0 0 L 40 20 L 0 40 z');

  /* draw weight text */

  // add group for positioning and transform to edge curve maxima
  const weightTextGroup = edges
    .append('g')
    .attr('transform', (e) => {
      const points = getPoints(e);
      const i = Math.round(points.length / 2 - 1);

      const x = points[i][0];
      const y = points[i][1] + 4;

      return `translate(${x}, ${y})`;
    });

  // render text background group first, so it is behind text
  const textBg = weightTextGroup
    .append('rect')
    .attr('rx', 3)
    .attr('fill', 'white')
    .attr('opacity', 0.9);

  // render text
  weightTextGroup
    .append('text')
    .text((e) => e.weight)
    .attr('font-size', (e) => `${0.5 + getWeightFactor(e.weight) * 0.6}rem`)
    .attr('font-weight', 500)
    .attr('opacity', (e) => 0.5 + getWeightFactor(e.weight) * 4)
    .style('text-anchor', 'middle');

  // get bboxes of text for sizing background rects
  const bboxes = weightTextGroup.nodes().map((n) => n.getBBox());

  // fix size & pos of text background rects
  textBg
    .attr('x', (e, i) => -((bboxes[i].width + 6) / 2))
    .attr('y', (e, i) => -(bboxes[i].height * 0.7))
    .attr('height', (e, i) => bboxes[i].height * 0.9)
    .attr('width', (e, i) => bboxes[i].width + 6);

  /* center network in svg */

  // get y transition distance
  const rootGrpBbox = rootGrp.node().getBBox();
  const yTrans = ((height - rootGrpBbox.height) / 2) - rootGrpBbox.y;

  // center draw group
  rootGrp.attr('transform', () => `translate(0, ${yTrans})`);
};

export default renderProgressNetwork;
