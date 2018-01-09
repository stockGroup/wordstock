// pages/index/index1.js
var util =require('../../utils/util.js');
var Api =require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmd:{},
    Code:"",
    Date :"",
    dataValue:util.formatDate(new Date())
  },
 
  datePickerBindchange: function (e) {
    console.log( e.detail.value)
    this.setData({
      Date: e.detail.value,
      dataValue:e.detail.value
     
  })
     this.loadShares();
   
  },
  date: function (e) {
    this.setData({
      dataValue: e.detail.value,
    })
  },

  codeEvent:function(e){
    console.log(e.detail.value);
    this.setData({
      Code:e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // this.loadShares()
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
  /**
   * 加载数据
   */
  loadShares:function(){
    var that = this
    cmd ={
     Code:that.Data.Code,
     Date:that.Data.Date
   };
    Api.getShareByCode(cmd,function(result){
      if(result && result.result){
        console.log(result);
      }
    })
  },
})
