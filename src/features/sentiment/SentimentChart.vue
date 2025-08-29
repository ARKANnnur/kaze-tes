<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">
      {{ chartTitle }}
    </h3>
    <div ref="chartContainer" class="w-full h-80"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useSentimentStore } from '../../stores/sentimentStore'

const props = defineProps({
  chartType: {
    type: String,
    required: true,
    validator: (value) => ['pie', 'bar'].includes(value),
  },
})

const sentimentStore = useSentimentStore()
const chartContainer = ref(null)
let chart = null

const chartTitle = computed(() => {
  const channelName =
    sentimentStore.activeChannel === 'all'
      ? 'All Channels'
      : sentimentStore.activeChannel.charAt(0).toUpperCase() + sentimentStore.activeChannel.slice(1)
  return `${channelName} - ${props.chartType === 'pie' ? 'Distribution' : 'Comparison'}`
})

const chartOptions = computed(() => {
  const data = sentimentStore.filteredData
  if (!data) return null

  const baseOptions = {
    chart: {
      type: props.chartType === 'pie' ? 'pie' : 'bar',
      height: 320,
      toolbar: {
        show: false,
      },
    },
    colors: ['#3EC764', '#B3B6C6', '#ED3E3E'],
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }

  if (props.chartType === 'pie') {
    return {
      ...baseOptions,
      series: data.pie.series,
      labels: data.pie.categories,
      plotOptions: {
        pie: {
          donut: {
            size: '45%',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return Math.round(val) + '%'
        },
      },
    }
  } else {
    return {
      ...baseOptions,
      series: [
        {
          name: 'Count',
          data: data.bar.series[0].data.map((item) => item.y),
        },
      ],
      xaxis: {
        categories: data.bar.categories,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: 'Number of Mentions',
        },
      },
    }
  }
})

const loadApexCharts = async () => {
  if (window.ApexCharts) {
    return window.ApexCharts
  }

  // Load ApexCharts from CDN
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/apexcharts'
    script.onload = () => resolve(window.ApexCharts)
    document.head.appendChild(script)
  })
}

const renderChart = async () => {
  if (!chartOptions.value || !chartContainer.value) return

  const ApexCharts = await loadApexCharts()

  if (chart) {
    chart.destroy()
  }

  chart = new ApexCharts(chartContainer.value, chartOptions.value)
  chart.render()
}

watch(
  () => sentimentStore.filteredData,
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
