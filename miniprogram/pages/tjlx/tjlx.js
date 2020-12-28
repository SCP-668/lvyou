let keyword = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow:false,
    tjlxList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this. _loadtjlx()
this._getyh()
this._getsjyh()
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
  _loadtjlx(){
wx.cloud.callFunction({
  name:'tjlx',
  data:{
    $url:'lost',
    start:0,
    count:10,
  }
}).then((res)=>{
  this.setData({
    tjlxList:this.data.tjlxList.concat(res.result)
  })
})
  },
  goComment(event) {
    if (this.data.code !== 200) {
      wx.navigateTo({
        url: 'tjlx-nr/tjlx-nr?tjlxId=' + event.target.dataset.tjlxid,
      })
    } else {
      // 用户没有授权
      // 改变 isHide 的值，显示授权页面
      wx.showToast({

        title: '只有会员可查看',

        icon: 'success',

        duration: 2000 //持续的时间

      })
    }


  },






  onSearch(event) {
    // console.log(event.detail.keyword)
    this.setData({
    tjlxList: []
    })
    keyword = event.detail.keyword
    this._loadBlogList(0)
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