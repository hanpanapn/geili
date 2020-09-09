<template>
  <div>
    <div class="cardshadow roleListTable search_card">
      <el-form :inline="true">
        <el-form-item label="创建时间">
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
        <el-form-item label="名称">
          <el-input v-model="fData.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cardshadow roleListTable">
      <el-table :data="goodList" border>
        <el-table-column fixed prop="created_at" label="创建时间"></el-table-column>

        <el-table-column prop="mobile" label="账号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="bankname" label="开户行" />
        <el-table-column prop="banknumber" label="银行账号" />
        
        <el-table-column prop="mykeyfrom" label="邀请码" />
        <el-table-column prop="mykeyto" label="推荐码" />
        <!-- <el-table-column>
          <template slot-scope="scope">
            <span>{{ scope.row['goodcategory.category_name'] }}</span>
          </template>
        </el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      fData: {
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      goodList: [],
      dialogVisible: false,
      title: "",
      formkey: 0,
    };
  },
  methods: {
    handleSearch() {
      this.getList(this.fData);
    },
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
      this.getList(this.fData);
    },
    //删除
    async handleDelete(index, row) {
      let res = await this.$axios.post("/admin/salesmanuser/delmodel", {
        id: row.id,
      });
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

    async getList(option) {
      let response = await this.$axios.post(
        "/admin/salesmanuser/getpagelist",
        option
      );
      console.log("response", response);
      this.goodList = response.data.data.rows;
      this.total = response.data.data.count;
    },
    //页面改变
    currentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.fData.currentPage = page;
      this.getList(this.fData);
    },
  },
  async mounted() {
    await this.getList(this.fData);
  },
};
</script>

<style scoped>
</style>
