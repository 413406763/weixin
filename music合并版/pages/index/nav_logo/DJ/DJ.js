// pages/index/nav_logo/DJ/DJ.js
Page({
  data:{},
    onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://route.showapi.com/213-1?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&keyword=DJ&page=1', 
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
   
        for(var i in arrData.pagebean.contentlist){

          if(i>20){
            break;
          }
          
          songs[i] = arrData.pagebean.contentlist[i];
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
    
    wx.navigateTo({
      url: `../../../play/play?id=`+dataset.id+'&singkey=DJ' //跳转到播放页面并把歌id传过去
    })

  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: 'DJ'
    });
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})