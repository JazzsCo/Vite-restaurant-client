# 🍽️ JazzsCo Restaurant Client

A premium, modern Restaurant Management dashboard built with **React** and **Tailwind CSS**. This application features a stunning **Dark Glassmorphism** design with smooth animations and high-performance interactions.

## ✨ Features

- 🔐 **Secure Authentication**: Fully integrated with JWT-based backend (Login & Register).
- 📊 **Dynamic Dashboard**: Real-time stats and restaurant management.
- 🍴 **Restaurant CRUD**: Create, Read, Update, and Delete restaurants directly from the UI.
- 🎨 **Glassmorphism UI**: High-end aesthetic with vibrant gradients, blurred cards, and micro-animations.
- 📱 **Fully Responsive**: Optimized for all screen sizes.
- ⚡ **Vite Powered**: Ultra-fast development and build cycles.

## 🚀 Tech Stack

- **Frontend**: React 18 (JavaScript)
- **Styling**: Tailwind CSS v3
- **Icons/Animations**: Lucide React & Tailwind Animations
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **State/Auth**: React Context API

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- Java Backend ([restaurant-api](https://github.com/JazzsCo/restaurant-api)) running on `http://localhost:8080`

### Installation

1. Clone the repository
   ```bash
   git clone <your-repository-url>
   cd restaurant-client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

- `src/components`: Reusable UI components (Navbar, ProtectedRoute).
- `src/context`: State management (AuthContext).
- `src/hooks`: Custom hooks (useRestaurants).
- `src/pages`: Main application views (Dashboard, Login, Register).
- `src/utils`: API configuration and helper functions.
- `src/index.css`: Design system and global styles.

## ⚙️ Configuration

The API base URL is configured in `src/utils/api.js`. By default, it points to:
`http://localhost:8080`

---
Built with ❤️ by JazzsCo.
