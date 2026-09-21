<p align="center" style="margin-bottom:40px">
  <img src="src/assets/linkszar-logo.svg" alt="Linkszar" width="150"/>
</p>

# Frontend

> Main website frontend consits of interactions with firebase.

---

## 🚀 Tech Stack

- ⚛️ React
- ⚡ Vite
- 💅 Hero UI, Tailwind CSS, Sass, Iconify React

---

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── constants/       # Constants to be kept
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Reusable services
│   ├── store/           # Store for common context
│   ├── types/           # Typescript types
│   ├── utils/           # Common functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── package.json         # Project metadata and dependencies
```

---

## 🔧 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/arth40/linkszar.git
   cd linkszar
   ```

2. **Install dependencies**

   ```bash
   nvm use 22
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🧠 Features

- Claim a handle and get a short, shareable link: `linkszar.co/yourname`
- One dashboard to edit your display name, bio, and links, with a live preview
- Email verification on sign-up (Firebase Auth)
- No accounts photos, no clutter — just a profile and its links

---

## 🌍 Deployment

Using firebase for deployment

```bash
firebase deploy
```
