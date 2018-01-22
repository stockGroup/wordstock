// pages/index/index1.js
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');


var cmd = {};
cmd.Code = "";
cmd.Date = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Code: "",
    Date: util.formatDate(new Date()).replace(/-/g, ''),
    dataValue: util.formatDate(new Date()),
    currentToday: util.formatDate(new Date()),
    code: '',
    name: '',
    totalNumber: '',
    increase: '',
    itembg: '',
    tipsshow: 'none',
    list:'',
    IncreaseStock:'',
    UnitNumber:'',
    IncreaseUnitNumber:''
    
  },

  datePickerBindchange: function (e) {

    this.setData({
      Date: e.detail.value,
      dataValue: e.detail.value

    })
    cmd.Date = this.data.Date.replace(/-/g, "");
    cmd.Code = this.data.Code;
    this.loadShares();

  },

  /*自动获取输入框股票代码*/
	code:function(e){
		this.setData({
			Code:e.detail.value
		})
    if(this.data.Code.length ==6){
      cmd.Date = this.data.Date.replace(/-/g, "");
      cmd.Code = this.data.Code;
      this.loadShares();

      // if (this.data.today == this.data.Date) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '只能查询当日之前的记录',
      //   })
      //   return;
      // }

      wx.showToast({
        title: '查询中',
        icon: 'loading'
      })

    }
	},

  codeEvent: function (e) {
    this.setData({
      Code: e.detail.value
    })
	
    // if (this.data.today == this.data.Date) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '只能查询当日之前的记录',
    //   })
    //   return false;
    // }

    wx.showToast({
      title: '查询中',
      icon: 'loading'
    })
    if (util.isNullOrWhiteSpace(this.data.Code)) {
      console.log(123);
    }
    cmd.Date = this.data.Date.replace(/-/g, "");
    cmd.Code = this.data.Code;
    console.log(cmd)

    this.loadShares();
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
  loadShares: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })
    api.getShareByCode(cmd, function (res) {
     if(res.result.code =="200"){
		  wx.hideLoading()
      //console.log(res.result)
      var result = res.result;
      var list = res.result.ShareStocks;
      
      that.setData({
        code: result.Code,
        name: result.Name,
        totalNumber: result.Amount,
        increase: result.IncreaseStock + "|" + result.IncreaseStockPer,
        tipsshow: '',
        list:list,
        IncreaseStock: result.IncreaseStock,
        IncreaseUnitNumber: result.IncreaseUnitNumber,
        UnitNumber:result.UnitNumber
      })
		 
	 }
     

    }, function (fail) {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: fail,
      })
    })

  }

})
