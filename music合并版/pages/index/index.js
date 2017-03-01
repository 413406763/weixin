//index.js
//获取应用实例
var app = getApp()
// var data = require('../../utils/data.js').songs;

// const m_url = "http://route.showapi.com/213-4?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&topid=26";

Page({
  data: {
    title: "",
    imgUrls: [
      'https://y.gtimg.cn/music/photo_new/T002R300x300M000002swaED2X5CNq.jpg',
      'http://i.gtimg.cn/music/photo/mid_album_300/a/F/000QgFcm0v8WaF.jpg',
      'http://i.gtimg.cn/music/photo/mid_album_300/l/o/003y8dsH2wBHlo.jpg',
      'http://i.gtimg.cn/music/photo/mid_album_300/Z/n/0036fT613sAeZn.jpg'
    ],
    // item: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002swaED2X5CNq.jpg',
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://route.showapi.com/213-4?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&topid=26', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var json = res.data;

        var arrData = json["showapi_res_body"];
        // console.log(arrData)
        var songs = [];
        var keys = [];
        // for(var i in songs){
        //   console.log(songs[i].songid);
        //   console.log(songs[i].songname);
        //   console.log(songs[i].singername);
        //   // console.log(songs[i].albumname);
        //   console.log(songs[i].albumpic_big);
        //   console.log(songs[i].url);

        // }
   
        for(var i in arrData.pagebean.songlist){

          if(i>20){
            break;
          }
          
          songs[i] = arrData.pagebean.songlist[i];
          keys[i] = songs[i].songid;
          // console.log(songs[i]);

        } 
        var idsMap = {};
        var len = keys.length;
          
        // console.log(keys);

        for (var i = 0; i < len; i++) {
          var k = keys[i];

          // rs.push(Object.assign({
          //   id: k,
          // }, songs[k]));
          idsMap[k] = {
            preid: i > 0 ? keys[i - 1] : 0,
            nextid: i < len - 1 ? keys[i + 1] : 0
          }
        }

        idsMap[keys[0]].preid = keys[len - 1];
        idsMap[keys[len - 1]].nextid = keys[0];
        
        // console.log(idsMap);

        wx.setStorageSync('ids', idsMap);//把所有歌曲上一首下一首的顺序存到本地


        //  console.log(rs);
        var rs = songs;
        that.setData({
          recommends: rs    //刷新数据显示所有歌曲信息
        });

      },
      fail: function () {
        console.log(请求失败);
      }
    });


  },


  playTap: function (e) {
    const dataset = e.currentTarget.dataset;
    console.log(dataset.id);
    var topid = 26;
    
    wx.navigateTo({
      url: `../play/play?id=`+dataset.id+'&topid='+topid //跳转到播放页面并把歌id传过去
    })

  },

  swiper_play: function (e) {

    const dataset = e.currentTarget.dataset;
    console.log(dataset.id);
    var swiper_keys = ["火星人来过","薛之谦","薛之谦","薛之谦"];
    var swiper_singids = [109397900,5106430,102636799,647969];
    // var topid = 26;
    
    wx.navigateTo({
      url: `../play/play?id=`+swiper_singids[dataset.id]+'&singkey='+swiper_keys[dataset.id] //跳转到播放页面并把歌id传过去
    })

  },

  onReady: function (e) {
    wx.setNavigationBarTitle({
      title: '精选推荐'
    });

  },
  
 logoTap1: function () {
    wx.navigateTo({
      url: 'nav_logo/dongman/dongman'
    })

  },
  logoTap2: function () {
    wx.navigateTo({
      url: 'nav_logo/qingyinyue/qingyinyue'
    })

  },
  logoTap3: function () {
    wx.navigateTo({
      url: 'nav_logo/yaolanqu/yaolanqu'
    })

  },
  logoTap4: function () {
    wx.navigateTo({
      url: 'nav_logo/DJ/DJ'
    })

  },


  
  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log('刷新');
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log('circle 下一页');
  },


  

})


