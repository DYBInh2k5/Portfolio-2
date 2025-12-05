require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const setupAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'binh.vd01500@sinhvien.hoasen.edu.vn';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('Email:', email);
      console.log('\nUpdating password...');
      
      existingAdmin.password = password;
      await existingAdmin.save();
      console.log('✅ Password updated successfully!');
    } else {
      // Create new admin
      const admin = new Admin({ email, password });
      await admin.save();
      console.log('✅ Admin created successfully!');
    }

    console.log('\n📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('\n🔐 Login URL: http://localhost:3000/admin-login.html');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

setupAdmin();
