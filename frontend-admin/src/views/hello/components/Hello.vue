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
      this.$store.dispatch('api/getApi').then(data => {
        console.log(data);
      });
    }
  }
};
</script>

<style></style>
