
var data = require('../../utils/data.js').songs;
// var data = [];
var favUtil = require('../../utils/fav.js');
var strRe = /\[(\d{2}:\d{2})\.\d{2,}\](.*)/;//正则表达式:时间段

Page({
	data: {
		toastHidden: true//消息是否隐藏
	},
	onLoad: function(param) {
		this.setData({
			currentId: param.id,//页面时传过来的歌曲id
			
		})
    
		
        

		this.idsMap = wx.getStorageSync('ids') || {};//从本地缓存中获取所有的连续顺序歌曲列表
		this.idsArr = Object.keys(this.idsMap);//歌曲列表的所有id
        data[param.id] = data[102636799];//搜不到歌曲时的原始歌曲:告白气球
		for(var i in this.idsMap){
			data[i] = data[102636799];//所有的列表都是原始歌曲:告白气球
		}
        
		if(param.singkey){//如果有关键词传过来
			console.log(param.singkey);
			console.log(param.id);
		   this.keyurl = 'http://route.showapi.com/213-1?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&keyword='+param.singkey+'&page=1';

		   this.idsMap[param.id] = {//关键词的歌曲都设置成一首歌曲
            preid: param.id,
            nextid: param.id
          }
		//    this.idsMap[param.id].preid = this.idsMap[param.id];
		//    this.idsMap[param.id].nextid = this.idsMap[param.id];
	   } else {
		   this.keyurl = null;//表示不是关键词的接口
		   this.topid = param.topid;//榜单
		//    console.log(this.topid);
	   }


	},
	onReady: function() {
		this.reload(this.data.currentId);//播放歌曲的方法
	},
	onShow: function() {
		this.animation = wx.createAnimation({//动画
			duration: 1000,
			timingFunction: 'ease',
		});
	},
	onHide: function() {
		this.clearTurner();//暂停
	},
	onUnload: function() {
		this.clearTurner();//暂停
	},
	errorEvent: function(e) {//错误
		console.log("加载资源失败 code：", e.detail.errMsg);
		// this.reload(this.idsMap[Number(this.data.currentId)].nextid);
	},
	prevEvent: function(e) {//播放上一首歌曲
		// console.log("pre:"+this.idsMap[Number(this.data.currentId)].preid);
		this.reload(this.idsMap[Number(this.data.currentId)].preid);
	},
	nextEvent: function(e) {//播放下一首歌曲
		this.reload(this.idsMap[Number(this.data.currentId)].nextid);
	},
	actionEvent: function(e) {//点击播放暂停按钮执行的方法
		var method = this.data.status === 'play' ? 'pause' : 'play';//转化播放状态
		this.setData({//刷新播放状态
			status: method,
			action: {
				method: method
			}
		});

		if (method === 'pause') this.clearTurner();//如果是暂停,就暂停播放
	},
	switchModeEvent: function(e) {
		var newMode = 'loop';
		var toastMsg = "列表循环";
		if (this.data.mode === 'loop') {
			newMode = 'single';
			toastMsg = "单曲循环";
		} else if (this.data.mode === 'single') {
			newMode = 'random';
			toastMsg = "随机播放";
		}
		this.setData({
			mode: newMode,
			toastMsg: toastMsg,
			toastHidden: false
		})
	},
	switchbgEvent: function(e) {//是否显示歌词
		this.setData({
			lyricHidden: !this.data.lyricHidden
		});
	},
	favEvent: function(e) {//取消收藏
		if (this.data.fav === 'unlike') {//是否为不喜欢
			this.setData({
				favHidden: false
			});
			return;
		}

		var id = this.data.currentId,//当前歌曲id
			fav = wx.getStorageSync('fav') || {},//从本地缓存中取出收藏的歌曲
			favName = fav[id],
			favlist = wx.getStorageSync('favlist') || {},//从本地缓存中取出收藏的歌曲列表
			favData = favlist[favName];

		delete fav[id];//不想收藏就删除歌曲id
		if (favData) {
			favData.list.splice(favData.list.indexOf(id), 1);

			if (favData.list.length) {
				favData.picurl = data[favData.list[favData.list.length - 1]].album.picUrl;
			} else {
				favData.picurl = '';
			}
		}

		wx.setStorageSync('fav', fav);
		wx.setStorageSync('favlist', favlist);//把新的喜欢歌曲列表放入本地缓存

		this.setData({
			fav: 'unlike',
			favlist: favUtil.getFavList()
		});
	},
	addFavItem: function(e) {//添加收藏歌曲
		this.addFav(e.detail.value);
	},
	favItemTap: function(e) {
		this.addFav(e.currentTarget.dataset.name);
	},
	actionSheetChange: function(e) {
		this.setData({
			favHidden: true
		});
	},
	timeupdateEvent: function(e) {//时间刷新
		var t = e.detail.currentTime,//当前歌曲时间
			d = e.detail.duration,//歌曲总时间
			step = this.isEnSong ? 78 : 55,
			list = this.data.lyricList,//歌词列表
			cIndex = this.data.currentIndex;

		if (cIndex < list.length - 1 && t >= list[cIndex + 1].time) {//查找当前时间的歌词
			this.animation.translateY(-step * (cIndex + 1)).step();//动画:歌词上移

			this.setData({
				currentTime: t,//刷新当前时间
				currentIndex: cIndex + 1,
				animationData: this.animation.export()
			});
		}

		this.setData({
			per: Math.floor(t / d * 100),//时间段百分比,进度条
			timeText: this.formatTime(t),//当前时间
			durationText: this.formatTime(d)//总时间
		});

		if (!this.turner && this.data.status === 'play') {//是否在播放
			this.turner = setInterval(() => {
				this.setData({
					deg: this.data.deg + 1,
				})
			}, 50);
		}
	},
	endEvent: function(e) {//播放结束时播放下一首
		this.reload(this.getNextSongId());
	},
	toastChange: function(e) {//是否隐藏消息
		this.setData({
			toastHidden: true
		});
	},
	reload: function(id) {//播放歌曲
		var song = data[id] || {};//
        
		var url = '';
        if(this.keyurl){//判断是否是关键词接口
			url = this.keyurl;
		}else{
			url = 'http://route.showapi.com/213-4?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&topid='+this.topid;
		}
        // console.log(url);
        var that = this;
        this.ly = "";
   //================查找歌词===================
   wx.request({
      url: 'http://route.showapi.com/213-2?showapi_appid=28882&showapi_sign=de117735a0454184a7d5b4253e286842&musicid='+id,
      success: function (res) {
        var json = res.data;
        
        var arrData = json["showapi_res_body"];
		// that.ly = arrData.lyric;
        // console.log(ly)

		//替换标点符号的编码
		function strNumDiscode(str){
    str = str.replace(/&#58;/g, ':');
    str = str.replace(/&#46;/g, '.');
    str = str.replace(/&#32;/g, ' ');
	str = str.replace(/&#13;/g, ' ');
    str = str.replace(/&#10;/g, '\n');
	str = str.replace(/&#45;/g, '-');
	     return str;
		}
        
		that.ly = strNumDiscode(arrData.lyric);
		// console.log(that.ly);
        

		var ob = {
			zh : that.ly
		};

        that.setData({
			lyricList: that.getLyricList(ob)
		});

        


      },
      fail: function () {
        console.log(请求失败);
      }
    });





    //================查找歌曲===================
    wx.request({
      url: url,
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
		if(that.keyurl){
			songs = arrData.pagebean.contentlist;
		}else{
			songs = arrData.pagebean.songlist;
		}
        // var songs = arrData.pagebean.songlist;
        // console.log("songs:"+songs);
        for(var i in songs){
			
			if(id == songs[i].songid){
				console.log("找到：");
				
				  if(songs[i].url){
					  song.mp3Url = songs[i].url;
				  }else{
					  song.mp3Url = songs[i].m4a;
				  }
                  console.log(song.mp3Url);
				  song.artists = songs[i].singername;
				  song.name = songs[i].songname;
				//   song.zh = that.ly;
				  song.en = "";
				  song.album.picUrl = songs[i].albumpic_big;
				  song.album.name = songs[i].albumname;
			}

        }


		that.clearTurner();
		that.animation.translateY(0).step({
			duration: 1000,
			delay: 100
		});
		that.setData({
			per: 0,
			deg: 0,
			status: 'play',
			lyricHidden: true,
			toastHidden: true,
			favHidden: true,
			fav: wx.getStorageSync('fav')[id] ? 'liked' : 'unlike',
			mode: that.data.mode || 'loop',
			currentId: id,
			currentTime: '0',
			currentIndex: -1,
			timeText: '00:00',
			durationText: '',
			animationData: that.animation.export(),
			title: song.name,
			picurl: song.album.picUrl,
			src: song.mp3Url,
			action: {
				method: 'setCurrentTime',
				data: 0
			},
			// lyricList: that.getLyricList(song),
			favlist: favUtil.getFavList()
		});

		wx.setNavigationBarTitle({
			title: song.name
		});

		setTimeout(() => {
			that.setData({
				action: {
					method: 'play'
				}
			})
		}, 100);


      },
      fail: function () {
        console.log(请求失败);
      }
    });
 


    


	},
	getNextSongId: function() {//获取播放模式
		if (this.data.mode === 'single') {
			return this.data.currentId;
		} else if (this.data.mode === 'random') {
			return idsArr[Math.floor(Math.random() * idsArr.length)]
		} else if (this.data.mode === 'loop') {
			return this.idsMap[Number(this.data.currentId)].nextid;
		}
	},

	//获取歌词列表,然后转换
	getLyricList: function(song) {
		var obj = {},
			lyricList = [],
			zh = song.zh ? song.zh.split('\n') : [],//中文歌词--字符串
			en = song.en ? song.en.split('\n') : [];//英文歌词--字符串
        //遍历中文歌词,转换成歌词数组
		zh.forEach(function(str) {//str=zh[i]
			var arr = str.match(strRe);//正则匹配,找出有时间表的歌词
			// console.log(str);
			// console.log("============");
			// console.log(arr);
			if (!arr) return;

			var k = arr[1],
				v = arr[2] || '(music)';//k=[00:04.19],v=歌词

			if (!obj[k]) obj[k] = {};
			obj[k].zh = v;//放入对象
		});
		if (en.length) {//判断有没有英文歌词
			this.isEnSong = true;
		} else {
			this.isEnSong = false;
		}

		en.forEach(function(str) {
			var arr = str.match(strRe);
			if (!arr) return;

			var k = arr[1],
				v = arr[2] || '(music)';

			if (!obj[k]) obj[k] = {};
			obj[k].en = v;
		});

		for (var t in obj) {
			var ts = t.split(':');//分隔时间段成数组
			var time = parseInt(ts[0]) * 60 + parseInt(ts[1]);//时间

			if (lyricList.length) {
				lyricList[lyricList.length - 1].endtime = time;//歌词列表的最后一个时间,当作歌曲的总长
			}

			lyricList.push({//放入到歌词列表
				time: time,
				zh: obj[t].zh,
				en: obj[t].en
			});
		}

		return lyricList;
	},
	clearTurner: function() {
		if (this.turner) {
			clearInterval(this.turner);
			this.turner = null;
		}
	},
	addFav: function(favName) {//添加收藏
		if (!favName) {
			return;
		}

		var id = this.data.currentId,
			fav = wx.getStorageSync('fav') || {},
			favlist = wx.getStorageSync('favlist') || {};

		fav[id] = favName;
		if (!favlist[favName]) favlist[favName] = {
			picurl: '',
			list: []
		}

		var favData = favlist[favName];
		favData.picurl = data[id].album.picUrl;
		favData.list.push(id);

		wx.setStorageSync('fav', fav);
		wx.setStorageSync('favlist', favlist);

		this.setData({
			fav: 'liked',
			toastMsg: '收藏成功',
			toastHidden: false,
			favHidden: true,
			favlist: favUtil.getFavList()
		});
	},
	formatTime: function(time) {//时间格式
		time = Math.floor(time);
		var m = Math.floor(time / 60).toString();
		m = m.length < 2 ? '0' + m : m;

		var s = (time - parseInt(m) * 60).toString();
		s = s.length < 2 ? '0' + s : s;

		return `${m}:${s}`;
	}
})