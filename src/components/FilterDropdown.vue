<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Filter by Channel
        </label>
        <select 
          v-model="selectedChannel" 
          @change="handleChannelChange"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Channels</option>
          <option value="news">News</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
          <option value="twitter">Twitter</option>
        </select>
      </div>

      <div class="text-right">
        <div class="text-sm text-gray-500">Total Entries</div>
        <div class="text-2xl font-bold text-gray-900">
          {{ sentimentStore.filteredData?.total?.toLocaleString() || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSentimentStore } from '../stores/sentimentStore'

const sentimentStore = useSentimentStore()
const selectedChannel = ref('all')

const handleChannelChange = () => {
  sentimentStore.setActiveChannel(selectedChannel.value)
}

onMounted(() => {
  selectedChannel.value = sentimentStore.activeChannel
})
</script>
