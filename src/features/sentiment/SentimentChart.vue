<template>
  <h3 class="text-lg font-semibold text-emerald-100 p-6">
    {{ chartTitle }}
  </h3>
  <div ref="chartContainer" class="w-full h-80"></div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import ApexCharts from 'apexcharts'
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
      toolbar: { show: false },
      background: 'transparent',
      foreColor: '#A7F3D0', // emerald-200 teks
      fontFamily: 'Inter, sans-serif',
    },
    colors: [
      'rgba(37, 240, 128, 0.8)', // Aqua glass
      'rgba(203, 242, 236, 0.8)', // Sky glass
      'rgba(233, 25, 25, 0.5)', // Pink glass
    ],
    legend: {
      position: 'bottom',
      labels: { colors: '#A7F3D0' },
      fontSize: '13px',
      fontWeight: 500,
    },
    grid: {
      borderColor: 'rgba(16, 185, 129, 0.25)',
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
          chart: { height: 260 },
          legend: { fontSize: '12px' },
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
            size: '60%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14px',
                color: '#A7F3D0',
              },
              value: {
                show: true,
                fontSize: '18px',
                fontWeight: 600,
                color: '#fff',
              },
              total: {
                show: true,
                label: 'Total',
                color: '#A7F3D0',
                fontSize: '13px',
              },
            },
          },
        },
      },
      stroke: {
        width: 2,
        colors: '#00231F',
      },
      dataLabels: {
        enabled: true,
        style: { colors: ['#F9FAFB'] }, // neutral-50
        formatter: (val) => Math.round(val) + '%',
      },
    }
  } else {
    return {
      ...baseOptions,
      series: [
        {
          name: 'Mentions',
          data: data.bar.series[0].data.map((item) => item.y),
        },
      ],
      xaxis: {
        categories: data.bar.categories,
        labels: {
          style: { colors: '#A7F3D0' },
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
          columnWidth: '55%',
          borderRadius: 8,
          endingShape: 'rounded',
          distributed: true,
        },
      },
      dataLabels: { enabled: false },
    }
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
