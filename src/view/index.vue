<template>
  <div class="py-5 h-100 align-items-center text-center">
    <div class="row">
      <div class="col-6">
        <div class="p-3">
          <h1 style="text-align: left">CPU</h1>
          <cpustatus :cpudata="cpudata" ref="cpustatus" />
        </div>
      </div>
      <div class="col-6">
        <div class="p-3">
          <h1 style="text-align: left">RAM</h1>
          <ramstatus :Ramchart="Ramchart" ref="ramstatus" />
          <br />
        </div>
      </div>
    </div>
    <div class="row">
      <networkstatus
        :networkin="networkin"
        :networkout="networkout"
        :Datetime="Datetime"
        ref="networkstatus"
      />
    </div>
  </div>
  <br />
  <br />
  <br />
</template>

<script>
import cpustatus from "./main_chart/CpuD.vue";
import ramstatus from "./main_chart/Ramchart.vue";
import networkstatus from "./main_chart/networkchart.vue";

let count = 0;
import axios from "axios";

export default {
  name: "App",
  components: {
    cpustatus,
    ramstatus,
    networkstatus,
  },
  data() {
    return {
      cpudata: [],
      Ramchart: [],
      networkin: [0, 0, 0, 0, 0, 0],
      networkout: [0, 0, 0, 0, 0, 0],
      Datetime: [0, 0, 0, 0, 0, 0],
      chartOptions: [],
    };
  },
  async mounted() {
    //this.timer = 50;
    setInterval(async () => {
      try {
        //시간
        let today = new Date();
        let gettime =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const getdata = await axios.get(window.localStorage.getItem("url"));

        let num = getdata.data.cpu.usage;

        //cpudata_전처리
        this.cpudata[0] = num;
        this.cpudata[1] = 100 - num;
        // Ramdata_전처리

        this.Ramchart[0] = getdata.data.ram.usedMemPercentage;
        this.Ramchart[1] = getdata.data.ram.freeMemPercentage;

        // network 전처리 메인페이지는 토탈로 표시됨
        let inputMb = getdata.data.nettotal.inputMb;
        let outputMb = getdata.data.nettotal.outputMb;

        if (!(count >= 6)) {
          this.Datetime[count] = gettime;
          this.networkin[count] = inputMb;
          this.networkout[count] = outputMb;
          count++;
        } else if (count >= 6) {
          count = 0;
          this.Datetime[count] = gettime;
          this.networkin[count] = inputMb;
          this.networkout[count] = outputMb;
          count++;
        }
        this.$refs.cpustatus.outchange();
        this.$refs.networkstatus.outchange();
        this.$refs.ramstatus.outchange();
      } catch (error) {
        console.log(error);
      }
    }, 5000);
  },
};
</script>
