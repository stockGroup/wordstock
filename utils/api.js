var Api = {

  baseUrl: "https://app.wordstock.top/WordStock/TeriminalWebService.svc",
  createUrl: function (method, cmd) {
    var arr = new Array();
    arr.push(this.baseUrl + "/" + method);
    arr.push("?");
    for (var k in cmd) {
      arr.push(k + "=" + cmd[k] + "&");
    }
    var url = arr.join("");
    return url;
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
    $.ajax({
      type: "get",
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
  post: function (relUrl, cmd, success, error, before, complete) {
    $.ajax({
      type: "post",
      url: this.createUrl(relUrl),
      dataType: "json",
      data: JSON.stringify({
        "cmd": cmd
      }),
      contentType: "application/json; charset=utf-8",
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
      error: function (err) {
        if (error) {
          error(err);
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
  }
}

//通过code查询
Api.getShareByCode = function(cmd,success,error,before,complete){

  Api.post("/teriminal/get_share_by_code",cmd,success,error,before,complete);
}
//用户
Api.addUser = function (cmd, success, error, before, complete) {

  Api.get("/wechat_user/add", cmd, success, error, before, complete);
}
Api.getUser = function (cmd, success, error, before, complete) {

  Api.get("/wechat_user/get", cmd, success, error, before, complete);
}