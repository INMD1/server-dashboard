# server-dashboard

이 프로젝트는 처음에는 라즈베리파이를 이용해서 서버를 관리 할수 있게 제작을 할려다가 여러 기기 및 OS에서 서버를 관리할수 있게 개발을 하였습니다.<br>

##  사용해보기

### 1. 서버에 api 설지하기
먼저 서버에 하드웨어 정보를 앱으로 보낼수 있게 api가 필요합니다.<br>
https://github.com/INMD1/computerapi 이 레포를 서버에 복사를 한다음<br>
`npm i`를 해서 라이브러리 설치를 해주고 `npm start`해주세요.

### 2. 앱에 연동하기(베타)
그다음은 콘솔에 앱으로 실행하고 싶으면`npm run electron:serve`를 웹으로 실행하고 싶으면
`npm run serve`로 해주세요.

(앱같은 경우에는 기본적으로 풀스크린 뜨게 되어 있기때문에 background.js에서 안하고 싶으면 fullscreen: true를 제거 해주세요)

#### 🙋‍♂️ Q:웹호스팅을 했을때 다른 컴퓨터에서 계속 새로 입력해달라고 떠요
  제가 만든앱은 window.localStorag을 이용해서 저장하기 때문에 계속 뜰수 있서요.<br>
  그래서 서버에는 저장을 하지 않기 때문에 보안을 증가시킬수 있죠 그래서 나중에는 깃헙 페이지를 통해서 
  호스팅을 할수있게 만들 예정이에요
  
# 개발노트
아직 개발이 안끝났서요! 이 사이트에 가서 지금 이사이트에 어떤 기능이 들어갔는지 확인해주세요!<br>
http://blog.powerinmd.com/categories/#server-dashobard-dev

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



### Customize configuration!
See [Configuration Reference](https://cli.vuejs.org/config/).
