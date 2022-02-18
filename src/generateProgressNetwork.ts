import { Edge, ProgressNetwork, Trace } from './types';

const extractRawEdges = (traces: Trace[], passIndex: number): Edge[] => (
  traces.flatMap(({ attempts }: Trace): Edge[] => {
    const traceEdges = <Edge[]>[];
    let fromIndex = 0;

    for (let i = 0; i < attempts.length; i++) {
      const toIndex = attempts[i].hasPassed
        ? passIndex
        : attempts[i].failedTestIndex + 1;

      traceEdges.push({
        count: 1,
        fromIndex,
        toIndex,
      });

      fromIndex = toIndex;

      // if last attempt, append edge from 'pass' to 'end'
      if (i + 1 === attempts.length) {
        traceEdges.push({
          count: 1,
          fromIndex,
          toIndex: passIndex + 1,
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
      (mergedEdge) => mergedEdge.fromIndex === rawEdge.fromIndex
        && mergedEdge.toIndex === rawEdge.toIndex,
    );

    if (idx === -1) {
      mergedEdges.push(rawEdge);

      return;
    }

    mergedEdges[idx].count++;
  });

  return mergedEdges;
};

const buildEdges = (traces: Trace[], passIndex: number): Edge[] => {
  const rawEdges = extractRawEdges(traces, passIndex);

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
  network.nodes = [...tests, 'PASS'];

  network.edges = buildEdges(traces, network.nodes.length);

  return network;
};

export default generateProgressNetwork;
