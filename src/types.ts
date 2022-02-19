export type Attempt = {
  hasPassed: boolean;
  failedTestIndex?: number;
};

export type Trace = {
  attempts: Attempt[];
};

export type Edge = {
  weight: number;
  source: string;
  target: string;
};

export type ProgressNetwork = {
  nodes: string[];
  edges: Edge[];
};
