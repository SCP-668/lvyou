// pages/goToyuebanfabu/goToyuebanfabu.js
// 最大上传图片数量
const db = wx.cloud.database()
let userInfo = {}
const MAX_IMG_NUM = 3
let Destination = ''
let Place = ''
let Starttime = ''
let Endtime = ''
let Tool = ''
let Gender = ''
let Phone = ''
let Content = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starttime:'请输入',
    endtime:'请输入',
    images: [],
    selectPhoto: true, // 添加图片元素是否显示
    placeholder: {
      type: String,
      value: '请输入　'
    }
  },
  onChooseImage() {
    // 还能再选几张图片
    let max = MAX_IMG_NUM - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res)
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        // 还能再选几张图片
        max = MAX_IMG_NUM - this.data.images.length
        console.log(max)
        this.setData({
          selectPhoto: max <= 0 ? false : true
        })
      },
    })
  },
  // 删除图片
  onDelImage(event) {
    this.data.images.splice(event.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length == MAX_IMG_NUM - 1) {
      this.setData({
        selectPhoto: true,
      })
    }
  },
  // 数据绑定
  Destination(event) {
    Destination = event.detail.value
  },
  Place(event) {
    Place = event.detail.value
  },
  Starttime(event) {
    this.setData({
      starttime: event.detail.value
    })
    Starttime = event.detail.value
  },
  Endtime(event) {
    this.setData({
      endtime:event.detail.value
    })
    Endtime = event.detail.value
  },
  Tool(event) {
    Tool = event.detail.value
  },
  Gender(event) {
    Gender = event.detail.value
  },
  Phone(event) {
    Phone = event.detail.value
  },
  Content(event) {
    Content = event.detail.value
  },
  // 验证手机号
  phoneChange: function (e) {
    this.checkPhone(e.detail.value)
  },
  // checkPhone()方法
  checkPhone: function (data) {
    var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
    return this.check(data, reg, '手机号码输入有误!')
  },

  // check()方法
  check: function (data, reg, errMsg) {
    if (!reg.test(data)) {
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 1500
      })
      return false
    }
    return true
  },
  // 点击发布
  send() {
    if (Destination.trim() === '' || Place.trim() === '' || Starttime.trim() === '' || Endtime.trim() === '' || Tool.trim() === '' || Gender.trim() === '' || Phone.trim() === '' || Content.trim() === '' || this.data.images.length <= 0 || Phone.length != 11) {
      wx.showModal({
        title: '请完善内容后再发布',
        content: '',
      })
      return
    }
    wx.showLoading({
      title: '发布中',
      mask: true,
    })

    let promiseArr = []
    let fileIds = []
    // 图片上传
    for (let i = 0, len = this.data.images.length; i < len; i++) {
      let p = new Promise((resolve, reject) => {
        let item = this.data.images[i]
        // 文件扩展名
        let suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: 'yueban/' + Date.now() + '-' + Math.random() * 1000000 + suffix,
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
    }

    // 存入到云数据库
    Promise.all(promiseArr).then((res) => {
      db.collection('yueban').add({
        data: {
          ...userInfo,
          Destination,
          Place,
          Content,
          Starttime,
          Endtime,
          Tool,
          Gender,
          Phone,
          img: fileIds,
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