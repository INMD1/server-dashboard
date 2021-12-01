<template>
  <div class="row">
    <div class="col-5">
      <div class="p-3">
        <h1 style="text-align: left">CPU</h1>
        <cpustatus :Cpu="cpusage" ></cpustatus>
        <br />
      </div>
    </div>
    <div class="col-5">
      <div class="p-3">
        <h1 style="text-align: left">RAM</h1>
        <canvas class="col" id="ramchart"></canvas>
        <br/>
      </div>
    </div>
  </div>
  <div class="row">
    <h1 style="text-align: left">Network</h1>
    <div class="col-6">
      <canvas id="myChart"></canvas>
    </div>
    <div class="col-6">
      <canvas id="myChart1"></canvas>
    </div>
  </div>
</template>

<script >
import cpustatus from "./chart/CpuD.vue";
import axios from 'axios';
export default {
  name: 'App',
  components: {
    cpustatus
  },
    data() {
    return{
      cpusage: 0
    };
  },
   mounted () {
    const jsondata = await axios.get('http://113.198.229.165:9090/test')
  },
}
</script>
