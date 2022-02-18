export type Attempt = {
  hasPassed: boolean;
  failedTestIndex?: number;
};

export type Trace = {
  attempts: Attempt[];
};

export type Edge = {
  count: number;
  fromIndex: number | null; // null means 'start' -> x
  toIndex: number;
};

export type ProgressNetwork = {
  nodes: string[];
  edges: Edge[];
};
