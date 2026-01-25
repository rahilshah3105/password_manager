# 🔐 PassGen - Password Generator & Manager

A modern, feature-rich password generator and manager built with React, Vite, and Tailwind CSS. Generate secure passwords with customizable options, store them locally, import/export from browsers, and manage your password vault with a beautiful light/dark theme interface.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.7-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🎲 Password Generation
- **Customizable Length**: Generate passwords from 6 to 32 characters
- **Character Options**: Choose from uppercase, lowercase, numbers, and special characters
- **Quick Presets**: One-click generation with preset configurations
  - Basic (8 chars) - Quick passwords
  - Standard (12 chars) - Balanced security
  - Secure (16 chars) - Maximum security
- **Strength Indicator**: Real-time password strength analysis (Weak, Fair, Good, Strong)
- **Copy to Clipboard**: Instant copy with visual feedback

### 💾 Password Vault
- **Local Storage**: Securely store passwords in browser's localStorage
- **CRUD Operations**: Create, Read, Update, Delete passwords
- **Password Details**: Store URL, username, password, and notes
- **Search & Filter**: Quickly find passwords by URL or username
- **Show/Hide Passwords**: Toggle password visibility for security
- **Timestamps**: Track when passwords were created

### 📥 Import/Export
- **CSV Import**: Import passwords from browser exports
  - Chrome: Settings → Passwords → Export
  - Firefox: Passwords → Export Logins
  - Edge: Settings → Passwords → Export
- **JSON Import/Export**: Backup and restore your entire vault
- **Smart Parsing**: Handles various CSV formats automatically

### 📝 Password History
- **Recent Passwords**: Track your last 15 generated passwords
- **Timestamps**: See when each password was created
- **Quick Copy**: Copy any previous password instantly
- **Collapsible UI**: Keep your workspace clean

### 🎨 User Interface
- **Light/Dark Theme**: Toggle between themes with preference persistence
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean Aesthetics**: Minimalist design with emerald green accents
- **Space Grotesk Font**: Modern, professional typography
- **Smooth Animations**: Subtle transitions for better UX

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/passwordGenerator.git
   cd passwordGenerator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173/`
   - The app will automatically reload when you make changes

### Building for Production

1. **Create production build**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Preview production build locally**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

3. **Deploy**
   - The `dist` folder contains your production-ready files
   - Deploy to Vercel, Netlify, GitHub Pages, or any static hosting service

## 📁 Project Structure

```
passwordGenerator/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # React components
│   │   ├── Password.jsx              # Main component with tabs
│   │   ├── PasswordGenerator.jsx     # Password generation logic
│   │   ├── PasswordStorage.jsx       # Vault management
│   │   ├── PasswordHistory.jsx       # History tracking
│   │   └── Strength.jsx              # Strength indicator
│   ├── App.jsx         # Root component
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles + Tailwind
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── README.md           # This file
```

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18.3.1](https://react.dev/)
- **Build Tool**: [Vite 5.4.7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4.14](https://tailwindcss.com/)
- **Font**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser localStorage API
- **Icons**: SVG (inline)

## 💡 Usage Guide

### Generating a Password

1. **Choose Character Types**
   - Toggle checkboxes for uppercase, lowercase, numbers, and special characters
   - At least one type must be selected

2. **Set Password Length**
   - Use the slider to select length (6-32 characters)
   - Longer passwords are more secure

3. **Generate**
   - Click "Generate Password" button
   - Or use Quick Preset buttons for instant generation

4. **Copy**
   - Click the copy button next to the password
   - Success message will appear

### Saving Passwords

1. **Navigate to "My Passwords" tab**
2. **Click "New Password" button**
3. **Fill in the form**:
   - Website URL (required)
   - Username/Email (optional)
   - Password (required) - auto-fills from generator
   - Notes (optional)
4. **Click "Save Password"**

### Importing Browser Passwords

1. **Export from your browser**:
   - **Chrome**: Settings → Passwords → ⋮ → Export passwords
   - **Firefox**: Passwords → ⋮ → Export Logins
   - **Edge**: Settings → Passwords → ⋮ → Export passwords

2. **In PassGen**:
   - Go to "My Passwords" tab
   - Click "Import" dropdown
   - Select "Import CSV File"
   - Choose your exported file

### Exporting Your Vault

1. **Click "Export" dropdown**
2. **Choose format**:
   - **CSV**: Compatible with spreadsheets and browsers
   - **JSON**: Complete backup with all metadata

3. **File will download automatically**

### Using Dark Mode

1. **Click sun/moon icon** in the top right header
2. **Theme preference** is automatically saved
3. **Persists across sessions**

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // Change emerald to your color
      }
    },
  },
}
```

### Modifying Password Criteria

Edit `src/components/PasswordGenerator.jsx` to change:
- Character sets
- Validation rules
- Generation algorithm

### Adjusting History Limit

In `src/components/PasswordHistory.jsx`, change the slice value:

```javascript
const updatedHistory = [newEntry, ...history].slice(0, 15); // Change 15 to desired limit
```

## 🔒 Security Notes

- **Local Storage Only**: All data is stored locally in your browser
- **No Server**: No passwords are sent to any server
- **Client-Side**: Everything runs in your browser
- **Clear Data**: Clearing browser data will delete all stored passwords
- **Export Regularly**: Always keep backups of your password vault

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🐛 Known Issues & Future Enhancements

### Potential Improvements
- [ ] Add password expiry reminders
- [ ] Implement master password encryption
- [ ] Add password generation rules (pronounceable, no ambiguous chars)
- [ ] Browser extension version
- [ ] Password breach checker integration
- [ ] Multi-vault support
- [ ] Cloud sync option
- [ ] Two-factor authentication codes

### Current Limitations
- Data stored in localStorage (not encrypted)
- No cross-device sync
- Maximum 15 passwords in history

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- Tailwind CSS for the utility-first CSS framework
- Google Fonts for Space Grotesk font

## 📧 Contact

Have questions or suggestions? Feel free to [open an issue](https://github.com/yourusername/passwordGenerator/issues) or reach out!

---

⭐ If you found this project helpful, please give it a star!
