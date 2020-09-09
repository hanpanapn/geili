<template>
  <div>
    <div class="cardshadow roleListTable search_card">
      <el-form :inline="true">
        <el-form-item label="选择月份">
          <el-date-picker size="small" v-model="fData.dd" type="month" ></el-date-picker>
        </el-form-item>
        <el-form-item label="业务员名称">
          <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cardshadow roleListTable">
      <el-table :data="goodList" border>
        <el-table-column fixed prop="created_at" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="业务员名称"></el-table-column>
        <el-table-column prop="name" label="性别"></el-table-column>
        <el-table-column prop="name" label="手机号"></el-table-column>
        <el-table-column prop="name" label="银行卡号"></el-table-column>
        <el-table-column prop="name" label="开户行"></el-table-column>
        <el-table-column prop="name" label="提成金额"></el-table-column>
        <!-- <el-table-column prop="goodcategory.category_name" label="商品分类">
          <template slot-scope="scope">
            <span>{{ scope.row['goodcategory.category_name'] }}</span>
          </template>
        </el-table-column>-->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
           
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
    <page-form
      v-if="dialogVisible"
      :title="title"
      :dialogVisible="dialogVisible"
      :formkey="formkey"
      @successCallback="successCallback"
    />
  </div>
</template>

<script>
import PageForm from "./form";
export default {
  // name: "articleList",
  components: { PageForm },
  data() {
    return {
      fData: {},
      total: 0,
      goodList: [],
      dialogVisible: false,
      title: "",
      formkey: 0,
    };
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.title = "添加";
      this.formkey = 0;
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.title = "编辑";
      this.formkey = +row.id;
    },
    successCallback() {
      this.dialogVisible = false;
      this.getList();
    },
    //删除
    async handleDelete(index, row) {
      let res = await this.$axios.post("/good/del", { id: row.id });
      if (res.status == "200") {
        this.$message({
          showClose: true,
          message: res.data.message,
          type: "success",
        });
        this.getList();
      } else {
        console.error(res.statusText);
      }
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

<style scoped>
</style>
