# server-dashboard

이 프로젝트는 처음에는 라즈베리파이를 이용해서 서버를 관리 할수 있게 제작을 할려다가 여러 기기 및 OS에서 서버를 관리할수 있게 개발을 하였습니다.<br>

##  사용해보기

### 1. 서버에 api 설지하기
먼저 서버에 하드웨어 정보를 앱으로 보낼수 있게 api가 필요합니다.<br>
https://github.com/INMD1/computerapi 이 레포를 서버에 복사를 한다음<br>
`npm i`를 해서 라이브러리 설치를 해주고 `npm start`해주세요.

### 2. 앱에 연동하기
처음에는 창이 뜨면서 주소를 입력해달라 하는데<br>
`http(https)://<ip or domain>/api`를 넣어주세요
그리고 확인을 누루면 끝입니다!


# 개발노트
아직 개발이 안끝났서요! 이 사이트에 가서 지금 이사이트에 어떤 기능이 들어갔는지 확인해주세요!<br>
http://blog.powerinmd.me/categories/#server-dashobard-dev

# 실행화면
<table>
  <tbody>
    <tr>
      <td><img src="https://user-images.githubusercontent.com/87979171/147842629-4c7d9720-920c-480b-9bcd-35bdadd3c168.png" width="60%" height="60%"/></td>
      <td>메인화면</td>
    </tr>
    <tr>
      <td><img src="https://user-images.githubusercontent.com/87979171/147842708-841f86ec-7eda-4df7-9d87-7d0080a8efb9.png" width="60%" height="60%"/>
        <img src="https://user-images.githubusercontent.com/87979171/147842713-f7628419-64e3-4eaf-baf3-3e515ef0eec7.png" width="60%" height="60%"/>
        <img src="https://user-images.githubusercontent.com/87979171/147842719-e19a2ad6-9387-453d-897e-ce79e08ff904.png" width="60%" height="60%"/></td>
      <td>자세히보는 부분</td>
    </tr>
  </tbody>
</table>

#프로젝트 빌드 해보기
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration![147842629-4c7d9720-920c-480b-9bcd-35bdadd3c168](https://user-images.githubusercontent.com/87979171/147842651-75a23332-d9c2-46cf-8db5-3f4939e36b82.png)

See [Configuration Reference](https://cli.vuejs.org/config/).
