import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncwx.js"
import { login } from "../../utils/asyncwx.js"
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async bindGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail;
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };
      const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})