
var app = getApp()
//var searchData = searchData
Page({
  data: {
    title: "",
    selectHide: false,
    inputValue: '',
    getSearch: [],
    modalHidden: true,
    modalHidden2: true,
    backValue: ''
  },
  //事件处理函数
  onReady: function () {

    wx.setNavigationBarTitle({
      title: '搜索',
      icon: "search", size: "20"
    })
  },
  bindInput: function (e) {//
    this.setData({
      inputValue: e.detail.value
    })
    //console.log('bindInput'+this.data.inputValue)
  },
  setSearchStorage: function (e) {
    // var id=e.target.dataset.id
    const dataset = e.currentTarget.dataset;
    let data;
    let localStorageValue = [];
    let foundFlag = false;
    //var name = this.data.inputValue ||this.data.itemName
    if (this.data.inputValue != '') {//判断输入的不为空
      //调用API从本地缓存中获取数据
      var searchData = wx.getStorageSync('searchData') || []
      //console.log(searchData.length)
      //  if(searchData.length == 0){
      //    searchData.push(this.data.inputValue)
      //    console.log("输入成功");
      //  }else
      if (this.data.inputValue.match(/\S+/g)) {//判断输入的是否是空格
        //    console.log(this.data.inputValue.match(/\S+/g) && true )
        for (var i = 0; i < searchData.length; i++) {//遍历现有数组中的对象
          //  console.log(typeof this.data.inputValue , this.data.inputValue);
          //  console.log(this.data.inputValue==" ");
          //  console.log(this.data.inputValue=="&nbsp;")
          //  console.log(typeof searchData[i],searchData[i]);
          // console.log(searchData[i]==" ");
          if (this.data.inputValue == searchData[i]) {//如果有相同的就不放进现有对象中
            foundFlag = true;
          }
        }
        if (!foundFlag) {//如果没有相同的就放进现有对象中
          searchData.unshift(this.data.inputValue);
          //console.log(searchData.length);
        }


      }
      wx.setStorageSync('searchData', searchData)
      wx.navigateTo({
        url: 'searchlist/searchlist?id=' + dataset.id
      },

        //console.log(dataset)
      );
      // console.log('马上就要跳转了！')

    } else {
      this.setData({
        modalHidden2: false  //
      })
      // console.log('空白的')
    };
  },
  gitSearchStorage: function (e) {
    const dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: 'searchlist/searchlist?id=' + dataset.id
    })
    //   console.log(dataset)
  },
  modalChangeConfirm: function () {
    wx.setStorageSync('searchData', [])
    this.setData({
      modalHidden: true
    })
    // wx.redirectTo({
    //   url: 'search'
    // })
    // this.onLoad();
  },
  modalChangeCancel: function () {
    this.setData({
      modalHidden: true
    })
  },
  clearSearchStorage: function () {
    this.setData({
      modalHidden: false
    });


  },
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      backValue: options.id
    })
    // var backValue=backValue;
    // if (backValue != " ") {
    //   //var getSearch = wx.getStorageSync('searchData');
    //   for (var i = 0; i < getSearch.length; i++) {
    //     //console.log(searchData[i])
    //     if (getSearch[i] == backValue) {
    //       getSearch.splice(backValue, 1);
    //     };
    //   }
    // }


  },
  onShow: function () {

    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      getSearch: getSearch,
      inputValue: ''
    })
    // console.log('search is onshow')
  },
  // onHide: function () {
  //   //console.log('search is onHide')
  //   wx.redirectTo({
  //     url: 'search'
  //   })
  // },
  // bindchange: function (e) {
  //   console.log('bindchange')
  // },
  clearInput: function () {
    this.setData({
      inputValue: ''
    })
  },
  modalChangeConfirm2: function () {
    this.setData({
      modalHidden2: true
    })
    // this.onLoad();
  },

})
