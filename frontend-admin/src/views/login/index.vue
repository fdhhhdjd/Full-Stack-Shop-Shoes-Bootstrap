<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      class="login-form"
      label-position="left"
      @submit.prevent.native
    >
      <div class="title-container">
        <h3 class="title">ShopShoes CMS</h3>
      </div>

      <el-form-item prop="email_phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>

        <el-input
          ref="email_phone"
          v-model="loginForm.email_phone"
          autocomplete="on"
          name="email_phone"
          placeholder="Tên tài khoản"
          tabindex="1"
          type="text"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" manual placement="right">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>

          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            autocomplete="on"
            name="password"
            placeholder="Mật khẩu"
            tabindex="2"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
          />

          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        native-type="submit"
        style="width: 100%; margin-bottom: 30px"
        type="primary"
        @click.native.prevent="handleLogin"
      >
        Đăng Nhập
      </el-button>
    </el-form>
  </div>
</template>

<script>
import CONSTANTS from '@/utils/constants';
import mixin from '@/views/mixin';

export default {
  name: 'Login',
  mixins: [mixin],
  data() {
    return {
      loginForm: {
        email_phone: '',
        password: '',
        type: CONSTANTS.LOGIN_TYPE_PASSWORD
      },
      loginRules: {
        email_phone: [
          {
            required: true,
            message: 'Tên tài khoản không được bỏ trống.',
            trigger: 'change'
          },
          {
            min: 5,
            message: 'Tên tài khoản có độ dài từ 5 - 50 ký tự.',
            trigger: 'change'
          },
          {
            max: 50,
            message: 'Tên tài khoản có độ dài từ 5 - 50 ký tự.',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: 'Mật khẩu không được bỏ trống.',
            trigger: 'change'
          },
          {
            min: 6,
            message: 'Mật khẩu có độ dài từ 6 - 20 ký tự.',
            trigger: 'change'
          },
          {
            max: 20,
            message: 'Mật khẩu có độ dài từ 6 - 20 ký tự.',
            trigger: 'change'
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    if (this.loginForm.email_phone === '') {
      this.$refs.email_phone.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
  },
  destroyed() {},
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z';
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('permission/login', this.loginForm)
            .then(data => {
              this.loading = false;

              if (data) {
                return this.$router.go(this.redirect || '/');
              }
            })
            .catch(() => {
              this.notifyError('Mật khẩu không chính xác. Vui lòng kiểm tra lại.');
              this.loading = false;
            });
        } else {
          // validate false
          console.warn('error submit!!');
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
}
</style>

<style
    lang="scss"
    scoped
>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
