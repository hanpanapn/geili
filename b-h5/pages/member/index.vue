<template>
  <div>
    <div
      style="display: flex;
    justify-content: flex-start;
    align-items: self-start;
    flex-direction: row;"
    >
      <van-sidebar v-model="activeKey">
        <van-sidebar-item :title="item.name" v-for="(item,index) in goodCate" :key="index" />
      </van-sidebar>

      <div style="width:100%;">
        <van-card
          v-for="(item,index) in goodsList"
          :key="index"
          num="2"
          :price="item.price_s"
          :desc="item.descs"
          :title="item.name"
          :thumb="item.thumbnail"
        >
          <template #footer>
            <van-button size="mini" @click="addCart(item)">加入购物车</van-button>
          </template>
        </van-card>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="goodCart.totalNum" />

      <van-goods-action-button type="danger" text="立即购买" @click="goBuy" />
    </van-goods-action>
  </div>
</template>
<script>
export default {
  middleware: ["memberIsLogin"],
  data() {
    return {
      goodCate: [],
      activeKey: "",
      //购物车
      goodCart: {
        totalMoney: 0, //总金额
        totalMoneySui: 0, //含税金额
        totalNum: 0, //总商品数量
        list: [] //商品信息  其中加了自定义num:此商品的购买数量
      }
    };
  },
  async mounted() {
    localStorage.setItem("utype", this.$route.query.utype);
    this.goodCate = await this.getGoodCate();
    this.goodsList = await this.getGoods(this.goodCate[0].id);
    console.log(this.goodsList);
  },
  methods: {
    //加入购物车
    async addCart(e) {
      console.log(e);

      let temp = Object.assign({}, this.goodCart);
      temp.totalMoney += e.price_s;
      temp.totalMoneySui += e.price_ns;
      temp.totalNum += 1;

      //查看购物车中是否有此商品，如果有，只是数量+1
      let isHas = temp.list.filter(k => k.id == e.id);
      if (isHas && isHas.length > 0) {
        let a = +temp.list.filter(k => k.id == e.id)[0].num;
        temp.list.filter(k => k.id == e.id)[0].num = a + 1;
      } else {
        e.num = 1;
        temp.list.push(e);
      }
      this.goodCart = temp;
      console.log(" this.goodCart", this.goodCart);
    },
    //清空购物车
    async cleanCart() {
      this.goodCart = {
        totalMoney: 0, //总金额
        totalMoneySui: 0, //含税金额
        totalNum: 0, //总商品数量
        list: [] //商品信息  其中加了自定义num:此商品的购买数量
      };
    },
    //商品分类
    async getGoodCate() {
      let res = await this.$axios({
        url: "/c/goodcategory/getlist",
        method: "post",
        data: {}
      });
      console.log(res);
      return res.data.rows;
    },
    //获取商品列表
    async getGoods(cateid) {
      let res = await this.$axios({
        url: "/c/good/getlist",
        method: "post",
        data: {
          category_id: cateid
        }
      });
      return res.data.rows;
    },
    //点击购买
    async goBuy() {
      localStorage.setItem("goodCart", JSON.stringify(this.goodCart));
      this.$router.push({
        path: "/member/buy"
      });
    }
  }
};
</script>