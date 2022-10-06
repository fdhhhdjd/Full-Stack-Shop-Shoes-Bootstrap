<p align="center"><a href="https://profile-forme.surge.sh" target="_blank"><img src="https://res.cloudinary.com/ecommerce2021/image/upload/v1659065987/avatar/logo_begsn1.png" width="300"></a></p>

<p align="center">
<a href="https://www.linkedin.com/in/tai-nguyen-tien-787545213/"><img src="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" alt="Linkedin"></a>
<a href="https://profile-forme.surge.sh"><img src="https://img.icons8.com/color/48/000000/internet--v1.png" alt="Profile"></a>
<a href="tel:0798805741"><img src="https://img.icons8.com/color/48/000000/apple-phone.png" alt="Phone"></a>
<a href = "mailto:nguyentientai10@gmail.com"><img src="https://img.icons8.com/fluency/48/000000/send-mass-email.png" alt="License"></a>
</p>


# BackEnd Code By: Nguyễn Tiến Tài

## WebSite (Hosting):https://shopshoes.cf

## Tài Khoản thanh toán tiền chuyển khoản.

## Tk: nguyentientai@gmail.com

## Mk: Taideptrai123

## Note: Thay localhost bằng Api.

## Api Online ( Heroku không dùng Redis-Aws ): https://shopshoetaiheo.herokuapp.com

## Api Online (Hoting và Aws Đầy đủ ) : https://shopshoedev.cf ( Aws đã hết phí sử dụng  😄 ).

## Tài Khoản Donate li Cf để có động lực code cho anh em tham khảo 😄😄

