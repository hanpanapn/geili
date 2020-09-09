<template>
  <div>
    <div class="cardshadow roleListTable search_card">
      <el-form :inline="true">
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="fData.stime"
            size="small"
            type="date"
            placeholder="开始日期"
            style="width:130px;"
          ></el-date-picker>-
          <el-date-picker
            v-model="fData.etime"
            size="small"
            type="date"
            placeholder="截至日期"
            style="width:130px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select size="small" style="width:100px;">
            <el-option label="未支付" value="0"></el-option>
            <el-option label="已支付" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cardshadow roleListTable">
      <el-table :data="goodList" border style="width: 100%">
        <el-table-column prop="name" label="商家"></el-table-column>

        <el-table-column prop="name" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="name" label="下单时间" width="120"></el-table-column>

        <el-table-column prop="name" label="订单金额（含税）" width="140"></el-table-column>
        <el-table-column prop="name" label="订单金额（不含税）" width="150"></el-table-column>
        <el-table-column prop="name" label="支付金额" width="120"></el-table-column>
        <el-table-column prop="name" label="支付状态" width="120"></el-table-column>
        <el-table-column prop="name" label="销售总监" width="120"></el-table-column>
        <el-table-column prop="name" label="一级业务员" width="120"></el-table-column>

        <el-table-column prop="name" label="二级业务员" width="120"></el-table-column>

        <el-table-column type="expand" label="查看详情" width="100">
          <template slot-scope="props">
            
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="收货人：">里斯</el-form-item>
              <el-form-item label="收货地址：">北京市昌平区还阔以</el-form-item>
              <el-form-item label="联系方式：">15455548778</el-form-item>
              
            </el-form>

            <el-table :data="goodList" border style="width: 500px" size="small">
              <el-table-column prop="name" label="商品名称"></el-table-column>

              <el-table-column prop="name" label="购买数量"></el-table-column>
              <el-table-column prop="name" label="商品单价（含税）" width="140"></el-table-column>
              <el-table-column prop="name" label="商品单价（不含税）" width="150"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
        @prev-click="currentChange"
        @next-click="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  // name: "articleList",
  components: {},
  data() {
    return {
      fData: {},
      total: 0,
      goodList: [],
    };
  },
  methods: {
    successCallback() {
      this.dialogVisible = false;
      this.getList();
    },

    async getList() {
      let response = await this.$axios.post("/good/getlist", {
        name: "",
        currentPage: 1,
        pageSize: 10,
      });

      this.goodList = response.data.rows;
      this.total = response.data.count;
    },
    //页面改变
    currentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.getList({
        currentPage: page,
        pageSize: 10,
      });
    },
  },
  async mounted() {
    await this.getList();
  },
};
</script>

<style>
.search_card .el-form-item {
  margin-bottom: 0px;
}
</style>
