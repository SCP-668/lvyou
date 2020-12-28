// pages/heji/grxb/grxbdetail/grxbdetail.js
import formatTime from '../../../utils/formatTime.js'
const db = wx.cloud.database()
let content = ''
let youji = []
let tjlxList = []
let nowPlayyoujiindex = 0
let _id = ''
let img = ''
let contentdate = ''
let contenttime = ''
let createTime = ''
let ztai = ''
let _a = ''
let userInfo = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tjlxList: {},
    tjlxId: '',
    shareshow: true,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    this.setData({
      tjlxId: options.tjlxId,

    })
    this._getBlogDetail(options.tjlxId)
    this.getOpenid()
    this._getyh()

  },
  //获取信息
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
        })
      }
    });
  },

  //转发
  /*onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '分享',
      path: '/pages/index/index',
      success: function (res) {
        console.log('成功', res)
      }
    }
  } ,*/
  _getBlogDetail(tjlxId) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    // 详情查询
    wx.cloud.callFunction({
      name: 'tjlx',
      data: {
        tjlxId: this.data.tjlxId,
        $url: 'detail',
      }
    }).then((res) => {

      let tjlxList = res.result.detail[0]

      tjlxList.createTime = formatTime(new Date(tjlxList.createTime))
      this.setData({
        tjlxList
      })
      wx.hideLoading({

      })


    })
  },



onLoginSuccess(e) {
    wx.showLoading({
      title: '订单确认中',
      shareshow: false
    })

    //1.拿到商品
    var userInfo = this.data.userInfo[0]
    let promiseArr = []
    Promise.all(promiseArr).then((res) => {
      console.log(this.data.tjlxList)
      console.log(this.data.openid)
      db.collection('dingdan').add({
        data: {
          _id: this.data.tjlxList._id + '.' + this.data.openid,
          img: this.data.tjlxList.img,
          content: this.data.tjlxList.content,
          contentdate: this.data.tjlxList.contentdate,
          contenttime: this.data.tjlxList.contenttime,
          contentfy: this.data.tjlxList.contentfy,
          createTime: db.serverDate(),
          ztai: '已预约',
          ...userInfo,
          num: 1
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '加入成功',
        })
        this.data.shareshow = false
      }).catch((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '重复订单',
          icon: 'none'
        })
      });
    })


  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        //console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
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