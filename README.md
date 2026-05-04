# BookHaven - Library Management App

A seamless and modern web application designed to digitize the traditional library experience. Users can explore a vast collection of books, filter by categories, and borrow titles digitally.

## 🚀 Live Demo
[Live URL Placeholder]

## ✨ Features

- **Authentication**: Secure login and registration using BetterAuth.
  - Email and Password support.
  - Google Social Login integration.
  - Profile update feature (Name and Photo).
- **Book Discovery**:
  - Dynamic Home Page with Banner, Marquee, and Featured books.
  - Search functionality by book title.
  - Left Category Sidebar filter (Story, Tech, Science).
- **Borrowing System**:
  - Private book details view (requires login).
  - Borrow button with real-time quantity tracking.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Interactive UI**: Smooth carousels and stats using Swiper.js and Lucide Icons.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Authentication**: [BetterAuth](https://better-auth.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (for Auth persistence)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Carousels**: [Swiper.js](https://swiperjs.com/)

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or later
- MongoDB Database (Atlas or Local)
- Google OAuth Credentials

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your `MONGODB_URI`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `src/app`: Application routes and pages.
- `src/components`: Reusable UI components (Navbar, Footer, BookCard).
- `src/data`: Local JSON seed data for books.
- `src/lib`: Configuration for Auth, MongoDB, and book helpers.

## 📝 License
This project is licensed under the MIT License.
