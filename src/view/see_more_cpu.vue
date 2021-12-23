<template>
  <div class="col-sm-8 gy-5">
    <div class="container-fluid">
      <div class="row row-cols-sm-2">
        <div class="col-md-3 col-xxl-2">
          <img :src="require(`../image/intel.png`)" style="border-radius: 10%" width="80" height="80"/>
        </div>
        <div class="col-md-9 col-xxl-10">
          <h4 class="text-center pt-4">Intel(R) Core(TM) i7-7700 CPU</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 mt-4">
          <h3>CPU usage</h3>
          <cpuusage/>
        </div>
        <div class="col-xl-6 mt-4">
          <h3>CPU clock</h3>
          <canvas id="clock"></canvas>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mt-4">
          <h3>Best top5 process</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">pid</th>
                <th scope="col">Name</th>
                <th scope="col">Usage (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{{ this.table[0].pid }}</td>
                <td>{{ this.table[0].name }}</td>
                <td>{{ this.table[0].cpu.toFixed(3) }}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>{{ this.table[1].pid }}</td>
                <td>{{ this.table[1].name }}</td>
                <td>{{ this.table[1].cpu.toFixed(3) }}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>{{ this.table[2].pid }}</td>
                <td>{{ this.table[2].name }}</td>
                <td>{{ this.table[2].cpu.toFixed(3) }}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>{{ this.table[3].pid }}</td>
                <td>{{ this.table[3].name }}</td>
                <td>{{ this.table[3].cpu.toFixed(3) }}</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>{{ this.table[4].pid }}</td>
                <td>{{ this.table[4].name }}</td>
                <td>{{ this.table[4].cpu.toFixed(3) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cpuusage from "./cpu_chart/cpuusage.vue";
import axios from "axios";
let count = 0;
export default {
  name: "more_cpu",
  components: {
    cpuusage
  },
  data() {
    return {
      cpudata: [0, 0, 0, 0, 0, 0],
      table: [
        {pid: 0,name: "Null",cpu: 0,},
        {pid: 0,name: "Null",cpu: 0,},
        {pid: 0,name: "Null", cpu: 0,},
        {pid: 0,name: "Null", cpu: 0,},
        {pid: 0,name: "Null", cpu: 8,},
      ],
    };
  },
  mounted() {
    setInterval(async () => {
      const getdata = await axios.get("http://113.198.229.165:9090/test");
      this.table = getdata.data.cpu.proccess;
      if (!(count >= 5)) {
        this.cpudata[count] = getdata.data.cpu.usage;
        count++;
      } else if (count >= 5) {
        count = 0;
        this.cpudata[count] = getdata.data.cpu.usage;
        count++;
      }
      console.log(this.cpudata);
    }, 5000);
  },
};
</script>
