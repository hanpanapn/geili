<template>
  <div class="p-member-index">
    <van-address-list :disabled-list="list"   @add="onAdd" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  middleware: ["salesmanIsLogin"],
  async mounted() {
    let list = await this.getList();
    this.list = list.data.rows.map((e) => {
      return {
        id: e.id,
        name: e.lianxi,
        tel: e.mobile,
        address: e.addr,
        isDefault: true,
      };
    });
    console.log(list);

    // 键名	说明	类型
    // id	每条地址的唯一标识	number | string
    // name	收货人姓名	string
    // tel	收货人手机号	number | string
    // address	收货地址	string
    // isDefault
  },
  methods: {
    async onAdd() {
      this.$router.push({
        path: "/salesman/member/add",
      });
    },

    async getList() {
      let res = await this.$axios({
        url: "/b/member/getlist",
        method: "post",
      });
      return res;
    },
  },
};
</script>

<style lang="less" scoped>
.p-member-index{
  background: #ccc;
}
</style>