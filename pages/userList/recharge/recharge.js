// pages/userList/recharge/recharge.js
var api = require("../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Days: '',
    Amount: '',
    account: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      account: options.account
    })
  },

  days: function (e) {
    this.setData({
      Days: e.detail.value
    })
  },
  moneys: function (e) {
    this.setData({
      Amount: e.detail.value
    })
  },
  //保存
  recharge: function () {
    this.recharge();
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

  },

  recharge: function () {
    var that = this;
    var cmd = {};
    cmd.Account = that.data.account;
    cmd.Days = that.data.Days;
    cmd.Amount = that.data.Amount;
    api.recharge(cmd, function (res) {

      if (res.code == "200") {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.navigateBack();
        }, 1000)


      }

    }, function fail(fail) {
      wx.showModal({
        title: '',
        content: fail,
      })
    })
  }
})