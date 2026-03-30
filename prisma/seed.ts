import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional)
  await prisma.visitor.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();

  // Create admin user (password: admin123 - CHANGE THIS!)
  // Note: In production, properly hash the password with bcrypt
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: "admin123", // For demo only - use proper hashing in production!
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  // Seed Skills
  const skills = [
    { name: "Laravel", icon: "fab fa-laravel", proficiency: 95, category: "Backend" },
    { name: "Vue.js", icon: "fab fa-vuejs", proficiency: 90, category: "Frontend" },
    { name: "React.js", icon: "fab fa-react", proficiency: 85, category: "Frontend" },
    { name: "Tailwind CSS", icon: "fab fa-css3", proficiency: 92, category: "Styling" },
    { name: "Livewire", icon: "fas fa-bolt", proficiency: 88, category: "Laravel" },
    { name: "Alpine.js", icon: "fas fa-mountain", proficiency: 85, category: "JavaScript" },
    { name: "PHP", icon: "fab fa-php", proficiency: 96, category: "Backend" },
    { name: "MySQL", icon: "fas fa-database", proficiency: 90, category: "Database" },
    { name: "PostgreSQL", icon: "fas fa-database", proficiency: 85, category: "Database" },
    { name: "Git", icon: "fab fa-git", proficiency: 90, category: "Tools" },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log("Seeded skills");

  // Seed Projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with Laravel, Vue.js, and Stripe integration.",
      imageUrl: "/images/projects/ecommerce.jpg",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      techStack: JSON.stringify(["Laravel", "Vue.js", "Tailwind CSS", "MySQL"]),
      featured: true,
    },
    {
      title: "Task Management App",
      description: "Modern task management application with real-time updates and collaboration features.",
      imageUrl: "/images/projects/taskapp.jpg",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      techStack: JSON.stringify(["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"]),
      featured: true,
    },
    {
      title: "REST API Dashboard",
      description: "Comprehensive dashboard with analytics, user management, and reporting.",
      imageUrl: "/images/projects/dashboard.jpg",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      techStack: JSON.stringify(["Laravel", "React.js", "Tailwind CSS", "Chart.js"]),
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log("Seeded projects");

  // Seed Experience
  const experiences = [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Laravel Developer",
      location: "San Francisco, CA",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2024-12-31"),
      description: "Leading backend development for enterprise applications.",
    },
    {
      company: "Digital Agency Co.",
      position: "Full Stack Developer",
      location: "New York, NY",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2021-12-31"),
      description: "Developed custom web solutions for various clients using Laravel and Vue.js.",
    },
    {
      company: "StartUp Labs",
      position: "Junior PHP Developer",
      location: "Austin, TX",
      startDate: new Date("2018-08-01"),
      endDate: new Date("2020-05-31"),
      description: "Started professional journey building web applications and learning modern PHP frameworks.",
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log("Seeded experiences");

  console.log("Database seeding completed!");
  console.log("Admin credentials: admin@example.com / admin123");
  console.log("⚠️  CHANGE THE PASSWORD IN PRODUCTION!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
