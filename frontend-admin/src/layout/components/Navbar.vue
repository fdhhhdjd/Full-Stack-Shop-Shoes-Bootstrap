<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <!-- Begin:: Notification -->
      <!--            <el-dropdown-->
      <!--                class="mr-5"-->
      <!--                trigger="click"-->
      <!--            >-->
      <!--                <el-badge-->
      <!--                    :value="notificationCount"-->
      <!--                    class="badge-count"-->
      <!--                >-->
      <!--                    <i class="el-icon-bell"></i>-->
      <!--                </el-badge>-->

      <!--                <el-dropdown-menu-->
      <!--                    slot="dropdown"-->
      <!--                    class="pb-0"-->
      <!--                >-->
      <!--                    <el-dropdown-item-->
      <!--                        v-for="item in notificationList"-->
      <!--                        :key="item._id"-->
      <!--                        class="item-notification"-->
      <!--                    >-->
      <!--                        <h4 class="title mt-0 mb-0 text-capitalize">{{ item.title }}</h4>-->
      <!--                        <p class="content mb-0 mt-0">{{ item.content }}</p>-->
      <!--                        &lt;!&ndash;                        <small>{{ formatFromNow(item.send_at)  }}</small>&ndash;&gt;-->
      <!--                    </el-dropdown-item>-->
      <!--                </el-dropdown-menu>-->
      <!--            </el-dropdown>-->
      <!-- End:: Notification -->

      <!-- Begin:: Avatar -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper d-flex align-center">
          <el-avatar :src="avatar" />
          <span class="pl-2 text-truncate full_name text-capitalize">{{ name }}</span>
          <i class="el-icon-arrow-down pl-1" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile">
            <el-dropdown-item class="text-capitalize">
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link>

          <router-link to="/">
            <el-dropdown-item class="text-capitalize">
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item class="text-capitalize" divided @click.native="logout">
            <span style="display: block">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- End:: Avatar -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import mixin from '@/views/mixin';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  mixins: [mixin],
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'metaData', 'device', 'token']),
    ...mapState({
      showMySettings: state => state.settings.showMySettings
    })
  },
  created() {
    // this.getNotification()
  },
  data() {
    return {
      isDot: false,
      paging: {
        page: 0,
        limit: 5,
        is_clear: true
      },
      notificationList: [],
      notificationCount: 0,
      messageCount: 0
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    logout() {
      this.$confirm('Bạn sẽ đăng xuất ra tài khoản. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'Đồng Ý',
        cancelButtonText: 'Hủy Bỏ',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('permission/logout').then(() => {
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            this.notifySuccess('Đăng xuất thành công!');
            console.log(this.$route.fullPath);
          });
        })
        .catch(() => this.notifyError());
    }
    // showNotification() {
    //     this.isDot = false
    //     this.notificationCount = 0
    //     this.$store.dispatch('chat/getNotification', this.paging).then((data) => {
    //         console.log('data: ', data)
    //         this.notificationList = data.reverse()
    //     })
    // },
    // getNotification() {
    //     connect socket
    //     this.socket_client = initSocket(this.token)
    //     console.log('socket_client', this.socket_client)
    //     this.socket_client.once('Server-login-ok', data => {
    //         console.log('[SOCKET - ON] Server-login-ok:', data)
    //         this.notificationCount = data.total_unread_notice.notification_count ? data.total_unread_notice.notification_count : 0
    //         if (data.total_unread_message.msg && data.total_unread_message.msg > 0) {
    //             this.messageCount = data.total_unread_message.msg
    //         } else {
    //             this.messageCount = 0
    //         }
    //     })
    //     this.paging.page += 1
    // },
    // showAllNotification() {
    //     return this.$router.push({
    //         name: 'NoticeList'
    //     })
    // }
  }
};
</script>

<style lang="scss">
.navbar {
  .badge-count {
    .el-badge__content {
      border: none;
    }
  }
}
</style>

<style
    lang="scss"
    scoped
>
@media only screen and (max-width: 576px) {
  .breadcrumb-container {
    display: none !important;
  }

  .full_name {
    width: 150px;
  }

  .avatar-container {
    margin-right: 0 !important;
  }
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      font-size: 15px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    .avatar-container {
      margin-right: 48px;

      .avatar-wrapper {
        margin-top: 2px;

        .user-avatar {
          cursor: pointer;
          width: 46px;
          height: 46px;
          border-radius: 10px;
        }
      }

      .icon-arrow-down {
        cursor: pointer;
        position: absolute;
        right: 22px;
        top: 33px;
        font-size: 20px;
        color: white;
      }
    }
  }

  .badge {
    .el-icon-bell {
      font-size: 25px;
      color: #5a5e66;
    }
  }
}

.item-notification {
  border-bottom: 1px solid #ccc;

  .title {
    font-size: 13px;
  }

  .content {
    font-size: 12px;
    width: 270px;
    line-height: 20px;
  }

  &:last-of-type {
    border-bottom: 0;
  }
}
</style>
