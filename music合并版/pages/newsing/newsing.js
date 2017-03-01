// pages/newsing/newsing.js
Page({
  data: {
    recommends: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.topid = options.topid;
    this.toptext = options.toptext;
    var that = this;

    wx.request({
      url: 'http://route.showapi.com/213-4?showapi_appid=29105&showapi_sign=a5fc17aa0032449cb941703b83f2bd72&topid='+this.topid+'&', //仅为示例，并非真实的接口地址
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
        for (var i in arrData.pagebean.songlist) {
          if (i > 20) {
            break;
          }
          songs[i] = arrData.pagebean.songlist[i];
          keys[i] = songs[i].songid;
        }
        that.setData({
          recommends: songs    //刷新数据显示所有歌曲信息
        });

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
      },
      fail: function () {
        console.log(请求失败);
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.toptext,
      icon: "search", size: "20"
    })
  },
  playTap: function (e) {
   // console.log(options.topid)
    const dataset = e.currentTarget.dataset;
   // console.log(dataset.id);
    //var topid = options.topid;
 wx.navigateTo({
      url: `../play/play?id=` + dataset.id + '&topid=' + this.topid //跳转到播放页面并把歌id传过去
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