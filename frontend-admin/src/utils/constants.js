const CONSTANTS = {
    //* millisecond/ second
    _1_MINUTES: 60 * 1000,
    _5_MINUTES: 5 * 60 * 1000,
    _15_MINUTES: 15 * 60 * 1000,
    _45_MINUTES: 45 * 60 * 1000,
    _1_DAY: 24 * 60 * 60 * 1000,
    _7_DAY: 7 * 24 * 60 * 60 * 1000,
    _1_DAY_S: 24 * 60 * 60,
    _1_HOURS_S: 60 * 60,
    _1_YEAR: 365 * 24 * 60 * 60 * 1000,

    //* Delete Cache
    _DEFAULT_CACHE_TIME: 15,

    //* Delete Flag
    DELETED_ENABLE: true,
    DELETED_DISABLE: false,
    // Login type
    LOGIN_TYPE_PASSWORD: 'password',
    GC_SETTING: 'graphcool-setting',
    GC_CMS: 'graphcool-cms',
    GC_USER_ID: 'graphcool-user-id',
    GC_AUTH_TOKEN: 'api-auth-token',
    GC_DEVICE_ID: 'graphcool-device-id',
    GC_S3: 'graphcool-s3',

    // Pagination
    DEFAULT_PAGE_SIZE: 10,

    // Default Image Matches
    IMAGE_DEFAULT_MATCHES: 'https://via.placeholder.com/600x1024.png?text=DEFAULT',

    // User Role
    USER_ROLE_SUPERVISOR: 'admin',
    USER_ROLE_ADMIN: 'administrator',
    USER_ROLE_STAFF: 'staff',
    USER_ROLE_CUSTOMER: 'customer',
    USER_ROLE_SCOREBOARD: 'scoreboard',

    // Gender
    GENDER_MALE: 1, // Nam
    GENDER_FEMALE: 2, // Nữ

    // Status Users Billiards Service
    STATUS_USER_ACTIVE: 1, // Hoạt động
    STATUS_USER_INACTIVE: 2, // Không hoạt động
    STATUS_USER_BAN: 3, // Cấm
    STATUS_USER_DELETED: 4, // Đã xóa
    STATUS_USER_UNREGISTERED: 5, // Chưa đăng ký,

    // Type Billiard
    TYPE_BILLIARD_FRANCE: 1, // Phăng,
    TYPE_BILLIARD_CAROM_1: 2, // Carom 1 băng,
    TYPE_BILLIARD_CAROM_3: 3, // Carom 3 băng

    // Status Matches
    STATUS_MATCHES_GAME_PROCESS: 1, // Đang chơi
    STATUS_MATCHES_GAME_COMPLETE: 2, // Đã xong
    STATUS_MATCHES_ERROR: 3, // Lỗi
    STATUS_MATCHES_DONE: 4, // Hoàn thành
    STATUS_MATCHES_CANCEL: 5, // Hủy bỏ

    // Type Regions
    TYPE_REGIONS_NATION: 0, // Quốc gia
    TYPE_REGIONS_PROVINCE: 1, // Tỉnh/Thành phố
    TYPE_REGIONS_DISTRICT: 2, // Quận/Huyện
    TYPE_REGIONS_TOWN: 3, // Xã/Phường

    // Status Matches Image
    STATUS_MATCHES_IMAGE_NO_INPUT: 1, // Chưa nhập
    STATUS_MATCHES_IMAGE_DONE: 2, // Đã nhập

    // Status Customer
    STATUS_CUSTOMER_NEW: 10, // Mới (Chưa đăng ký)
    STATUS_CUSTOMER_REGISTERED: 20, // Đã đăng ký
    STATUS_CUSTOMER_BANNED: 30, //  Cấm

    // Status Customer Place
    STATUS_CUSTOMER_PLACE_ACTIVE: 10, // Hoạt động
    STATUS_CUSTOMER_PLACE_INACTIVE: 20, // Ngừng hoạt động,

    // Status List Place
    STATUS_PLACE_ACTIVE: 10, // Hoạt động
    STATUS_PLACE_INACTIVE: 20, // Ngừng hoạt động

    // Status List ScoreBoard
    STATUS_SCOREBOARD_ACTIVE: 10, // Hoạt động
    STATUS_SCOREBOARD_INACTIVE: 20, // Ngừng hoạt động
    STATUS_SCOREBOARD_ONLINE: 30, // Đang sử dụng

    // Status Club Or Group
    STATUS_GROUP_UNAPPROVED: 10, // Chưa kích hoạt
    STATUS_GROUP_APPROVED: 20, // Đã kích hoạt
    STATUS_GROUP_BLOCKED: 30, // Bị khóa
    STATUS_GROUP_CANCEL: 40, // Giải tán

    // Role Club Or Group Member
    ROLE_GROUP_ADMIN: 10, // Quản trị viên
    ROLE_GROUP_MOD: 20, // Người điều hành
    ROLE_GROUP_USER: 30, // Thành viên

    // Stage List Customer
    STATUS_STAGE_TRIGGER: 1, // Nhóm Quản trị / Nhân viên (Trigger)
    STATUS_STAGE_DEV: 2, // Nhóm Hệ thống (DEV)
    STATUS_STAGE_CONDITION: 3, // Nhóm Điều kiện

    // Social Type Group / Club
    SOCIAL_TYPE_GROUP: 10, // Group
    SOCIAL_TYPE_CLUB: 20, // Câu lạc bộ

    // Status Member In Group
    STATUS_MEMBER_GROUP_APPROVE_PROCESSING: 10, // Đang duyệt
    STATUS_MEMBER_GROUP_APPROVED: 20, // Đã duyệt
    STATUS_MEMBER_GROUP_APPROVE_CANCEL: 30, // Hủy

    // Status User Friend
    STATUS_USER_FRIEND_PROCESSING: 10, // Đang chờ
    STATUS_USER_FRIEND_FRIENDLY: 20, // Đã kết bạn
    STATUS_USER_FRIEND_CANCEL: 30, // Hủy kết bạn,

    // Source User Friend
    SOURCE_USER_FRIEND_SEARCH: 10, // Tìm kiếm
    SOURCE_USER_FRIEND_QR_CODE: 20, // Mã QR

    // Type Message
    TYPE_MESSAGE_TEXT: 10, // Văn bản
    TYPE_MESSAGE_IMAGE: 20, // Hình ảnh
    TYPE_MESSAGE_VIDEO: 30, // Video
    TYPE_MESSAGE_LOCATION: 50, // Tọa độ
    TYPE_MESSAGE_CALL: 60, // Gọi

    // Type Create Notice
    CREATE_TYPE_NOTICE_WITH_STAGE: 'stage', // Thêm thông báo với thẻ người dùng
    CREATE_TYPE_NOTICE_WITH_LIST: 'list', // Thêm thông báo với danh sách

    // Bulk Action Type
    BULK_ACTION_TYPE_NOTIFICATION: 10, // Thông Báo (Kèm Push)
    BULK_ACTION_TYPE_SMS: 20, // SMS
    BULK_ACTION_TYPE_EMAIL: 30, // E-mail
    BULK_ACTION_TYPE_PUSH: 40, // Push

    // Bulk Action Status
    BULK_ACTION_STATUS_PROCESSING: 10, // Đang chờ
    BULK_ACTION_STATUS_SENDING: 20, // Đang gửi
    BULK_ACTION_STATUS_DONE: 30, // Hoàn thành
    BULK_ACTION_STATUS_ERROR: 40, // Lỗi
    BULK_ACTION_STATUS_CANCEL: 50, // Hủy

    // Bulk Limit
    BULK_LIMIT_NOTICE: 1000, // Thông báo tối đa 1000 user,

    // Call Status
    CALL_STATUS_DENIED: 2, // Từ chối cuộc gọi
    CALL_STATUS_CANCEL: 3, // Không nhấc máy
    CALL_STATUS_DONE: 4, // Hoàn thành
    CALL_STATUS_BUSY: 5, // Bận (Đầu dây bên kia đang có cuộc gọi)

    // Users Approve Status
    USER_APPROVE_WAITING: 1, // Đang chờ duyệt
    USER_APPROVE_ACCEPTED: 2, // Đã duyệt
    USER_APPROVE_DENIED: 3, // Không duyệt

    // Type System Info
    SYSTEM_INFO_TYPE_SYSTEM: 1, // Hệ thống
    SYSTEM_INFO_TYPE_LINK: 2, // Liên kết
    SYSTEM_INFO_TYPE_MOBILE: 3, // Mobile

    // Category Report User
    REPORT_USER_CATEGORY_PROFILE: 10, // Thông tin cơ thủ
    REPORT_USER_CATEGORY_MATCH: 20, // Trận đấu

    // Status Report User
    STATUS_REPORT_USER_PROCESSING: 10, // Chờ giải quyết
    STATUS_REPORT_USER_DONE: 20, // Đã giải quyết
    STATUS_REPORT_USER_SKIP: 30, // Bỏ qua

    // determined Role
    ROLE_ADMIN: 1, // admin
    ROLE_USER: 0, // user
}

export default CONSTANTS
