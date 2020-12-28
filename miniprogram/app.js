//app.js
var data = require("data/data.js");

App({
  data:{
    userId: ''
  },
  onShow:function(options){
    this.data.userId = options.referrerInfo.extraData.userId;
    //console.log(this.data.userId)
    wx.setStorageSync("userId", this.data.userId);
  },
  onLaunch: function () {
    
    var res = wx.getStorageSync("cooklist");
    wx.cloud.init({
      traceUser: true,
  })
    if (res) {
      return res
    } else {
      wx.setStorageSync("cooklist", data.cooklist)
    }
    wx.setStorageSync('cooklist', data.cooklist);
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'number-grwak',
        traceUser: true,
      })
    }
     this. gerOpenid()
    this.globalData = {
      openid:-1
    }
  },
  onLaunch: function (options) {
    wx.cloud.init({
      traceUser: true,
  })
  console.log(options)
   // console.log(options.referrerInfo.extraData)
    this.data.userId = options.referrerInfo.extraData.userId;
   // console.log(this.data.userId)
    wx.setStorageSync("userId", this.data.userId);

  },




  globalData: {
    userInfo: null
  },
  gerOpenid(){
    wx.cloud.callFunction({
      name:'login'
    }).then((res)=>{
      const openid=res.result.openid
      this.globalData.openid=openid
      if(wx.getStorageSync(openid) == ''){
        wx.setStorageSync(openid, [])
      }
     
    })
  }
})
