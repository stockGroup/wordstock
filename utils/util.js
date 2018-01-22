const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate =date =>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()-1

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate
}

var utils ={};
//开始时间,结束时间
utils.getStartToday = function () {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  var time = new Date(year, month, day, 0, 0, 0, 0);
  return time;
}

utils.getEndToday = function () {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var time = new Date(year, month, day, 23, 59, 59, 999);
  return time;
}

utils.getStartYesterday = function () {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate() - 1;
  var time = new Date(year, month, day, 0, 0, 0, 0);
  return time;
}

utils.getEndYesterday = function () {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate() - 1;
  var time = new Date(year, month, day, 23, 59, 59, 999);
  return time;
}


utils.getStartMonth = function () {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = new Date(year, month, 1, 0, 0, 0, 0);
  return day;
}
utils.getEndMonth = function () {
  var date = new Date()
  var year = date.getFullYear();
  var monthlastmonth = date.getMonth() + 1;
  var day = new Date(year, monthlastmonth, 0, 23, 59, 59, 999);
  return day;
}

utils.getStartLastMonth = function () {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth() - 1;
  var day = new Date(year, month, 1, 0, 0, 0, 0);
  return day;
}
utils.getEndLastMonth = function () {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = new Date(year, month, 0, 23, 59, 59, 999);
  return day;
}

utils.getStartWeek = function () {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var nowDay = date.getDate();
  var nowDayOfWeek = date.getDay();
  var day = new Date(year, month, nowDay - nowDayOfWeek, 0, 0, 0, 0);
  return day;
}
utils.getEndWeek = function () {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var nowDay = date.getDate();
  var nowDayOfWeek = date.getDay();
  var day = new Date(year, month, nowDay + (7 - nowDayOfWeek), 23, 59, 59, 999);
  return day;
}

function isNullOrEmpty(str) { return str == null || str == undefined || str == "null" || str == "undefined" || str == ""; }
function isNullOrWhiteSpace(str) { return str == null || str == undefined || str == "null" || str == "undefined" || str.trim() == ""; }

function getDateByInt(obj, fomart) {
  var da = obj;
  da = new Date(da);
  if (isNullOrWhiteSpace(fomart)) {
    fomart = "yyyy-MM-dd";
  }
  return da.format(fomart);
}
Date.prototype.format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

  return fmt;
};

function getUrlParam(url, name) {
  ///<summary>获取Url里的参数</summary>
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  if (url) {
    var r = url.substr(url.indexOf('?') + 1).match(reg);
    if (r != null)
      return decodeURI(r[2]);
  }

  return null;
};

module.exports ={
  isNullOrEmpty:isNullOrEmpty,
  isNullOrWhiteSpace: isNullOrWhiteSpace,
  formatDate: formatDate,
  getDateByInt: getDateByInt,
  getUrlParam: getUrlParam
};
