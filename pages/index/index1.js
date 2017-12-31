// pages/index/index1.js
var util =require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   Code:'',
   Date :"",
    //dataValue:'2017-12-31'
    dataValue:util.formatDate(new Date())
  },
  code:function(e){
    this.setData({
      Code:e.detail.value
    })
  },
 
  date: function (e) {
    this.setData({
      dataValue: e.detail.value,
     
    })
  },
  codeEvent:function(e){
    console.log(this.data.Code);
  },
  dateEvent:function(e){
      console.log(this.data.Date)
 
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
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