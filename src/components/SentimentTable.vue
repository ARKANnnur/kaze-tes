<template>
  <div class="p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Sentiment Analysis by Channel</h3>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search channels..."
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <svg
          class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              @click="sort('channel')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Channel</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  ></path>
                </svg>
              </div>
            </th>
            <th
              @click="sort('positive')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Positive</span>
                <div class="w-3 h-3 bg-positive rounded-full"></div>
              </div>
            </th>
            <th
              @click="sort('neutral')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Neutral</span>
                <div class="w-3 h-3 bg-neutral rounded-full"></div>
              </div>
            </th>
            <th
              @click="sort('negative')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Negative</span>
                <div class="w-3 h-3 bg-negative rounded-full"></div>
              </div>
            </th>
            <th
              @click="sort('total')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              Total
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Distribution
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="row in filteredAndSortedData" :key="row.channel" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900 capitalize">
                  {{ row.channel === 'all' ? 'All Channels' : row.channel }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 font-semibold">
                {{ row.positive.toLocaleString() }}
              </div>
              <div class="text-xs text-positive">{{ row.positivePercent }}%</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 font-semibold">
                {{ row.neutral.toLocaleString() }}
              </div>
              <div class="text-xs text-neutral">{{ row.neutralPercent }}%</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 font-semibold">
                {{ row.negative.toLocaleString() }}
              </div>
              <div class="text-xs text-negative">{{ row.negativePercent }}%</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-gray-900">{{ row.total.toLocaleString() }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex space-x-1">
                <div class="h-2 bg-gray-200 rounded-full flex overflow-hidden" style="width: 120px">
                  <div class="bg-positive" :style="{ width: row.positivePercent + '%' }"></div>
                  <div class="bg-neutral" :style="{ width: row.neutralPercent + '%' }"></div>
                  <div class="bg-negative" :style="{ width: row.negativePercent + '%' }"></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSentimentStore } from '../stores/sentimentStore'

const sentimentStore = useSentimentStore()
const searchQuery = ref('')
const sortField = ref('total')
const sortDirection = ref('desc')

const tableData = computed(() => {
  const data = sentimentStore.rawData
  if (!data) return []

  const channels = ['all', 'news', 'instagram', 'youtube', 'facebook', 'tiktok', 'twitter']

  return channels
    .map((channel) => {
      const channelData = data[channel]
      if (!channelData) return null

      const positive = channelData.pie.series[0] || 0
      const neutral = channelData.pie.series[1] || 0
      const negative = channelData.pie.series[2] || 0
      const total = channelData.total || 0

      return {
        channel,
        positive,
        neutral,
        negative,
        total,
        positivePercent: total > 0 ? Math.round((positive / total) * 100) : 0,
        neutralPercent: total > 0 ? Math.round((neutral / total) * 100) : 0,
        negativePercent: total > 0 ? Math.round((negative / total) * 100) : 0,
      }
    })
    .filter(Boolean)
})

const filteredAndSortedData = computed(() => {
  let filtered = tableData.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((row) => row.channel.toLowerCase().includes(query))
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

const sort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'desc'
  }
}
</script>
