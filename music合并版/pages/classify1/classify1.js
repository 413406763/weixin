//classify.js
//获取应用实例
var app = getApp()
var topid = 0;
Page({
  data: {
    title: "",
    // songs:[]
  },
  //事件处理函数

  onReady: function () {
    

    wx.setNavigationBarTitle({
      title: '发现'
    })
  },
   playTap: function (e) {
    const dataset = e.currentTarget.dataset;
    console.log(dataset.id);
    // var topid = 26;

    wx.navigateTo({
      url: `../play/play?id=` + dataset.id + '&topid=' + topid //跳转到播放页面并把歌id传过去
    })

  },
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  onLoad:function(res){
    wx.showToast({
      title: '玩命加载 。。。',
      icon: 'loading',
      duration: 1000
    })
    console.log(res)
    topid = res.topid;
    var that = this;
    wx.request({
      url: 'http://route.showapi.com/213-4?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&topid='+topid,  //仅为示例，并非真实的接口地址
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        
        var arr = res.data.showapi_res_body.pagebean.songlist;
        // success
         that.setData({
          recommends: arr    //刷新数据显示所有歌曲信息
        });
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
