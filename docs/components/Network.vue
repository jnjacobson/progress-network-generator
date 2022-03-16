<template>
  <div
    :id="id"
    class="border border-2 rounded"
  >
    <div
      class="absolute mx-3 my-2"
    >
      Score:
      <span
        class="font-semibold"
        v-text="score"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed, defineProps, onMounted, watch } from 'vue';

import { ProgressNetwork } from '../../src';
import calculateScore from '../../src/calculcateScore';
import renderProgressNetwork from '../../src/renderProgressNetwork';

const props = defineProps<{
  network: ProgressNetwork,
  width: number,
  height: number,
}>();

const id = `network-${uuidv4()}`;

const score = computed(() => calculateScore(props.network));

onMounted(() => watch(
  props,
  () => renderProgressNetwork(id, props.width, props.height, props.network),
  { immediate: true },
));
</script>
