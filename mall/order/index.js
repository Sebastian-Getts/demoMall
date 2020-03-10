import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      name: "全部",
      id: 0,
      isActive: true
    }, {
      name: "待付款",
      id: 1,
      isActive: false
    }, {
      name: "待发货",
      id: 3,
      isActive: false
    }, {
      name: "退款/退货",
      id: 4,
      isActive: false
    }],
  },

  onShow() {
    // const token = wx.getStorageSync("token");
    // if (!token) {
    //   wx.navigateTo({
    //     url: '/mall/auth/index',
    //     complete: () => { }
    //   });
    //   return;
    // }

    let pages = getCurrentPages();
    let currentPages = pages[pages.length - 1];
    console.log(currentPages.options);
    const { type } = currentPages.options;
    this.changeItemType(type - 1);
    this.getOrders(type);
  },

  async getOrders(type) {
    const res = await request({ url: '/my/orders/all', data: { type } });
    console.log(res);
  },
  changeItemType(index) {
    let { tabList } = this.data;
    tabList.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabList
    })
  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.changeItemType(index);
    this.getOrders(index + 1);
  },


})