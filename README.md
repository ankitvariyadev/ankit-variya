# 🚀 Laravel Developer Portfolio

A modern, fully animated developer portfolio website built with **Next.js 16**, **Tailwind CSS**, **Framer Motion**, **Prisma**, **SQLite**, and **NextAuth**. Features an admin panel with CRUD operations, visitor tracking, and Apple Glass UI design.

## ✨ Features

### Public-Facing Portfolio
- **Hero Section** - Animated typing effect with role rotation
- **About Section** - Personal introduction with animated stats
- **Skills Section** - Interactive skill cards with proficiency bars and category filtering
- **Projects Section** - Dynamic project showcase with detailed modals
- **Experience Timeline** - Animated vertical timeline
- **Contact Form** - Visitor message submission with validation
- **Dark/Light Mode** - System theme detection with toggle
- **Glassmorphism UI** - Apple Glass inspired design with backdrop blur
- **Fully Responsive** - Mobile, tablet, and desktop optimized
- **SEO Optimized** - Meta tags and semantic HTML

### Admin Panel
- **Secure Authentication** - NextAuth with credentials provider
- **Dashboard** - Overview with stats and recent activity
- **Skills Management** - Full CRUD for portfolio skills
- **Projects Management** - CRUD with image URLs, tech stack management, featured/hidden toggles
- **Experience Management** - Work experience timeline editor
- **Contacts Management** - View and manage contact form submissions
- **Mark as Read** - Track and manage message status

### Visitor Tracking
- **Automatic Tracking** - Captures IP, location, device, browser, and page path
- **Dashboard Analytics** - Total visitor count in admin panel
- **Privacy-Friendly** - No cookies, simple analytics storage

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 16.2.1 |
| React | 18.2.0 |
| TypeScript | 5.2.2 |
| Tailwind CSS | 4.x |
| Framer Motion | 10.16.4 |
| Prisma | 6.4.0 |
| SQLite | 3.x |
| NextAuth | 4.24.5 |
| Font Awesome | Free |
| next-themes | 0.2.1 |

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone and Install

```bash
# Navigate to the project directory
cd /path/to/project

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-at-least-32-characters-long-for-production"
NEXTAUTH_URL="http://localhost:3000"
```

**Important**: Generate a strong secret for production:
```bash
openssl rand -base64 32
```

### 3. Database Setup

```bash
# Push schema to SQLite database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

The seed script creates:
- Admin user (email: `admin@example.com`, password: `admin123`)
- 10 sample skills
- 3 sample projects
- 3 experience entries

**⚠️ Change the admin password in production!**

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🔧 Database Operations

### Prisma Commands

```bash
# Push schema changes to database
npm run db:push

# Seed/Reseed database
npm run db:seed

# Open Prisma Studio (GUI database editor)
npm run db:studio

# Reset database and re-seed
npm run db:reset
```

### Using Prisma Studio

Prisma Studio provides a GUI for managing your database:

```bash
npm run db:studio
```

Open [http://localhost:5555](http://localhost:5555) to view and edit data.

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Use the seeded credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. After login, you'll be redirected to `/admin` dashboard
4. Change the password immediately via Prisma Studio or modify the seed script

## 📁 Project Structure

```
app/
├── api/
│   ├── admin/
│   │   ├── skills/
│   │   │   ├── route.ts          # GET all, POST new skill
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE specific skill
│   │   ├── projects/
│   │   │   ├── route.ts          # GET all, POST new project
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE specific project
│   │   ├── experience/
│   │   │   ├── route.ts          # GET all, POST new experience
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE specific experience
│   │   ├── contacts/
│   │   │   ├── route.ts          # GET all, POST (internal)
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE specific contact
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts      # NextAuth configuration
│   ├── contact/route.ts          # Public contact form submission
│   └── visitors/route.ts         # Visitor tracking endpoint
├── admin/
│   ├── layout.tsx               # Protected admin layout
│   ├── page.tsx                 # Dashboard with stats (at /admin)
│   ├── login/page.tsx           # Admin login page
│   ├── skills/page.tsx          # Skills management CRUD
│   ├── projects/page.tsx        # Projects management CRUD
│   ├── experience/page.tsx      # Experience management CRUD
│   └── contacts/page.tsx        # Contacts management
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── admin/
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   └── RecentActivity.tsx
│   └── ui/
│       ├── ThemeToggle.tsx
│       ├── SessionStatus.tsx
│       └── VisitorTracker.tsx
├── globals.css                  # Global styles + Tailwind + Glassmorphism
├── layout.tsx                   # Root layout with providers
├── page.tsx                     # Homepage (sections aggregate)
└── middleware.ts                # Route protection middleware
lib/
├── prisma.ts                    # Prisma client singleton
prisma/
├── schema.prisma                # Database schema
└── seed.ts                      # Database seed script
public/
└── [images, icons, etc.]
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables:
   - `DATABASE_URL` - For production, switch to MySQL/PostgreSQL (SQLite not recommended)
   - `NEXTAUTH_SECRET` - Generate a strong secret
   - `NEXTAUTH_URL` - Your production URL
