<template>
  <el-dialog
    :title="title+'客户'"
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
      <el-form-item label="门头照片" prop="img">
        <el-upload
          class="avatar-uploader"
          name="file"
          :headers="header"
          :action="this.$path+'editor/uploadImg'"
          :show-file-list="false"
          :on-success="handlethumbnailSuccess"
          :before-upload="beforethumbnailUpload"
        >
          <img v-if="formData.img" :src="formData.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <br />

      <el-form-item label="客户名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="lianxi">
        <el-input v-model="formData.lianxi" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="所属区域" prop="addr">
        <el-input v-model="formData.addr" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="account">
        <el-input v-model="formData.account" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="余额" prop="money">
        <el-input v-model="formData.money" placeholder="请输入内容"></el-input>
      </el-form-item>

      <br />
      <el-form-item style="padding-left: 247px;" v-if="!shenhe">
        <el-button type="primary" @click="submitForm('formData')">确 定</el-button>
        <el-button @click="resetForm('formData')">重 置</el-button>
      </el-form-item>

      <el-form-item style="padding-left: 247px;" v-else>
        <el-button type="primary" @click="submitFormShenhe('ok')">通 过</el-button>
        <el-button @click="submitFormShenhe('no')">拒 绝</el-button>
      </el-form-item>
    </el-form>
    <el-dialog append-to-body title="审核提示" :visible.sync="showDialogShen" width="30%">
      <span>客户的登录账号和密码将以短信形式通知对方，是否通过？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleShenOk">通 过</el-button>
        <el-button @click="showDialogShen = false">取 消</el-button>
      </span>
    </el-dialog>
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
    title: {
      type: String,
      default: "添加",
    },
    shenhe: {
      type: Boolean,
      default: false,
    },
  },

  async mounted() {
    if (this.formkey) {
      await this.getModel(this.formkey);
      console.log(this.formData);
    }
    await this.getGoodCate();
  },
  data() {
    return {
      showDialogShen: false, //审核通过提示
      header: { Authorization: "Bearer" + Cookies.get("access_token") },
      visible: this.dialogVisible,
      formData: {},
      rules: {
        img: [{ required: true, message: "请上次商家门店照", trigger: "blur" }],
        name: [{ required: true, message: "请输入商家名称", trigger: "blur" }],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入联系人手机", trigger: "blur" },
        ],
        lianxi: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
        money: [{ required: true, message: "请输入账户余额", trigger: "blur" }],
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
    
      this.formData.img = res.data[0].path;
        console.log("上传完", this.formData);
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
          let p = Object.assign({}, this.formData);
          p.status = 1;
          let res = await this.$axios.post("/admin/member/addmodel", p);
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
      let res = await this.$axios.post("/admin/member/getmodel", { id: id });
      this.formData = res.data.data;

      // const blob = new Blob(this.formData.img);
      // console.log(blob);
    //  let imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
      // let a = new FileReader();
      // a.onload =  (e)=> {
      //   this.formData.img = e.target.result.replace('data:application/octet-stream;','data:image/jpeg;');
      //   console.log("dd", e.target.result.replace('data:application/octet-stream;',''));
      // };
      // a.readAsDataURL(blob);
    },
    //审核
    async submitFormShenhe(e) {
      if (e == "ok") {
        this.showDialogShen = true;
      } else {
        let res = await this.$axios.post("/admin/member/getmodel", { id: id });
        let model = res.data.data;
        model.status = 2;
        let res2 = await this.$axios.post("/admin/member/addmodel", model);
        if (res.code === 200) {
          this.showDialogShen = false;
          this.closeCallback();
        } else {
          alert(res.message);
        }

        this.closeCallback();
      }
    },
    //审核通过
    async handleShenOk() {
      console.log("dd");
      let res = await this.$axios.post("/admin/member/getmodel", {
        id: this.formkey,
      });
      let model = res.data.data;
      model.status = 1;
      let res2 = await this.$axios.post("/admin/member/addmodel", model);

      if (res2.data.code === 200) {
        this.showDialogShen = false;
        this.closeCallback();
      } else {
        alert(res.message);
      }
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
