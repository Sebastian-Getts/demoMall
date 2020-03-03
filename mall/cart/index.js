import { getSetting, chooseAddress, openSetting } from "../../utils/asyncwx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },

  onShow() {
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }

  }
})