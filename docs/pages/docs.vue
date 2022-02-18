<template>
  <div class="h-screen w-screen flex justify-center">
    <div class="m-12 space-y-12 flex flex-col items-center">
      <div class="text-center">
        <h1 class="text-2xl font-bold">
          Progress Network Generator
        </h1>
        <h2 class="text-xl">
          Documentation
        </h2>
      </div>

      <div id="network" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ProgressNetwork, Trace } from '../../src';
import generateProgressNetwork from '../../src/generateProgressNetwork';
import renderProgressNetwork from '../../src/renderProgressNetwork';

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

const network = ref<ProgressNetwork>(generateProgressNetwork(TESTS, TRACES));

renderProgressNetwork('network', 500, 500, network.value);
</script>
