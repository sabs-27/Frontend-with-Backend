# Product Manager - Frontend with Backend

A full-stack React application with Node.js/Express backend and MongoDB database for managing products with complete CRUD operations.

## 🚀 Features

- **Frontend**: React 18 + Vite with Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB
- **CRUD Operations**: Create, Read, Update, Delete products
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Client-side Routing**: React Router for navigation
- **Data Persistence**: MongoDB with localStorage fallback
- **Real-time Updates**: Axios for API communication

## 📁 Project Structure

```
project_folder/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   └── EditProduct.jsx
│   │   ├── api/           # API layer
│   │   │   └── products.js
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
└── server/                # Node.js Backend
    ├── models/
    │   └── product.model.js
    ├── index.js           # Express server
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/sabs-27/Frontend-with-Backend.git
cd Frontend-with-Backend
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=7000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd server
npm start
# Server runs on http://localhost:7000
```

### Start Frontend Development Server
```bash
cd client
npm run dev
# Frontend runs on http://localhost:3000 (or next available port)
```

## 📊 API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🎯 Product Schema

```javascript
{
  name: String,
  price: Number,
  description: String,
  image: String (URL)
}
```

## 💡 Key Features

### Frontend Components
- **ProductForm**: Reusable form for creating/editing products
- **ProductCard**: Display component with edit/delete actions
- **Home**: Main dashboard with product listing
- **EditProduct**: Dedicated edit page with navigation

### Backend Features
- Express.js server with CORS enabled
- MongoDB integration with Mongoose
- RESTful API design
- Error handling and validation

### Data Management
- localStorage fallback when database is unavailable
- Sample data restoration feature
- Real-time CRUD operations
- Responsive error handling

## 🎨 Technologies Used

### Frontend
- React 18
- Vite 7.2.2
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS middleware

## 🔧 Development Features

- Hot Module Replacement (HMR)
- ESLint configuration
- Responsive design patterns
- Component-based architecture
- API abstraction layer

## 📱 Screenshots

The application features:
- Clean, modern interface
- Responsive grid layout for products
- Intuitive form controls
- Visual feedback for actions
- Mobile-optimized design

## 🚦 Usage

1. **Create Products**: Use the form on the left to add new products
2. **View Products**: Products display in a responsive grid
3. **Edit Products**: Click "Edit" button to modify existing products
4. **Delete Products**: Click "Delete" button to remove products
5. **Data Recovery**: Use "Restore Sample Products" if data is lost

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of a frontend-backend integration assignment.

## 👨‍💻 Author

**sabs-27**
- GitHub: [@sabs-27](https://github.com/sabs-27)
- Repository: [Frontend-with-Backend](https://github.com/sabs-27/Frontend-with-Backend)

---

**Note**: This project demonstrates the integration of React frontend with Node.js/Express backend and MongoDB database, showcasing modern full-stack development practices.