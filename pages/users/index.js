
var app = getApp()
var api = require("../../utils/api.js");
Page({
  data: {
    menuitems: [
      // { text: '优惠券', url: '', icon: '/public/images/benefit.png', tips: '' },
      { text: '关于', url: '/pages/usedDetail/used', icon: '/public/images/gy.png', tips: '' },
      // { text: '更多', url: '/pages/copyright/copyright', icon: '/public/images/more.png', tips: '' }
    ],
    avatarUrl: '',
    nickName: '',
    countDownDay: '',
    display: 'none'
  },
  onLoad: function () {
    let that = this
    //
    var cmd = {};
    cmd.Account = wx.getStorageSync('key');
    api.getUser(cmd, function (res) {
      if (res.code == "200") {
        var result = res.result;
        that.setData({
          avatarUrl: result.Photo,
          nickName: result.Name,
          countDownDay:result.RemainDays
        })
        if (result.Account == 'o98oG0Xw_9MM8w9g8eivKZEy_5j0' || result.Account == "o98oG0VhONCzGSjcLh6x9_Nt-IN8") {

          that.setData({
            display: ""
          })
        }
      }
    })
  },


  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})