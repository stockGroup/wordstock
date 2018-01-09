// copyright/copyright.js
Page({

  /**
   * 页面的初始数据
   */
  //页面跳转
 
  data: {
    second_height :0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   // console.log("onload");
    var that = this;
    wx.getSystemInfo({
      success:function(res){
        //console.log(res.windowHeight)
        that.setData({
          copyright_content_height: res.windowHeight,
          copyright_content_wdith:res.windowWidth
        })
        
      }
    })

    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/index/index1',
      })
    }, 1000)

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