// components/dingdan-card/dingdan-card.js
import formatTime from '../../utils/formatTime.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dingdan:Object
  },
  observers: {
    ['dingdan.createTime'](val) {
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
   
    tjlxList: '',
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
   
  }
})
