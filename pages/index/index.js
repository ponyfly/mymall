const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    categories: [],
    activeCategoryId: 0,
    notices: null,
    loadingMoreHidden: true,
    goods: [],
    searchInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTitle()
    this.getBanners()
    this.getCategories()
    this.getNotices()
    this.getCoupons()
    this.getGoods(0)
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
  },
  getNotices: function () {
    wx.request({
      url:`https://api.it120.cc/${app.globalData.subDomain}/notice/list`,
      data: {pageSize: 5},
      success:res=>{
        if(res.data.code === 0) {
          this.setData({
            notices: res.data.data
          })
        }
      }
    })
  },
  getCoupons: function () {
    wx.request({
      url:`https://api.it120.cc/${app.globalData.subDomain}/discounts/coupons`,
      success:res=>{
        if(res.data.code === 0) {
          this.setData({
            coupons: res.data.data
          })
        }
      }
    })
  },
  getGoods: function (categoryId) {
    if (categoryId === 0) categoryId = ''
    wx.request({
      url:`https://api.it120.cc/${app.globalData.subDomain}/shop/goods/list`,
      data: {categoryId, nameLike : this.data.searchInput},
      success:res=>{
        this.setData({
          goods: [],
          loadingMoreHidden: true
        })
        if (res.data.code !==0 || res.data.data.length === 0) {
          this.setData({
            loadingMoreHidden: false
          })
          return
        }
        this.setData({
          goods: res.data.data
        })
      }
    })
  }
})