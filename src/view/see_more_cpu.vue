<template>
  <div class="col-sm-10 gy-5">
    <div class="container-fluid">
      <div class="row row-cols-sm-2">
        <div class="col-md-3 col-xxl-2">
          <div v-if="picture == -1">
              <img :src="require(`../image/intel.png`)" style="border-radius: 10%" width="80" height="80"/>
          </div>
          <div v-else>
              <img :src="require(`../image/amd.png`)" style="border-radius: 10%" width="80" height="80"/>
          </div>
        </div>
        <div class="col-md-9 col-xxl-10">
          <h4 class="text-center pt-4">{{ model }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 mt-4">
          <h3>CPU usage</h3>
          <cpuusage
          :cpudata="cpudata"
          :Datetime="Datetime"
          ref="cpustatus"
          />
        </div>
        <div class="col-xl-6 mt-4">
          <h3>CPU clock(Standard thread)</h3>
          <cpuclock
          :clock="clock"
          :clocknum="clocknum"
          ref="cpuclock"
          />
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
import cpuusage from "./see_more_cpu_chart/cpuusage.vue";
import cpuclock from "./see_more_cpu_chart/cpuclock.vue";
import axios from "axios";
let count = 0;
export default {
  name: "more_cpu",
  components: {
    cpuusage,
    cpuclock
  },
  data() {
    return {
      model: "NULL",
      picture: undefined,
      cpudata: [0, 0, 0, 0, 0, 0],
      Datetime: [0, 0, 0, 0, 0, 0],
      clock: [],
      clocknum: [],
      table: [
        {pid: 0,name: "Null",cpu: 0,},
        {pid: 0,name: "Null",cpu: 0,},
        {pid: 0,name: "Null", cpu: 0,},
        {pid: 0,name: "Null", cpu: 0,},
        {pid: 0,name: "Null", cpu: 0,},
      ],
    };
  },
  async mounted() {
    const getdata = await axios.get(window.localStorage.getItem("adress"));
    this.model = getdata.data.cpu.model;

    //이미지 판독
    this.picture = this.model.indexOf('AMD') && this.model.indexOf('amd');

    //쓰레드 개수 확인
    for (let index = 0; index < getdata.data.cpu.clock.length; index++) {
      this.clocknum[index] = index + "thd";
      this.clock[index] = 0;
    }

    setInterval(async () => {
        const getdata = await axios.get(window.localStorage.getItem("adress"));
        let today = new Date();
        let gettime = (today.getHours()+":"+today.getMinutes()+":"+today.getSeconds());

      this.table = getdata.data.cpu.proccess;
      if (!(count >= 6)) {
        this.cpudata[count] = getdata.data.cpu.usage;
        this.Datetime[count] = gettime;
        count++;
      } else if (count >= 6) {
        count = 0;
        this.cpudata[count] = getdata.data.cpu.usage;
        this.Datetime[count] = gettime;
        count++;
      }

      //cpu 클럭 부분
      for (let index = 0; index < getdata.data.cpu.clock.length; index++) {
        this.clock[index] = getdata.data.cpu.clock[index].clock;
      }
      console.log(this.clock);
      //반복
      this.$refs.cpustatus.outchange();
      this.$refs.cpuclock.outchange();
    }, 5000);
  },
};
</script>
