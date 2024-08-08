<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SavingEntry } from './types.ts';
import SavingEntryEditor from './savingEntryEditor.vue';
import SafetyAreasTable from '@components/tools/spendWiselyTool/safetyAreasTable.vue';

/** Spend Wisely, an application that helps you spend your savings the right way.
 * Simply input your savings for each bank account (a list of number inputs will be displayed)
 * Then we will display a table with the different percentages and how safe would be to spend that amount
 * Starting from 0% to 100% in 5% increments
 * The user can input a custom percentage and we will display the amount that can be spent based on total savings
 * The list of savings input starts with only one entry, and a button to add another entry to be calculated
 * Entries have a delete button to remove them from the list and a label to identify them that can be edited
 * */

const savings = ref<SavingEntry[]>([
  { label: 'Savings 1', amount: 50 },
  { label: 'Savings 2', amount: 50 },
]);

const addSaving = () => {
  savings.value = [
    ...savings.value,
    { label: `Savings ${savings.value.length + 1}`, amount: 0 },
  ];
};

const removeSaving = (index: number) => {
  savings.value = savings.value.filter((_, i) => i !== index);
};

const totalSavings = computed(() =>
  savings.value.reduce((acc, { amount }) => acc + amount, 0),
);

const calculatePercentage = (percentage: number) => {
  return parseFloat((totalSavings.value * (percentage / 100)).toFixed(2));
};

const safetyToSpend = (percentage: number) => {
  const amount = calculatePercentage(percentage);
  const total = totalSavings.value;
  // if less than 20% is safe
  // up until 60% is warning
  // the rest is dangerous
  if (amount <= total * 0.2) return 'Safe';
  if (amount <= total * 0.6) return 'Warning';
  return 'Unsafe';
};

// returns an array starting from the initial number to the end number inclusive
const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const formatNumber = (number: number) => {
  return Intl.NumberFormat('en', {
    notation: 'standard',
  }).format(number);
};
</script>

<template>
  <div
    class="flex flex-col items-center gap-y-3 text-zinc-600 dark:text-zinc-300">
    <h1 class="text-2xl font-semibold underline">Spend Wisely</h1>

    <div class="flex flex-col-reverse lg:flex-row w-full justify-between">
      <div class="flex flex-1 flex-col space-y-2 p-3">
        <h2 class="text-center text-lg font-bold">
          Total Savings: {{ formatNumber(totalSavings) }}
        </h2>

        <div v-for="(saving, index) in savings" :key="index" class="w-full p-2">
          <SavingEntryEditor
            :saving="saving"
            :remove-saving="() => removeSaving(index)" />
        </div>

        <div class="flex items-center justify-center gap-x-3">
          <button
            @click="addSaving"
            class="rounded-3xl border py-2 px-3 hover:bg-slate-100/10 dark:border-slate-100">
            Add Saving
          </button>
        </div>
      </div>
      <div
        class="flex flex-1 flex-col space-y-2 py-3 px-4 text-center text-zinc-600 dark:text-zinc-300">
        <h2 class="text-lg font-bold">Explanations</h2>
        <p>
          Have you ever wanted to know <b>how much you could spend</b> without
          <b>compromising yourself?</b>
        </p>
        <p>Then this tool is perfect for you!</p>
        <p>
          Just <span class="underline">add your savings on the list</span> and
          the app will show different percentages and their safety-areas
        </p>
        <p>
          A general consensus among specialists is the <b>10% rule</b>, meaning
          that up to 10% is safe to spend considering a stable source of income.
        </p>
      </div>
    </div>

    <SafetyAreasTable
      :calculate-percentage="calculatePercentage"
      :range="range"
      :total-savings="totalSavings" />
  </div>
</template>

<style scoped></style>
