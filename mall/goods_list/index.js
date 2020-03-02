import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      name: "综合",
      id: 0,
      isActive: true
    }, {
      name: "销量",
      id: 1,
      isActive: false
    }, {
      name: "价格",
      id: 3,
      isActive: false
    }],
    goods: []
  },

  //接口需要的参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },

  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.queryParams });
    const total = res.total;
    this.totalPages = Math.ceil(total / this.queryParams.pagesize);
    this.setData({
      goods: [...this.data.goods, ...res.goods]
    })

    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabList } = this.data;
    tabList.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabList
    })
  },

  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页了~~~',
        icon: 'none',
      });

    } else {
      console.log('still have ...' + this.queryParams.pagenum);
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  onPullDownRefresh() {
    this.setData({
      goods: [],
    });
    this.queryParams.pagenum = 1;
    this.getGoodsList();
  }

})