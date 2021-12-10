<template>
  <div class="row">
    <div class="col-5">
      <div class="p-3">
        <h1 style="text-align: left">CPU</h1>
        <cpustatus :cpudata="cpudata" ref="cpustatus" />
      </div>
    </div>
    <div class="col-5">
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
      ref="networkstatus"
    />
  </div>
  <notifications position="bottom left" />
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
      chartOptions: [],
    };
  },
  async mounted() {
    //this.timer = 50;
    let check = 0;
    setInterval(async () => {
      try {
        const getdata = await axios.get("http://113.198.229.165:9090/test");
        
        if (check == 1) {
          this.$notify({
            type: "success",
            title: "서버가 정상적으로 다시연결됨",
            text:
              "다시 정상적으로 서버가 연결되었습니다." +
              "\n\nDate: " +
              new Date(),
          });
          check = 0;
        }

        let num = getdata.data.cpu.usage;
        //cpudata_전처리
        this.cpudata[0] = num;
        this.cpudata[1] = 100 - num;

        // Ramdata_전처리
        let totalMemMb = getdata.data.ram.totalMemMb;
        let usedMemMb = getdata.data.ram.usedMemMb;
        const persent = (usedMemMb / totalMemMb) * 100;

        this.Ramchart[0] = persent;
        this.Ramchart[1] = 100 - persent;

        // network 전처리 메인페이지는 토탈로 표시됨
        let inputMb = getdata.data.netstats.total.inputMb;
        let outputMb = getdata.data.netstats.total.outputMb;
        if (!(count > 6)) {
          this.networkin[count] = inputMb;
          this.networkout[count] = outputMb;
          count++;
        } else if (count > 6) {
          count = 0;
          this.networkin[count] = inputMb;
          this.networkout[count] = outputMb;
          count++;
        }
        this.$refs.cpustatus.outchange();
        this.$refs.networkstatus.outchange();
        this.$refs.ramstatus.outchange();
      } catch (error) {
        console.log("test");
        this.$notify({
          type: "error",
          title: "서버 연결에 문제가 생김",
          text:
            "현재 서버하고 통신이 안됨니다.\n서버의 상태를 점검해 주십시오." +
            "\n\nDate: " + new Date(),
        });
        check = 1;
      }
    }, 5000);
  },
};
</script>
