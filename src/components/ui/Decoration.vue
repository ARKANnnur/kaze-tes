<template>
  <section class="overflow-hidden w-full space-y-6">
    <p class="text-4xl font-black uppercase tracking-widest text-emerald-200 text-center">Social Media & News Sentiment Monitoring</p>
    <div class="flex whitespace-nowrap animate-loopX">
      <div v-for="i in 2" :key="i" class="flex items-center gap-x-10 text-emerald-200">
        <p v-for="j in 6" :key="j" class="text-2xl font-black uppercase tracking-widest">
          Sentiment Analysis
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes loopX {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-loopX {
  animation: loopX 20s linear infinite;
  will-change: transform;
}
</style>