4. Build command: `npm run build`
5. Deploy!

### Using MySQL/PostgreSQL in Production

SQLite is great for prototyping but not recommended for production. To switch:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"  // or "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update DATABASE_URL:
```env
# For MySQL
DATABASE_URL="mysql://username:password@hostname:3306/database"

# For PostgreSQL
DATABASE_URL="postgresql://username:password@hostname:5432/database"
```

3. Run migrations:
```bash
npx prisma db push
npx prisma generate
```

4. Update your seed script to work with SQL (remove `@db.Text` from auth models if using SQLite)

## 🔒 Security Considerations

1. **Change Default Admin Password**: Update the seed script before seeding in production
2. **Use Strong NEXTAUTH_SECRET**: Minimum 32 characters, random
3. **Environment Variables**: Never commit `.env.local` to version control
4. **Database**: Use MySQL/PostgreSQL in production, not SQLite
5. **HTTPS**: Always deploy with HTTPS in production
6. **Rate Limiting**: Consider adding rate limiting to contact form API
7. **CORS**: Configure CORS appropriately for your domain

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `app/components/sections/Hero.tsx`
2. **About Section**: Update text in `app/components/sections/About.tsx` or add more data in the database
3. **Skills**: Add/edit via Admin Panel or database
4. **Projects**: Add/edit via Admin Panel
5. **Experience**: Add/edit via Admin Panel

### Change Colors

Edit `app/globals.css` to modify the glassmorphism and gradient variables:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

Or update gradient classes in components (e.g., `from-blue-600 to-purple-600`).

### Add Icons

This project uses Font Awesome. Available classes:
- Brands: `fab fa-{name}` (github, linkedin, etc.)
- Solid: `fas fa-{name}` (code, bolt, etc.)
- Regular: `far fa-{name}`

Browse icons: [Font Awesome Icons](https://fontawesome.com/icons)

## 📊 Visitor Tracking

Visitor tracking is automatic and captures:
- IP address (anonymized optional)
- Approximate location (via IP geolocation - can be integrated)
- Device type (Mobile, Tablet, Desktop)
- Browser type
- Page path
- Timestamp

View statistics in the Admin Dashboard.

**Privacy Note**: Consider your local privacy laws (GDPR, CCPA, etc.). You may need to:
- Add a cookie consent banner
- Allow users to opt out
- Anonymize IP addresses
- Add a privacy policy

## 🐛 Troubleshooting

### Database Errors

```bash
# Reset database
npm run db:reset
```

### Prisma Client Not Generated

```bash
npx prisma generate
```

### Build Errors

1. Clear `.next` folder
2. Delete `node_modules`
3. Reinstall: `npm install`
4. Rebuild: `npm run build`

### Authentication Issues

- Check `NEXTAUTH_SECRET` is set in `.env.local`
- Verify `NEXTAUTH_URL` matches your domain
- Check database is running and User exists

### SQLite Limitations

SQLite has some limitations in Prisma:
- No array types - `techStack` stored as JSON string
- No `@db.Text` - Use default String type for large text
- Use text fields carefully

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth](https://next-auth.js.org/) - Authentication
- [Headless UI](https://headlessui.com/) - Unstyled components
- [Font Awesome](https://fontawesome.com/) - Icons

---

**Made with ❤️ by Ankit Variya**

