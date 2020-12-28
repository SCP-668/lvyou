// components/video-ctrl/video-ctrl.js
let userInfo = {}
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videolist: Object,
    videoListId: String,
  },

  // 引入图标
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 登录组件是否显示
    loginShow: false,
    // 底部弹出层是否显示
    modalShow: false,
    content: '',
    //点赞开关
    upStatus: false,
    _openid: ''
  },
  lifetimes: {
    ready() {
      wx.cloud.callFunction({
        name: "login"
      }).then(res => {
        this.setData({
          _openid: res.result.openid
        })
        // console.log(this.data._openid)
      }).catch(err => {
        console.log(err)
      })
      this.onUpif()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
      // 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true,
                })
              }
            })
          } else {
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },
    // 成功
    onLoginsuccess(event) {
      userInfo = event.detail
      // 授权框消失，评论框显示
      this.setData({
        loginShow: false,
      }, () => {
        this.setData({
          modalShow: true,
        })
      })
    },
    // 失败
    onLoginfail() {
      wx.showModal({
        title: '授权用户才能进行评价',
        content: '',
      })
    },
    // 发送
    onSend(event) {
      // console.log(event)
      // 插入数据库
      let content = event.detail.value.content
      if (content.trim() == '') {
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title: '评论中',
        mask: true,
      })
      db.collection('video-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          videoListId: this.properties.videoListId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          modalShow: false,
          content: '',
        })
        // 父元素刷新评论页面
        this.triggerEvent('refreshCommentList')
      })
    },
    vote: function () {
      var id = this.properties.videoListId
      wx.cloud.callFunction({
        name: 'onUpTap',
        //点赞需要的参数:
        // 点赞数 +1
        // 该条的id
        data: {
          id,
        },
        success: res => {
          // 插入数据库
          db.collection('video-dianzan').add({
            data: {
              createTime: db.serverDate(),
              videoListId: this.properties.videoListId
            }
          }).then((res) => {
            wx.showToast({
              title: '点赞成功',
            })
            // 父元素刷新评论页面
            this.triggerEvent('refreshCommentList')
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '点赞失败',
          })
          console.error('[云函数]  调用失败：', err)
        }
      })
    },
    votedown: function () {
      var id = this.properties.videoListId
      wx.cloud.callFunction({
        name: 'onDownTap',
        //点赞需要的参数:
        // 点赞数 -1
        // 该条的id
        data: {
          id,
        },
        success: res => {
          //删除数据库
          db.collection("video-dianzan").where({
            videoListId: this.properties.videoListId,
            _openid: this.data._openid
          }).remove().then(res => {
            // console.log(res);
            wx.showToast({
              title: '取消成功',
            })
            // 父元素刷新评论页面
            this.triggerEvent('refreshCommentList')
          }).catch(err => {
            console.log(err)
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '取消失败',
          })
          console.error('[云函数]  调用失败：', err)
        }
      })
    },
    onUpTap: function (event) {
      if (this.data.upStatus) {
        this.setData({
          upStatus: false
        })
        this.votedown()
      } else {
        this.setData({
          upStatus: true
        })
        this.vote()
      }
    },
    onUpif: function () {
      // console.log(this.properties.videoListId)
      db.collection("video-dianzan").where({
        _openid: this.data._openid,
        videoListId: this.properties.videoListId
      }).get().then(res => {
        // console.log(res)
        if (res.data.length > 0) {
          this.setData({
            upStatus: true
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
})