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
    Datetime: {
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
          labels: [0, 0, 0, 0, 0, 0],
          datasets: [
            {
              label: "사용량",
              data: [0, 100],
              backgroundColor: ["rgb(48, 123, 140)"],
              borderColor: ["rgb(48, 123, 140)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "시간(HH:MM:SS)",
                font: {
                  size: 15,
                  lineHeight: 1.2,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
              },
            },
          },
        },
      };

      this.cpuchart = new Chart(ctx, cpuconfig);
      this.json = cpuconfig;
    },
    change() {
      this.json.data.datasets[0].data = this.cpudata;
      this.json.data.labels = this.Datetime;
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