![giphy](https://3.bp.blogspot.com/-SzGvXn2sTmw/V6k-90GH3ZI/AAAAAAAAIsk/Q678Pil-0kITLPa3fD--JkNdnJVKi_BygCLcB/s1600/cf10-fbc08%2B%25281%2529.gif)

## Mk: NGUYEN TIEN TAI

## STK: 1651002972052

## Chi Nhánh: NGAN HANG TMCP AN BINH (ABBANK).

## SUPORT CONTACT:https://profile-forme.surge.sh/

## Upload General

- Upload Storage : post --> http://localhost:5000/api/upload

- Destroy Storage: post --> http://localhost:5000/api/destroy

## 1. API Admin

## Admin

- Register admin: post --> http://localhost:5000/api/admin/register

- Verification OTP: post --> http://localhost:5000/api/admin/verification/otp

- Login admin: post --> http://localhost:5000/api/admin/login

- logout admin: get --> http://localhost:5000/api/admin/logout

- Get Profile Admin: get --> http://localhost:5000/api/admin/profile

- Update profile: post --> http://localhost:5000/api/admin/update/profile

- New access Token : get --> http://localhost:5000/api/admin/new/access

- Change Password : post --> http://localhost:5000/api/admin/change/password

- Forget password admin: post --> http://localhost:5000/api/admin/forget

- Login google Admin: post --> http://localhost:5000/api/admin/login/google

- Get all account users: get --> http://localhost:5000/api/admin/getall/users

- Update Users and Admin : post --> http://localhost:5000/api/admin/upload/account/:id

- Delete Users and Admins : delete --> http://localhost:5000/api/admin/delete/account/:id

- List users register new 3 days: get --> http://localhost:5000/api/admin/getall/user/new

- Get all Admin: get --> http://localhost:5000/api/admin/getall/admin

- List account user delete order : get -->http://localhost:5000/api/admin/getall/user/delete/order

- List Monthly Registered Customers: get --> http://localhost:5000/api/admin/getall/user/register/month

## Categories

- Get all category: get --> http://localhost:5000/api/category

- Create category: post --> http://localhost:5000/api/category/create

- Update category: post --> http://localhost:5000/api/category/edit/:id

- Delete category: delete --> http://localhost:5000/api/category/delete/:id

## Carousels

- Get all Carousels: get --> http://localhost:5000/api/admin/carousel

- Create Carousels: post --> http://localhost:5000/api/admin/carousel/create

- Upload Carousel: post --> http://localhost:5000/api/admin/carousel/edit/:id

- Delete Carousel: delete --> http://localhost:5000/api/admin/carousel/delete/:id

## Vouchers

- Get all Vouchers : get --> http://localhost:5000/api/admin/voucher

- Create Vouchers: post --> http://localhost:5000/api/admin/voucher/create

- Upadate Vouchers: post --> http://localhost:5000/api/admin/voucher/update/:id"

- Delete Vouchers: delete --> http://localhost:5000/api/admin/voucher/delete/:id

## FeedBacks

- Get all feedback: get --> http://localhost:5000/api/feedback

- Response Feedback: post --> http://localhost:5000/api/feedback/response/:id

- Read Feedback: get --> http://localhost:5000/api/feedback/read/:id

- Filter Feedback: post --> http://localhost:5000/api/feedback/filter

## Products

- Get all product(Sort,filter,page) : get --> http://localhost:5000/api/admin/product

- Get detail product : get --> http://localhost:5000/api/admin/product/getId/:id

- Create product : post --> http://localhost:5000/api/admin/product/create

- Update product : post --> http://localhost:5000/api/admin/product/update/:id

- Delete product : delete --> http://localhost:5000/api/admin/product/delete/:id

## Orders

- Lấy ra toàn bộ đơn hàng: get --> http://localhost:5000/api/payment/payments

- Lấy ra đơn hàng đã xóa: get --> http://localhost:5000/api/payment/deletePayment

- Bỏ những đơn hàng không cần vào thùng rác: patch --> http://localhost:5000/api/payment/deletePayments/:id

- Undo order customer delete : post --> http://localhost:5000/api/admin/payment/update/:id

- Lấy ra chi tiết đơn hàng: get --> http://localhost:5000/api/payment/payments/:id

- Thay đổi tình trạng hóa đơn : patch --> http://localhost:5000/api/payment/update/order_status/:id

- Tổng doanh thu : get --> http://localhost:5000/api/payment/sumOfIncome

- Doanh thu của hóa đơn đã được vận chuyển tháng này với tháng trước : get --> http://localhost:5000/api/payment/orders/customerReceived/getIncomeThisMonthAndCompareTo

- Doanh thu của hóa đơn khách hàng chưa nhận được tháng này với tháng trước: get --> http://localhost:5000/api/payment/orders/customerNotReceived/getIncomeThisMonthAndCompareTo

- Doanh thu hóa đơn đã vận chuyển thành công theo từng tháng: get --> http://localhost:5000/api/payment/orders/customerReceived/getMonthlyIncome

- Lấy ra những đơn hàng được thanh toán trong 3 ngày gần nhất : get --> http://localhost:5000/api/payment/newPayment

- Thống kê các tài khoản khách hàng đăng ký mỗi tháng: get --> http://localhost:5000/api/auth/getMonthlyRegisteredCustomer

## 2. API Users

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

- Lịch sử đơn hàng của khách hàng : --> http://localhost:5000/api/auth/history

- Cho người dùng nhập mật khẩu mới khi login GG FB thay vì register:patch --> http://localhost:5000/api/auth/changePasswordGgFb

## Categories

- Get all category : get --> http://localhost:5000/api/user/category

## Carts

- Add to cart : post --> http://localhost:5000/api/product/add/cart

- InDeCrement Cart product --> http://localhost:5000/api/product/indecrement/cart

- Del Cart Product -> http://localhost:5000/api/product/del/cart

- Get cart users: ->http://localhost:5000/api/product/get/cart

## Feedbacks

- Send Feedback : post --> http://localhost:5000/api/feedback/send

## Products

- Get all product: get --> http://localhost:5000/api/product

- Get Product detail : get --> http://localhost:5000/api/review/create/:id

## Reviews

- Comment Product: post -->http://localhost:5000/api/review/create/:id

- Edit comment review : post --> http://localhost:5000/api/review/:productId/update/:commentId

- Delete comment : delete --> http://localhost:5000/api/review/:productId/delete/:commentId

## Vouchers

- Add voucher: post --> http://localhost:5000/api/user/voucher

- Del voucher: get --> http://localhost:5000/api/user/voucher/del

## Payments

- Payment paypal: post --> http://localhost:5000/api/payment/paypal

- Tính tiền bằng Stripe Quản lý bắng Stripe: post --> http://localhost:5000/api/payment/paymentStripe

- Payment checkStock : get --> http://localhost:5000/api/payment/check/stock

- Payment total : Post -->http://localhost:5000/api/payment/total
