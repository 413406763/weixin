wx.request({
  url: 'http://route.showapi.com/213-4?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&topid=26', //仅为示例，并非真实的接口地址
  data: {
     x: '' ,
     y: ''
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    // var songs = {};
    // var arr = [];
    console.log(res.data)
    var json =  res.data;
    
    var arrData = json["showapi_res_body"];
    // console.log(arrData)
    var songs = arrData.pagebean.songlist;
    
    for(var i in songs){
      console.log(songs[i].songid);
      console.log(songs[i].songname);
      console.log(songs[i].singername);
      // console.log(songs[i].albumname);
      console.log(songs[i].albumpic_big);
      console.log(songs[i].url);
      
    }
  },
  fail: function() {
    console.log(请求失败);
  }
})