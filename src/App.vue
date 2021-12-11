<template>
  <div class="container-fluid">
    <nav class="navbar navbar-light bg-white">
      <span class="navbar-brand mb-0 h1"></span>
    </nav>
    <div class="row">
      <div class="flex-shrink-0 p-3 bg-white" style="width: 220px">
        <a
          href="/"
          class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
        >
          <svg class="bi me-2" width="30" height="24">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-5 fw-semibold">Server-Dashboard</span>
        </a>
        <ul class="list-unstyled ps-0">
          <li class="mb-1">
            <button
              class="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="true"
            >
              Dashboard
            </button>
            <div class="collapse show" id="home-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <div v-html="htmlReturningFn"></div>
                <li><a href="/" class="link-dark rounded">Status</a></li>
                <li><a href="/more/cpu" class="link-dark rounded">Cpu</a></li>
                <li>
                  <a href="./Dashboard/ram.html" class="link-dark rounded"
                    >RAM</a
                  >
                </li>
                <li>
                  <a href="./Dashboard/network.html" class="link-dark rounded"
                    >Network</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li class="mb-1">
            <button
              class="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
            >
              Power
            </button>
            <div class="collapse" id="dashboard-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a href="./power/onoff.html" class="link-dark rounded"
                    >on/off</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button
              class="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#account-collapse"
              aria-expanded="false"
            >
              None
            </button>
            <div class="collapse" id="account-collapse">
              <ul
                class="btn-toggle-nav list-unstyled fw-normal pb-1 small"
              ></ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-sm-8">
        <!--라우터 넣는 부분 -->
        <router-view />
      </div>
    </div>
  </div>
  <notifications position="bottom left" />
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},
    async mounted() {
    //this.timer = 50;
    let check = 0;
    setInterval(async () => {
      try {
        await axios.get("http://113.198.229.165:9090/test");
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

<style></style>
