<template>
  <div class="p-2">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h3 class="text-lg font-semibold text-emerald-100">Sentiment Analysis by Channel</h3>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search channels..."
          class="pl-10 pr-4 py-2 rounded-lg bg-emerald-900/30 text-emerald-100 placeholder-emerald-300/40 border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 backdrop-blur-md transition"
        />
        <svg
          class="absolute left-3 top-2.5 h-5 w-5 text-emerald-300/50"
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

    <!-- Table -->
    <div
      class="overflow-x-auto rounded-xl border border-emerald-500/30 backdrop-blur-md bg-emerald-950/20 shadow-xl"
    >
      <table class="min-w-full divide-y divide-emerald-500/20">
        <thead class="bg-emerald-900/40 text-emerald-200 uppercase text-xs">
          <tr>
            <th
              @click="sort('channel')"
              class="px-6 py-3 text-left font-medium cursor-pointer hover:bg-emerald-800/40 transition"
            >
              <div class="flex gap-x-2">Channel <IconSort /></div>
            </th>
            <th
              @click="sort('positive')"
              class="px-6 py-3 text-left font-medium cursor-pointer hover:bg-emerald-800/40 transition"
            >
              <div class="flex gap-x-2">Positive <IconSort /></div>
            </th>
            <th
              @click="sort('neutral')"
              class="px-6 py-3 text-left font-medium cursor-pointer hover:bg-emerald-800/40 transition"
            >
              <div class="flex gap-x-2">Neutral <IconSort /></div>
            </th>
            <th
              @click="sort('negative')"
              class="px-6 py-3 text-left font-medium cursor-pointer hover:bg-emerald-800/40 transition"
            >
              <div class="flex gap-x-2">Negative <IconSort /></div>
            </th>
            <th
              @click="sort('total')"
              class="px-6 py-3 text-left font-medium cursor-pointer hover:bg-emerald-800/40 transition"
            >
              <div class="flex gap-x-2">Total <IconSort /></div>
            </th>
            <th class="px-6 py-3 text-left font-medium">Distribution</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-emerald-500/20">
          <tr
            v-for="row in filteredAndSortedData"
            :key="row.channel"
            class="hover:bg-emerald-900/30 transition"
          >
            <td class="px-6 py-4 text-sm font-medium text-emerald-100 capitalize">
              {{ row.channel === 'all' ? 'All Channels' : row.channel }}
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-emerald-100 font-semibold">
                {{ row.positive.toLocaleString() }}
              </div>
              <div class="text-xs text-emerald-300/70">{{ row.positivePercent }}%</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-emerald-100 font-semibold">
                {{ row.neutral.toLocaleString() }}
              </div>
              <div class="text-xs text-emerald-300/70">{{ row.neutralPercent }}%</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-emerald-100 font-semibold">
                {{ row.negative.toLocaleString() }}
              </div>
              <div class="text-xs text-emerald-300/70">{{ row.negativePercent }}%</div>
            </td>
            <td class="px-6 py-4 text-sm font-bold text-emerald-100">
              {{ row.total.toLocaleString() }}
            </td>
            <td class="px-6 py-4">
              <div
                class="h-2 bg-emerald-900/40 rounded-full flex overflow-hidden w-32 shadow-inner"
              >
                <div class="bg-green-400" :style="{ width: row.positivePercent + '%' }"></div>
                <div class="bg-emerald-300" :style="{ width: row.neutralPercent + '%' }"></div>
                <div class="bg-red-400" :style="{ width: row.negativePercent + '%' }"></div>
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
import { useSentimentStore } from '@/stores/sentimentStore'
import IconSort from '@/components/icons/IconSort.vue'

const sentimentStore = useSentimentStore()
const searchQuery = ref('')
const sortField = ref('total')
const sortDirection = ref('desc')

// Load table data
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
  const rows = [...tableData.value]

  const channelFiltered =
    sentimentStore.activeChannel === 'all'
      ? rows
      : rows.filter((r) => r.channel === sentimentStore.activeChannel)

  // filter by searchQuery
  const searchFiltered = searchQuery.value
    ? channelFiltered.filter((r) =>
        r.channel.toLowerCase().includes(searchQuery.value.trim().toLowerCase()),
      )
    : channelFiltered

  const field = sortField.value
  const dir = sortDirection.value // 'asc' | 'desc'

  const sorted = searchFiltered.sort((a, b) => {
    const av = a[field]
    const bv = b[field]

    if (av == null && bv == null) return 0
    if (av == null) return dir === 'asc' ? 1 : -1
    if (bv == null) return dir === 'asc' ? -1 : 1

    if (field === 'channel') {
      if (a.channel === 'all' || b.channel === 'all') {
        if (a.channel === b.channel) return 0
        return dir === 'asc' ? (a.channel === 'all' ? -1 : 1) : a.channel === 'all' ? 1 : -1
      }
      const cmp = String(av).localeCompare(String(bv))
      return dir === 'asc' ? cmp : -cmp
    }

    const cmp = Number(av) - Number(bv)
    if (cmp === 0) return 0
    return dir === 'asc' ? cmp : -cmp
  })

  return sorted
})

const sort = (field) => {
  sortField.value = field
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}
</script>
