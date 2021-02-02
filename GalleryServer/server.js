//웹서버를 구축해 이미지를 다운로드 해갈수 있도록 제공
var http = require("http");
var static = require("serve-static");//정적 자원 요청 전담처리 미들웨어
var express = require("express");
var mysql = require("mysql");//mysql 모듈
var multer = require("multer");//업로드 모듈
var path = require("path");

//우리가 사용중인 http 모듈은 너무 기본 모듈이라, 개발자가 손수 해야함
//심지어 정적자원(html,css,js,image 등)요청을
//일일이 파일로 읽어 응답해야함
//이러한 문제를 해결하기 위해 개발된 모듈중 Express 사용
//웹과 관련된 유용한 기능이 이미 포함되어 있는 모듈
//주의) http 모듈이 필요없는게 아닌, http모듈에 추가해서 사용
//express의 주요특징은, 기능을 미들웨어라는 단위로 제공함.참고로, 미들웨어는 함수다.

var app = express();//익스프레스 객체 생성

//미들웨어를 사용할땐 use()사용
//node.js 자체적 전역변수가 지원되는데 그 중 __dirname

//mysql 접속문자열
let conStr = {
  url:"localhost",
  user:"root",
  password:"1234",
  database:"android"
};

//업로드 관련 설정
var upload = multer({
  storage : multer.diskStorage({
    destination : function(req,file,cb){
      cb(null, __dirname+"/static/images");
    },
    filename : function(req,file,cb){
      cb(null,new Date().valueOf()+path.extname(file.originalname)); //날짜시간+png
    }
  })
});//업로드 객체 생성

app.use(upload.single("photo"));
app.use(static(__dirname+"/static"));
var server = http.createServer(app); //express 서버로 가동

//등록
app.post("/gallery", function(request,response){
  //console.log("전송된 파라미터는",request.body);
  //console.log("전송된 파일은",response);  
  var con = mysql.createConnection(conStr);
  
  var title=request.body.title;
  var filename=request.file.filename;
  
  var sql = "insert into gallery(title,filename) values(?,?)";
  con.query(sql, [title, filename],function(error,results,fields){
    if(error){
      response.writeHead(500,{"Content-Type":"text/html;charset=utf-8"});
      response.end("업로드 실패");
    }else{
      response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
      response.end("<script>alert('업로드성공');location.href='/upload.html';</script>");
    }    
  });
});

//리스트
app.get("/gallery", function(request,response){
  var con = mysql.createConnection(conStr);
  con.query("select * from gallery", function(error,results,fields){
    if(error){
      response.writeHead(500,{"Content-Type":"application/json;charset=utf-8"});
      response.end("{}");
    }else{
      response.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});      
      response.end(JSON.stringify(results));//레코드 결과 자체가 json배열이라, 스트링화 해서 응답
    }
  })
});
//한건

//수정

//삭제

server.listen(7777, function(){
  console.log("Server is running at 7777 port...");
})