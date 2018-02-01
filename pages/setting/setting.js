// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentBrightness:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
    wx.getScreenBrightness({
      success: function (res) {
        that.setData({
          currentBrightness: res.value
        })
      }

    })
  },

  //按钮点击
  check:function(){
    wx.showActionSheet({
      itemList: ['A','B','C','D'],
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
/**
 * 改变亮度
 */
  changeScreenList:function(e){
  var that = this;
  wx.setScreenBrightness({
    value: parseFloat(e.detail.value).toFixed(1),
  })

  
},
//录音
  record:function(){
    wx.authorize({
      scope: 'scope.record',
      success:function(){
        wx.startRecord({

        })

        setTimeout(function () {
          wx.stopRecord()
        }, 5000)
      }
    })
   
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