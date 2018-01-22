var Api = {

  baseUrl: "https://wordstock.top/TeriminalWebService.svc",
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
      method: "GET",
      url: this.createGetUrl(relUrl, cmd),
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

            fail(res.data.desc);
          }
        }
      },
      fail: function (res) {
        console.log(res)
        if (res) {
          fail(res);
        }

      }

    });
  },
  post: function (relUrl, cmd, success, fail) {
    wx.request({
      method: "POST",
      url: this.createUrl(relUrl),
      data: { cmd },
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

            fail(res.data.desc);
          }
        }
      },
      fail: function (res) {
        console.log(res);
        if (res) {
          fail(res);
        }

      }

    });
  }
}

//通过session_key获取信息
function getUserInitial(cmd, succss, fail) {
  Api.post('teriminal/get_session_by_code', cmd, succss, fail);
}

//通过code查询
function getShareByCode(cmd, success, fail) {

  Api.post("teriminal/get_share_by_code", cmd, success, fail);
}
//用户
function updateUser(cmd, success, fail) {

  Api.post("teriminal/update_user_info", cmd, success, fail);
}
function getUser(cmd, success, fail) {

  Api.get("/teriminal/get_user_by_account", cmd, success, fail);
}

function getUserList(cmd, success, fail) {
  Api.post("/teriminal/get_user_list", cmd, success, fail);
}

//续时
function recharge(cmd, success, fail) {
  Api.post("/teriminal/recharge", cmd, success, fail);
}

module.exports = {
  getUserInitial: getUserInitial,
  getShareByCode: getShareByCode,
  getUser: getUser,
  updateUser: updateUser,
  getUserList: getUserList,
  recharge: recharge
}