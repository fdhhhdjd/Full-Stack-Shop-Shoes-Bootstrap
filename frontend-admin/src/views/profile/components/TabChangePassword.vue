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
            <el-row :gutter="12">
                <el-col :md="24">
                    <el-form-item
                        label="Mật khẩu cũ"
                        prop="current_password"
                    >
                        <el-input
                            v-model="user.current_password"
                            auto-complete="current-password"
                            class="w-50"
                            show-password
                        />
                    </el-form-item>
                </el-col>

                <el-col :md="24">
                    <el-form-item
                        label="Mật khẩu mới"
                        prop="new_password"
                    >
                        <el-input
                            v-model="user.new_password"
                            auto-complete="new-password"
                            class="w-50"
                            show-password
                        />
                    </el-form-item>
                </el-col>

                <el-col :md="24">
                    <el-form-item
                        label="Xác nhận mật khẩu mới"
                        prop="confirm_password"
                    >
                        <el-input
                            v-model="user.confirm_password"
                            auto-complete="new-password"
                            class="w-50"
                            show-password
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- End:: Form -->

            <!-- Begin:: Action -->
            <div class="d-flex">
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
import mixin from '@/views/mixin'

export default {
    mixins: [mixin],
    props: {
        userID: {
            type: String,
            default: ''
        },
        activeTab: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const confirmPasswordValidate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng nhập lại mật khẩu 1 lần nữa.'))
            } else if (value !== this.user.new_password) {
                callback(new Error('Xác nhận mật khẩu không trùng khớp.'))
            } else {
                callback()
            }
        }

        return {
            // Form
            user: {
                current_password: '',
                new_password: '',
                confirm_password: ''
            },
            // Validation
            rules: {
                current_password: [
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
                ],
                new_password: [
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
                ],
                confirm_password: [
                    {
                        required: true,
                        validator: confirmPasswordValidate,
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    methods: {
        updateUser() {
            this.$store
                .dispatch('admin/changePassword', {
                    user_id: this.userID,
                    old_password: this.user.current_password,
                    new_password: this.user.new_password
                })
                .then((data) => {
                    if (data) {
                        return this.notifySuccess('Đã thay đổi mật khẩu thành công!')
                    }

                    return this.notifyError('Mật khẩu cũ không chính xác!')
                })
                .catch((err) => this.notifyError() && console.error(err))
        },
        saveUser() {
            this.$refs.user.validate((valid) => {
                if (valid) {
                    this.$confirm(
                        'Bạn có chắc chắn muốn thay đổi mật khẩu?',
                        'Xác Nhận', {
                            confirmButtonText: 'Đồng Ý',
                            cancelButtonText: 'Hủy Bỏ'
                        }
                    )
                        .then(() => this.updateUser())
                        .catch((err) => console.error(err))
                }
            })
        }
    }
}
</script>

<style
    lang="scss"
    scoped
>
@import '@/styles/pages/section.scss';
</style>
