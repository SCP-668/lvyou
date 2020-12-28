// miniprogram/pages/1874/1874.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
//保存历史
savePlayHistory(){
  const youji= youji[nowPlayyoujiindex]
  const openid=app.globalData.openid
  const history=wx.setStorageSync(openid)
  let bhave=false
  for(let i=0,len =history.length;i<len;i++){
  if(history[i].id==youji.id){
    bhave=true
    break
  }
  }
  if(!bhave){
    history.unshift(youji)
    wx.wx.setStorage({
      data: history,
      key: openid,
  
    })
  }
  
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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