// pages/goTovideofabu/goTovideofabu.js
const db = wx.cloud.database()
let userInfo = {}
let content = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc:"",
    selectPhoto: true,
  },
  //选择视频
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        that.setData({
          videoSrc: res.tempFilePath,
        })
      }
    })
  },
// 删除视频
  onDelVideo: function () {
    this.setData({
      videoSrc: '',
    })
  },
  // 数据绑定
  content(event) {
    content = event.detail.value
  },
  // 点击发布
  send() {
    // if (content.trim() === '') {
    //   wx.showModal({
    //     title: '请输入内容',
    //     content: '',
    //   })
    //   return
    // } 

    wx.showLoading({
      title: '发布中',
      mask: true,
    })

    let promiseArr = []
    let fileIds = ''
    // 视频上传
      let p = new Promise((resolve, reject) => {
        let item = this.data.videoSrc
        // 文件扩展名
        let suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: 'video/' + Date.now() + '-' + Math.random() * 1000000 + suffix,
          filePath: item,
          success: (res) => {
            console.log(res.fileID)
            fileIds = fileIds.concat(res.fileID)
            resolve()
          },
          fail: (err) => {
            console.error(err)
            reject()
          }
        })
      })
      promiseArr.push(p)
    

    // 存入到云数据库
    Promise.all(promiseArr).then((res) => {
      db.collection('videolist').add({
        data: {
          ...userInfo,
          content,
          video: fileIds,
          createTime: db.serverDate(), // 服务端的时间
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })

        // 返回blog页面，并且刷新
        wx.navigateBack()
        const pages = getCurrentPages()
        // console.log(pages)
        // 取到上一个页面
        const prevPage = pages[pages.length - 2]
        prevPage.onPullDownRefresh()
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '发布失败',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo = options
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