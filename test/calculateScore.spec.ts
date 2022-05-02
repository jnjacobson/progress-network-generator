import { describe, expect, it } from 'vitest';

import { calculateScore } from '../dist';

describe('CalculateScore method', () => {
  it('calculates the score', () => {
    const network1 = {
      nodes: ['a'],
      edges: [
        {
          source: 'a',
          target: 'a',
          weight: 2,
        },
      ],
    };

    expect(calculateScore(network1)).toBe(2);

    const network2 = {
      nodes: ['a', 'b'],
      edges: [
        {
          source: 'a',
          target: 'a',
          weight: 1,
        },
        {
          source: 'a',
          target: 'b',
          weight: 2,
        },
        {
          source: 'b',
          target: 'a',
          weight: 1,
        },
        {
          source: 'b',
          target: 'b',
          weight: 1,
        },
      ],
    };

    expect(calculateScore(network2)).toBe(3);

    const network3 = {
      nodes: ['a', 'b', 'c'],
      edges: [
        {
          source: 'a',
          target: 'c',
          weight: 42,
        },
        {
          source: 'c',
          target: 'a',
          weight: 1000,
        },
        {
          source: 'c',
          target: 'b',
          weight: 300,
        },
        {
          source: 'b',
          target: 'a',
          weight: 37,
        },
      ],
    };

    expect(calculateScore(network3)).toBe(1337);
  });
});
