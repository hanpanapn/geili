<template>
  <div  >{{$route.query.tip}}</div>
</template>
<script>
 

export default {
  layout: () => {
    return "nobar";
  },
//   head: {
//     script: [{ src: "http://res.wx.qq.com/open/js/jweixin-1.6.0.js" }]
//   },
  methods: {
    // closeWin() {
    //   wx.closeWindow();
    // }
  }
};
</script>