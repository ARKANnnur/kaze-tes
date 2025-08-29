<template>
  <h3 class="text-lg font-semibold text-emerald-100 p-4">Daily Trends</h3>
  <div class="overflow-x-scroll overflow-y-hidden">
    <div ref="chartContainer" class="w-[200%] h-full"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import ApexCharts from 'apexcharts'
import { useSentimentStore } from '@/stores/sentimentStore'

const sentimentStore = useSentimentStore()
const chartContainer = ref(null)
let chart = null

const chartOptions = computed(() => {
  const data = sentimentStore.rawData
  if (!data) return null

  const baseOptions = {
    chart: {
      type: 'bar',
      height: 320,
      toolbar: { show: false },
      background: 'transparent',
      foreColor: '#A7F3D0',
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['rgba(37, 240, 128, 0.8)', 'rgba(203, 242, 236, 0.8)', 'rgba(233, 25, 25, 0.5)'],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: '#A7F3D0' },
      fontSize: '13px',
      fontWeight: 500,
    },
    grid: {
      borderColor: 'rgba(16, 185, 129, 0.2)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: { height: 320 },
          legend: { fontSize: '12px' },
        },
      },
    ],
  }

  return {
    ...baseOptions,
    series: data.all.histogram.series.map((s) => ({
      name: s.name,
      data: s.data,
    })),
    xaxis: {
      categories: data.all.histogram.categories,
      labels: {
        rotate: -45,
        style: { colors: '#A7F3D0', fontSize: '12px' },
      },
      axisBorder: { color: 'rgba(16, 185, 129, 0.4)' },
      axisTicks: { color: 'rgba(16, 185, 129, 0.4)' },
    },
    yaxis: {
      labels: {
        style: { colors: '#A7F3D0' },
      },
      title: {
        text: 'Mentions',
        style: { color: '#A7F3D0', fontSize: '13px' },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        borderRadius: 2,
        borderRadiusApplication: 'end',
        endingShape: 'rounded',
      },
    },
    dataLabels: { enabled: false },
  }
})

const renderChart = async () => {
  if (!chartOptions.value || !chartContainer.value) return

  if (chart) {
    chart.destroy()
  }

  chart = new ApexCharts(chartContainer.value, chartOptions.value)
  chart.render()
}

watch(
  () => sentimentStore.rawData,
  () => {
    nextTick(() => {
      renderChart()
    })
  },
  { deep: true },
)

onMounted(() => {
  nextTick(() => {
    renderChart()
  })
})
</script>
