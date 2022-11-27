<template>
  <el-main class="section section__profile">
    <h3 class="section__title">
      <span>Thông tin cá nhân: </span>
      <strong>{{ user.full_name }}</strong>
    </h3>

    <!-- Begin:: Tabs -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="Thông Tin Cá Nhân" name="userDetail">
        <tab-user-detail
          :active-tab="activeName === 'userDetail'"
          @user="getName"
        />
      </el-tab-pane>

      <el-tab-pane label="Đổi Mật Khẩu" name="changePassword">
        <tab-change-password
          :active-tab="activeName === 'changePassword'"
          :user-i-d="user.id"
        />
      </el-tab-pane>
    </el-tabs>
    <!-- End:: Tabs -->
  </el-main>
</template>

<script>
import mixin from "@/views/mixin";
import TabUserDetail from "@/views/profile/components/TabUserDetail";
import TabChangePassword from "@/views/profile/components/TabChangePassword";

export default {
  components: { TabUserDetail, TabChangePassword },
  mixins: [mixin],
  data() {
    return {
      activeName: "userDetail",
      user: {},
    };
  },
  methods: {
    getName(user) {
      this.user = user;
    },
  },
};
</script>

<style
    lang="scss"
    scoped
>
@import "@/styles/pages/section.scss";
</style>
