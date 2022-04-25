import { ProgressNetwork } from './types';

const calculateScore = (network: ProgressNetwork): number => (
  network.edges
    // map to weight
    .map((e) => {
      const isRepeatOrBackStep = network.nodes.indexOf(e.target)
        <= network.nodes.indexOf(e.source);

      if (isRepeatOrBackStep) {
        return e.weight;
      }

      return 0;
    })

    // reduce to sum of all weights
    .reduce((sum, weight) => sum + weight)
);

export { calculateScore };
