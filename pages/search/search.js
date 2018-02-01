// pages/search/search.js
var api = require("../../utils/api.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryurl: '/pages/index/queryList',
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击跳转
  check: function (e) {

    app.searchKey.key = e.currentTarget.id;
    wx.switchTab({
      url: this.data.queryurl,
    })
  },

  //input实时查询
  code: function (e) {
    var that = this;
    var key = e.detail.value;
    if (key.length > 0) {
      var cmd = {};
      cmd.Account = wx.getStorageSync('key');
      cmd.Key = key;
      cmd.data = new Date().getTime();
      wx.showLoading({
        title: '',
      })
      api.loadStokeList(cmd, function (res) {
        if (res.code == "200") {
          if (res.result.length == 0) {
            wx.showToast({
              title: '暂无记录',
            })
            setTimeout(function () {
              wx.hideToast()
            }, 3000)
          }
          wx.hideLoading();
          var list = res.result;
          that.setData({
            list: list
          })
        }

      }, function fail(res) {
        wx.hideLoading();
        wx.showModal({
          title: '',
          content: res,
        })
      })
    } else if (key.length == 0) {
      that.setData({
        list: ''
      })
    }

  },

  //添加到我的自选股
  addMyStock: function () {
    console.log(123);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})