<template>
  <canvas class="col" id="ramstatus"></canvas>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "ramstatus",
  components: {},
  props: {
    Ramchart: {
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
      const ctx = document.getElementById("ramstatus");

      const ramconfig = {
        type: "doughnut",
        data: {
          labels: ["Uase", "Free"],
          datasets: [
            {
              label: "reception",
              data: [0, 100],
              backgroundColor: ["rgb(255, 102, 051)", "rgb(051, 204, 051)"],
              borderColor: ["rgba(153, 102, 255, 0.2)"],
              borderWidth: 1,
            },
          ],
        },
      };

      this.ramchart = new Chart(ctx, ramconfig);
      this.json = ramconfig;
    },
    change() {
      const data1 = this.json.data.datasets[0].data;
      data1[0] = this.Ramchart[0];
      data1[1] = this.Ramchart[1];
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
