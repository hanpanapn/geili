<template>
  <div>
    home
    <div>
      <a href="/salesman?utype=1">业务员</a>
      <br />
      <a href="/admin?utype=2">后台审核</a>
      <br />
      <a href="/member?utype=3">商家</a>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.go(this.$route.query.utype);
    localStorage.setItem("utype", this.$route.query.utype);
  },
  methods: {
    go(v) {
      if (v == "1") {
        this.$router.push({
          path: "/salesman",
        });
      }
      if (v == "2") {
        this.$router.push({
          path: "/admin",
        });
      }
      if (v == "3") {
        this.$router.push({
          path: "/member",
        });
      }
    },
  },
};
</script>