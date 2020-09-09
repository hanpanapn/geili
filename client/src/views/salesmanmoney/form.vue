<template>
  <el-dialog
    :title="'业务员提成'"
    width="950px"
    :visible.sync="visible"
    destroy-on-close
    @close="closeCallback"
  >
    <el-table :data="goodList" border>
      <el-table-column fixed prop="created_at" label="订单编号"></el-table-column>
      <el-table-column prop="name" label="下单时间"></el-table-column>
      <el-table-column prop="name" label="门店名称"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="name" label="数量"></el-table-column>
      <el-table-column prop="name" label="单价"></el-table-column>
      <el-table-column prop="name" label="合计金额"></el-table-column>
      <el-table-column prop="name" label="提成金额"></el-table-column>
      <!-- <el-table-column prop="goodcategory.category_name" label="商品分类">
          <template slot-scope="scope">
            <span>{{ scope.row['goodcategory.category_name'] }}</span>
          </template>
      </el-table-column>-->

       
    </el-table>
  </el-dialog>
</template>

<script>
import Cookies from "js-cookie";
export default {
  // name: "userInfo",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    formkey: {
      type: Number,
      default: 0,
    },
  },

  async mounted() {
    if (this.formkey) {
      await this.getModel(this.formkey);
    }
    await this.getGoodCate();
  },
  data() {
    return {
      header: { Authorization: "Bearer" + Cookies.get("access_token") },
      visible: this.dialogVisible,
      formData: {},
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        categoryid: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        price_s: [
          { required: true, message: "请输入单价(含税)", trigger: "blur" },
        ],
        price_ns: [
          { required: true, message: "请输入单价(不含税)", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序值", trigger: "blur" }],
        pers: [{ required: true, message: "请输入商品提成", trigger: "blur" }],
      },
      //商品分类
      goodcate: [],
    };
  },
  methods: {
    //商品分类
    async getGoodCate() {
      this.$request
        .fetchGoodCategoryList()
        .then((res) => {
          this.goodcate = res.data.rows.map((e) => {
            return {
              value: e.id,
              label: e.name,
            };
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handlethumbnailSuccess(res, file) {
      this.formData.thumbnail = res.data[0];
      alert(this.formData.thumbnail);
    },
    beforethumbnailUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!(isJPG || isPNG)) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("图片大小不能超过 5MB!");
      }
      // eslint-disable-next-line no-mixed-operators
      return (isLt5M && isJPG) || isPNG;
    },
    closeCallback() {
      this.$emit("successCallback");
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$axios.post("/good/add", this.formData);
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "success",
          });
          this.visible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.formData = {};
    },
    async getModel(id) {
      let res = await this.$axios.post("/good/get", { id: id });
      this.formData = res.data;
    },
  },
};
</script>
<style scoped>
.demo-ruleForm {
  width: 460px;
  padding-top: 25px;
}
.el-select {
  width: 100%;
}
.card {
  width: 560px;
  padding-bottom: 15px;
  margin: 0px auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
