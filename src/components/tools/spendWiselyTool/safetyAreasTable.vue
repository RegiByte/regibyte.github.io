<script lang="ts" setup="">
import { computed } from 'vue';

const props = defineProps<{
  totalSavings: number;
  calculatePercentage: (percentage: number) => number;
  range: (start: number, end: number) => number[];
}>();

interface SafetyAreaGroup {
  maxPercentage: number;
  guidance: string;
  level: 'super-safe' | 'safe' | 'warning' | 'dangerous';
}

interface SafetyAreaEntry {
  percentage: number;
  amount: number;
}

interface SafetyRow {
  percentage: number;
  amount: number;
  guidance: string;
}

const safetyAreaGroups: SafetyAreaGroup[] = [
  {
    maxPercentage: 10,
    guidance: 'You can certainly recover! go for it!',
    level: 'super-safe',
  },
  {
    maxPercentage: 25,
    guidance: "You could probably recover, it's safe!",
    level: 'safe',
  },
  {
    maxPercentage: 60,
    guidance: "It's a bit risky, but you could recover in the near future",
    level: 'warning',
  },
  {
    maxPercentage: 100,
    guidance: "It's dangerous, you might not recover in the near future",
    level: 'dangerous',
  },
];

const safetyAreaEntries: SafetyAreaEntry[] = safetyAreaGroups.map((group) => ({
  percentage: group.maxPercentage,
  amount: props.calculatePercentage(group.maxPercentage),
}));

const getSafetyArea = (percentage: number): SafetyAreaGroup => {
  return (
    safetyAreaGroups.find((group) => percentage <= group.maxPercentage) ||
    safetyAreaGroups[safetyAreaGroups.length - 1]
  );
};

const safetyAreaRows = computed(() => {
  let rows = [] as SafetyRow[];
  for (let i = 5; i <= 100; i += 5) {
    rows.push({
      percentage: i,
      amount: props.calculatePercentage(i),
      guidance: getSafetyArea(i).guidance,
    });
  }
  return rows;
});

const shouldShowGuidance = (safetyArea: SafetyRow, index: number) => {
  return (
    !safetyAreaRows.value[index - 1] ||
    safetyAreaRows.value[index - 1].guidance !== safetyArea.guidance
  );
};

const groupSizes = computed(() => {
  // return an object describing how many items there are in each group
  return safetyAreaRows.value.reduce(
    (acc, row) => {
      const group = getSafetyArea(row.percentage);
      acc[group.level] = (acc[group.level] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
});

const getRowStyle = (safetyArea: SafetyRow) => {
  return {
    'bg-green-200': getSafetyArea(safetyArea.percentage).level === 'super-safe',
    'bg-green-400': getSafetyArea(safetyArea.percentage).level === 'safe',
    'bg-amber-200': getSafetyArea(safetyArea.percentage).level === 'warning',
    'bg-red-200': getSafetyArea(safetyArea.percentage).level === 'dangerous',
    'border dark:border-zinc-900 border-zinc-600/50': true
  };
};

const formatNumber = (number: number) => {
  return Intl.NumberFormat('en', {
    notation: 'standard',
  }).format(number);
};
</script>

<style scoped></style>

<template>
  <div class="flex w-full">
    <table
      v-if="totalSavings > 0"
      class="w-full text-center dark:text-slate-600 border">
      <thead>
        <tr class="uppercase dark:bg-zinc-200">
          <th class="min-w-[120px] p-2">Percentage</th>
          <th class='p-2'>Amount</th>
          <th class='p-2'>Guidance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(safetyArea, index) in safetyAreaRows"
          :class="getRowStyle(safetyArea)">
          <td class="min-w-[150px] p-2">{{ safetyArea.percentage }}%</td>
          <td class='p-2 border-r border-zinc-900'>$ {{ formatNumber(safetyArea.amount) }}</td>
          <td
            class="max-w-[300px]"
            :rowspan="groupSizes[getSafetyArea(safetyArea.percentage).level]"
            v-if="shouldShowGuidance(safetyArea, index)">
            <div>
              {{ safetyArea.guidance }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
