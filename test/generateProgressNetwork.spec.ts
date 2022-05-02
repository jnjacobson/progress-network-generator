import { describe, expect, it } from 'vitest';

import { generateProgressNetwork } from '../dist';
import { Trace } from '../src';

describe('GenerateProgressNetwork method', () => {
  it('generates network', () => {
    const tests = <string[]>[
      'T1',
      'T2',
    ];
    const traces = <Trace[]>[
      // student 1
      {
        attempts: [
          {
            hasPassed: false,
            failedTestIndex: 0,
          },
        ],
      },
      // student 2
      {
        attempts: [
          {
            hasPassed: false,
            failedTestIndex: 1,
          },
          {
            hasPassed: false,
            failedTestIndex: 1,
          },
          {
            hasPassed: true,
          },
        ],
      },
      // student 3
      {
        attempts: [
          {
            hasPassed: false,
            failedTestIndex: 0,
          },
          {
            hasPassed: true,
          },
        ],
      },
    ];

    const expectedNetwork = {
      nodes: [
        'start',
        'T1',
        'T2',
        'PASS',
        'end',
      ],
      edges: [
        {
          source: 'start',
          target: 'T1',
          weight: 2,
        },
        {
          source: 'start',
          target: 'T2',
          weight: 1,
        },
        {
          source: 'T1',
          target: 'PASS',
          weight: 1,
        },
        {
          source: 'T1',
          target: 'end',
          weight: 1,
        },
        {
          source: 'T2',
          target: 'T2',
          weight: 1,
        },
        {
          source: 'T2',
          target: 'PASS',
          weight: 1,
        },
        {
          source: 'PASS',
          target: 'end',
          weight: 2,
        },
      ],
    };

    const generatedNetwork = generateProgressNetwork(tests, traces);

    expect(generatedNetwork.nodes).toStrictEqual(expectedNetwork.nodes);

    expect(generatedNetwork.edges.length).toBe(expectedNetwork.edges.length);

    expectedNetwork.edges.forEach((edge) => {
      expect(generatedNetwork.edges).toContainEqual(edge);
    });
  });
});
