
//模块化开发，导出对应方法 时间点的格式化
module.exports = (date) => {
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  const o = {
    //+表示一次或者多次
    'M+': date.getMonth() + 1,//月份
    'd+': date.getDate(),//日
    'h+': date.getHours(),//时
    'm+': date.getMinutes(),//分
    's+': date.getSeconds(),//秒
  }
  //test表示匹配返回值是布尔类型
  if (/(y+)/.test(fmt)) {
    //regexp是js里面的内置对象表示正则表达式

    fmt = fmt.replace(RegExp.$1, date.getFullYear())
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, o[k].toString().length == 1 ? '0' + o[k] : o[k])
    }
  }

  // console.log(fmt)
  return fmt
}
