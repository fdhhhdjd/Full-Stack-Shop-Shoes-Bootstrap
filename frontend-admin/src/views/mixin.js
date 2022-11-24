import CONSTANTS from '@/utils/constants'
import moment from 'moment'

const Helper = {
    methods: {
        formatDateTime(type, input, input_end = '') {
            if (input) {
                switch (type) {
                    case 'local':
                        return moment(moment.utc(input)).local().format('DD/MM/YYYY HH:mm')

                    case 'input_local':
                        return moment(moment.utc(input)).local().format('YYYY-MM-DD HH:mm')

                    case 'local_only_date':
                        return moment(moment.utc(input)).local().format('DD/MM/YYYY')

                    case 'difftime':
                        // eslint-disable-next-line no-case-declarations
                        const startTime = moment(input, 'YYYY-MM-DD HH:mm:ss')
                        // eslint-disable-next-line no-case-declarations
                        const endTime = moment(input_end, 'YYYY-MM-DD HH:mm:ss')

                        return parseInt(
                            moment.duration(endTime.diff(startTime)).asMinutes()
                        )

                    case 'disabledDueDate':
                        return moment(input_end).format('YYYY-MM-DD') > moment(input).format('YYYY-MM-DD')

                    case 'toISOString':
                        return moment(input).toISOString()

                    case 'fromNow':
                        return moment(input).locale('vi-VN').fromNow()

                    case 'timestamp':
                        return moment.unix(input / 1000).format('DD/MM/YYYY HH:mm')

                    default:
                        return ''
                }
            }
        },

        getFileType(type) {
            switch (type.toLowerCase()) {
                case 'jpg':
                case 'png':
                case 'jpeg':
                    return 'image'
                case 'pdf':
                case 'doc':
                case 'docx':
                    return 'document'
                case 'mp4':
                case 'mov':
                case 'avi':
                    return 'video'
            }
        },

        async saveFileMetadata(metadata) {
            return this.$store
                .dispatch('upload/saveFileMetadata', metadata)
                .then((res) => res)
                .catch(() => this.notifyError('Error!!!'))
        },

        // async uploadFile(urlList, imageURL) {
        //     const payload = urlList.map((_url, _index) => {
        //         const _findFile = imageURL.find(
        //             (_f) => _f.name === _url.name && _f.size.toString() === _url.size
        //         )
        //         return {
        //             ..._url,
        //             data: _findFile.raw
        //         }
        //     })

        //     return this.$store
        //         .dispatch('upload/uploadFile', payload)
        //         .then((data) => data)
        //         .catch(() => this.notifyError('Error!!!'))
        // },

        valueTransform(val, list_value) {
            for (let index = 0; index < list_value.length; index++) {
                const element = list_value[index]

                if (element.value === val && element.label) {
                    return element.label
                }
            }

            return 'Không xác định'
        },

        regionsType() {
            return [
                {
                    value: CONSTANTS.TYPE_REGIONS_NATION,
                    label: 'Quốc gia'
                },
                {
                    value: CONSTANTS.TYPE_REGIONS_PROVINCE,
                    label: 'Tỉnh / Thành phố'
                },
                {
                    value: CONSTANTS.TYPE_REGIONS_DISTRICT,
                    label: 'Quận / Huyện'
                },
                {
                    value: CONSTANTS.TYPE_REGIONS_TOWN,
                    label: 'Xã / Phường'
                }
            ]
        },

        statusCall() {
            return [
                {
                    value: CONSTANTS.CALL_STATUS_DENIED,
                    label: 'Từ chối cuộc gọi'
                },
                {
                    value: CONSTANTS.CALL_STATUS_CANCEL,
                    label: 'Không nhấc máy'
                },
                {
                    value: CONSTANTS.CALL_STATUS_DONE,
                    label: 'Cuộc gọi thoại'
                },
                {
                    value: CONSTANTS.CALL_STATUS_BUSY,
                    label: 'Cuộc gọi bận'
                }
            ]
        },

        systemInfoType() {
            return [
                {
                    value: CONSTANTS.SYSTEM_INFO_TYPE_SYSTEM,
                    label: 'Hệ thống'
                },
                {
                    value: CONSTANTS.SYSTEM_INFO_TYPE_LINK,
                    label: 'Liên kết'
                },
                {
                    value: CONSTANTS.SYSTEM_INFO_TYPE_MOBILE,
                    label: 'APP'
                }
            ]
        },

        userRoles() {
            return [
                {
                    value: CONSTANTS.USER_ROLE_SUPERVISOR,
                    label: 'Supervisor'
                },
                {
                    value: CONSTANTS.USER_ROLE_ADMIN,
                    label: 'Administrator'
                },
                {
                    value: CONSTANTS.USER_ROLE_STAFF,
                    label: 'Nhân viên'
                },
                {
                    value: CONSTANTS.USER_ROLE_CUSTOMER,
                    label: 'Khách hàng'
                },
                {
                    value: CONSTANTS.USER_ROLE_SCOREBOARD,
                    label: 'Máy tính điểm'
                }
            ]
        },

        userGender() {
            return [
                {
                    value: CONSTANTS.GENDER_MALE,
                    label: 'Nam'
                },
                {
                    value: CONSTANTS.GENDER_FEMALE,
                    label: 'Nữ'
                }
            ]
        },

        userStatus() {
            return [
                {
                    value: CONSTANTS.STATUS_USER_ACTIVE,
                    label: 'Hoạt động'
                },
                {
                    value: CONSTANTS.STATUS_USER_INACTIVE,
                    label: 'Không hoạt động'
                },
                {
                    value: CONSTANTS.STATUS_USER_BAN,
                    label: 'Cấm'
                },
                {
                    value: CONSTANTS.STATUS_USER_UNREGISTERED,
                    label: 'Chưa đăng ký'
                }
            ]
        },

        customerStatus() {
            return [
                {
                    value: CONSTANTS.STATUS_CUSTOMER_NEW,
                    label: 'Mới (Chưa đăng ký)'
                },
                {
                    value: CONSTANTS.STATUS_CUSTOMER_REGISTERED,
                    label: 'Đã đăng ký'
                },
                {
                    value: CONSTANTS.STATUS_CUSTOMER_BANNED,
                    label: 'Cấm'
                }
            ]
        },

        stageStatus() {
            return [
                {
                    value: CONSTANTS.STATUS_STAGE_TRIGGER,
                    label: 'Nhóm Quản trị / Nhân viên'
                },
                {
                    value: CONSTANTS.STATUS_STAGE_DEV,
                    label: 'Nhóm Hệ thống'
                },
                {
                    value: CONSTANTS.STATUS_STAGE_CONDITION,
                    label: 'Nhóm Điều kiện'
                }
            ]
        },

        typeBilliard() {
            return [
                {
                    value: CONSTANTS.TYPE_BILLIARD_FRANCE,
                    label: 'Phăng'
                },
                {
                    value: CONSTANTS.TYPE_BILLIARD_CAROM_1,
                    label: 'Carom 1 băng'
                },
                {
                    value: CONSTANTS.TYPE_BILLIARD_CAROM_3,
                    label: 'Carom 3 băng'
                }
            ]
        },

        statusMatches() {
            return [
                {
                    value: CONSTANTS.STATUS_MATCHES_GAME_PROCESS,
                    label: 'Đang chơi'
                },
                {
                    value: CONSTANTS.STATUS_MATCHES_GAME_COMPLETE,
                    label: 'Chơi xong'
                },
                {
                    value: CONSTANTS.STATUS_MATCHES_ERROR,
                    label: 'Lỗi'
                },
                {
                    value: CONSTANTS.STATUS_MATCHES_DONE,
                    label: 'Hoàn thành'
                },
                {
                    value: CONSTANTS.STATUS_MATCHES_CANCEL,
                    label: 'Hủy bỏ'
                }
            ]
        },

        statusMatchesImage() {
            return [
                {
                    value: CONSTANTS.STATUS_MATCHES_IMAGE_NO_INPUT,
                    label: 'Chưa nhập'
                },
                {
                    value: CONSTANTS.STATUS_MATCHES_IMAGE_DONE,
                    label: 'Đã nhập'
                }
            ]
        },

        statusCustomerPlace() {
            return [
                {
                    value: CONSTANTS.STATUS_CUSTOMER_PLACE_ACTIVE,
                    label: 'Hoạt động'
                },
                {
                    value: CONSTANTS.STATUS_CUSTOMER_PLACE_INACTIVE,
                    label: 'Ngừng hoạt động'
                }
            ]
        },

        statusGroup() {
            return [
                {
                    value: CONSTANTS.STATUS_GROUP_UNAPPROVED,
                    label: 'Chưa kích hoạt'
                },
                {
                    value: CONSTANTS.STATUS_GROUP_APPROVED,
                    label: 'Đã kích hoạt'
                },
                {
                    value: CONSTANTS.STATUS_GROUP_BLOCKED,
                    label: 'Bị khóa'
                },
                {
                    value: CONSTANTS.STATUS_GROUP_CANCEL,
                    label: 'Giải tán'
                }
            ]
        },

        statusUserApprove() {
            return [
                {
                    value: CONSTANTS.USER_APPROVE_WAITING,
                    label: 'Đang Chờ Duyệt'
                },
                {
                    value: CONSTANTS.USER_APPROVE_ACCEPTED,
                    label: 'Đã Duyệt'
                },
                {
                    value: CONSTANTS.USER_APPROVE_DENIED,
                    label: 'Không duyệt'
                }
            ]
        },

        roleGroupMember() {
            return [
                {
                    value: CONSTANTS.ROLE_GROUP_ADMIN,
                    label: 'Quản trị viên'
                },
                {
                    value: CONSTANTS.ROLE_GROUP_MOD,
                    label: 'Người điều hành'
                },
                {
                    value: CONSTANTS.ROLE_GROUP_USER,
                    label: 'Thành viên'
                }
            ]
        },

        typeBulkAction() {
            return [
                {
                    value: CONSTANTS.BULK_ACTION_TYPE_NOTIFICATION,
                    label: 'Thông báo'
                },
                {
                    value: CONSTANTS.BULK_ACTION_TYPE_SMS,
                    label: 'SMS'
                },
                {
                    value: CONSTANTS.BULK_ACTION_TYPE_EMAIL,
                    label: 'E-mail'
                },
                {
                    value: CONSTANTS.BULK_ACTION_TYPE_PUSH,
                    label: 'Push'
                }
            ]
        },

        typeMessageAction() {
            return [
                {
                    value: CONSTANTS.TYPE_MESSAGE_TEXT,
                    label: 'Văn bản'
                },
                {
                    value: CONSTANTS.TYPE_MESSAGE_IMAGE,
                    label: 'Hình ảnh'
                },
                {
                    value: CONSTANTS.TYPE_MESSAGE_VIDEO,
                    label: 'Video'
                },
                {
                    value: CONSTANTS.TYPE_MESSAGE_LOCATION,
                    label: 'Tọa độ'
                },
                {
                    value: CONSTANTS.TYPE_MESSAGE_CALL,
                    label: 'Cuộc gọi'
                }
            ]
        },

        statusBulkAction() {
            return [
                {
                    value: CONSTANTS.BULK_ACTION_STATUS_PROCESSING,
                    label: 'Đang chờ'
                },
                {
                    value: CONSTANTS.BULK_ACTION_STATUS_SENDING,
                    label: 'Đang gửi'
                },
                {
                    value: CONSTANTS.BULK_ACTION_STATUS_DONE,
                    label: 'Hoàn thành'
                },
                {
                    value: CONSTANTS.BULK_ACTION_STATUS_ERROR,
                    label: 'Lỗi'
                },
                {
                    value: CONSTANTS.BULK_ACTION_STATUS_CANCEL,
                    label: 'Hủy bỏ'
                }
            ]
        },

        categoryReportUser() {
            return [
                {
                    value: CONSTANTS.REPORT_USER_CATEGORY_PROFILE,
                    label: 'Thông tin cơ thủ'
                },
                {
                    value: CONSTANTS.REPORT_USER_CATEGORY_MATCH,
                    label: 'Trận đấu'
                }
            ]
        },

        statusReportUser() {
            return [
                {
                    value: CONSTANTS.STATUS_REPORT_USER_PROCESSING,
                    label: 'Chờ giải quyết'
                },
                {
                    value: CONSTANTS.STATUS_REPORT_USER_DONE,
                    label: 'Đã giải quyết'
                },
                {
                    value: CONSTANTS.STATUS_REPORT_USER_SKIP,
                    label: 'Bỏ qua'
                }
            ]
        },

        userIconGender(gender) {
            return gender === CONSTANTS.GENDER_MALE ? 'el-icon-male' : 'el-icon-female'
        },

        routePush(name, params = {}, query = {}) {
            return this.$router.push({
                name: name,
                params: params,
                query: query
            })
        },

        userIconStatus(status) {
            switch (status) {
                case CONSTANTS.STATUS_USER_ACTIVE:
                    return 'el-icon-check'

                case CONSTANTS.STATUS_USER_INACTIVE:
                    return 'el-icon-close'

                case CONSTANTS.STATUS_USER_BAN:
                    return 'el-icon-lock'

                case CONSTANTS.STATUS_USER_DELETED:
                    return 'el-icon-delete'

                case CONSTANTS.STATUS_USER_UNREGISTERED:
                    return 'el-icon-question'

                default:
                    return ''
            }
        },

        statusScoreboardList() {
            return [
                {
                    value: CONSTANTS.STATUS_SCOREBOARD_ACTIVE,
                    label: 'Hoạt động'
                },
                {
                    value: CONSTANTS.STATUS_SCOREBOARD_INACTIVE,
                    label: 'Không hoạt động'
                },
                {
                    value: CONSTANTS.STATUS_SCOREBOARD_ONLINE,
                    label: 'Đang sử dụng'
                }
            ]
        },

        statusUserFriend() {
            return [
                {
                    value: CONSTANTS.STATUS_USER_FRIEND_PROCESSING,
                    label: 'Đang chờ kết bạn'
                },
                {
                    value: CONSTANTS.STATUS_USER_FRIEND_FRIENDLY,
                    label: 'Đã kết bạn'
                },
                {
                    value: CONSTANTS.STATUS_USER_FRIEND_CANCEL,
                    label: 'Hủy kết bạn'
                }
            ]
        },

        sourceUserFriend() {
            return [
                {
                    value: CONSTANTS.SOURCE_USER_FRIEND_SEARCH,
                    label: 'Tìm kiếm'
                },
                {
                    value: CONSTANTS.SOURCE_USER_FRIEND_QR_CODE,
                    label: 'Mã QR'
                }
            ]
        },

        mathRoundUp(score, v) {
            return Math.ceil(score * v) / v
        },

        async getData(url, payload = {}) {
            return await this.$store
                .dispatch(url, payload)
                .then(data => data)
                .catch(err => console.log(err))
        },

        getConstant(name) {
            return CONSTANTS[name]
        },

        arrRemoveDuplicates(arr) {
            return [...new Set(arr)]
        },

        getAvatarUrl(metaData, uri, gender = false) {
            if (!uri) {
                if (gender === CONSTANTS.GENDER_MALE) {
                    return metaData?.general?.GENERAL_OPTIONS?.default_avatar_male
                }

                if (gender === CONSTANTS.GENDER_FEMALE) {
                    return metaData?.general?.GENERAL_OPTIONS?.default_avatar_female
                }
            } else {
                if (metaData?.storage?.STORAGE_PUBLIC_ENDPOINT) {
                    return metaData?.storage?.STORAGE_PUBLIC_ENDPOINT + uri
                }
            }

            return ''
        },

        notifySuccess(message = 'Đã lưu dữ liệu thành công!') {
            return this.$notify({
                title: 'Thành Công',
                message: message,
                type: 'success',
                offset: 50
            })
        },

        notifyError(message = 'Có lỗi xảy ra, vui lòng thử lại!') {
            return this.$notify({
                title: 'Thất Bại',
                message: message,
                type: 'error',
                offset: 50
            })
        }
    }
}

export default Helper
