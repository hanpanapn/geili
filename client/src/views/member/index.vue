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
        <el-form-item label="客户名称">
          <el-input v-model="fData.name"  size="small" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
          <el-button type="primary" size="small" @click="fData={}">重置</el-button>
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cardshadow roleListTable">
      <el-table :data="goodList" border>
        <el-table-column fixed prop="created_at" label="创建时间">
           <template slot-scope="props">
             {{moment(props.row.created_at).format('YYYY-MM-DD HH:mm:ss')}}
           </template>
        </el-table-column>

        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="lianxi" label="联系人"></el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column prop="addr" label="所属区域"></el-table-column>
        <el-table-column prop="account" label="登录账号"></el-table-column>
        <el-table-column prop="password" label="登录密码"></el-table-column>
        <el-table-column prop="money" label="余额"></el-table-column>
        <el-table-column prop="status" label="审核状态">
          <template slot-scope="scope">
            <el-tag
            size='small'
              v-if="scope.row.status=='0'"
              :type="'primary'"
              disable-transitions
            >审核中</el-tag>
            <el-tag
             size='small'
              v-else-if="scope.row.status=='1'"
              :type="'primary'"
              disable-transitions
            >通过</el-tag>
             <el-tag
              size='small'
              v-else-if="scope.row.status=='2'"
              :type="'danger'"
              disable-transitions
            >拒绝</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleShenHe(scope.$index, scope.row)">审核</el-button>
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
      :shenhe="shenhe"
      @successCallback="successCallback"
    />
  </div>
</template>

<script>
import PageForm from "./form";
import moment from 'moment'
export default {
  // name: "articleList",
  components: { PageForm },
  data() {
    return {
      //是否点击了审核按钮
      shenhe: false,
      fData: {},
      total: 0,
      goodList: [],
      dialogVisible: false,
      title: "",
      formkey: 0,
    };
  },
  methods: {
    moment,
    handleSearch() {
      let p=Object.assign({},this.fData)
      
      if (p.stime) {
         p.stime=p.stime?moment(p.stime).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD")
      }
     if (p.etime) {
        p.etime=p.etime?p.etime:moment().format("YYYY-MM-DD HH:mm:ss") 
     }
     
      this.getList(p);  
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
    handleShenHe(index, row) {
      this.dialogVisible = true;
      this.title = "审核";
      this.formkey = +row.id;

      this.shenhe = true;
    },
    successCallback() {
      this.dialogVisible = false;
      this.getList();
      this.shenhe = false;
    },
    //删除
    async handleDelete(index, row) {
      let res = await this.$axios.post("/admin/member/delmodel", { id: row.id });
      if (res.status == "200") {
        this.$message({
          showClose: true,
          message:'操作成功',
          type: "success",
        });
        this.getList();
      } else {
        console.error(res.statusText);
      }
    },

    async getList(params) {
      let response = await this.$axios.post("/admin/member/getpagelist", {
        ...params,
        currentPage: 1,
        pageSize: 10,
      });

      this.goodList = response.data.data.rows;
      this.total = response.data.data.count;
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
