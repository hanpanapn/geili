<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field v-model="fData.name" label="商家名称" placeholder="商家名称" />

      <van-field
        readonly
        clickable
        name="picker"
        v-model="fData.addr"
        label="商家地址"
        placeholder="点击选择"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>

      <van-field v-model="fData.lianxi" label="联系人" placeholder="联系人" />
      <van-field v-model="fData.mobile" label="联系人电话" placeholder="联系人电话" />
      <!-- editor/uploadImg -->
      <van-field name="uploader" label="门头照片">
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead">
            <div v-if="uploader.length===0">
              <van-icon name="plus" />上传
            </div>

            <div v-else></div>
          </van-uploader>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import areaList from "../../../config/area.js";
export default {
  middleware: ["salesmanIsLogin"],
  data() {
    return {
      showArea: false,
      fData: {},
      areaList: areaList,
      uploader: [],
    };
  },
  methods: {
    async afterRead(f) {
      let formData = new FormData();
      this.formData.img = f.content.charCodeAt(0).toString(2);
    },
    async onSubmit() {
      let params = Object.assign({}, this.fData);
      params.img = ""; // = this.uploader[0].content;
      params.salesmanuser_id = this.$store.state.userInfo.id;
      let res = await this.$axios({
        url: "/b/member/addmodel",
        method: "post",
        data: {
          ...params,
        },
      });
      if (+res.code === 200) {
        this.$router.push({
          path: "/salesman/member",
        });
      }
    },
    async onConfirm(value) {
      let r = value.map((e) => {
        return e.name;
      });

      this.fData.addr = r.join(",");
      this.showArea = false;
    },
  },
};
</script>