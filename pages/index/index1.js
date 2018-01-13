// pages/index/index1.js
var util =require('../../utils/util.js');
var Api =require('../../utils/api.js');


var cmd = {};
cmd.Code ="";
cmd.Date =""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Code:"",
    Date :"",
    dataValue:util.formatDate(new Date())
  },
 
  datePickerBindchange: function (e) {
    
    this.setData({
      Date:e.detail.value,
      dataValue:e.detail.value
     
  })
    cmd.Date =this.data.Date.replace(/-/g,"");
    cmd.Code =this.data.Code;
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
    console.log(cmd)
  wx.request({
    url: 'https://app.wordstock.top/WordStock/TeriminalWebService.svc//teriminal/get_share_by_code',
    data:{cmd},
    
    method:'POST',
    success:res =>{
      console.log(res.data)
    }
  })
  
}

})
