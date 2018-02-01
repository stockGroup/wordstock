// pages/index/index1.js
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');

import conf from '../../utils/config.js'
var app = getApp();

var cmd = {};
cmd.Code = app.searchKey.Key;
cmd.Date = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Code:app.searchKey.key,
    Date: util.formatDate(new Date()).replace(/-/g, ''),
    dataValue: util.formatDate(new Date()),
    searchKey: app.searchKey.key,
    code: '',
    name: '',
    totalNumber: '',
    increase: '',
    itembg: '',
    tipsshow: 'none',
    list: '',
    IncreaseStockPer: '',  //增长比
    IncreaseStock: '',     //
    UnitNumber: '',      //机构总数
    IncreaseUnitNumber: '',  //机构增长数量
    TodayEndPrice: '',   //今日收盘价格
    YesterdayEndPrice: '', //昨日收盘价格
    TodayStartPrice: '',   //今日开盘价格
    TodayMax: '',    //今天最高
    TodayMin: '',    //今日最低
    TraNumber: '',    //成交量
    TraAmount: '',   //成交额
    Increase: '',    //增长价
    IncrePer: '', //增长率

  },

  datePickerBindchange: function (e) {

    this.setData({
      Date: e.detail.value,
      dataValue: e.detail.value

    })
    cmd.Date = this.data.Date.replace(/-/g, "");
    cmd.Code = this.data.Code;
    console.log(cmd)
    this.loadShares();

  },

  /*自动获取输入框股票代码*/
  // code: function (e) {
  //   this.setData({
  //     Code: e.detail.value
  //   })
  //   if (this.data.Code.length == 6) {
  //     cmd.Date = this.data.Date.replace(/-/g, "");
  //     cmd.Code = this.data.Code;
  //     console.log(1);
  //     console.log(cmd)
  //     this.loadShares();

  //     wx.showToast({
  //       title: '查询中',
  //       icon: 'loading'
  //     })

  //   }
  // },

  // codeEvent: function (e) {
  //   this.setData({
  //     Code: e.detail.value
  //   })

  //   wx.showToast({
  //     title: '查询中',
  //     icon: 'loading'
  //   })
  //   if (util.isNullOrWhiteSpace(this.data.Code)) {
  //     console.log(123);
  //   }
  //   cmd.Date = this.data.Date.replace(/-/g, "");
  //   cmd.Code = this.data.Code;
  //   console.log(2)

  //   this.loadShares();
  // },


  //点击跳转

  jumpSearch: function () {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) {
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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

    var that = this;
    var searchKey = app.searchKey.key
    
    that.setData({
      searchKey: app.searchKey.key
    })
    if (!util.isNullOrWhiteSpace(searchKey)) {
      that.setData({
        searchKey: app.searchKey.key
      })

      cmd.Date = this.data.Date.replace(/-/g,"");
      cmd.Code = app.searchKey.key;
      this.loadShares();
    }
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
   * 加载数据
   */
  loadShares: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })
    api.getShareByCode(cmd, function (res) {
      if (res.code == "200") {
       
        var result = res.result;
        var list = res.result.ShareStocks;
       
        that.setData({
          code: result.Code,
          name: result.Name,
          totalNumber: result.Amount,
          increase: result.IncreaseStock + "|" + result.IncreaseStockPer,
          IncreaseStockPer: result.IncreaseStockPer,
          tipsshow: '',
          list: list,
          IncreaseStock: result.IncreaseStock,
          IncreaseUnitNumber: result.IncreaseUnitNumber,
          UnitNumber: result.UnitNumber,
          Increase: result.Increase,
          IncrePer: result.IncrePer,
          TodayEndPrice: result.TodayEndPrice,   //今日收盘价格
          YesterdayEndPrice: result.YesterdayEndPrice, //昨日收盘价格
          TodayStartPrice: result.TodayStartPrice,   //今日开盘价格
          TodayMax: result.TodayMax,    //今天最高
          TodayMin: result.TodayMin,    //今日最低
          TraNumber: result.TraNumber,    //成交量
          TraAmount: result.TraAmount,   //成交额
        })
        wx.setNavigationBarTitle({
          title: result.Name//页面标题为路由参数
        })

        wx.hideLoading();
      }


    }, function (fail) {
      wx.hideLoading()
      wx.showModal({
        title: '',
        content: fail,
      })
    })

  },
  onShareAppMessage: function () {
    // wx.navigateTo({
    //   url: '/pages/index/index',
    // })
    return {
      title: conf.share_info.title,
      desc: conf.share_info.desc,
      path: conf.share_info.path
    }
  }

})
