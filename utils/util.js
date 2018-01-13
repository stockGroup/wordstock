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
  const day = date.getDate()

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

module.exports ={
  isNullOrEmpty:isNullOrEmpty,
  isNullOrWhiteSpace: isNullOrWhiteSpace,
  formatDate: formatDate
};
