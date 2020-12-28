// pages/video/video.js
//搜索关键字
let keyword = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    videolist:[]
  },
  goTovideofabu() {
    
    // 判断用户是否授权
    
        if(this.data.code == 200){
          wx.navigateTo({
            url: `../goTovideofabu/goTovideofabu?nickName=${this.data.userInfo[0].nickName}&avatarUrl=${this.data.userInfo[0].avatarUrl}&openId=${this.data.userInfo[0].openId}&user_id=${this.data.user_id}`,
          })
      }else {

        wx.showToast({

          title: '您不是会员用户，无法发布信息',
     
          icon: 'success',
     
          duration: 2000//持续的时间
     
        })
      }
     
  },
  goComment(event) {
    // console.log(event.currentTarget.dataset.videolistid)
    wx.navigateTo({
      url: '../../pages/video-comment/video-comment?videoListId=' + event.currentTarget.dataset.videolistid,
    })
  },
  onSearch(event) {
    // console.log(event.detail.keyword)
    this.setData({
      videolist: []
    })
    keyword = event.detail.keyword
    this._loadBlogList(0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getyh()
    this._getsjyh()
    this._loadBlogList(0)
  },
      //获取会员信息
      _getyh(){
        var userId = wx.getStorageSync("userId");
          var that = this;
          wx.request({
            url: 'http://121.199.48.252/MemberCenter/public/api/user/selectuser?userId=' + userId,
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
              'token': wx.getStorageSync('token'),
            },
            success: (res) => {
              console.log(res);
      
        
              that.setData({
                userInfo:res.data.data,
                user_id:res.data.data[0].user_id
              })
            }
          });
       },
       //判断是否是会员
       _getsjyh(){
        var user_id = this.data.user_id;
          var that = this;
          wx.request({
            url: 'http://121.199.48.252/MemberCenter/public/api/Outdoor/checkMvip?user_id=' + user_id,
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
              'token': wx.getStorageSync('token'),
            },
            success: (res) => {
              console.log(res);
              that.setData({
                code:res.data.code
              })
            }
          });
       },
  _loadBlogList(start = 0) {
    wx.showLoading({
      title: '拼命加载中',
    })
    wx.cloud.callFunction({
      name: 'video',
      data: {
        start,
        keyword,
        count: 10,
        $url: 'list',
      }
    }).then((res) => {
      // console.log(res)
      this.setData({
        videolist: this.data.videolist.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
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
    this.setData({
      videolist: []
    })
    this._loadBlogList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadBlogList(this.data.videolist.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})