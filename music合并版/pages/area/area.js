// pages/area/area.js
Page({
  data: {
    title: ["欧美排行榜", "内地排行榜", "港台排行榜", "韩国排行榜", "日本排行榜"],
    src: ["../../img/oumei.png", "../../img/neidi.png", "../../img/gangtai.png", "../../img/hanguo.png", "../../img/japan.png"],
    topid: [3, 5, 6, 16, 17],
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '地区排行榜',
      icon: "search", size: "20"
    })
  },
  arearanking: function (e) {
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