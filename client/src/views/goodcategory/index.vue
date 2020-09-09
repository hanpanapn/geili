<template>
  <div>
    <div class="cardshadow roleListTable">
      <div>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="mini"
          @click="addUserFn"
          plain
        >添加</el-button>
      </div>
      <el-table :data="userListData" border>
        <el-table-column fixed prop="created_at" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      userListData: [],
      dialogVisible: false,
      title: "",
      formkey: 0,
    };
  },
  methods: {
    addUserFn() {
      this.dialogVisible = true;
      this.title = "添加";
       this.formkey =0;
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
      let res = await this.$axios.post("/admin/goodcategory/del", { id: row.id });
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

    getList() {
      let that = this;
      this.$request
        .fetchGoodCategoryList()
        .then((res) => {
          this.userListData = res.data.rows;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
</style>
