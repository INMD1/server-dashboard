<template>
  <div class="col-sm-10 gy-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-10 mt-4">
          <h3>Ram usage graph</h3>
          <ramgraph
          :grapharr="grapharr"
          :graphtine="graphtine"
          ref="ramgraph"
          />
        </div>
        <div class="col-xl-10 mt-4">
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
    };
  },
  mounted() {
    setInterval(async () => {
        //초기작업
        let today = new Date();
        let gettime = (today.getHours()+":"+today.getMinutes()+":"+today.getSeconds());
        const getdata = await axios.get(window.localStorage.getItem("adress"));
        
        //데이터 넣기
        this.totalMemMb = getdata.data.ram.totalMemMb;
        this.usedMemMb = getdata.data.ram.usedMemMb;
        this.freeMemMb = getdata.data.ram.freeMemMb;
        this.time = today;
        
        //배열 데이터 넣기
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