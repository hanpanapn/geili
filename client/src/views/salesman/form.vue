<template>
  <el-dialog
    :title="'添加商品'"
    width="720px"
    :visible.sync="visible"
    destroy-on-close
    @close="closeCallback"
  >
    <el-form
      :model="formData"
      status-icon
      :rules="rules"
      ref="formData"
      label-width="120px"
      :inline="true"
    >
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          name="file"
          :headers="header"
          :action="this.$path+'editor/uploadImg'"
          :show-file-list="false"
          :on-success="handlethumbnailSuccess"
          :before-upload="beforethumbnailUpload"
        >
          <img v-if="formData.thumbnail" :src="formData.thumbnail" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <br />
      <el-form-item label="商品分类" prop="categoryid">
        <el-select v-model="formData.categoryid" placeholder="请选择" style="width:200px">
          <el-option
            v-for="item in goodcate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" autocomplete="off" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="单价(含税)" prop="price_s">
        <el-input-number
          v-model="formData.price_s"
          controls-position="right"
          :min="0"
          style="width:200px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="单价(不含税)" prop="price_ns">
        <el-input-number
          v-model="formData.price_ns"
          controls-position="right"
          :min="0"
          style="width:200px"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="排序值" prop="sort">
        <el-input-number
          v-model="formData.sort"
          controls-position="right"
          :min="0"
          style="width:200px"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="商品提成" prop="pers">
        <el-input-number
          v-model="formData.pers"
          controls-position="right"
          :min="0"
          style="width:200px"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="商品摘要">
        <el-input type="textarea" v-model="formData.desc" style="width:520px"></el-input>
      </el-form-item>
      <br />
      <el-form-item style="padding-left: 247px;">
        <el-button type="primary" @click="submitForm('formData')">确 定</el-button>
        <el-button @click="resetForm('formData')">重 置</el-button>
      </el-form-item>
    </el-form>
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
          let res = await this.$axios.post("/admin/salesmanuser/addmodel", this.formData);
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
      let res = await this.$axios.post("/admin/salesmanuser/getmodel", { id: id });
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
