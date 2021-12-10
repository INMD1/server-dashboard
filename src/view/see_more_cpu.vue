<template>
          <div class="col-sm-8 gy-5">
        <div class="container-fluid">
          <div class="row row-cols-sm-2">
            <div class="col-md-3 col-xxl-2">
              <img :src="require(`../image/intel.png`)" style="border-radius: 10%;" width="80" height="80"/>
            </div>
            <div class="col-md-9 col-xxl-10">
              <h4 class="text-center pt-4">Intel(R) Core(TM) i7-7700 CPU </h4>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 mt-4">
             <h3>CPU usage</h3>
              <canvas id="usage"></canvas>
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
                    <th scope="col">Name</th>
                    <th scope="col">pid</th>
                    <th scope="col">Usage (%) </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>gnome</td>
                    <td>3652</td>
                    <td>5%</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>node</td>
                    <td>864</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>node</td>
                    <td>9724</td>
                    <td>3%</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>node</td>
                    <td>864</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>node</td>
                    <td>9724</td>
                    <td>3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
    name: "more_cpu"
}
</script>
