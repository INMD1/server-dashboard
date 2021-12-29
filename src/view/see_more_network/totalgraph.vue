<template>
  <canvas class="col" id="network"></canvas>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "totalgraph",
  components: {},
  props: {
    time: {
      type: Object,
      default: null,
    },
    inputMb: {
        type: Object,
        default: null,
    },
    outputMb: {
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
      const ctx = document.getElementById("network");

      const netconfig = {
        type: "line",
        data: {
          labels: this.time,
          datasets: [
            {
              label: "inputMb",
              data: this.inputMb,
              backgroundColor: ["rgb(44, 76, 44)"],
              borderWidth: 1,
            },
            {
              label: "outputMb",
              data: this.outputMb,
              backgroundColor: ["rgb(131, 180, 75)"],
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

      this.netchart = new Chart(ctx, netconfig);
      this.json = netconfig;
    },
    change() {
      this.json.data.datasets[0].data = this.inputMb;
      this.json.data.datasets[1].data = this.outputMb;
      this.netchart.update();
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
