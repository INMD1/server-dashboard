<template>
  <div class="col-sm-10 gy-5">
    <div class="container-fluid">
      <div class="row">
        <h3>total network graph</h3>
        <totalgraph
          :time="time"
          :inputMb="inputMb"
          :outputMb="outputMb"
          ref="totalgraph"
        />
      </div>
      <div class="row">
        <div class="col-md-12 mt-4">
          <h3>Network interface</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">interface</th>
                <th scope="col">inputBytes</th>
                <th scope="col">outputBytes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tabledata"  v-bind:key="item.id">
                  <td>{{ item.interface}}</td>
                  <td>{{ item.inputBytes }}</td>
                  <td>{{ item.outputBytes }}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import totalgraph from "./see_more_network/totalgraph.vue";
let count = 0;
export default {
  name: "see_ram",
  components: {
    totalgraph,
  },
  data() {
    return {
      tabledata: null,
      time: [0, 0, 0, 0, 0, 0],
      inputMb: [0, 0, 0, 0, 0, 0],
      outputMb: [0, 0, 0, 0, 0, 0],
    };
  },
  mounted() {
    setInterval(async () => {
      //초기작업
      let today = new Date();
      let gettime =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const getdata = await axios.get(window.localStorage.getItem("url"));

      //데이터 넣기
      this.tabledata = getdata.data.netstatus;
      
      //배열 데이터 넣기
      if (!(count >= 6)) {
        this.time[count] = gettime;
        this.inputMb[count] = getdata.data.nettotal.inputMb;
        this.outputMb[count] = getdata.data.nettotal.outputMb;
        count++;
      } else if (count >= 6) {
        count = 0;
        this.time[count] = gettime;
        this.inputMb[count] = getdata.data.nettotal.inputMb;
        this.outputMb[count] = getdata.data.nettotal.outputMb;
        count++;
      }
      this.$refs.totalgraph.outchange();
    }, 5000);
  },
};
</script>