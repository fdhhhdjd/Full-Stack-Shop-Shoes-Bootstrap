<template>
  <h1>Hello</h1>
</template>

<script>
export default {
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      this.$store.dispatch('permission/getInfo').then(data => {
        console.log(data);
      });
    }
  }
};
</script>

<style></style>
