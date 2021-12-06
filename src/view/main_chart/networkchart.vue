<template>
  <h1 style="text-align: left">Network</h1>
  <div class="col-6">
    <h4>보냄</h4>
    <canvas class="col" id="network"></canvas>
  </div>
  <div class="col-6">
    <h4>받음</h4>
    <canvas id="networkget"></canvas>
  </div>
</template>
<script>
import { Chart } from "chart.js";
export default {
  name: "networkchart",
  components: {},
  props: {
    networkin: {
      type: Object,
      default: null,
    },
    networkout: {
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
      inputjson: [],
      outputjson: []
    };
  },
  methods: {
    input() {
      const ctx = document.getElementById("network");
      const networkconfig = {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6"],
          datasets: [
            {
              label: "input",
              data: [0, 0, 0, 0, 0, 0],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
      };

      this.inputchart = new Chart(ctx, networkconfig);
      this.inputjson = networkconfig;
    },

    output(){
      const ctx = document.getElementById("networkget");
      const networkgetconfig = {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6"],
          datasets: [
            {
              label: "output",
              data: [0, 0, 0, 0, 0, 0],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
      };

      this.outputchart = new Chart(ctx, networkgetconfig);
      this.outputjson = networkgetconfig;
    },
    change() {
        this.inputjson.data.datasets[0].data = this.networkin;
        this.inputchart.update();

        this.outputjson.data.datasets[0].data = this.networkout;
        this.outputchart.update();
        console.log(this.networkout);
    },
    outchange() {
      this.change();
    },
  },
  mounted() {
    this.input();
    this.output();
  },
};
</script>
