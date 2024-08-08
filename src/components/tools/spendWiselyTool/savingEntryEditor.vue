<script setup lang="ts">
import { ref } from 'vue';
import type { SavingEntry } from './types.ts';

// get the saving as a prop
const props = defineProps<{
  saving: SavingEntry;
  removeSaving: () => void;
}>();
</script>

<style scoped></style>

<template>
  <label class="flex items-end justify-center gap-x-3 gap-y-2 p-3 border rounded-3xl">
    <span class='flex flex-col flex-1'>
      <span>{{ saving.label }}</span>
      <input
        class="text-slate-600 dark:text-slate-500 h-10 px-2 outline-none border rounded-2xl"
        type="number"
        step='10'
        v-model="saving.amount"
    /></span>
    <button @click="removeSaving()" class="bg-red-500 text-slate-200 hover:bg-red-500/80 rounded-3xl px-3 py-2">Remove</button>
  </label>
</template>
