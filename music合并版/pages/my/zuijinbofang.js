
var data = require('../../utils/data.js').songs;
var favUtil = require('../../utils/fav.js');
var app = getApp();
var topid = 0;
Page({
	data: {
		toastHidden: true,
		currentIds:[]
	},
	onLaunch: function () {
    //调用API从本地缓存中获取数据
 
  
   
  },
	onLoad: function(param) {
  var that = this;
		  wx.getStorage({
      key: 'key',
      success: function(res) {
          that.currentIds = res.data;
		  for(var i = 0;i<that.currentIds.length;i++){
			   topid = that.currentIds[i].topid;
			   console.log(topid);
		  }
          console.log(that.currentIds);
        	// topid = that.currentIds[i].topid;
    		// console.log(topid);
      } 
    })
       wx.setNavigationBarTitle({
      	title: '最近播放'
    	});
    	this.setData({
    		currentIds:app.currentIds
    	});	
console.log(app.currentIds);

	},
	 no2: function(e) {
		  const a = e.currentTarget.dataset;
		
		  console.log(topid);
    wx.navigateTo({
      url: `../play/play?id=`+a.id+'&topid='+topid, //跳转到播放页面并把歌id传过去
      // url: `../my/zuijinbofang` //跳转到播放页面并把歌id传过去
    })
      
  },
  
})