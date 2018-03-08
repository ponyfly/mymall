//app.js
App({
  onLaunch: function () {
    var that = this
    //获取商城名称
    wx.request({
      url: `https://api.it120.cc/${that.globalData.subDomain}/config/get-value`,
      data: {
        key: 'mallName'
      },
      success: function(res) {
        if(res.data.code === 0) {
          wx.setStorageSync('mallName', res.data.data.value)
        }
      }
    })
    //获取积分赠送规则
    wx.request({
      url: `https://api.it120.cc/${that.globalData.subDomain}/score/send/rule`,
      data: {
        code: 'goodReputation'
      },
      success: function(res) {
        if(res.data.code === 0) {   
          that.globalData.order_reputation_score = res.data.data[0].score
        }
      }
    })
    //获取最少充值
    wx.request({
      url: `https://api.it120.cc/${that.globalData.subDomain}/config/get-value`,
      data: {
        key: 'recharge_amount_min'
      },
      success: function (res) {
        if (res.data.code === 0) {
          that.globalData.recharge_amount_min = res.data.data.value
        }
      }
    })
    this.login()
  },
  login: function() {
    var that = this
    var token = that.globalData.token //基于token的验证，1.用户通过用户名和密码发送请求。2.程序验证3.程序返回一个签名的token 给客户端。4.客户端储存token,并且每次用于每次发送请求。5.服务端验证token并返回数据。所以在用户退出小程序之前，一直会使用该token发送请求和接受数据
    
    if (token) {
      wx.request({//教研登录token是否有效
        url: `https://api.it120.cc/${that.globalData.subDomain}/user/check-token`,
        data: {
          token: token
        },
        success: function(res) {
          if(res.data.code !== 0) {//token无效、过期
            that.globalData.token = null //清空token，重新登录
            that.login()
          }
        }
      })
      return
    }
    wx.login({
      success: function(res) {
        console.log(res)
        wx.request({
          url: `https://api.it120.cc/${that.globalData.subDomain}/user/wxapp/login`,//小程序登录，获取到 token 后可保存到本地存储，以后用该 token 进行相关用户授权接口的调用
          data: {
            code: res.code
          },
          success: function(res) {
            if(res.data.code === 10000) {
              //去注册
              that.registerUser()
              return
            }
            if(res.data.code !== 0) {
              //登录错误
              wx.hideLoading()
              wx.showModel({
                title: '提示',
                content: '无法登陆，请重试',
                showCancel: false 
              })
              return
            }
            //存储到全局
            that.globalData.token = res.data.data.token
            that.globalData.uid = res.data.data.uid
          }
        })
      }
    })
  },
  registerUser: function() {
    var that = this
    wx.login({
      success: function(res) {
        var code = res.code
        wx.getUserInfo({
          success: function(res) {
            var encryptedData = res.encryptedData
            var iv = res.iv            
            wx.request({
              url: `https://api.it120.cc/${that.globalData.subDomain}/user/wxapp/register/complex`,
              data: {code, encryptedData, iv
          },
              success: function (res) {
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
  },
  getUserInfo:function(cb) {
    var that = this
    if (that.globalData.userInfo) {
      typeof cb === 'function' && cb(that.globalData.userInfo)
    } else {
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res){
              that.globalData.userInfo = res.userInfo
              typeof cb === 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    subDomain: 'zzc',
    shareProfile: '百款精品商品，总有一款适合您'
  }
})