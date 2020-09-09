<template>
  <div>
    <div
      v-for="(item,index) in goodCart.list"
      :key="index"
    >商品名称：{{item.name}},购买数量：{{item.num}},含税价：{{item.price_s}},不含税价：{{item.price_ns}}，{{item.i}}</div>

    <div>
      支付方式：
      <van-radio-group v-model="fData.payway" direction="horizontal">
        <van-radio name="1">微信</van-radio>
        <van-radio name="2">余额</van-radio>
      </van-radio-group>
    </div>
    <div>
      支付金额：
      <van-radio-group v-model="fData.pricetype" direction="horizontal" @change="handlePriceType">
        <van-radio name="1">不含税</van-radio>
        <van-radio name="2">含税</van-radio>
      </van-radio-group>
    </div>
    <div>收获地址：xxx ,添加收货地址</div>
    <div>总金额：{{fData.totalMoney}}</div>
    <div>去支付</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodCart: {},
      fData: {}
    };
  },
  async mounted() {
    let cart = localStorage.getItem("goodCart");
    this.goodCart = JSON.parse(cart);
  },
  methods: {
    //
    handlePriceType(e) {
      if (+e === 1) {
        //不含税
        let totalPrice = 0;
        this.goodCart.list.forEach(e => {
          totalPrice+=(e.price_ns*e.num)//单价*数量
        });
        this.fData.totalMoney = totalPrice;
      } else {
        let totalPrice = 0;
        this.goodCart.list.forEach(e => {
          totalPrice+=(e.price_s*e.num)//单价*数量
        });
        this.fData.totalMoney = totalPrice;
      }
    }
  }
};
</script>