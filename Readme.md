# 📝 Blog Platform

A modern, feature-rich blogging platform built with React and Node.js, offering a seamless experience for creating, sharing, and discovering blog content with advanced features like AI-powered summaries, social authentication, and interactive comments.

---

## ✨ Features

### For Writers

- 📝 **Rich Text Editor** - Create beautiful blog posts with TipTap editor
- 🖼️ **Image Management** - Upload and resize images directly in posts
- 📂 **Category Management** - Organize content with categories and subcategories
- 🏷️ **Tags & Metadata** - Add tags, descriptions, and reading time estimates
- 📊 **Draft & Publish** - Save drafts and publish when ready
- ✏️ **Edit Posts** - Update published content anytime
- 🤖 **AI Summary** - Generate AI-powered summaries for posts

### For Readers

- 🌐 **Browse Content** - Discover posts by category, tags, or search
- ❤️ **Like & Save** - Bookmark favorite posts
- 💬 **Comments** - Engage with authors and community
- 🔗 **Related Posts** - Find similar content automatically
- 🌙 **Dark Mode** - Comfortable reading experience
- 📱 **Responsive Design** - Works on all devices

### Platform Features

- 🔐 **Authentication** - Email/password and OAuth (Google, GitHub, etc.)
- 👤 **User Profiles** - Customizable profiles with bio, avatar, and social links
- 🔔 **Notifications** - Get notified on comments and interactions
- 📈 **Analytics** - Track post views and engagement
- 🛡️ **Admin Dashboard** - Manage content and users
- ⚡ **Performance** - Optimized for speed and SEO

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Editor**: TipTap (Rich text editor)
- **Routing**: React Router v7
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API Client**: Axios

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js (OAuth support)
- **Email**: Nodemailer
- **File Upload**: Multer
- **API Documentation**: Ready for expansion

### Deployment

- **Frontend**: Vercel
- **Backend**: Node.js hosting (AWS, Render, Railway, etc.)
- **Database**: MongoDB Atlas
- **Storage**: Cloud storage (AWS S3, etc.)

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance (local or MongoDB Atlas)
- Git

### Clone Repository

```bash
git clone https://github.com/yourusername/blog-platform.git
cd blogspace
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Required:
# - DATABASE_URL=your_mongodb_url
# - JWT_SECRET=your_secret_key
# - FRONTEND_URL=http://localhost:5173
# - MAIL_SERVICE_PASSWORD=your_email_password
# - APP_NAME=Your App Name
# - PORT=5000

# Start development server
npm run dev

# Or start production server
npm start
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Blog Platform

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🚀 Running the Project

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

### Production Mode

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

---

## 📁 Project Structure

```
blogspace/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── service/         # API calls
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx
│   ├── vercel.json          # Vercel configuration
│   └── package.json
│
├── backend/                  # Node.js/Express server
│   ├── config/              # Configuration files
│   ├── controllers/         # Route handlers
│   ├── database/            # Mongoose schemas
│   ├── middlewares/         # Custom middlewares
│   ├── routes/              # API routes
│   ├── service/             # Business logic
│   ├── utils/               # Helper utilities
│   ├── templates/           # Email templates
│   ├── server.js            # Entry point
│   └── package.json
│
├── .gitignore
├── Readme.md
└── vercel.json
```

---

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### Content

- `GET /api/content/blogs` - Get all blogs
- `GET /api/content/blogs/:id` - Get blog by ID
- `POST /api/content/create` - Create new blog (authenticated)
- `PUT /api/content/:id` - Update blog (authenticated)
- `DELETE /api/content/:id` - Delete blog (authenticated)

### Categories

- `GET /api/general/categories` - Get all categories
- `POST /api/admin/categories` - Create category (admin)

### Comments

- `GET /api/feedback/comments/:postId` - Get post comments
- `POST /api/feedback/comments` - Add comment (authenticated)

### User Profile

- `GET /api/profile/:username` - Get user profile
- `PUT /api/profile/update` - Update profile (authenticated)

---

## ⚙️ Configuration

### Environment Variables

**Backend (.env)**

```
PORT=5000
DATABASE_URL=mongodb://...
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
APP_NAME=Blog Platform
MAIL_SERVICE_PASSWORD=your_email_password
SUPPORT_EMAIL=support@blog.com
```

**Frontend (.env)**

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Blog Platform
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 🐛 Troubleshooting

### Backend won't connect to database

- Check MongoDB connection string
- Ensure MongoDB service is running
- Verify credentials in .env

### Frontend build fails

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### CORS errors

- Verify `FRONTEND_URL` in backend .env matches your frontend URL
- Check CORS middleware configuration in `server.js`

### Images not uploading

- Check upload directory permissions
- Verify file size limits in Multer config
- Ensure cloud storage credentials are correct

---

## 📚 Documentation

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TipTap Editor](https://tiptap.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 📧 Support

For support, email support@blog.com or open an issue on GitHub.

---

## 🙏 Acknowledgments

- TipTap for the amazing editor
- Vercel for hosting
- MongoDB for the database
- The open-source community

---

**Happy Blogging! 🚀**
