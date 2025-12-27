# 📸 Calvin Studio — Cinematic Photography Website (PWA)

Calvin Studio is a **modern, cinematic photography studio website** built using **vanilla HTML, CSS, and JavaScript**, designed with performance, responsiveness, and Progressive Web App (PWA) capabilities in mind.

This project focuses on **clean architecture, smooth UI/UX, offline support, and real-world production practices**—without relying on heavy frameworks.

---

## 🌐 Live Demo

Both deployments serve the **same codebase**:

- 🔗 **Netlify (Primary)**  
  https://calvinstudio.netlify.app/

- 🔗 **GitHub Pages**  
  https://dev-alok-kumar-android.github.io/CalvinStudio/

---

## ✨ Features

- 📱 **Progressive Web App (PWA)**
  - Installable on mobile & desktop
  - Offline support using Service Worker
  - App-like standalone experience

- 🎨 **Cinematic UI**
  - Dark / Light theme support
  - Smooth animations & transitions
  - Responsive layout for all screen sizes

- 🖼️ **Advanced Gallery**
  - Category-based filtering
  - Lazy-loaded thumbnails
  - Fullscreen lightbox with:
    - Keyboard navigation
    - Touch swipe gestures
    - Image details toggle
    - Download & open original options

- 🚀 **Performance Optimized**
  - Cloudinary image transformations
  - Separate static & image caches
  - Minimal JS runtime overhead

- 📬 **Contact & Booking**
  - EmailJS integration
  - WhatsApp quick-contact support
  - Offline / online status handling

- 🔄 **Update System**
  - Service Worker update detection
  - In-app update banner when a new version is available

---

## 🧱 Project Structure
```bash
.
├── index.html
├── manifest.json
├── service-worker.js
├── style.css
│
├── App/
│ ├── state.js
│ ├── utils.js
│ ├── ui.js
│ ├── lightbox.js
│ ├── main.js
│ └── tailwind.css
│
└── raw/
├── logo-192.png
├── logo-512.png
├── logo-dark.svg
├── logo-light.svg
├── logo-mono.svg
└── whatsapp.png
```

- `state.js`: App state & data
- `utils.js`: Helpers & utilities
- `ui.js`: UI render functions
- `lightbox.js`: Lightbox logic
- `main.js`: App bootstrap & lifecycle
- `tailwind.css`: Tailwind config & utilities
```

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **Tailwind CSS (CDN)**
- **EmailJS**
- **Cloudinary**
- **Service Workers (PWA)**

_No frameworks. No build tools. Pure web fundamentals._

---

## Author

Alok Kumar
Android & Web Developer
GitHub: https://github.com/dev-Alok-Kumar-android