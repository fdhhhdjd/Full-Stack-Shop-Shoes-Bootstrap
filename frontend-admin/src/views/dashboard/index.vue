<template>
  <el-main class="section section__dashboard">
    <div class="d-flex align-center flex-wrap">
      <el-avatar :size="150" :src="avatar" class="mr-6" fit="cover" />

      <div class="section__dashboard--info">
        <h3 class="fs-48px mb-3 mt-0 name">{{ name }}</h3>
        <span class="d-block fs-24px">{{ roleDashboard(role) }}</span>
      </div>
    </div>

    <img
      :src="imageDashboard"
      alt="Dashboard Image"
      class="section__dashboard--img"
    />
  </el-main>
</template>

<script>
import dashboardImg from "@/assets/dashboard.webp";
import { mapGetters } from "vuex";
import CONSTANTS from "../../utils/constants";
import mixin from "@/views/mixin";

export default {
  name: "Dashboard",
  mixins: [mixin],
  computed: {
    ...mapGetters(["avatar", "name", "metaData", "role"]),
  },
  data() {
    return {
      imageDashboard: dashboardImg,
    };
  },
  methods: {
    roleDashboard(status) {
      switch (status) {
        case CONSTANTS.ROLE_ADMIN:
          return "ADMIN";

        case CONSTANTS.ROLE_USER:
          return "USER";

        default:
          return "";
      }
    },
  },
};
</script>

<style
    lang="scss"
    scoped
>
@import "@/styles/pages/section.scss";

.section {
  &__dashboard {
    min-height: 100vh;
    padding: 50px 60px 0;

    &--info {
      .name {
        font-weight: 500;
      }
    }

    &--img {
      display: block;
      margin: 50px auto 0;
    }
  }
}
</style>
