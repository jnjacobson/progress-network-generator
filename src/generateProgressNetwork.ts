import { Edge, ProgressNetwork, Trace } from './types';

const extractRawEdges = (traces: Trace[], nodes: string[]): Edge[] => (
  traces.flatMap(({ attempts }: Trace): Edge[] => {
    const traceEdges = <Edge[]>[];
    let source = nodes[0]; // start

    for (let i = 0; i < attempts.length; i++) {
      const target = attempts[i].hasPassed
        ? 'PASS'
        : nodes[attempts[i].failedTestIndex + 1];

      traceEdges.push({
        weight: 1,
        source,
        target,
      });

      source = target;

      // if last attempt, append edge from 'PASS' to 'end'
      if (i + 1 === attempts.length) {
        traceEdges.push({
          weight: 1,
          source,
          target: 'end',
        });
      }
    }

    return traceEdges;
  })
);

const mergeEdges = (rawEdges: Edge[]): Edge[] => {
  const mergedEdges = <Edge[]>[];

  rawEdges.forEach((rawEdge: Edge) => {
    const idx = mergedEdges.findIndex(
      (mergedEdge) => mergedEdge.source === rawEdge.source
        && mergedEdge.target === rawEdge.target,
    );

    if (idx === -1) {
      mergedEdges.push(rawEdge);

      return;
    }

    mergedEdges[idx].weight++;
  });

  return mergedEdges;
};

const buildEdges = (traces: Trace[], nodes: string[]): Edge[] => {
  const rawEdges = extractRawEdges(traces, nodes);

  return mergeEdges(rawEdges);
};

const generateProgressNetwork = (
  tests: string[],
  traces: Trace[],
): ProgressNetwork => {
  const network = <ProgressNetwork>{
    nodes: [],
    edges: [],
  };

  // every test is a node + a final PASS node
  network.nodes = [
    'start',
    ...tests,
    'PASS',
    'end',
  ];

  network.edges = buildEdges(traces, network.nodes);

  return network;
};

export { generateProgressNetwork };
