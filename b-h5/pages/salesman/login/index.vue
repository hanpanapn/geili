<template>
  <div class="page-login-fast-index">
    <div class="head">
      <div class="bar"></div>
    </div>
    <div class="info">
      <div class="title">业务员登录</div>

      <div class="form">
        <input class="item" v-model="fData.account" type="text" placeholder="请输入手机号" />
        <span class="item" style="position: relative;">
          <input class="vcinput" v-model="fData.password" type="text" placeholder="请输入密码" />
        </span>
        <van-button class="item btnlogin" @click="onSubmit" color="#3D7EFF">登&nbsp;录</van-button>
        <div class="bottom">
          <nuxt-link to="/salesman/register">没有账号？立即注册</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: () => {
    return "nobar";
  },
  data() {
    return {
      fData: {
        mobile: "15620069778",
        scode: "123456"
      }
    };
  },
  computed: {},
  methods: {
    async onSubmit() {
      if (!this.utils.checkPhone(this.fData.mobile)) {
        this.$toast("手机号格式不正确");
        return;
      }

      let res = await this.$axios({
        url: "/b/salesmanuser/login",
        method: "post",
        data: this.fData
      });

      if (res && +res.code === 200) {
        $nuxt.$store.commit("userInfoMutations", res.data);
        this.$router.push({
          path: "/salesman",
          query: this.$route.query
        });
      } else {
        this.$toast(res.message);
      }
    }
  }
};
</script>
<style lang="less">
.page-login-fast-index {
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
          margin: 0 30px;
        }
      }
      .right {
        font-size: 28px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-right: 30px;
        padding: 20px 0;
      }
    }
  }
  .info {
    padding: 15px 70px 0px 70px;
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
        border: 2px solid #3d7eff;
        height: 88px;
      }
      .item {
        width: 605px;
        height: 90px;
        background: rgba(249, 249, 249, 1);
        border-radius: 45px;

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
          height: 88px;
        }
        .vc {
          width: 222px;
          height: 86px;

          display: block;
          position: absolute;
          top: 2px;
          right: 0px;
          text-indent: initial;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999 !important;
          line-height: 90px;
        }
        // .line {
        //   width: 2px;
        //   height: 30px;
        //   background: rgba(206, 206, 206, 1);
        //   position: absolute;
        //   top: 33px;
        //   left: 400px;
        //   display: inline-block;
        // }
        .line:after {
          content: " ";
          box-sizing: border-box;
          display: block;
          position: absolute;
          top: 30px;
          left: 350px;
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          transform-origin: left top;
          pointer-events: none;
        }
        .line {
          position: relative;
          width: 3px;
          height: 30px;
          display: inline-block;
        }
        .line:after {
          border-left: 1px solid #cecece;
        }
      }
      .item:first-child {
        margin-bottom: 49px;
        margin-top: 47px;
      }
      .btnlogin {
        margin-top: 150px;
        .van-button__text {
          text-indent: 0px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 30px;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* flex-direction: row; */
        width: 100%;
        margin-top: 32px;
        a {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 30px;
        }
      }
    }
  }
}
</style>