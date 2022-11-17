<template>
  <div>
    <Hello />
  </div>
</template>

<script>
import Hello from './components/Hello';

export default {
  components: {
    Hello
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    console.log('abacc');
  },
  methods: {}
};
</script>

<style scoped></style>
