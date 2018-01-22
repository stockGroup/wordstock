//app.js
var utils = require("utils/util.js")
var api = require("utils/api.js")

var wxInfo = "";
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var that = this
          var cmd = {};
          cmd.Code = res.code;
          api.getUserInitial(cmd, function (res) {
            if (res.code == "200") {
              var result = res.result;
              that.globalData.accouny = result.User.Account;
              //将account存储缓存
              that.globalData.RemainTime = result.User.EndTime-res.ts;
              
              wx.setStorage({
                key: "key",
                data: result.User.Account
              })
            }
          }, function (res) {

          }
          )
        }
      }
    })

   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wxInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }, fail: function () {
              console.log("app没有授权")
            }
          })
        } else {
         
        }
      }, fail: function () {
        wx.showModal({
          title: '提示',
          content: '必须授权登陆之后才能操作呢，是否重新授权登录？',

        })
      }
    })




  },
  globalData: {
    userInfo: null,
    account:'',
    RemainTime:'',
  },



})