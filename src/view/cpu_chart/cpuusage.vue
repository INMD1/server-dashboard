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
    cpudata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      json: [],
    };
  },
  methods: {
    fillData() {
      const ctx = document.getElementById("cpuchart");

      const cpuconfig = {
        type: "line",
        data: {
          labels: ["Uase", "Free"],
          datasets: [
            {
              label: "reception",
              data: [0, 100],
              backgroundColor: ["rgb(144, 203, 251)", "rgb(48, 123, 140)"],
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
      data1[0] = this.cpudata[0];
      data1[1] = this.cpudata[1];
      this.cpuchart.update();
    },
    outchange() {
      this.change();
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>