# Blog Application

## 📌 Project Overview
This is a **full-stack blog application** that allows users to **create, edit, delete, and read blog posts**. The project is built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack** and provides **authentication and role-based authorization** using JWT to ensure secure access control.

## ✨ Features
- **User Authentication & Authorization**: Secure **JWT-based authentication** with role-based access control.
- **CRUD Operations**: Users can **create, read, update, and delete** blog posts.
- **Responsive UI**: Built with **React and Tailwind CSS** for a seamless user experience.
- **RESTful APIs**: Efficient **backend APIs** to handle requests and responses.
- **Database Management**: MongoDB used to store user data and blog posts efficiently.
- **Error Handling & Security**: Proper API validation, error handling, and security measures.

## 🛠️ Tech Stack
### Frontend:
- React.js
- Tailwind CSS
- Axios (for API calls)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JSON Web Token (JWT) for authentication
- bcrypt.js for password hashing

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **Git**

### Installation
#### 1️⃣ Clone the repository
```bash
git clone https://github.com/soumeningit/Blog.git
cd Blog
```

#### 2️⃣ Install dependencies
##### Install backend dependencies
```bash
cd backend
npm install
```
##### Install frontend dependencies
```bash
cd frontend
npm install
```

#### 3️⃣ Configure Environment Variables
Create a `.env` file in the backend folder and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### 4️⃣ Run the application
##### Start the backend server
```bash
cd backend
npm run dev
```
##### Start the frontend server
```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`, and the backend at `http://localhost:5000`.

## 📌 API Endpoints
| Method | Endpoint        | Description              |
|--------|----------------|--------------------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login a user |
| GET    | /api/posts         | Fetch all blog posts |
| POST   | /api/posts         | Create a new blog post (Auth required) |
| PUT    | /api/posts/:id     | Update a blog post (Auth required) |
| DELETE | /api/posts/:id     | Delete a blog post (Auth required) |

## 🚀 Future Enhancements
- **Image Upload for Blog Posts**
- **Like & Comment System**
- **Search & Filter Features**
- **Deployment on a Hosting Platform**

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

---
Made with ❤️ by [Soumen](https://github.com/soumeningit).
