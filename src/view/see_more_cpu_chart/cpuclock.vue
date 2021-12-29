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
              data: this.clock,
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
