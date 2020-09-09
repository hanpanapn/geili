<template>
  <div class="page-register-index">
    <div class="head">
      <div class="bar"></div>
    </div>
    <div class="info">
      <div class="title">业务员注册</div>

      <div class="form">
        <input class="item" v-model="fData.account" type="text" placeholder="请输入手机号" />
        <input class="item" v-model="fData.password" type="password" placeholder="用户密码" />
        <input class="item" v-model="passRep" type="password" placeholder="确认密码" />
        <input class="item" v-model="fData.mykeyfrom" type="text" placeholder="邀请码" />

        <van-button @click="onSubmit" class="item btnlogin" color="#3D7EFF">注&nbsp;册</van-button>
        <div class="bottom">
          <nuxt-link to="/salesman/login">已有账号？立即登录</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import sysConfig from "~/config";
export default {
  layout: () => {
    return "nobar";
  },
  data() {
    return {
      passRep: "",
      fData: {}
    };
  },
  computed: {},
  methods: {
    async onSubmit() {
      if (!this.fData.account) {
        this.$toast("请填写手机号");
        return;
      }
      if (!this.utils.checkPhone(this.fData.account)) {
        this.$toast("手机号格式不正确");
        return;
      }
      if (this.fData.password != this.passRep) {
        this.$toast("两次密码不一致");
        return;
      }
      if (!this.fData.mykeyfrom) {
        this.$toast("请填写邀请码");
        return;
      }

      let params = Object.assign({}, this.fData);

      let res = await this.$axios({
        url: "/b/salesmanuser/addmodel",
        method: "post",
        data: params
      });

      if (res && +res.code === 200) {
        // $nuxt.$store.commit("userInfoMutations", res.data);
        // Cookie.set("userInfo", res.data);
        this.$router.push({
          path: "/salesman/login"
        });
        this.$toast(res.message);
      } else {
        this.$toast(res.message);
      }
    }
  }
};
</script>
<style lang="less">
.page-register-index {
  width: 100%;
  .head {
    width: 100%;
    height: 88px;
    margin-bottom: 120px;

    .bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        img {
          width: 20px;
          height: 36px;
          // transform: rotate(180deg);
          margin: 30px;
        }
      }
      .right {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
        margin: 30px;
      }
    }
  }
  .info {
    padding: 0px 70px 0px 70px;
    .title {
      font-size: 40px;

      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 30px;
    }

    .form {
      display: flex;
      justify-content: center;
      align-items: self-start;
      flex-direction: column;
      input {
        border: none;
        outline: none;
        -webkit-appearance: none;
      }
      input:focus {
        border: 1px solid #3d7eff;
        height: 88px;
      }
      .item {
        width: 605px;
        height: 90px;
        background: rgba(249, 249, 249, 1);
        border-radius: 45px;
        margin-bottom: 29px;
        font-size: 26px;
        text-indent: 52px;
        font-weight: 400;
        color: #333;
        line-height: 30px;
        .vcinput {
          width: 605px;
          height: 90px;
          background: rgba(249, 249, 249, 1);
          border-radius: 45px;
          position: absolute;
          top: 0px;
          left: 0px;
          text-indent: 52px;
        }
        .vcinput:focus {
          width: 603px;
          border: 1px solid #3d7eff;
          height: 88px;
        }
        .vc {
          width: 222px;
          height: 86px;

          border-radius: 45px;
          display: block;
          position: absolute;
          top: 2px;
          right: 2px;
          text-indent: initial;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999 !important;
          line-height: 90px;
        }
      }
      .item:first-child {
        margin-top: 32px;
      }
      .yzm {
        margin-bottom: 29px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .item {
          width: 223px;
          margin-bottom: 0px;
          margin-top: 0px;
        }
        .item:focus {
          width: 221px;
          border: 1px solid #3d7eff;
          height: 88px;
        }
        img {
          width: 160px;
          height: 90px;
          background: rgba(227, 227, 227, 1);
          border-radius: 5px;
          margin: 0 10px;
        }
        .txt {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 30px;
        }
      }
      .xy {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0px;
        a {
          color: #1d6aff;
        }
        input {
          height: 30px;
          width: 30px;
        }
        img {
          width: 18px;
          height: 18px;
        }
      }
      .btnlogin {
        margin-top: 33px;
        text-indent: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-button__content {
          .van-button__text {
            text-indent: 0px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 30px;
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        /* flex-direction: row; */
        width: 100%;
        margin-top: 22px;
        a {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #3d7eff;
          line-height: 30px;
        }
      }
    }
  }
}
</style>