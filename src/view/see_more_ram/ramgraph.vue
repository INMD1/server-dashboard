<template>
  <canvas class="col" id="ramgraph"></canvas>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "ramgraph",
  components: {},
  props: {
    grapharr: {
      type: Object,
      default: null,
    },
    graphtine: {
        type: Object,
        default: null,
    }
  },
  data() {
    return {
      json: [],
    };
  },
  methods: {
    fillData() {
      const ctx = document.getElementById("ramgraph");

      const ramconfig = {
        type: "bar",
        data: {
          labels: this.graphtine,
          datasets: [
            {
              label: "사용량",
              data: this.grapharr,
              backgroundColor: ["rgb(44, 76, 44)", "rgb(131, 180, 75)"],
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

      this.ramchart = new Chart(ctx, ramconfig);
      this.json = ramconfig;
    },
    change() {
      this.json.data.datasets[0].data = this.grapharr;
      this.ramchart.update();
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
