import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/** Struktur data pie chart */
interface PieData {
  series: number[]
}

/** Struktur data tiap channel */
interface ChannelData {
  total: number
  pie: PieData
}

/** Struktur keseluruhan response */
interface SentimentResponse {
  [channel: string]: ChannelData
  all: ChannelData
}

/** Format hasil perhitungan total sentimen */
interface SentimentTotals {
  positive: number
  neutral: number
  negative: number
  total: number
}

export const useSentimentStore = defineStore('sentiment', () => {
  // State
  const rawData = ref<SentimentResponse | null>(null)
  const activeChannel = ref<string>('all')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Computed
  const filteredData = computed<ChannelData | null>(() => {
    if (!rawData.value) return null
    return rawData.value[activeChannel.value] || rawData.value.all
  })

  const channelsList = computed<string[]>(() => {
    if (!rawData.value) return []
    return Object.keys(rawData.value).filter((key) => key !== 'all')
  })

  const totalMentions = computed<number>(() => {
    return filteredData.value?.total || 0
  })

  // Actions
  const loadData = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/src/assets/response.json')
      if (!response.ok) {
        throw new Error('Failed to load sentiment data')
      }

      const jsonData = await response.json()

      if (jsonData.meta && jsonData.meta.status === 1 && jsonData.data) {
        rawData.value = jsonData.data as SentimentResponse
      } else {
        throw new Error('Invalid data format')
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Error loading sentiment data:', err)
    } finally {
      isLoading.value = false
    }
  }

  const setActiveChannel = (channel: string): void => {
    if (channel === 'all' || (rawData.value && rawData.value[channel])) {
      activeChannel.value = channel
    }
  }

  const getChannelData = (channelName: string): ChannelData | null => {
    if (!rawData.value) return null
    return rawData.value[channelName] || null
  }

  const getSentimentTotals = (): SentimentTotals => {
    if (!filteredData.value) return { positive: 0, neutral: 0, negative: 0, total: 0 }

    const pie = filteredData.value.pie
    return {
      positive: pie.series[0] || 0,
      neutral: pie.series[1] || 0,
      negative: pie.series[2] || 0,
      total: filteredData.value.total || 0,
    }
  }

  return {
    // State
    rawData,
    activeChannel,
    isLoading,
    error,

    // Computed
    filteredData,
    channelsList,
    totalMentions,

    // Actions
    loadData,
    setActiveChannel,
    getChannelData,
    getSentimentTotals,
  }
})
