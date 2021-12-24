<template>
  <canvas class="col" id="cpuclock"></canvas>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "cpuclock",
  components: {},
  props: {
    clock: {
      type: Object,
      default: null,
    },
    clocknum: {
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
      const ctx = document.getElementById("cpuclock");

      const cpuconfig = {
        type: "bar",
        data: {
          labels: this.clocknum,
          datasets: [
            {
              label: "사용량",
              data: this.clock,
              backgroundColor: ["rgb(144, 203, 251)", "rgb(48, 123, 140)"],
              borderColor: ["rgba(153, 102, 255, 0.2)"],
              borderWidth: 1,
            },
          ],
        },
        // options: {
        //   responsive: true,
        //   scales: {
        //     x: {
        //       display: true,
        //       title: {
        //         display: true,
        //         text: "시간(HH:MM:SS)",
        //         font: {
        //           size: 15,
        //           lineHeight: 1.2,
        //         },
        //         padding: { top: 20, left: 0, right: 0, bottom: 0 },
        //       },
        //     },
        //   },
        // },
      };

      this.cpuchart = new Chart(ctx, cpuconfig);
      this.json = cpuconfig;
    },
    change() {
      this.json.data.datasets[0].data = this.clock;
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
