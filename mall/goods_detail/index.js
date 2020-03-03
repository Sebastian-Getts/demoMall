import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  GoodsObj: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsObj = goodsObj;
    console.log(goodsObj);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      }
    })
  },

  handlePreviewImage(e) {
    const current = e.currentTarget.dataset.url;
    const urls = this.GoodsObj.pics.map(v => v.pics_mid);
    wx.previewImage({
      current,
      urls

    })
  },

  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsObj.goods_id);
    if (index === -1) {
      this.GoodsObj.num = 1;
      cart.push(this.GoodsObj);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);

    wx.showToast({
      title: '添加成功~',
      icon: 'success',
      duration: 1500,
      mask: true,
    });


  }
})