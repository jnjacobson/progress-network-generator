<template>
  <div class="w-full flex justify-center">
    <div class="m-12 space-y-12 flex flex-col items-center">
      <div class="text-center">
        <h1 class="text-2xl font-bold">
          Progress Network Generator
        </h1>
        <h2 class="text-xl">
          Documentation
        </h2>
      </div>

      <Network
        :network="network1"
        :width="600"
        :height="250"
      />

      <Network
        :network="network2"
        :width="1000"
        :height="550"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ProgressNetwork, Trace } from '../../src';
import generateProgressNetwork from '../../src/generateProgressNetwork';
import Network from '../components/Network.vue';

const TESTS = <string[]>[
  'T1',
  'T2',
];
const TRACES = <Trace[]>[
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

const network1 = ref<ProgressNetwork>(generateProgressNetwork(TESTS, TRACES));

const network2 = ref<ProgressNetwork>({
  nodes: [
    'start',
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'PASS',
    'end',
  ],
  edges: [
    {
      source: 'start',
      target: 'T1',
      weight: 9627,
    },
    {
      source: 'start',
      target: 'T2',
      weight: 944,
    },
    {
      source: 'start',
      target: 'T3',
      weight: 1111,
    },
    {
      source: 'start',
      target: 'T4',
      weight: 4681,
    },
    {
      source: 'start',
      target: 'T5',
      weight: 381,
    },
    {
      source: 'start',
      target: 'PASS',
      weight: 6574,
    },
    {
      source: 'T1',
      target: 'T1',
      weight: 19228,
    },
    {
      source: 'T1',
      target: 'T2',
      weight: 2086,
    },
    {
      source: 'T1',
      target: 'PASS',
      weight: 4759,
    },
    {
      source: 'T1',
      target: 'T3',
      weight: 883,
    },
    {
      source: 'T1',
      target: 'T4',
      weight: 3254,
    },
    {
      source: 'T1',
      target: 'T5',
      weight: 426,
    },
    {
      source: 'T1',
      target: 'T6',
      weight: 286,
    },
    {
      source: 'T1',
      target: 'end',
      weight: 1032,
    },
    {
      source: 'T2',
      target: 'T2',
      weight: 1952,
    },
    {
      source: 'T2',
      target: 'T1',
      weight: 1291,
    },
    {
      source: 'T2',
      target: 'T3',
      weight: 208,
    },
    {
      source: 'T2',
      target: 'T4',
      weight: 654,
    },
    {
      source: 'T2',
      target: 'PASS',
      weight: 789,
    },
    {
      source: 'T2',
      target: 'end',
      weight: 231,
    },
    {
      source: 'T3',
      target: 'T1',
      weight: 142,
    },
    {
      source: 'T3',
      target: 'T3',
      weight: 982,
    },
    {
      source: 'T3',
      target: 'T4',
      weight: 766,
    },
    {
      source: 'T3',
      target: 'PASS',
      weight: 1184,
    },
    {
      source: 'T4',
      target: 'T4',
      weight: 9162,
    },
    {
      source: 'T4',
      target: 'T1',
      weight: 1065,
    },
    {
      source: 'T4',
      target: 'T2',
      weight: 56,
    },
    {
      source: 'T4',
      target: 'T5',
      weight: 486,
    },
    {
      source: 'T4',
      target: 'T6',
      weight: 522,
    },
    {
      source: 'T4',
      target: 'PASS',
      weight: 7113,
    },
    {
      source: 'T4',
      target: 'end',
      weight: 300,
    },
    {
      source: 'T5',
      target: 'T1',
      weight: 202,
    },
    {
      source: 'T5',
      target: 'T4',
      weight: 149,
    },
    {
      source: 'T5',
      target: 'T5',
      weight: 576,
    },
    {
      source: 'T5',
      target: 'T6',
      weight: 689,
    },
    {
      source: 'T5',
      target: 'T6',
      weight: 983,
    },
    {
      source: 'T6',
      target: 'T1',
      weight: 239,
    },
    {
      source: 'T6',
      target: 'T4',
      weight: 151,
    },
    {
      source: 'T6',
      target: 'T5',
      weight: 802,
    },
    {
      source: 'T6',
      target: 'T6',
      weight: 191,
    },
    {
      source: 'T6',
      target: 'PASS',
      weight: 383,
    },
    {
      source: 'PASS',
      target: 'end',
      weight: 21785,
    },
  ],
});
</script>
