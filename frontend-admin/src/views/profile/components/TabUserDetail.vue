<template>
  <div class="section__profile--detail">
    <el-form
      ref="user"
      :model="user"
      :rules="rules"
      label-position="top"
      label-width="180px"
      @submit.prevent.native
    >
      <!-- Begin:: Form -->
      <el-row :gutter="12" class="d-flex align-center flex-wrap">
        <el-col :lg="7" :md="10">
          <div class="d-flex">
            <el-image
              v-if="previewImage"
              :src="previewImage"
              style="width: 150px; height: 150px"
            />

            <el-image
              v-else
              :src="avatar"
              style="width: 150px; height: 150px"
            />

            <el-upload
              ref="upload"
              :accept="`${mimes.jpg},${mimes.png}`"
              :auto-upload="false"
              :limit="2"
              :on-change="changePreviewImage"
              :show-file-list="false"
              action="#"
              class="ml-2"
              list-type="picture-card"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>

        <el-col :lg="17" :md="14">
          <el-row :gutter="12">
            <el-col :md="24">
              <el-form-item label="Họ và tên" prop="name">
                <el-input v-model="user.name" />
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="Tên tài khoản" prop="user_name">
                <el-input v-model="user.email" disabled />
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="Vai trò" prop="role">
                <el-input v-model="user.role" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- End:: Form -->

      <!-- Begin:: Action -->
      <div class="d-flex justify-end">
        <el-button
          native-type="submit"
          size="small"
          type="primary"
          @click.native.prevent="saveUser"
        >
          Lưu Lại
        </el-button>
      </div>
      <!-- End:: Action -->
    </el-form>
  </div>
</template>

<script>
import mixin from "@/views/mixin";
import { mapGetters } from "vuex";
import mimes from "@/components/ImageCropper/utils/mimes";

export default {
  mixins: [mixin],
  props: {
    activeTab: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "metaData", "device", "token"]),
  },
  data() {
    return {
      mimes,
      previewImage: "",
      imageURL: [],
      // List
      user: {},
      // Validation
      rules: {
        name: [
          {
            required: true,
            message: "Họ và tên không được bỏ trống.",
            trigger: "change",
          },
          {
            min: 3,
            message: "Họ và tên có độ dài từ 3 - 50 ký tự.",
            trigger: "change",
          },
          {
            max: 50,
            message: "Họ và tên có độ dài từ 3 - 50 ký tự.",
            trigger: "change",
          },
        ],
      },
    };
  },
  async created() {
    await this.getAdminInfo();
  },
  methods: {
    getAdminInfo() {
      this.$store
        .dispatch("permission/getInfo")
        .then((data) => {
          this.user = {
            name: data.element.name,
            email: data.element.email,
            role: data.element.role === 1 ? "admin" : "user",
          };
        })
        .catch((err) => this.notifyError() && console.error(err));
    },
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
    updateUser() {
      this.$store
        .dispatch("admin/updateAdmin", {
          id: this.user._id,
          name: this.user.name,
          avatar_uri: this.user.avatar_uri,
        })
        .then(
          () =>
            this.notifySuccess("Đã chỉnh sửa thông tin thành công!") &&
            this.getAdminProfile()
        )
        .catch((err) => this.notifyError() && console.error(err));
    },
    changePreviewImage(_file, _fileList) {
      this.previewImage = _file.url;
      this.imageURL = _fileList;
      return this.imageURL.length === 2 ? this.imageURL.splice(0, 1) : "";
    },
    saveUser() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.$confirm(
            "Bạn có chắc chắn muốn chỉnh sửa thông tin cá nhân?",
            "Xác Nhận",
            {
              confirmButtonText: "Đồng Ý",
              cancelButtonText: "Hủy Bỏ",
            }
          )
            .then(() => this.saveFile())
            .catch((err) => console.error(err));
        }
      });
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
