import formatTime from '../../../utils/formatTime.js'
const MAX_LIMIT=10 
const MIN_LIMIT=16 
let keyword = ''

Page({
 
  /**
  * 页面的初始数据
  */
  data: {
  tjlxList:[],
  id:'',
  _id:''
  },

  remove:function(e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    const db = wx.cloud.database();
    db.collection("dingdan").doc(id).remove({
      success:res=>{
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad()//删除成功重新加载
      },fail:err=>{
        wx.showToast({
          title: '删除失败',
        })
      }
    })

 },
 getOpenid(){
  let page = this;
  wx.cloud.callFunction({
    name:'getOpenid',
    complete:res=>{
      console.log('openid--',res.result)
      var openid = res.result.openid
      page.setData({
        openid:openid
      })
      
    }
  })
},
  /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  this._getyh()
  this._getListByCloudfu()
    },
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
  


    _getListByCloudfu(){ 
      wx.showLoading({ 
        title: '加载中', 
      }) 
      wx.cloud.callFunction({ 
        name:'dingdan', 
        data:{ 
          $url:'getListByOpenid', 
          start:this.data.tjlxList.length, 
          count:MAX_LIMIT 
        } 
     
      }).then((res)=>{ 
        console.log(res) 
        this.setData({ 
          tjlxList:this.data.tjlxList.concat(res.result),
          
        }) 
        console.log() 
        wx.hideLoading() 

      }).catch(res=>{
        wx.hideLoading() 

          this.setData({
            isHide: true
          }); 
      })
    }, 


    
    goComment(event) {
      // var tjlxList= this.data.tjlxList;
      
      //     // 如果修改数组中所有name的值，则不要判断，这里判断只修改数组中第一组数据的name值
      //     this.data.tjlxList._id.length=MIN_LIMIT

      // this.setData({
       
      //   tjlxList: tjlxList
      // })
      // console.log(this.data.tjlxList._id)
      var _id = event.target.dataset.tjlxid.split("/")
      wx.navigateTo({
        url: '/pages/tjlx/tjlx-nr/tjlx-nr?tjlxId=' + _id[0],
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
  