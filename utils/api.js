var Api = {

  baseUrl: "https://app.wordstock.top/WordStock/TeriminalWebService.svc",
  createUrl: function (method) {
    return this.baseUrl + "/" + method;
  },
  createGetUrl: function (method, cmd) {
    var arr = new Array();
    arr.push(this.baseUrl + "/" + method);
    arr.push("?");
    for (var k in cmd) {
      arr.push(k + "=" + cmd[k] + "&");
    }
    var url = arr.join("");
    return url;
  },
  get: function (relUrl, cmd, success, error, before, complete) {
    wx.request({
      method: "get",
      url: this.createGetUrl(relUrl, cmd),
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      success: function (data) {
        if (data.code == 200) {
          if (success) {
            success(data);
          }
        } else {
          if (error) {
            error(data.code + "-" + data.desc);
          }
        }
      },
      error: function () {
        if (error) {
          error();
        }
      },
      beforeSend: function (httpRequest) {
        if (before) {
          before();
        }
      },
      complete: function (XMLHttpRequest, textStatus) {
        if (complete) {
          complete();
        }
      }
    });
  },
  post: function (relUrl, cmd, success, fail) {
    wx.request({
      method: "POST",
      url: this.createUrl(relUrl),
      data:{cmd},
      header: {
               'content-type': 'application/json' // 默认值
         },
      success: function (res) {
        if (res.data.code == 200) {
          if (success) {
            success(res.data);
          }
        } else {
          if (res.data) {
            
            fail(res.data.code + "-" + res.data.desc);
          }
        }
      },
      fail: function (res) {
        if (res) {
          fail(res.data);
        }
        
      }  
      // success: function (res) {
      //   if (res.code == 200) {
      //     if (success) {
      //       success(res);
      //     }
      //   } else {
      //     if (error) {
      //       error(res.code + "-" + res.desc);
      //     }
      //   }
      // },
      // fail: function (res) {
      //   if (res) {
      //     error(res);
      //   }
      // }
    });
  }
}

//通过session_key获取信息
function getUserInitial(cmd,succss,fail){
  Api.post('teriminal/get_session_by_code',cmd,succss,fail);
}

//通过code查询
function getShareByCode(cmd,success,fail){

  Api.post("teriminal/get_share_by_code",cmd,success,fail);
}
//用户
function updateUser(cmd, success, fail) {

  Api.post("teriminal/update_user_info", cmd, success, fail);
}
function getUser(cmd, success, fail, before, complete) {

  Api.get("/teriminal/get_user_by_account", cmd, success, fail, before, complete);
}


module.exports ={
  getUserInitial: getUserInitial,
  getShareByCode: getShareByCode,
  getUser: getUser,
  updateUser: updateUser
}