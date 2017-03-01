//ranking.js
Page({
  data: {
    title: ["新歌Top100", "歌手Top10", "全民K歌榜", "欧美金曲榜", "影视金曲榜", "金曲K歌榜"],
    text: ['新歌榜', '歌手榜', '全民K歌榜', '欧美金曲榜', '影视金曲榜', '金曲K歌榜'],
    src: ["../../img/top1.jpg", "../../img/top10.png", "../../img/king.jpg", "../../img/usa.jpg", "../../img/tv.jpg", "../../img/old.jpg"],
   topid:[27,23,20,3,29,36],
  },
  //事件处理函数
  onLoad: function () {
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '排行榜',
      icon: "search", size: "20"
    })

  },
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  area: function () {
    wx.navigateTo({
      url: '../area/area'
    })
  },
 more: function () {
    wx.navigateTo({
      url: '../more/more',
    })
  },

  gothis: function (e) {
    const dataset = e.currentTarget.dataset;
    var topid = dataset.id;
    var toptext = dataset.text;
   
   wx.navigateTo({

     url: '../newsing/newsing?topid='+topid+'&toptext='+toptext,
   })
 }
})