//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()


Page({
  data: {
    modalShow: false,
    tjlxList: [],


    swiper: [{
        url: '/images/view1.jpg'
      },
      {
        url: '/images/view2.jpg'
      },
      {
        url: '/images/view3.jpg'
      }
    ],


    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [{

    }],
    currentTab: 0,
    navScrollLeft: 0
  },
  //事件处理函数
  onLoad: function() {
    this._loadtjlx()
    this._getSwiper()
    this._getyh()
    this._getsjyh()
  },
  _getyh() {
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
          userInfo: res.data.data,
          user_id: res.data.data[0].user_id
        })
      }
    });
  },
  _getsjyh() {
    var user_id = this.data.user_id;
    var that = this;
    wx.request({
      url: 'http://121.199.48.252/MemberCenter/public/api/Outdoor/checkBvip?user_id=' + user_id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log(res);
        that.setData({
          code: res.data.code
        })
      }
    });
  },
  _loadtjlx() {
    wx.cloud.callFunction({
      name: 'tjlx',
      data: {
        $url: 'lost',
        start: 0,
        count: 10,
      }
    }).then((res) => {
      this.setData({
        tjlxList: this.data.tjlxList.concat(res.result)
      })
    })
  },
  goComment(event) {

    wx.navigateTo({
      url: '../tjlx/tjlx-nr/tjlx-nr?tjlxId=' + event.target.dataset.tjlxid,
    })
  },

  lxfb(event) {


    wx.getSetting({

      success: (res) => {
        console.log(res);
        if (this.data.code == 200) {
          const detail = event.detail
          wx.navigateTo({
            url: `../lyfb/lyfb`,
          })
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          wx.showToast({

            title: '您不是商家用户',

            icon: 'success',

            duration: 2000 //持续的时间

          })
        }
      }
    });

  },

  onLoginFail() {
    wx.showModal({
      title: '授权用户才能发布',
      content: '',
    })
  },

  grxb: function(event) {
    wx.navigateTo({
      url: "/pages/grxb/grxb",
    })
  },
  tjlx: function(event) {
    wx.navigateTo({
      url: "/pages/tjlx/tjlx",
    })
  },
  lxdr: function(event) {
    wx.navigateTo({
      url: "/pages/luyoudaren/luyoudaren",
    })
  },
  xjphb: function(event) {
    wx.navigateTo({
      url: "/pages/shangjiapaihangbang/shangjiapaihangbang",
    })
  },
  jlbphb: function(event) {
    wx.navigateTo({
      url: "/pages/paihangbang/paihangbang",
    })
  },
  lysp: function(event) {
    wx.navigateTo({
      url: "/pages/video/video",
    })
  },
  rmyj: function(event) {
    wx.navigateTo({
      url: "/pages/blog/blog",
    })
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 4;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur + 20) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 4;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  _getSwiper() {
    db.collection("swiper").get().then((res) => {
      this.setData({
        swiperImgUrls: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this._getSwiper()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})