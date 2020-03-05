// mall/order/index.js
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

  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabList } = this.data;
    tabList.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabList
    })
  },


})