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
      default: null,
    },
    timer: {
      type: Number,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  data() {
      return {
        json : []
      }
  },
  methods: {
    fillData() {
      const ctx = document.getElementById("cpuchart");

      const cpuconfig = {
        type: "doughnut",
        data: {
          labels: ["Uase", "Free"],
          datasets: [
            {
              label: "reception",
              data: [0, 100],
              backgroundColor: ["rgb(255, 205, 86)", "rgb(255, 99, 132)"],
              borderColor: ["rgba(153, 102, 255, 0.2)"],
              borderWidth: 1,
            },
          ],
        },
      };

      this.cpuchart = new Chart(ctx, cpuconfig);
      this.json = cpuconfig;
    },
    change() {
      const data1 = this.json.data.datasets[0].data;
      data1[0] = this.chartdata[0];
      data1[1] = this.chartdata[1];
      this.cpuchart.update();
      console.log(this.timer);
    },
    outchange(){
      this.change();
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>
