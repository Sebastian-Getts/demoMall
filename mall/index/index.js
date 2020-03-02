import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: []
  },
  //options(Object)
  onLoad: function (options) {
    //通过es6的promise特性解决回调地狱问题

    this.getSwiperList();
  },

  getSwiperList() {
    request({ url: "http://localhost:8080/swiper/top" })
      .then(res => {
        console.log(res.data);
        this.setData({
          swiperList: res.data.message
        })
      })
  },

  getCateList() {
    request({ url: "http://localhost:8080/swiper/top" })
      .then(res => {
        console.log(res.data);
        this.setData({
          swiperList: res.data.message
        })
      })
  }
});
