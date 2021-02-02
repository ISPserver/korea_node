//사용자 정의 모듈
/*module.exports.getMsg=function(){
  return "ha ha ha";
}*/

//2.객체를 모듈로 정의
var formatter = {
  getCurrency:function(){
    return 5000;
  },
  getLocal:function(){
    return "Korea";
  }
};
module.exports = formatter;