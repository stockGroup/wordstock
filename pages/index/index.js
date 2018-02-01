//index.js
//获取应用实例
var api = require("../../utils/api.js");
const app = getApp();

var loginStatus = true;
Page({
  data: {
    motto: '欢迎使用',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    countDownDay: 0,
    display: 'none'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  goToIndex: function () {

    wx.switchTab({
      url: '../index/queryList',
    })
  },


  onLoad: function () {
    this.getPromission()
  },

  getPromission: function () {
    var that = this
    if (!loginStatus) {
      wx.openSetting({
        success: function (data) {
          if (data) {
            if (data.authSetting["scope.userInfo"] == true) {
              loginStatus = true;
              wx.getUserInfo({
                withCredentials: false,
                success: function (data) {
                  console.info("2成功获取用户返回数据");
                  console.info(data.userInfo);
                },
                fail: function () {
                  console.info("2授权失败返回数据");
                }
              });
            }
          }
        },
        fail: function () {
          console.info("设置失败返回数据");
        }
      });
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              withCredentials: false,
              success: function (res) {
                console.info("1成功获取用户返回数据");
                //console.info(res.userInfo);
                that.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true,
                })
                that.updateUser(res.userInfo)
                that.getUser();

              },
              fail: function () {
                console.info("1授权失败返回数据");
                loginStatus = false;
                // 显示提示弹窗
                wx.showModal({
                  title: '提示',
                  content: '必须授权登陆之后才能操作呢，是否重新授权登录？',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.openSetting({
                        success: function (data) {
                          if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                              loginStatus = true;
                              wx.getUserInfo({
                                withCredentials: false,
                                success: function (res) {
                                  console.info("3成功获取用户返回数据");
                                  console.info(res.userInfo);
                                  that.setData({
                                    userInfo: res.userInfo,
                                    hasUserInfo: true,
                                  })
                                  that.updateUser(res.userInfo)
                                  that.getUser();
                                },
                                fail: function () {
                                  console.info("3授权失败返回数据");
                                }
                              });
                            }
                          }
                        },
                        fail: function () {
                          console.info("设置失败返回数据");
                        }
                      });
                    } else if (res.cancel) {
                      wx.openSetting({
                        success: function (data) {
                          if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                              loginStatus = true;
                              wx.getUserInfo({
                                withCredentials: false,
                                success: function (res) {
                                  console.info("3成功获取用户返回数据");
                                  console.info(res.userInfo);
                                  that.updateUser(res.userInfo)
                                  that.getUser();
                                },
                                fail: function () {
                                  console.info("3授权失败返回数据");
                                }
                              });
                            }
                          }
                        },
                        fail: function () {
                          console.info("设置失败返回数据");
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        },
        fail: function () {
          console.info("登录失败返回数据");
        }
      });
    }
  },





  // //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   var that = this;






  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true,
  //       status:true
  //     })
  //     this.getUser();
  //   } else if (this.data.canIUse) {

  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true,
  //         status: true
  //       })
  //     }

  //     this.getUser();
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true,
  //           status: true
  //         })

  //         this.getUser();
  //       }
  //     })
  //   }

  //   wx.getSetting({
  //     success: function (res) {
  //       console.log(res)
  //       if (res.authSetting['scope.werun']) {

  //         that.data.status = true;
  //       } else {

  //       }
  //     }
  //   })

  // },
  // getUserInfo: function (e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  getUser: function () {
    var that = this;
    var cmd = {};
    cmd.Account = wx.getStorageSync('key');
    api.getUser(cmd, function (res) {
      var result = res.result;
      if (res.code == "200") {
        var RemainDays = result.RemainDays;
        that.setData({
          countDownDay: RemainDays,
          display: ''
        })
        if (res.ts > res.result.EndTime) {

          wx.showModal({
            title: '',
            content: '您的试用期已到，请联系客服',
            showCancel: false
          })
        }

      }
    }, function fail(res) {
      wx.showModal({
        title: '',
        content: res,
      })
    })
  },

  updateUser: function (data) {
    /*上传更新用户信息 */
    var cmd = {};
    cmd.Account = wx.getStorageSync('key');
    cmd.Name = data.nickName;
    cmd.Gender = data.gender;
    cmd.Photo = data.avatarUrl;
    cmd.Province = data.province;

    api.updateUser(cmd, function (res) {
      //console.log(res)
      if (res.code == "200") {

      }
    }, function (fail) {

      wx.showModal({
        title: '提示',
        content: fail,
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    })
  }

})
