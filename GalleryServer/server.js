//웹서버를 구축해 이미지를 다운로드 해갈수 있도록 제공
var http = require("http");
var static = require("serve-static");//정적 자원 요청 전담처리 미들웨어
//우리가 사용중인 http 모듈은 너무 기본 모듈이라, 개발자가 손수 해야함
//심지어 정적자원(html,css,js,image 등)요청을
//일일이 파일로 읽어 응답해야함
//이러한 문제를 해결하기 위해 개발된 모듈중 Express 사용
//웹과 관련된 유용한 기능이 이미 포함되어 있는 모듈
//주의) http 모듈이 필요없는게 아닌, http모듈에 추가해서 사용
//express의 주요특징은, 기능을 미들웨어라는 단위로 제공함.참고로, 미들웨어는 함수다.
var express = require("express");

var app = express();//익스프레스 객체 생성

//미들웨어를 사용할땐 use()사용
//node.js 자체적 전역변수가 지원되는데 그 중 __dirname
app.use(static(__dirname+"/static"));


var server = http.createServer(app); //express 서버로 가동


server.listen(7777, function(){
  console.log("Server is running at 7777 port...");
})