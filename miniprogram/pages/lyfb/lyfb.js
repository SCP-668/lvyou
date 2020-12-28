// 输入文字最大的个数
const MAX_WORDS_NUM = 140
// 最大上传图片数量
const MAX_IMG_NUM = 9

const db = wx.cloud.database()
// 输入的文字内容
let content = ''
let contenttime = ''
let contentdd = ''
let contenthaoma = ''
let contentdate = ''
let contentmdd = ''
let contentfy = ''
let contentjtgj = ''
let contentdata1 = ''
let contenttime1 = ''
let userInfo = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入的文字个数
    styleIsolation: 'apply-shared',
    wordsNum: 0,
    footerBottom: 0,
    images: [],
    selectPhoto: true, // 添加图片元素是否显示
    times: '',
    dates: '',
    data1: '',
    time1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    // userInfo = options
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
  
  onInput(event) {
    // console.log(event.detail.value)
    let wordsNum = event.detail.value.length
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    content = event.detail.value
  },
  //  点击时间组件确定事件  
  onInputdate: function(e) {

    this.setData({
      times: e.detail.value
    })
    contenttime = e.detail.value
  },
  //点击时间组件确定事件 
  onInputdata1: function(e) {

    this.setData({
      data1: e.detail.value
    })
    contentdata1 = e.detail.value
  },
  //  点击日期组件确定事件 
  onInputlx: function(e) {
    // console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
    contentdate = e.detail.value

  },
  //  点击日期组件确定事件 
  onInputtime1: function(e) {
    // console.log(e.detail.value)
    this.setData({
      time1: e.detail.value
    })
    contenttime1 = e.detail.value

  },
  onInputdd(event) {
    // console.log(event.detail.value)
    contentdd = event.detail.value
  },
  onInputhaoma(event) {
    // console.log(event.detail.value)
    contenthaoma = event.detail.value
  },
  onInputmdd(event) {
    // console.log(event.detail.value)
    contentmdd = event.detail.value
  },
  onInputjtgj(event) {
    // console.log(event.detail.value)
    contentjtgj = event.detail.value
  },
  onInputfy(event) {
    // console.log(event.detail.value)
    contentfy = event.detail.value
  },
  // 验证手机号
  phoneChange: function(e) {
    this.checkPhone(e.detail.value)
  },
  // checkPhone()方法
  checkPhone: function(data) {
    var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
    return this.check(data, reg, '手机号码输入有误!')
  },
  // check()方法
  check: function(data, reg, errMsg) {
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
  onFocus(event) {
    // 模拟器获取的键盘高度为0
    // console.log(event)
    this.setData({
      footerBottom: event.detail.height,
    })
  },
  onBlur() {
    this.setData({
      footerBottom: 0,
    })
  },

  onChooseImage() {
    // 还能再选几张图片
    let max = MAX_IMG_NUM - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        // 还能再选几张图片
        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ? false : true
        })
      },
    })
  },
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

  onPreviewImage(event) {
    // 6/9
    wx.previewImage({
      urls: this.data.images,
      current: event.target.dataset.imgsrc,
    })
  },
  send(){
    //1.图片->云存储fileID 云文件ID
    //2.数据库->云数据库
    //数据库：内容、图片fileID、openid、昵称、头像、时间
    // console.log(this.data.userInfo[0].avatarUrl)
    var userInfo = this.data.userInfo[0]
    if (content.trim() === '' || contentdate.trim() === '' || contenttime.trim() === '' || contenttime1.trim === '' || contentdata1.trim === '' || contentdd.trim() === '' || contenthaoma.trim === '' || contentjtgj.trim === '' || contentmdd.trim === '' || contentfy.trim === '' || this.data.images.length <= 0 || contenthaoma.length != 11) {
      wx.showModal({
        title: '请完善内容后再发布',
        content: '',
      })
      return
    }
    wx.showLoading({
      title: '发布中',
    })
    let promiseArr = []
    let fileIds = []
    for (let i = 0, len = this.data.images.length; i < len; i++) {
      let p = new Promise((resolve, reject) => {
        let item = this.data.images[i]
        //获取文件扩展名(正则表达式)
        let suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: 'tjlx/' + Date.now() + '-' + Math.random() * 10000000 + '',
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
    Promise.all(promiseArr).then((res) => {
      db.collection('tjlx').add({
        data: {
          content,
          contenttime,
          contentdd,
          contentdate,
          contentdata1,
          contenthaoma,
          contentfy,
          contentjtgj,
          contentmdd,
          contenttime1,
          ...userInfo,
          img: fileIds,
          createTime: db.serverDate(),     
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showModal({
          title: '发布成功',

        })


        //返回页面
        wx.navigateBack({
            delta: 1
          }),
          wx.showModal({
            title: '发布成功',
            content: '',
            isHide: false,
          })
      })
    }).catch((res) => {
      wx.hideLoading()
      wx.showToast({
        title: '发布失败',
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