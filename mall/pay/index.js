import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncwx.js";
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    });
  },

  async handleOrderPay() {
    console.log('pay btn clicked..')
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/mall/auth/index',
      });

    }

    const header = { Authorization: token };
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_number: v.goods_number,
      goods_price: v.goods_price
    }))

    try {
      const order_price = this.data.totalPrice;
      const orderParms = { order_price, consignee_addr, goods };
      const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: { orderParms, header } });

      //预支付
      const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", header, data: { order_number } });

      await requestPayment(pay);

      await request({ url: "/my/orders/chkOrder", method: "POST", header, data: { order_number } });
      await showToast({ title: "支付成功" })

      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.wx.setStorageSync("cart", newCart);

    } catch (error) {
      console.log(error);
    }
  }

})