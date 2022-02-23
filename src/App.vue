<!--
    추가 개발 해야할것
    1. windows Localstroge json 생성하기(성공) -> url 판독기 만들기
    2. 그걸 이용해서 위에 상단바에서 만든 셀렉트 바에 json 데이터 로드하기
    3. 선택 바에서 선택시 재부팅을 할지 아니면 다른 방법으로 바뀌는지 확인하기

    <json 양식>
    [
      {
      site: "test.com"
      see: false
      },,,,,
      more data
    ]
    이렇게 해야 나중에 관리가 편함
-->
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
        <select v-model="selected" @change="onChange($event)" class="form-select form-select-sm">
          <option selected>{{ this.selected }}</option>
          <option v-for="item in siteapi" :key="item">
            {{ item.site }}
          </option>
        </select>
        <li class="border-top my-3"></li>
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
                  <a @click="ipediton" class="link-dark rounded">server add</a>
                </li>
              </ul>
            </div>
          </li>
          <!--제작자 간단한 설명 첨부 하는 곳-->
          <li class="border-top my-3"></li>
          <p style="font-size: 11px;">Made by: INMD1<br>app verison: 0.1.2</p>
        </ul>
      </div>
      <div class="col-sm-8">
        <!--라우터 넣는 부분 -->
      <router-view :key="$route.fullPath"></router-view>
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
  data() {
    return {
      verison: "none",
      selected: '',
      siteapi: []
    }
  },
  //버튼 활성화 메서드 저장하는 곳
  methods: {
    onChange(event) {
        this.$notify({
            type: "warring",
            title: "서버가 변경됨",
            text:
            event.target.value + "으로 변경되었습니다." +
            "\n\nDate: " +
            new Date(),
          });
        window.localStorage.setItem("url",event.value.event);
        this.$router.go(); // 페이지 새로고침
    },
    //버튼 누를때 나오는 이벤트
    ipediton() {
      this.$swal({
        title: "서버 추가(저장)",
        text: "데시보드에 서버를 추가 할거면 아래에 있는 입력바에 주소를 넣어주세요.",
        icon: "question",
        input: "text",
        inputPlaceholder: "ex) http://0.0.0.0, http://example.com",
        showCloseButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "아직데이터가 입력 안한거 같해요";
          } else {
            this.$swal({
              title: "정말로 저장할건가요?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "YES!",
            }).then((result) => {
              if (result.isConfirmed) {
                //localStorage 추가 함
                //추후 나중에 url 판독하는 코드 추가 예정
                let jsontemp = JSON.parse(window.localStorage.getItem("adress"));
                jsontemp.push({site: value , see: false })
                localStorage.setItem("adress",JSON.stringify(jsontemp));
                this.$swal(
                  "저장완료되었습니다!",
                  "",
                  "success"
                ).then((result) => {
                  //확인하면 페이지를 리로드함
                  if(result.isConfirmed){this.$router.go();}});
              } else {
                this.$swal("취소되었습니다.","아무것도 저장하지 않았서요.","error");
              }
            });
          }
        },
      });
    }
  },
  //페이지 로드되자 마자 하는 것(또는 반복함수 시작)
  async mounted() {
    //시작하자 실행하는 코드
    const ver = await axios.get("https://api.github.com/repos/INMD1/server-dashboard/releases");
    this.verison = ver.data[0].tag_name;
    if(localStorage.getItem('url') != undefined || null){
        this.siteapi = JSON.parse(localStorage.getItem('adress'));
        this.selected = localStorage.getItem("url");
       //데이터를 5초방식으로 데이터 리로드 함
        let check = 0;
        setInterval(async () => {
          try {
            await axios.get(localStorage.getItem("url"));
            if (check == 1) {
              this.$notify({
                type: "success",
                title: "서버가 정상적으로 다시연결됨",
                text: "다시 정상적으로 서버가 연결되었습니다." +
                  "\n\nDate: " +
                  new Date(),
              });
              check = 0;
            }
          } catch (error) {
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
    }else{
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
          }else {
            window.localStorage.setItem("adress", JSON.stringify([{site: value}]));
            this.selected = window.localStorage.setItem("url",value);
            this.$swal("저장완료되었습니다!","", "success"
            ).then((result) => {
              //확인하면 페이지를 리로드함
              if(result.isConfirmed){ this.$router.go();}
            });
          }
        },
      }); 
    }
  },
};
</script>
