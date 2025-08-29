<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isFixed = ref(false)

const handleScroll = () => {
  if (window.scrollY > 80) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

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
        'rounded-xl border backdrop-blur-md bg-emerald-950/20 border-emerald-500/30 shadow-2xl  p-4',
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
        <div class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke-width="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
          <span class="text-xs text-emerald-200 mt-1">All</span>
        </div>

        <!-- News -->
        <div class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition">
          <svg
            class="w-8 h-8 text-blue-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="text-xs text-emerald-200 mt-1">News</span>
        </div>

        <!-- Twitter -->
        <div class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-sky-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 
        10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 
        0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 
        0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            />
          </svg>
          <span class="text-xs text-emerald-200 mt-1">Twitter</span>
        </div>

        <!-- Instagram -->
        <div class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition">
          <svg
            class="w-8 h-8 text-pink-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="text-xs text-emerald-200 mt-1">Instagram</span>
        </div>

        <!-- Youtube -->
        <div class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition">
          <svg
            class="w-8 h-8 text-red-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="text-xs text-emerald-200 mt-1">Youtube</span>
        </div>

        <!-- TikTok -->
        <div class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition">
          <svg
            class="w-8 h-8 text-black"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>tiktok</title>
              <path
                d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"
              ></path>
            </g>
          </svg>
          <span class="text-xs text-emerald-200 mt-1">TikTok</span>
        </div>

        <!-- Facebook -->
        <div class="flex flex-col items-center shrink-0 cursor-pointer hover:opacity-80 transition">
          <svg
            class="w-8 h-8 text-blue-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="text-xs text-emerald-200 mt-1">Facebook</span>
        </div>
      </div>
    </div>
  </div>
</template>
