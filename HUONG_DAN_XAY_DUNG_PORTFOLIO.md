# Hướng Dẫn Xây Dựng Portfolio IT - Phong Cách Vũ Trụ

## 📋 Tổng Quan Dự Án
Portfolio cá nhân chuyên về IT với thiết kế vũ trụ (space theme), bao gồm:
- Backend API để quản lý nội dung
- Frontend với giao diện vũ trụ độc đáo
- Quản lý projects, skills, experience, blog posts

## 🚀 Quy Trình Thực Hiện

### Phase 1: Backend Development (ĐANG THỰC HIỆN)
1. ✅ Thiết kế database schema
2. ✅ Xây dựng REST API
3. ✅ Tạo admin panel để quản lý nội dung
4. ✅ Testing API endpoints

### Phase 2: Design & Frontend (CHỜ DESIGN)
1. ⏳ Bạn thiết kế giao diện (Figma/Adobe XD/Sketch)
2. ⏳ Gửi design cho tôi
3. ⏳ Implement frontend theo design
4. ⏳ Tích hợp với backend API

### Phase 3: Deployment
1. Deploy backend
2. Deploy frontend
3. Cấu hình domain và SSL

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express**: REST API server
- **MongoDB**: Database lưu trữ
- **JWT**: Authentication
- **Multer**: Upload images/files

### Frontend (Sẽ implement sau khi có design)
- **React/Next.js**: Framework
- **Three.js/React Three Fiber**: Hiệu ứng 3D vũ trụ
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling

---

## 📊 Database Schema

### Collections:

#### 1. Projects
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  technologies: [String],
  imageUrl: String,
  demoUrl: String,
  githubUrl: String,
  featured: Boolean,
  order: Number,
  createdAt: Date
}
```

#### 2. Skills
```javascript
{
  _id: ObjectId,
  name: String,
  category: String, // "frontend", "backend", "tools", "other"
  level: Number, // 1-100
  icon: String,
  order: Number
}
```

#### 3. Experience
```javascript
{
  _id: ObjectId,
  company: String,
  position: String,
  description: String,
  startDate: Date,
  endDate: Date, // null nếu đang làm
  current: Boolean,
  order: Number
}
```

#### 4. Blog Posts
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  coverImage: String,
  tags: [String],
  published: Boolean,
  publishedAt: Date,
  views: Number
}
```

#### 5. About
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  avatar: String,
  resume: String,
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    facebook: String
  }
}
```

---

## 🔌 API Endpoints

### Public Endpoints (Không cần auth)
- `GET /api/projects` - Lấy danh sách projects
- `GET /api/projects/:id` - Lấy chi tiết project
- `GET /api/skills` - Lấy danh sách skills
- `GET /api/experience` - Lấy kinh nghiệm làm việc
- `GET /api/blog` - Lấy danh sách blog posts
- `GET /api/blog/:slug` - Lấy chi tiết blog post
- `GET /api/about` - Lấy thông tin cá nhân
- `POST /api/contact` - Gửi tin nhắn liên hệ

### Admin Endpoints (Cần JWT token)
- `POST /api/auth/login` - Đăng nhập admin
- `POST /api/admin/projects` - Tạo project mới
- `PUT /api/admin/projects/:id` - Cập nhật project
- `DELETE /api/admin/projects/:id` - Xóa project
- `POST /api/admin/skills` - Tạo skill mới
- `PUT /api/admin/skills/:id` - Cập nhật skill
- `DELETE /api/admin/skills/:id` - Xóa skill
- `POST /api/admin/experience` - Tạo experience mới
- `PUT /api/admin/experience/:id` - Cập nhật experience
- `DELETE /api/admin/experience/:id` - Xóa experience
- `POST /api/admin/blog` - Tạo blog post mới
- `PUT /api/admin/blog/:id` - Cập nhật blog post
- `DELETE /api/admin/blog/:id` - Xóa blog post
- `PUT /api/admin/about` - Cập nhật thông tin cá nhân
- `POST /api/admin/upload` - Upload file/image

---

## 📝 Ghi Chú Quan Trọng

### Cho Phase 2 (Frontend):
Khi bạn có design, hãy gửi cho tôi:
1. **File design** (Figma link, PSD, hoặc screenshots)
2. **Color palette** - Màu sắc chủ đạo
3. **Typography** - Font chữ sử dụng
4. **Animations** - Hiệu ứng mong muốn
5. **Layout** - Cấu trúc các trang:
   - Home page
   - About page
   - Projects page
   - Blog page
   - Contact page

### Ý Tưởng Cho Thiết Kế Vũ Trụ:
- Background: Starfield animation, nebula effects
- Navigation: Floating space station style
- Cards: Holographic panels
- Buttons: Futuristic glowing effects
- Cursor: Custom space-themed cursor
- Loading: Rocket/satellite animations
- Scroll effects: Parallax với planets/stars
- Colors: Deep blues, purples, cyans, neon accents

---

## 🎯 Trạng Thái Hiện Tại

✅ **HOÀN THÀNH**: Backend structure đã sẵn sàng
⏳ **CHỜ**: Design từ bạn để implement frontend
🚀 **TIẾP THEO**: Sau khi có design, tôi sẽ code frontend

---

## 📞 Khi Bạn Sẵn Sàng

Hãy nói với tôi:
"Tôi đã có design rồi" và gửi kèm file/link design, tôi sẽ bắt đầu implement frontend ngay!
