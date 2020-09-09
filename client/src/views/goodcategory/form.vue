<template>
  <el-dialog
    :title="'添加分类1'"
    width="600px"
    :visible.sync="visible"
    destroy-on-close
    @close="closeCallback"
  >
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="ruleForm2.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
        <el-button @click="resetForm('ruleForm2')">重 置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
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
    console.log("重新");
    if (this.formkey) {
      await this.getModel(this.formkey);
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      ruleForm2: { name: "" },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    closeCallback() {
      this.$emit("successCallback");
    },

    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = {};

          for (let item in that.ruleForm2) {
            newData[item] = that.ruleForm2[item];
          }

          this.$request
            .fetchGoodCategoryForm(newData)
            .then((res) => {
              that.$message({
                showClose: true,
                message: res.data.message,
                type: "success",
              });
              that.visible = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getModel(id) {
      let res = await this.$axios.post("/admin/goodcategory/getmodel", { id: id });
      this.ruleForm2 = res.data;
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
