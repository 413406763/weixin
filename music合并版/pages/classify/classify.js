//classify.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title: "",
    niandai:[{name:"销量",topid:"23"},{name:"热歌",topid:"26"},{name:"影视",topid:"29"},{name:"90",topid:"36"}],
    diqu:[{name:"内地",topid:"5"},{name:"港台",topid:"6"},{name:"日韩",topid:"17"},{name:"欧美",topid:"3"}],
    qinggan:[{name:"摇滚",topid:"19"},{name:"情感",topid:"30"},{name:"慢歌",topid:"28"},{name:"民谣",topid:"18"}]
  },
  //事件处理函数

  onReady: function () {
    var that = this;
    wx.request({
      url: 'http://route.showapi.com/213-4?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&topid=26',  //仅为示例，并非真实的接口地址

      data: {
        x: '',
        y: '',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var json = res.data;

        var arrData = json["showapi_res_body"];
        console.log(arrData)
        var songs = arrData.pagebean.songlist;
       
        that.setData({
          recommends: songs    //刷新数据显示所有歌曲信息
        });
        
      },
      
      fail: function () {
        console.log(请求失败);
      }
    }),

    wx.setNavigationBarTitle({
      title: '发现'
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
   playTap: function (e) {
    const dataset = e.currentTarget.dataset;
    console.log(dataset.id);
    var topid=26;
    // console.log();
    wx.navigateTo({
      url: `../play/play?id=` + dataset.id + '&topid=' + topid //跳转到播放页面并把歌id传过去
    })

  },
  bindHtml:function(e){
    var id = e.currentTarget.dataset.id;
    var topid = e.currentTarget.dataset.topid;
console.log(e);
    wx.navigateTo({
      url: '../classify1/classify1?id='+id+"&topid="+topid,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
