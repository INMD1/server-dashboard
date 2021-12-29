<template>
  <div class="col-sm-10 gy-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-6 mt-4">
          <h3>Ram usage graph</h3>
          <ramgraph
          :grapharr="grapharr"
          :graphtine="graphtine"
          ref="ramgraph"
          />
        </div>
        <div class="col-xl-6 mt-4">
          <h3>Ram usage info</h3>
          <br>
          <div class="row">
                <h5>Total: {{totalMemMb}}MB</h5>
                <h5>Used: {{usedMemMb}}MB</h5>
                <h5>free: {{freeMemMb}}MB</h5>
                <p>update: {{time}}</p>
          </div>
        </div>
      </div>
      <!-- <div class="row">
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
                <td>{{ this.table[0].cpu.toFixed(3)}}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>{{ this.table[1].pid }}</td>
                <td>{{ this.table[1].name }}</td>
                <td>{{ this.table[1].cpu.toFixed(3)}}</td>
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
      </div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios"
import ramgraph from "./see_more_ram/ramgraph.vue"
let count = 0;
export default {
  name: "see_ram",
  components: {
    ramgraph
  },
  data() {
    return {
      totalMemMb: null,
      usedMemMb: null,
      freeMemMb: null,
      grapharr: [0,0,0,0,0],
      graphtine: [0,0,0,0,0],
      time: null,
      table: [
        { pid: 0, name: "Null", cpu: 0 },
        { pid: 0, name: "Null", cpu: 0 },
        { pid: 0, name: "Null", cpu: 0 },
        { pid: 0, name: "Null", cpu: 0 },
        { pid: 0, name: "Null", cpu: 0 },
      ],
    };
  },
  mounted() {
    setInterval(async () => {
        let today = new Date();
        let gettime = (today.getHours()+":"+today.getMinutes()+":"+today.getSeconds());
        const getdata = await axios.get(window.localStorage.getItem("adress"));
        
        this.totalMemMb = getdata.data.ram.totalMemMb;
        this.usedMemMb = getdata.data.ram.usedMemMb;
        this.freeMemMb = getdata.data.ram.freeMemMb;
        this.time = today;

        if(!(count >= 6)){
          this.grapharr[count] = getdata.data.ram.usedMemMb;
          this.graphtine[count] = gettime;
          count++;
        }else if(count >= 6){
          count = 0;
          this.grapharr[count] = getdata.data.ram.usedMemMb;
          this.graphtine[count] = gettime;
          count++;
        }

        this.$refs.ramgraph.outchange();
        console.log(this.grapharr);
    }, 5000);
  }
};
</script>