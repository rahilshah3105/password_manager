# 🔐 PassGen Tools - Secure Password Generator & Local Manager

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge&logo=vercel)](https://passgen-tools.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.7-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**PassGen Tools** is a lightweight, local-first web application designed to help users generate highly secure, random passwords and organize their digital credentials in a private, client-side vault. 

Access the live application here: **[passgen-tools.vercel.app](https://passgen-tools.vercel.app/)**

Created by **Rahil Shah ([rahilshah3105](https://github.com/rahilshah3105))**.

---

## 📌 Problem Statement & Solution

### The Problem
In today's digital landscape, credential stuffing and database leaks are incredibly common. Using weak passwords or reusing the same password across multiple websites makes users vulnerable to cyberattacks. While commercial cloud-based password managers exist, they often:
1. Require monthly subscriptions.
2. Store sensitive vault data on centralized servers, creating a lucrative target for hackers.
3. Lack transparent features for quick, offline use without account creation.

### The Solution
**PassGen Tools** provides a free, instant, and secure alternative. By adopting a **local-first architecture**, all credentials and settings are stored entirely in your web browser's `localStorage`. No data ever leaves your device, and no internet connection is required to manage your vault. You get absolute privacy, instant loading times, and zero subscription fees.

---

## ✨ Key Features

### 🎲 High-Entropy Password Generator
- **Customizable Length:** Generate passwords ranging from 6 to 32 characters.
- **Granular Controls:** Toggle uppercase letters, lowercase letters, numbers, and special characters.
- **Quick Presets:** Access one-click templates:
  - *Basic* (8 characters) for low-risk sites.
  - *Standard* (12 characters) for general accounts.
  - *Secure* (16 characters) for banking and primary emails.
- **Real-Time Strength Indicator:** Evaluates entropy immediately to display password strength (Weak, Fair, Good, Strong).
- **Instant Copy:** One-click copying to the clipboard with clean UI feedback.

### 💾 Local Password Vault
- **Zero-Server Storage:** Save your generated passwords safely inside your browser.
- **Full CRUD Support:** Create, read, update, and delete accounts as needed.
- **Rich Metadata:** Save URLs, usernames, passwords, and custom notes for each record.
- **Smart Filtering:** Quickly search through your saved credentials by website name or username.
- **Privacy Toggle:** Hide passwords by default with an interactive eye-toggle icon.

### 📥 Browser Import & Export (Migration-Friendly)
- **Universal CSV Import:** Seamlessly migrate from Google Chrome, Mozilla Firefox, or Microsoft Edge.
- **JSON Backup & Restore:** Back up your entire vault to a JSON file and restore it on any device.
- **Smart Formatting parser:** Automatically maps various browser CSV column formats.

### 🕒 Password History Tracker
- **Session History:** Keeps track of the last 15 passwords generated during your session.
- **Collapsible UI:** Minimizes clutter when you need to focus on editing credentials.
- **Quick Re-copy:** Retrieve previously generated passwords with a single click.

### 🎨 Premium User Experience
- **Light/Dark Mode Toggle:** Integrates system themes and saves your choice across page refreshes.
- **Modern Typography:** Custom Google Fonts integration (Space Grotesk) for excellent readability.
- **Fully Responsive:** Beautifully crafted layouts optimized for desktops, tablets, and smartphones.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 18 (using Functional Components and Hooks)
* **Build Engine:** Vite (for fast HMR and optimized production bundles)
* **CSS Framework:** Tailwind CSS 3 (utility-first, responsive grid layout)
* **Data Storage:** Browser LocalStorage API (completely client-side)
* **Design & Typography:** Google Fonts (Space Grotesk) & SVG vector icons

---

## 📸 Screenshots

Below are placeholders representing the main user interfaces of the app:

### 1. Password Generator & Strength Tool
```
+--------------------------------------------------------------+
| [⚡] PassGen Tools                          [🌙 Toggle Theme] |
+--------------------------------------------------------------+
|                                                              |
|   Generated Password: [ dk9!#sL2P-9w      ] [📋 Copy]        |
|   Strength: [ ████████████████ ] Strong                      |
|                                                              |
|   Length: 16 [===========o----------------]                  |
|   [x] Uppercase    [x] Lowercase    [x] Numbers    [x] Symbols  |
|                                                              |
|   Presets: [ Basic ] [ Standard ] [ Secure ]                 |
+--------------------------------------------------------------+
```
*(Insert actual screenshot of the Generator Interface here)*

### 2. Local Vault & Manager Interface
```
+--------------------------------------------------------------+
| [🔍 Search accounts... ]                       [+ Add New]   |
+--------------------------------------------------------------+
|  Vercel (rahil@vercel.com)        ********  [👁️] [📋] [📝] [🗑️] |
|  GitHub (rahilshah3105)           ********  [👁️] [📋] [📝] [🗑️] |
|  Google (rahil@gmail.com)         ********  [👁️] [📋] [📝] [🗑️] |
+--------------------------------------------------------------+
| [📥 Import CSV/JSON ]                  [📤 Export CSV/JSON]  |
+--------------------------------------------------------------+
```
*(Insert actual screenshot of the Vault and Backup options here)*

---

## 🚀 Getting Started

Follow these steps to run a copy of the project on your local machine for development and testing.

### Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
* `npm` (packaged with Node.js) or `yarn`

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rahilshah3105/password_manager.git
   cd password_manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Verify the app:**
   Open your browser and navigate to `http://localhost:5173/` to see the running application.

### Building for Production

To compile the application into static HTML, CSS, and JS files for hosting (e.g., Vercel, Netlify, GitHub Pages):
```bash
npm run build
```
The production-ready assets will be written to the `/dist` folder.

---

## 💡 Usage Guide

1. **Generating a Secure Password:**
   * Select your character sets (uppercase, lowercase, digits, symbols).
   * Adjust the length slider to your target length (we recommend 12+ characters for general accounts).
   * Click the **Copy** button to copy it instantly, or select one of the presets for rapid creation.
2. **Saving to the Vault:**
   * Navigate to the **Vault** tab.
   * Click **Add New** or **New Password**, fill in the site URL, username, and password. You can also add reference notes.
   * Click **Save** to persist the entry.
3. **Importing existing browser data:**
   * Export your passwords from your browser (e.g., Settings -> Passwords -> Export to CSV).
   * In PassGen Tools, click the **Import** dropdown, choose the exported `.csv` file, and they will populate instantly in your local browser vault.
4. **Backing up credentials:**
   * Click **Export** and choose **JSON** to download a local backup file, keeping your credentials secure offline.

---

## 🔮 Future Improvements

- [ ] **Master Password Encryption:** Secure the vault in `localStorage` using PBKDF2 key derivation and AES-GCM encryption.
- [ ] **Password Breach API Check:** Integrate with the *Have I Been Pwned* API to check if a saved password has been compromised.
- [ ] **Browser Extension:** Package the generator as a Chrome/Firefox extension for inline auto-filling.
- [ ] **Password Aging Alerts:** Highlight accounts whose passwords have not been changed in over 6 months.
- [ ] **Password Generator Rules:** Add rules to create pronounceable, human-readable passwords.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Rahil Shah**
* GitHub: [@rahilshah3105](https://github.com/rahilshah3105)
* Project URL: [https://passgen-tools.vercel.app/](https://passgen-tools.vercel.app/)

Created by Rahil Shah (rahilshah3105)

---

⭐ *If you found PassGen Tools useful, feel free to give this repository a star!*
