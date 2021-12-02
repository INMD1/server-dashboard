<template>
<canvas class="col" id="cpuchart"></canvas>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "cpustatus",
  components: {},
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  methods: {
    fillData() {
      const ctx = document.getElementById("cpuchart");
      this.myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Uase", "Free"],
          datasets: [
            {
              label: "reception",
              data: [ this.chartdata[0], this.chartdata[1]],
              backgroundColor: ["rgb(255, 205, 86)", "rgb(255, 99, 132)"],
              borderColor: ["rgba(153, 102, 255, 0.2)"],
              borderWidth: 1,
            },
          ],
        },
      });
    },
    mounted() {
    this.fillData().update();
  },
  },
};
</script>