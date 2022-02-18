import * as d3 from 'd3';

import { ProgressNetwork } from './types';

const renderProgressNetwork = (
  id: string,
  width: number,
  height: number,
  network: ProgressNetwork,
): void => {
  const svg = d3.select(`#${id}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const edge = svg.data(network.edges)
    .append('g')
    .attr('fill', 'none')
    .attr('stroke-width', (e) => e.count);
};

export default renderProgressNetwork;
