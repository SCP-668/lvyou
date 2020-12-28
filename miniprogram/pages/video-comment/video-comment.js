// pages/blog-comment/blog-comment.js
import formatTime from '../../utils/formatTime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: {},
    commentList: [],
    videoListId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      videoListId: options.videoListId
    })
    // console.log(this.data.videoListId)
    this._getBlogDetail()
  },

  _getBlogDetail() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })

    wx.cloud.callFunction({
      name: 'video',
      data: {
        videoListId: this.data.videoListId,
        $url: 'detail',
      }
    }).then((res) => {
      let commentList = res.result.commentList.data
      for (let i = 0, len = commentList.length; i < len; i++) {
        commentList[i].createTime = formatTime(new Date(commentList[i].createTime))
      }


      this.setData({
        commentList,
        videoList: res.result.detail[0],
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
    // var pages = getCurrentPages(); //当前页面
    // var beforePage = pages[pages.length - 2]; //前一页
    // wx.navigateBack({
    //   success: function () {
    //     beforePage.onPullDownRefresh(); // 执行前一个页面的onLoad方法
    //   }
    // });


    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    beforePage.onPullDownRefresh();
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
    const blog = this.data.blog
    return {
      title: blog.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blog._id}`,

    }
  }
})