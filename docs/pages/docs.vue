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

      <button
        class="bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded"
        @click="generateAndRender"
      >
        Generate Network
      </button>

      <div
        id="network"
        class="border border-2 rounded"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

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

const generateAndRender = () => {
  const network = ref<ProgressNetwork>(generateProgressNetwork(TESTS, TRACES));

  renderProgressNetwork('network', 600, 300, network.value);
};

onMounted(generateAndRender);
</script>
