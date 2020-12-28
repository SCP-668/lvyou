// pages/xiangqing/xiangqing.js
import formatTime from '../../utils/formatTime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ybList:{},
    yblistId:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      yblistId: options.yblistId
    })
    this._getBlogDetail()
  },
  _getBlogDetail() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    // 详情查询
    wx.cloud.callFunction({
      name: 'yueban',
      data: {
        yblistId: this.data.yblistId,
        $url: 'detail',
      }
    }).then((res) => {
      // 时间格式化
      let ybList = res.result.detail[0]
      ybList.createTime = formatTime(new Date(ybList.createTime))
      
      this.setData({
        ybList
      })

      wx.hideLoading()
      // console.log(res)
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