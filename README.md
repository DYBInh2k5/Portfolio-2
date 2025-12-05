# Portfolio Backend API

Backend API cho trang portfolio IT với phong cách vũ trụ.

## 🚀 Cài Đặt

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình môi trường
Tạo file `.env` từ `.env.example`:
```bash
copy .env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn:
- `MONGODB_URI`: Connection string MongoDB
- `JWT_SECRET`: Secret key cho JWT (đổi thành chuỗi ngẫu nhiên)
- `ADMIN_EMAIL`: Email admin
- `ADMIN_PASSWORD`: Password admin

### 3. Khởi động MongoDB
Đảm bảo MongoDB đang chạy trên máy hoặc sử dụng MongoDB Atlas.

### 4. Tạo tài khoản admin
```bash
node scripts/createAdmin.js
```

### 5. (Optional) Seed dữ liệu mẫu
```bash
node scripts/seedData.js
```

### 6. Chạy server
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## 📚 API Documentation

### Public Endpoints

#### Projects
- `GET /api/projects` - Lấy tất cả projects
- `GET /api/projects/featured` - Lấy featured projects
- `GET /api/projects/:id` - Lấy chi tiết project

#### Skills
- `GET /api/skills` - Lấy tất cả skills
- `GET /api/skills/category/:category` - Lấy skills theo category

#### Experience
- `GET /api/experience` - Lấy kinh nghiệm làm việc

#### Blog
- `GET /api/blog` - Lấy tất cả blog posts
- `GET /api/blog/:slug` - Lấy chi tiết blog post
- `GET /api/blog/tag/:tag` - Lấy posts theo tag

#### About
- `GET /api/about` - Lấy thông tin cá nhân

#### Contact
- `POST /api/contact` - Gửi tin nhắn liên hệ

### Admin Endpoints (Cần JWT Token)

#### Authentication
- `POST /api/auth/login` - Đăng nhập admin
  ```json
  {
    "email": "admin@example.com",
    "password": "your_password"
  }
  ```

#### Projects Management
- `POST /api/admin/projects` - Tạo project mới
- `PUT /api/admin/projects/:id` - Cập nhật project
- `DELETE /api/admin/projects/:id` - Xóa project

#### Skills Management
- `POST /api/admin/skills` - Tạo skill mới
- `PUT /api/admin/skills/:id` - Cập nhật skill
- `DELETE /api/admin/skills/:id` - Xóa skill

#### Experience Management
- `POST /api/admin/experience` - Tạo experience mới
- `PUT /api/admin/experience/:id` - Cập nhật experience
- `DELETE /api/admin/experience/:id` - Xóa experience

#### Blog Management
- `GET /api/admin/blog` - Lấy tất cả posts (kể cả draft)
- `POST /api/admin/blog` - Tạo blog post mới
- `PUT /api/admin/blog/:id` - Cập nhật blog post
- `DELETE /api/admin/blog/:id` - Xóa blog post

#### About Management
- `PUT /api/admin/about` - Cập nhật thông tin cá nhân

#### File Upload
- `POST /api/admin/upload` - Upload file/image
  - Form-data với key `file`
  - Trả về URL của file

### Sử dụng Admin Endpoints

Thêm header Authorization với JWT token:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🧪 Test API

Bạn có thể test API bằng:
- Postman
- Thunder Client (VS Code extension)
- cURL

Ví dụ với cURL:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"your_password\"}"

# Get projects
curl http://localhost:5000/api/projects
```

## 📁 Cấu Trúc Project

```
portfolio-backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── scripts/         # Utility scripts
├── uploads/         # Uploaded files
├── server.js        # Main server file
├── package.json
└── .env
```

## 🔒 Security

- JWT authentication cho admin routes
- Helmet.js cho security headers
- Rate limiting
- File upload validation
- CORS configuration

## 📝 Notes

- Đổi `JWT_SECRET` trong production
- Đổi admin password sau lần đăng nhập đầu tiên
- Backup database thường xuyên
- Sử dụng HTTPS trong production

## 🎯 Tiếp Theo

Backend đã sẵn sàng! Khi bạn có design cho frontend, hãy gửi cho tôi để implement giao diện.
