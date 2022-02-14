<template>
  <div class="container-fluid">
    <nav class="navbar navbar-light bg-white">
      <span class="navbar-brand mb-0 h1"></span>
    </nav>
    <div class="row">
      <div class="flex-shrink-0 p-3 bg-white" style="width: 220px">
        <router-link to="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
          <svg class="bi me-2" width="30" height="24">
          </svg>
          <span class="fs-5 fw-semibold">Server-Dashboard</span>
        </router-link>
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
                <li><router-link to="/" class="link-dark rounded">Status</router-link></li>
                <li><router-link  to="/more/cpu" class="link-dark rounded">Cpu</router-link ></li>
                <li>
                  <router-link  to="/more/ram" class="link-dark rounded"
                    >RAM</router-link 
                  >
                </li>
                <li>
                  <router-link to="/more/network" class="link-dark rounded"
                    >Network</router-link
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
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
            >
              option
            </button>
            <div class="collapse" id="dashboard-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a @click="ipediton" class="link-dark rounded">ip_edit</a>
                </li>
              </ul>
            </div>
          </li>
          <!--제작자 간단한 설명 첨부 하는 곳-->
          <li class="border-top my-3"></li>
          <p style="font-size: 11px;">Made by: INMD1</p>
           <p style="font-size: 11px;"> app verison: Beta 0.1.2</p>
        </ul>
      </div>
      <div class="col-sm-8">
        <!--라우터 넣는 부분 -->
      <router-view :key="$route.fullPath"></router-view>      </div>
    </div>
  </div>
  <notifications position="bottom left" />
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      verison: "none"
    }
  },
  //버튼 활성화 메서드 저장하는 곳
  methods: {
    ipediton() {
      this.$swal({
        title: "변경할 주소 또는 ip 넣어주세요.",
        text: "참 앞에 http:// 나 https://를 넣어주세요!",
        icon: "question",
        input: "text",
        inputPlaceholder: "ex) http://0.0.0.0, http://example.com",
        showCloseButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          } else {
            this.$swal({
              title: "정말로 변경할건가요?",
              text: "계속 진행하면 기존에 저장한 데이터를 덮습니다!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "YES!",
            }).then((result) => {
              if (result.isConfirmed) {
                window.localStorage.setItem("adress", value);
                this.$swal(
                  "저장완료되었습니다!",
                  "",
                  "success"
                );
              } else {
                this.$swal(
                  "취소되었습니다.",
                  "아무것도 변경되지 않았습니다.",
                  "error"
                );
              }
            });
          }
        },
      });
    },
    nonono() {
      this.$swal(
        "error!",
        "아직 제작중이에요... 잠시만 기다려주세요!",
        "error"
      );
    },
  },
  //페이지 로드되자 마자 하는 것
  async mounted() {
    const ver = await axios.get("https://api.github.com/repos/INMD1/server-dashboard/releases")
    this.verison = ver.data[0].tag_name;

    //로컬스토리지에 데이터가 있는지 확인
    if (window.localStorage.getItem("adress") == null) {
      this.$swal({
        title: "안녕하세요!",
        text: "처음 오시는거 같해요. 아래에 ip나 도메인을 입력해서 저장해주세요!",
        icon: "info",
        input: "text",
        inputPlaceholder: "ex)0.0.0.0, example.com",
        showCloseButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "아직 데이터가 입력안된거 같해요!";
          } else {
            window.localStorage.setItem("adress", value);
            this.$swal(
              "저장완료되었습니다!",
              "",
              "success"
            );
          }
        },
      });
    }
    if (window.localStorage.getItem("adress") != null) {
      //데이터를 5초방식으로 데이터 리로드 함
      let check = 0;
      setInterval(async () => {
        try {
          await axios.get(window.localStorage.getItem("adress"));
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
              "\n\nDate: " +
              new Date(),
          });
          check = 1;
        }
      }, 5000);
    }
  },
};
</script>
