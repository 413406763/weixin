var app = getApp()
var API_URL = 'http://route.showapi.com/213-4?showapi_appid=29019&showapi_sign=62db18e878484cf5ac2c7d2d9eaf19a7&topid=5&'
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    poster:'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
     array: [{
      mode: 'aspectFit',
     
    }], 
    movies:[],
    
    title: "",
    userInfo: {}
    
  },
    audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
       title: '我的',
    })
  },
  onLoad: function (options) {
    var _that = this;
    wx.setNavigationBarTitle({
      title: '我的'
    }),
   this.setData({
      title: options.title
    }),
    console.log('onLoad')
    var that = this;
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
    wx.showToast({
      title:"加载中...",
      icon:"loading",
      duration:10000
    }),
    wx.request({
      url:API_URL,
      data: {},
     header:{
        'content-type': 'application/json'
     },
      success: function(res){
        wx.hideToast();
        var data = res.data;
       // console.log(res.data);
        var arr = data.showapi_res_body.pagebean.songlist;
       // console.log(arr);
       var arrname = [];
       var tp = [];
       var name = [];
       var geshou = [];
       for(var i in arr){
         arrname[i] = arr[i].songid;
         tp[i] = arr[i].albumpic_big;
         name[i] = arr[i].songname;
         geshou[i] = arr[i].singername;
// console.log(arrname[i]);
       }
       _that.setData({
        
          movies: arr
       }),
       console.log();
      },
      fail: function(item) {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  toast: function() {
    wx.navigateTo({
      url: '../my/woxihuan'
    })
  },
  no1: function(e) {
     const a = e.currentTarget.dataset;
    var topid = 5;
    wx.navigateTo({
      url: `../play/play?id=`+a.id+'&topid='+topid //跳转到播放页面并把歌id传过去
    })
  },
  diantai_1: function(){
    wx.navigateTo({
      url: '../my/diantai_1'
    })
  },
   diantai_2: function(){
    wx.navigateTo({
      url: '../my/diantai_2'
    })
  },
   diantai_3: function(){
    wx.navigateTo({
      url: '../my/diantai_3'
    })
  },
   diantai_4: function(){
    wx.navigateTo({
      url: '../my/diantai_4'
    })
  },
})

