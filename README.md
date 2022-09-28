<p align="center"><a href="https://profile-forme.surge.sh" target="_blank"><img src="https://res.cloudinary.com/ecommerce2021/image/upload/v1659065987/avatar/logo_begsn1.png" width="300"></a></p>

<p align="center">
<a href="https://www.linkedin.com/in/tai-nguyen-tien-787545213/"><img src="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" alt="Linkedin"></a>
<a href="https://profile-forme.surge.sh"><img src="https://img.icons8.com/color/48/000000/internet--v1.png" alt="Profile"></a>
<a href="tel:0798805741"><img src="https://img.icons8.com/color/48/000000/apple-phone.png" alt="Phone"></a>
<a href = "mailto:nguyentientai10@gmail.com"><img src="https://img.icons8.com/fluency/48/000000/send-mass-email.png" alt="License"></a>
</p>


# BackEnd Code By: Nguyễn Tiến Tài

## WebSite (Hosting):https://shopshoes.cf

## Tài Khoản thanh toán tiền chuyển khoản

## Tk: nguyentientai@gmail.com

## Mk: Taideptrai123

## Note: Thay localhost bằng Api.

## Api Online ( Heroku không dùng Redis-Aws ): https://shopshoetaiheo.herokuapp.com

## Api Online (Hoting và Aws Đầy đủ ) : https://shopshoedev.cf ( Aws đã hết phí sử dụng  😄 ).

## Tài Khoản Donate li Cf để có động lực code cho anh em tham khảo 😄😄

