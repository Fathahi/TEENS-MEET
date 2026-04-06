# TEENS MEET 2026 — Science & Technology Fest

A modern React application for the TEENS MEET 2026 Science & Technology Fest website.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Custom Hooks** - Scroll reveal animations

## 📁 Project Structure

```
├── public/          # Static assets (images, icons)
├── src/
│   ├── components/ # React components
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── Objectives.jsx
│   │   ├── Events.jsx
│   │   ├── Speakers.jsx
│   │   ├── RecentActivity.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   ├── hooks/      # Custom React hooks
│   │   └── useReveal.js
│   ├── App.jsx     # Main app component
│   ├── main.jsx    # Entry point
│   └── index.css   # Global styles
└── package.json
```

## 🎯 Features

- ✨ Smooth scroll animations
- 📱 Fully responsive design
- 🎨 Modern glassmorphism UI
- ⚡ Fast development with Vite
- 🔄 Component-based architecture

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Deployment

This app is automatically deployed to GitHub Pages:
- **Live Site**: https://fathahi.github.io/TEENS-MEET/
- **GitHub Actions**: Automatically builds and deploys on every push to `main` branch

It can also be deployed to:
- **Vercel** - `vercel`
- **Netlify** - `netlify deploy`

