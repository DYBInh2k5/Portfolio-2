require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const About = require('../models/About');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await About.deleteMany({});

    // Seed Projects
    const projects = [
      {
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce website with payment integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        featured: true,
        order: 1
      },
      {
        title: 'Task Management App',
        description: 'Real-time task management application with team collaboration',
        technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
        featured: true,
        order: 2
      }
    ];
    await Project.insertMany(projects);
    console.log('✅ Projects seeded');

    // Seed Skills
    const skills = [
      { name: 'JavaScript', category: 'frontend', level: 90, order: 1 },
      { name: 'React', category: 'frontend', level: 85, order: 2 },
      { name: 'Node.js', category: 'backend', level: 80, order: 3 },
      { name: 'MongoDB', category: 'database', level: 75, order: 4 },
      { name: 'Git', category: 'tools', level: 85, order: 5 }
    ];
    await Skill.insertMany(skills);
    console.log('✅ Skills seeded');

    // Seed Experience
    const experience = [
      {
        company: 'Tech Company',
        position: 'Full Stack Developer',
        description: 'Developed and maintained web applications',
        startDate: new Date('2022-01-01'),
        current: true,
        order: 1
      }
    ];
    await Experience.insertMany(experience);
    console.log('✅ Experience seeded');

    // Seed About
    const about = new About({
      name: 'Your Name',
      title: 'Full Stack Developer',
      bio: 'Passionate IT professional specializing in web development',
      email: 'your.email@example.com',
      location: 'Vietnam',
      social: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername'
      }
    });
    await about.save();
    console.log('✅ About info seeded');

    console.log('\n🎉 All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedData();
