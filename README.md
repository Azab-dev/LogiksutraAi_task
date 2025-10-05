# Book Review Platform (MERN Stack)

A full-stack **Book Review Platform** where users can sign up, log in, add books, and review them. Built with **MongoDB, Express, React, Node.js (MERN)**.  

---

## 🌟 Features

- **User Authentication** with JWT
- **Book Management**: Create, Read, Update, Delete books
- **Review System**: Users can add, edit, delete reviews
- **Average Rating** calculation per book
- **Pagination** for book list (5 books per page)
- **Protected Routes** for authenticated users
- **Frontend**: React + Tailwind CSS + React Router
- **Backend**: Node.js + Express + Mongoose

## 🔐 Environment Variables

### Backend `.env`

Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
