<script setup>
import { onMounted } from 'vue'
import SentimentTable from '@/features/sentiment/SentimentTable.vue'
import SentimentChart from '@/features/sentiment/SentimentChart.vue'
import FilterDropdown from '@/features/sentiment/FilterDropdown.vue'
import { useSentimentStore } from '@/stores/sentimentStore'
import Header from '@/components/ui/header.vue'

const sentimentStore = useSentimentStore()

onMounted(() => {
  sentimentStore.loadData()
})
</script>

<template>
  <div
    className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-slate-950 p-4 sm:p-6"
  >
    <div className="">
      <Header />
      <div className="grid grid-cols-1 min-h-[150dvh] sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          className="sm:col-span-2 lg:col-span-2 xl:col-span-2 rounded-xl border backdrop-blur-md bg-emerald-950/20 border-emerald-500/30 shadow-2xl  group p-6"
        >
          <SentimentTable />
        </div>

        <div
          className="rounded-xl border backdrop-blur-md bg-slate-950/20 border-slate-500/30 shadow-2xl  group p-6"
        >
          <div className="text-center pb-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <span className="text-lg sm:text-xl">🥦</span>
            </div>
            <h3 className="text-slate-100 text-lg sm:text-xl font-semibold">Fresh Broccoli</h3>
            <p className="text-slate-200/70 text-sm">Organic crown broccoli</p>
          </div>
          <div className="space-y-3">
            <div className="text-center p-3 rounded-lg bg-slate-900/40">
              <div className="text-xl font-bold text-slate-100">$3.99</div>
              <div className="text-sm text-slate-300/70">per bunch</div>
            </div>
            <div className="flex justify-center">
              <span
                className="px-2 py-1 rounded-md bg-slate-900/40 text-slate-100 border border-slate-500/40 text-xs"
              >
                Organic
              </span>
            </div>
            <button
              className="w-full py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div
          className="rounded-xl border backdrop-blur-md bg-gray-950/20 border-gray-500/30 shadow-2xl  group p-6"
        >
          <div className="text-center pb-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <span className="text-lg sm:text-xl">🍳</span>
            </div>
            <h3 className="text-gray-100 text-lg sm:text-xl font-semibold">Tamago</h3>
            <p className="text-gray-200/70 text-sm">Japanese sweet egg omelet</p>
          </div>
          <div className="space-y-3">
            <div className="text-center p-3 rounded-lg bg-gray-900/40">
              <div className="text-xl font-bold text-gray-100">$8.50</div>
              <div className="text-sm text-gray-300/70">per piece</div>
            </div>
            <div className="flex justify-center">
              <span
                className="px-2 py-1 rounded-md bg-gray-900/40 text-gray-100 border border-gray-500/40 text-xs"
              >
                Traditional
              </span>
            </div>
            <button
              className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div
          className="sm:col-span-2 lg:col-span-1 rounded-xl border backdrop-blur-md bg-emerald-950/20 border-emerald-500/30 shadow-2xl  group p-6"
        >
          <div className="text-center pb-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-red-400 to-pink-400 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <span className="text-lg sm:text-xl">🥩</span>
            </div>
            <h3 className="text-emerald-100 text-lg sm:text-xl font-semibold">Premium Pork</h3>
            <p className="text-emerald-200/70 text-sm">Tender pork tenderloin cuts</p>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-emerald-900/40">
                <div className="text-lg font-bold text-emerald-100">$12</div>
                <div className="text-xs text-emerald-300/70">per lb</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-emerald-900/40">
                <div className="text-lg font-bold text-emerald-100">★ 4.7</div>
                <div className="text-xs text-emerald-300/70">rating</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <span
                className="px-2 py-1 rounded-md bg-emerald-900/40 text-emerald-100 border border-emerald-500/40 text-xs"
              >
                Tender
              </span>
              <span
                className="px-2 py-1 rounded-md bg-emerald-900/40 text-emerald-100 border border-emerald-500/40 text-xs"
              >
                Lean
              </span>
            </div>
            <button
              className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div
          className="rounded-xl border backdrop-blur-md bg-slate-950/20 border-slate-500/30 shadow-2xl  group p-6"
        >
          <div className="text-center pb-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-green-400 to-lime-400 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <span className="text-lg sm:text-xl">🫛</span>
            </div>
            <h3 className="text-slate-100 text-lg sm:text-xl font-semibold">Edamame</h3>
            <p className="text-slate-200/70 text-sm">Fresh steamed soybeans</p>
          </div>
          <div className="space-y-3">
            <div className="text-center p-3 rounded-lg bg-slate-900/40">
              <div className="text-xl font-bold text-slate-100">$4.25</div>
              <div className="text-sm text-slate-300/70">per bowl</div>
            </div>
            <div className="flex justify-center gap-2">
              <span
                className="px-2 py-1 rounded-md bg-slate-900/40 text-slate-100 border border-slate-500/40 text-xs"
              >
                Protein
              </span>
              <span
                className="px-2 py-1 rounded-md bg-slate-900/40 text-slate-100 border border-slate-500/40 text-xs"
              >
                Healthy
              </span>
            </div>
            <button
              className="w-full py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
