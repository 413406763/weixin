// pages/my/bendigequ.js
Page({
  data:{
    title: "",
  },
   //事件处理函数
  bindViewTap: function() {
    
  },
   onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     wx.setNavigationBarTitle({
      title: '下载歌曲'
    }),
      this.setData({
      title: options.title
    })
  }
 
})