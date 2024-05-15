<template>
  <div class="container mt-5">
    <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale } from "chart.js";
ChartJS.register(ArcElement, Tooltip, CategoryScale);
export default {
  name: "PieChart",
  components: { Pie },
  props: {
    label: {
      type: Array,
    },
    valueData: {
      type: Array,
    },
  },
  data() {
    return {
      chartData: {
        labels: this.label,
        datasets: [
          {
            backgroundColor: ["#ffd965", "#81caff", "#86e0a3", "#AF19AA"],
            data: this.valueData,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>
