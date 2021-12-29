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
          <h3>Other Network interface</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">pid</th>
                <th scope="col">Name</th>
                <th scope="col">Usage (%)</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="item in tabledata"  v-bind:key="item.id">
                  <td>{{ item.comment }}</td>
                </tr> -->
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
      time: [0, 0, 0, 0, 0],
      inputMb: [0, 0, 0, 0, 0],
      outputMb: [0, 0, 0, 0, 0],
    };
  },
  mounted() {
    setInterval(async () => {
      let today = new Date();
      let gettime =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const getdata = await axios.get(window.localStorage.getItem("adress"));
      this.tabledata = getdata.data.netstatus;
      console.log(this.tabledata);
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