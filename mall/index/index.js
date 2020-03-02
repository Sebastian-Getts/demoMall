import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    //通过es6的promise特性解决回调地狱问题

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  getSwiperList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
      .then(res => {
        this.setData({
          swiperList: res.data.message
        })
      })
  },

  getCateList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
      .then(res => {
        this.setData({
          catesList: res.data.message
        })
      })
  },

  getFloorList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata" })
      .then(res => {
        console.log(res.data);
        this.setData({
          floorList: res.data.message
        })
      })
  }
});
