import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },

  Cates: [],

  async getCates() {
    //es6
    // request({ url: "/categories" })
    //   .then(res => {
    //     this.Cates = res.data.message;

    //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })

    //es7
    const res = await request({ url: '/categories' });
    this.Cates = res;
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  },
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");

    if (!Cates) {
      //不存在
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        console.log('=========after checking time...');
        console.log(Date.now() - Cates.time);
        this.getCates();
      } else {
        console.log('using storage  ...');
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },


})