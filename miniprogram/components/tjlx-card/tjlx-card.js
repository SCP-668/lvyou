// components/tjlx-card/tjlx-card.js
import formatTime from '../../utils/formatTime.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tjlx:Object
  },
  observers: {
    ['tjlx.createTime'](val) {
      if (val) {
        // console.log(val)
        this.setData({
          _createTime: formatTime(new Date(val))
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _createTime:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
  }
})
