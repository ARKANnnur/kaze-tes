<template>
  <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div class="w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-100 mb-2 text-balance">
        Sentiment Analysis Dashboard
      </h1>
      <p className="text-base sm:text-lg text-emerald-200/70 text-pretty">
        Social Media & News Sentiment Monitoring
      </p>
    </div>
    <div
      :class="[
        'rounded-xl border backdrop-blur-md bg-emerald-950/20 border-emerald-500/30 shadow-2xl p-4',
        isFixed ? 'fixed top-5 left-0 z-50 w-full sm:w-auto' : 'relative grow w-full h-full',
      ]"
    >
      <div
        :class="[
          'flex justify-between overflow-x-auto scrollbar-hide',
          isFixed ? 'gap-x-4 w-auto mx-2' : 'gap-x-2',
        ]"
      >
        <!-- All Channels -->
        <div
          @click="setChannel('all')"
          class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition"
          :class="selectedChannel === 'all' ? 'opacity-100' : 'opacity-50'"
        >
          <IconChannel name="all" />
          <span class="text-xs text-emerald-200 mt-1">All</span>
        </div>

        <!-- News -->
        <div
          @click="setChannel('news')"
          class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition"
          :class="selectedChannel === 'news' ? 'opacity-100' : 'opacity-50'"
        >
          <IconChannel name="news" />
          <span class="text-xs text-emerald-200 mt-1">News</span>
        </div>

        <!-- Twitter -->
        <div
          @click="setChannel('twitter')"
          class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition"
          :class="selectedChannel === 'twitter' ? 'opacity-100' : 'opacity-50'"
        >
          <IconChannel name="twitter" />
          <span class="text-xs text-emerald-200 mt-1">Twitter</span>
        </div>

        <!-- Instagram -->
        <div
          @click="setChannel('instagram')"
          class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition"
          :class="selectedChannel === 'instagram' ? 'opacity-100' : 'opacity-50'"
        >
          <IconChannel name="instagram" />
          <span class="text-xs text-emerald-200 mt-1">Instagram</span>
        </div>

        <!-- Youtube -->
        <div
          @click="setChannel('youtube')"
          class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition"
          :class="selectedChannel === 'youtube' ? 'opacity-100' : 'opacity-50'"
        >
          <IconChannel name="youtube" />
          <span class="text-xs text-emerald-200 mt-1">Youtube</span>
        </div>

        <!-- TikTok -->
        <div
          @click="setChannel('tiktok')"
          class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition"
          :class="selectedChannel === 'tiktok' ? 'opacity-100' : 'opacity-50'"
        >
          <IconChannel name="tiktok" />
          <span class="text-xs text-emerald-200 mt-1">TikTok</span>
        </div>

        <!-- Facebook -->
        <div
          @click="setChannel('facebook')"
          class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition"
          :class="selectedChannel === 'facebook' ? 'opacity-100' : 'opacity-50'"
        >
          <IconChannel name="facebook" />
          <span class="text-xs text-emerald-200 mt-1">Facebook</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSentimentStore } from '@/stores/sentimentStore'

import IconChannel from '@/components/icons/IconChannel.vue'

const sentimentStore = useSentimentStore()
const isFixed = ref(false)

// state active channel
const selectedChannel = ref('all')

// handle scroll buat sticky
const handleScroll = () => {
  isFixed.value = window.scrollY > 80
}

// update store kalau ganti channel
const setChannel = (channel) => {
  selectedChannel.value = channel
  sentimentStore.setActiveChannel(channel)
}

// pas mount, sync dari store
onMounted(() => {
  selectedChannel.value = sentimentStore.activeChannel
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
