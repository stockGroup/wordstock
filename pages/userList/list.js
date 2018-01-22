// pages/userList/list.js
var api = require("../../utils/api.js");
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Key: '',
    list: {},
    Count: 20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getUserList()

  },
  key: function (e) {
    this.setData({
      Key: e.detail.value
    })
  },

  keyEvent: function (e) {
    this.setData({
      Key: e.detail.value
    })

    this.getUserList();

  },

  loadList: function () {
    this.getUserList();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var Count = that.data.Count + 20;
    that.setData({
      Count: Count,
    })
    console.log(that.data.Count)
    if (Count <= that.data.Count) {
      this.getUserList()

    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作 页面下拉刷新
   */
  onPullDownRefresh: function () {
   // wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getUserList();
    wx.stopPullDownRefresh();
    //模拟加载
    // setTimeout(function () {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    
    // }, 1500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserList: function () {
    wx.showToast({
      title: '',
      icon: 'loading'
    })
    var that = this
    var cmd = {};
    cmd.Count = that.data.Count;
    cmd.Key = that.data.Key;
    cmd.Sort="EndTime";
    api.getUserList(cmd, function (res) {
      wx.hideToast()
      wx.hideNavigationBarLoading() //完成停止加载
      var list = res.result.Data
      
      for (var i = 0; i < list.length; i++) {
        list[i].EndTime = util.getDateByInt(list[i].EndTime)
      }
      that.setData({
        list: list
      })

    })
  }
})