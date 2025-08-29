<script setup>
import { onMounted } from 'vue'
import SentimentTable from './components/SentimentTable.vue'
import SentimentChart from './components/SentimentChart.vue'
import FilterDropdown from './components/FilterDropdown.vue'
import { useSentimentStore } from './stores/sentimentStore'

const sentimentStore = useSentimentStore()

onMounted(() => {
  sentimentStore.loadData()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-3xl font-bold text-gray-900">Sentiment Analysis Dashboard</h1>
        <p class="text-gray-600 mt-1">Social Media & News Sentiment Monitoring</p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filter Section -->
      <div class="mb-8">
        <FilterDropdown />
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SentimentChart chart-type="pie" />
        <SentimentChart chart-type="bar" />
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow">
        <SentimentTable />
      </div>
    </main>
  </div>
</template>
