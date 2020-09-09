<template  >
    <div>
        后台审核商家页
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    async mounted() {
          localStorage.setItem("utype", this.$route.query.utype);
    },
}
</script>