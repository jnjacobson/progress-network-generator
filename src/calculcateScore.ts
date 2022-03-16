import { ProgressNetwork } from './types';

const calculateScore = (network: ProgressNetwork): number => (
  network.edges

    // get all back & repeat step edges
    .filter((e) => (
      network.nodes.indexOf(e.target) <= network.nodes.indexOf(e.source)
    ))

    // map to weight
    .map((e) => e.weight)

    // reduce to sum of all weights
    .reduce((sum, weight) => sum + weight)
);

export default calculateScore;
