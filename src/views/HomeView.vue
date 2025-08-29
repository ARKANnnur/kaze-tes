<script setup>
import { onMounted, defineAsyncComponent } from 'vue'
import { useSentimentStore } from '@/stores/sentimentStore'

import Header from '@/components/ui/Header.vue'
import Decoration from '@/components/ui/Decoration.vue'
import SentimentTable from '@/features/sentiment/SentimentTable.vue'
const SentimentChart = defineAsyncComponent(() => import('@/features/sentiment/SentimentChart.vue'))
const HistogramChart = defineAsyncComponent(() => import('@/features/sentiment/HistogramChart.vue'))

const sentimentStore = useSentimentStore()

onMounted(() => {
  sentimentStore.loadData()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-slate-950 p-4 sm:p-6">
    <div class="">
      <Header />
      <div class="grid grid-cols-1 min-h-[150dvh] sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <!-- Table -->
        <div
          class="sm:col-span-2 lg:col-span-2 xl:col-span-2 rounded-xl border backdrop-blur-md bg-emerald-950/20 border-emerald-500/30 shadow-2xl group p-6"
        >
          <SentimentTable />
        </div>
        <!-- Table -->

        <!-- Charts -->
        <div class="space-y-4 sm:space-y-6">
          <div
            class="rounded-xl border backdrop-blur-md bg-slate-950/20 border-slate-500/30 shadow-2xl p-2"
          >
            <SentimentChart chart-type="pie" />
          </div>
          <div
            class="rounded-xl border backdrop-blur-md bg-slate-950/20 border-slate-500/30 shadow-2xl p-2"
          >
            <SentimentChart chart-type="bar" />
          </div>
        </div>
        <!-- Charts -->

        <!-- Daily Trends -->
        <div
          class="sm:col-span-2 rounded-xl border backdrop-blur-md bg-emerald-950/20 border-emerald-500/30 shadow-2xl group p-6"
        >
          <HistogramChart />
        </div>
        <!-- Daily Trends -->

        <div
          class="rounded-xl border backdrop-blur-md bg-slate-950/20 border-slate-500/30 shadow-2xl group overflow-hidden flex items-center justify-center"
        >
          <Decoration />
        </div>
      </div>
    </div>
  </div>
</template>
