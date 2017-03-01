// pages/search/searchlist/searchlist.js
Page({
  data: {
    modalHidden2: true,
    recommends: [],
     valueId:'',


  },
   
  onLoad: function (options) {
    var currentId = options.id;
    this.key = currentId;
     var that = this;
    wx.request({
      url: 'http://route.showapi.com/213-1?showapi_appid=29104&showapi_sign=b3b31fb5b3964628bea2e6f1710f3fed&keyword=' + currentId + '&page=1&', //真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var json = res.data;
        var arrData = json["showapi_res_body"];
        // console.log(url)
        var songs = [];
        var keys = [];
        //console.log(arrData.pagebean.contentlist.length)
        if (arrData.pagebean.contentlist.length != 0) {
          that.setData({
            modalHidden2: true
          });
          for (var i in arrData.pagebean.contentlist) {
            songs[i] = arrData.pagebean.contentlist[i];
            keys[i] = songs[i].songid;
          };
          that.setData({
            recommends: songs    //刷新数据显示所有歌曲信息
          });
          var idsMap = {};
          var len = keys.length;
         // console.log(keys);
          for (var i = 0; i < len; i++) {
            var k = keys[i];
            //  rs.push(Object.assign({
            //    id: k,
            //  }, songs[k]));
            idsMap[k] = {
              preid: i > 0 ? keys[i - 1] : 0,
              nextid: i < len - 1 ? keys[i + 1] : 0
            }
          }
          idsMap[keys[0]].preid = keys[len - 1];
          idsMap[keys[len - 1]].nextid = keys[0];
          //console.log(idsMap);
          wx.setStorageSync('ids', idsMap);
        } else {
          //console.log(1111111111);
          that.setData({
            modalHidden2: false,
            valueId: currentId
          });
        }
        //console.log(songs)

        //把所有歌曲上一首下一首的顺序存到本地
      },
      fail: function () {
        console.log(请求失败);
      }
    });
    // 页面初始化 options为页面跳转所带来的参数
  },
  playTap: function (e) {
    const dataset = e.currentTarget.dataset;
    //console.log(dataset.id);
    var that = this;
    var theid = dataset.id;
    wx.navigateTo({
      url: '../../play/play?id=' + theid + '&singkey=' + that.key //跳转到播放页面并把歌id传过去
    })
  },
  modalChangeConfirm2: function (e) {
   const dataset = e.currentTarget.dataset;
   this.setData({
      modalHidden2: true
    })
    var theid = dataset.id;
    //console.log(theid)
    wx.redirectTo({
      url: '../search?id=' + theid
    })
    // this.onLoad();
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.key,
      icon: "search", size: "20"
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