// pages/more/more.js
Page({
  data: {
    title: ["民谣歌曲榜", "摇滚歌曲榜", "我是歌手", "中国好歌曲", "中国好声音", "热歌榜", "网络歌曲榜", "梦想好声音"],
    src: ["../../img/600.jpg", "../../img/600-1.jpg", "../../img/asonger.png", "../../img/cgsong.jpg", "../../img/csingl.jpg", "../../img/hsong.jpg", "../../img/esong.png", "../../img/dsong.png"],
    topid: [18, 19, 21, 22, 25, 26, 28, 30],
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成s
    wx.setNavigationBarTitle({
      title: '更多选择',
      icon: "search", size: "20"
    })
  },
  morego: function (e) {
   const dataset = e.currentTarget.dataset;
    var topid = dataset.id;
    var toptext = dataset.text;
    wx.navigateTo({
      url: '../newsing/newsing?topid=' + topid + '&toptext=' + toptext,
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})