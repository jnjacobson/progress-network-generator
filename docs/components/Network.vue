<template>
  <div
    :id="id"
    class="border border-2 rounded p-3"
  >
    <div
      class="absolute"
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
import { computed, onMounted, watch } from 'vue';

import type { ProgressNetwork } from '../../src';
import { calculateScore, renderProgressNetwork } from '../../src';

const props = withDefaults(defineProps<{
  network: ProgressNetwork,
  width: number,
  getNodeColor?: (name: string) => string,
}>(), {
  getNodeColor: undefined,
});

const id = `network-${uuidv4()}`;

const score = computed(() => calculateScore(props.network));

onMounted(() => watch(
  props,
  () => renderProgressNetwork(
    id,
    props.width,
    props.network,
    props.getNodeColor,
  ),
  { immediate: true },
));
</script>
