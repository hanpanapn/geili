<template>
  <div>
    <div class="cardshadow roleListTable search_card">
      <el-form :inline="true">
        <el-form-item label="商品分类">
          <el-select v-model="fData.category_id" size="small" style="width:100px;">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in goodcate"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input size="small" v-model="fData.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
          <el-button type="primary" size="small" @click="handleResetSearch">重置</el-button>
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cardshadow roleListTable">
      <el-table :data="goodList" border>
        <el-table-column fixed prop="created_at" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="goodcategory.category_name" label="商品分类">
          <template slot-scope="scope">
            <span>{{ scope.row['goodcategory.category_name'] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price_s" label="单价(含税)"></el-table-column>
        <el-table-column prop="price_ns" label="单价(不含税)"></el-table-column>
        <el-table-column prop="sort" label="排序值"></el-table-column>
        <el-table-column prop="pers" label="商品提成"></el-table-column>
        <el-table-column prop="desc" label="商品摘要"></el-table-column>

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
        pageSize: 8,
      },
      total: 0,
      goodList: [],
      dialogVisible: false,
      title: "",
      formkey: 0,

      //商品分类
      goodcate: [],
    };
  },
  methods: {
    handleResetSearch() {
      let p = Object.assign({}, this.fData);
      this.fData = {
        currentPage: p.currentPage,
        pageSize: p.pageSize,
      };
    },
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
      this.getList();
    },
    //删除
    async handleDelete(index, row) {
      let res = await this.$axios.post("/admin/good/del", { id: row.id });
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

    async getList(p) {
      let response = await this.$axios.post("/admin/good/getlist", p);

      this.goodList = response.data.data.rows;
      this.total = response.data.data.count;
    },
    //页面改变
    currentChange(page) {
      this.fData.currentPage = page;
      this.getList(this.fData);
    },
    //商品分类
    async getGoodCate() {
      let res = await this.$request.fetchGoodCategoryList();
      console.log("商品分类", res);
      this.goodcate = res.data.rows.map((e) => {
        return {
          value: e.id,
          label: e.name,
        };
      });
    },
  },
  async mounted() {
    await this.getGoodCate();
    await this.getList();
  },
};
</script>

<style>
.search_card .el-form-item {
  margin-bottom: 0px;
}
</style>