![giphy](https://3.bp.blogspot.com/-SzGvXn2sTmw/V6k-90GH3ZI/AAAAAAAAIsk/Q678Pil-0kITLPa3fD--JkNdnJVKi_BygCLcB/s1600/cf10-fbc08%2B%25281%2529.gif)

## Mk: NGUYEN TIEN TAI

## STK: 1651002972052

## Chi Nhánh: NGAN HANG TMCP AN BINH (ABBANK)

## SUPORT CONTACT:https://profile-forme.surge.sh/

## 1. API Admin

## Admin

- Register admin: post --> http://localhost:5000/api/admin/register

- Verification OTP: post --> http://localhost:5000/api/admin/verification/otp

- Login admin: post --> http://localhost:5000/api/admin/login

- logout admin: get --> http://localhost:5000/api/admin/logout

- Get Profile Admin: get --> http://localhost:5000/api/admin/profile

- update profile: post --> http://localhost:5000/api/update/profile

- New access Token : get --> http://localhost:5000/api/admin/new/access

- Thay đổi mật khẩu : patch --> http://localhost:5000/api/auth/changePassword

- Forget password admin: post --> http://localhost:5000/api/admin/forget

- Login google Admin: post --> http://localhost:5000/api/admin/login/google

- Lấy ra danh sách khách hàng: get --> http://localhost:5000/api/auth/getAllUser

- Cập nhập thông tin khách hàng hay admin : patch --> http://localhost:5000/api/auth/updateUserAdmin/:id

- Xóa tài khoản khách hàng hay admin : delete --> http://localhost:5000/api/auth/deleteUserAdmin/:id

- Danh sách tài khoản mới đăng ký trong 3 ngày gần đây: get --> http://localhost:5000/api/auth/getUserDay

- Danh sách các tài khoản admin: get --> http://localhost:5000/api/auth/getAllAdmin

- Danh sách tài khoản Uncheck:get -->http://localhost:5000/api/auth/getAllUserUncheck

- Thống kê các tài khoản khách hàng đăng ký mỗi tháng: get --> http://localhost:5000/api/auth/getMonthlyRegisteredCustomer

## Upload:

- Upload ảnh người dùng : post --> http://localhost:5000/api/uploadImageUser

- Xóa ảnh người dùng trên cloud : post --> http://localhost:5000/api/destroyImageUser

## Category

- Get all category: get --> http://localhost:5000/api/category

- Create category: post --> http://localhost:5000/api/category/create

- Update category: post --> http://localhost:5000/api/category/edit/:id

- Delete category: delete --> http://localhost:5000/api/category/delete/:id

## Carousel

- Xem tất cả loại Carousel: get --> http://localhost:5000/api/carousel/carousels

- Tạo thêm 1 loại Carousels: post --> http://localhost:5000/api/carousel/carousels

- Cập nhập loại Carousel: patch --> http://localhost:5000/api/carousel/carousels/:id

- Xóa loại Carousel: delete --> http://localhost:5000/api/carousel/carousels/:id

## Voucher

- Xem tất cả loại voucher : get --> http://localhost:5000/api/voucher/vouchers

- Tạo thêm voucher: post --> http://localhost:5000/api/voucher/vouchers

- Cập nhập voucher: patch --> http://localhost:5000/api/voucher/vouchers/:id

- Xóa loại voucher: delete --> http://localhost:5000/api/voucher/vouchers/:id

## FeedBack

- Xem tất cả loại voucher : get --> http://localhost:5000/api/feedback/all

- Tra loi Feedback: patch --> http://localhost:5000/api/feedback/response/:id

## Product

- Get all product(Sort,filter,page) : get --> http://localhost:5000/api/product

- Get detail product : get --> http://localhost:5000/api/product/getId/:id

- Create product : post --> http://localhost:5000/api/product/create

- Update product : put --> http://localhost:5000/api/product/update/:id

- Delete product : delete --> http://localhost:5000/api/product/delete/:id

## Payment

- Lấy ra toàn bộ đơn hàng: get --> http://localhost:5000/api/payment/payments

- Lấy ra đơn hàng đã xóa: get --> http://localhost:5000/api/payment/deletePayment

- Bỏ những đơn hàng không cần vào thùng rác: patch --> http://localhost:5000/api/payment/deletePayments/:id

- Khôi phục lại những đơn hàng đã bỏ vào thùng rác: patch --> http://localhost:5000/api/payment/undoPayments/:id

- Lấy ra chi tiết đơn hàng: get --> http://localhost:5000/api/payment/payments/:id

- Thay đổi tình trạng hóa đơn : patch --> http://localhost:5000/api/payment/update/order_status/:id

- Tổng doanh thu : get --> http://localhost:5000/api/payment/sumOfIncome

- Doanh thu của hóa đơn đã được vận chuyển tháng này với tháng trước : get --> http://localhost:5000/api/payment/orders/customerReceived/getIncomeThisMonthAndCompareTo

- Doanh thu của hóa đơn khách hàng chưa nhận được tháng này với tháng trước: get --> http://localhost:5000/api/payment/orders/customerNotReceived/getIncomeThisMonthAndCompareTo

- Doanh thu hóa đơn đã vận chuyển thành công theo từng tháng: get --> http://localhost:5000/api/payment/orders/customerReceived/getMonthlyIncome

- Lấy ra những đơn hàng được thanh toán trong 3 ngày gần nhất : get --> http://localhost:5000/api/payment/newPayment

- Thống kê các tài khoản khách hàng đăng ký mỗi tháng: get --> http://localhost:5000/api/auth/getMonthlyRegisteredCustomer

## 2. API Users

## Upload:

- Upload ảnh người dùng : post --> http://localhost:5000/api/uploadImageUser

- Xóa ảnh người dùng trên cloud : post --> http://localhost:5000/api/destroyImageUser

## Authentication Users:

- Register Users: post --> http://localhost:5000/api/user/register

- Verification Users: get --> http://localhost:5000/api/user/verify/:userId/:uniqueString

- Login Email and Phone: post --> http://localhost:5000/api/user/login

- Logout Users : get --> http://localhost:5000/api/user/logout

- Profile Users : get --> http://localhost:5000/api/user/profile

- Upload Profile: patch --> http://localhost:5000/api/user/update/profile

- New Acceptoken  : get --> http://localhost:5000/api/user/new/accessToken

- Change Password  : post --> http://localhost:5000/api/user/change/password

- Forget: post --> http://localhost:5000/api/user/forget

- Reset Passwrod : post --> http://localhost:5000/api/user/password/reset/:token

- Login Google Users : post --> http://localhost:5000/api/user/login/google

- Login Facebook Users: post --> http://localhost:5000/api/user/login/facebook

- Thêm giày vào giỏ hàng: patch --> http://localhost:5000/api/auth/addCart

- Lịch sử đơn hàng của khách hàng : --> http://localhost:5000/api/auth/history

- Cho người dùng nhập mật khẩu mới khi login GG FB thay vì register:patch --> http://localhost:5000/api/auth/changePasswordGgFb

## Category

- Get all category : get --> http://localhost:5000/api/category

## Feedback

- Gui feed back : post --> http://localhost:5000/api/feedback/send

## Product

- Get all product: get --> http://localhost:5000/api/product

- Get Product detail : get --> http://localhost:5000/api/product/detail/:id

- Chỉnh sửa comment review : put --> http://localhost:5000/api/product/:productId/update/review/:commentId

- Xóa comment : delete --> http://localhost:5000/api/product/:productId/delete/review/:commentId

## Payment

- Thanh toán đơn hàng bằng Paypal: post --> http://localhost:5000/api/payment/payments

- Tính tiền bằng Stripe Quản lý bắng Stripe: post --> http://localhost:5000/api/payment/paymentStripe

- Xóa mem payment : patch -->http://localhost:5000/api/payment/deletePayments/:id

- Check Password khi xóa : Post -->http://localhost:5000/api/payment/checkPass

## Share User and Admin

- Xóa cache redis: Post -->http://localhost:5000/api/redis/cache
