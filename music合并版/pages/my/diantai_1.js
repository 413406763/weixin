var app = getApp()
var API_URL = 'http://route.showapi.com/213-4?showapi_appid=29019&showapi_sign=62db18e878484cf5ac2c7d2d9eaf19a7&topid=5&'
Page({
  onReady: function (e) {
   
  },
  data: {
     array: [{
      mode: 'aspectFit',
    }], 
    movies:[],
    title: "",
    userInfo: {}
  }, 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
       title: '放松一听',
    })
  },
  onLoad: function (options) {
    var _that = this;
    wx.setNavigationBarTitle({
      title: '放松一听'
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
        console.log(res.data);
        var arr = data.showapi_res_body.pagebean.songlist;
        console.log(arr);
       var arrname = [];
       var tp = [];
       var name = [];
       var geshou = [];
       for(var i in arr){
         arrname[i] = arr[i].songid;
         tp[i] = arr[i].albumpic_big;
         name[i] = arr[i].songname;
         geshou[i] = arr[i].singername;
 console.log(arrname[i]);
       }
       _that.setData({
        
          movies: arr
       }),
       console.log(tp);
       var idsMap = {};
        var len = arrname.length;
          
        // console.log(keys);

        for (var i = 0; i < len; i++) {
          var k = arrname[i];

          // rs.push(Object.assign({
          //   id: k,
          // }, songs[k]));
          idsMap[k] = {
            preid: i > 0 ? arrname[i - 1] : 0,
            nextid: i < len - 1 ? arrname[i + 1] : 0
          }
        }

        idsMap[arrname[0]].preid = arrname[len - 1];
        idsMap[arrname[len - 1]].nextid = arrname[0];
        
        // console.log(idsMap);

        wx.setStorageSync('ids', idsMap);//把所有歌曲上一首下一首的顺序存到本地
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
    a.topid = topid;
    var id = a.id;
    var imgsrc = a.imgsrc;
    var songname = a.songname;
    var singername = a.singername;
    console.log(a);
    var obj = {
      topid:topid,
      id:id,
      imgsrc: imgsrc,
      songname:songname,
      singername:singername
    }
var aa = app.currentIds;
var bol = false;
for(var i =0;i<app.currentIds.length;i++){
  console.log(app.currentIds);
  // console.log(obj.id)

  if(app.currentIds[i].id === obj.id){
    console.log("55555555555555");
    bol = true;
  }
}
if(!bol){
   app.currentIds.push(obj);
  }
   console.log(app.currentIds);
 wx.setStorage({
  key:"key",
  data:aa

})
    wx.navigateTo({
      //234234 5 -> 5234234
      url: `../play/play?id=`+a.id+'&topid='+topid, //跳转到播放页面并把歌id传过去
      // url: `../my/zuijinbofang` //跳转到播放页面并把歌id传过去
    })
      
  },
  
})