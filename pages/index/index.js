const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    circular: true,
    autoplay: true,
    banners: [],
    categories: [],
    activeCategoryId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTitle()
    this.getBanners()
    this.getCategories()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  setTitle: function() {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
  },
  getBanners: function() {
    wx.request({
        url:`https://api.it120.cc/${app.globalData.subDomain}/banner/list`,
        success:res=>{
          if(res.data.code === 0) {
            this.setData({
              banners: res.data.data
            })
          }
        }
    })
  },
  getCategories: function() {
    wx.request({
      url:`https://api.it120.cc/${app.globalData.subDomain}/shop/goods/category/all`,
      success:res=>{
        if(res.data.code === 0) {
          this.setData({
            categories: [{id:0, name: '全部'}, ...res.data.data]
          })
        }
      }
    })
  },
  tabClick: function(e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    })
  }

})