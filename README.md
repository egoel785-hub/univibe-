#univibe - 
a society recruitment app to find your place and peers on campus.

## Project Overview

A complete, responsive college society recruitment website built with **HTML, CSS, and vanilla JavaScript**. 

## Files

| File | Purpose |
|------|---------|
| [index.html](file:///C:/Users/egoel/.gemini/antigravity/scratch/CampusConnect/index.html) | Main HTML structure with all sections |
| [style.css](file:///C:/Users/egoel/.gemini/antigravity/scratch/CampusConnect/style.css) | Complete responsive stylesheet with dark mode |
| [script.js](file:///C:/Users/egoel/.gemini/antigravity/scratch/CampusConnect/script.js) | All interactivity — filters, search, quiz, form, etc. |
| [data.js](file:///C:/Users/egoel/.gemini/antigravity/scratch/CampusConnect/data.js) | Society data, quiz questions, and campus tips |

## Features Implemented

### Core Features
- **Responsive navbar** with hamburger menu on mobile
- **Hero section** with welcoming text and visual
- **Category filter buttons** (Technical, Cultural, Sports, etc.) — functional filtering
- **10 society cards** dynamically rendered from data
- **Search bar** — filters by name, category, description, and tagline
- **Society detail modal** with about, activities, roles, and apply button
- **Recommendation quiz** — 4 questions with a scoring system that maps answers to society categories
- **Application form** with client-side validation and inline error messages

### Bonus Features
- 🌙 **Dark mode** toggle (saved in localStorage)
- ❤️ **Favorites/shortlist** (saved in localStorage)
- 🟢 **Recruitment status badges** (Applications Open / Coming Soon)
- 💡 **Random campus tips**
- 📭 **Friendly empty states** with "Show All Societies" button

### Responsive Design
- Works on **mobile, tablet, and desktop**
- Navbar collapses to hamburger on small screens
- Cards go single-column on mobile
- Quiz options stack vertically on mobile
- No horizontal scrolling

## How to Run

Just open `index.html` in any browser. No server or build tools needed.

## Color Palette

| Element | Color |
|---------|-------|
| Background | `#F7F6F2` (off-white) |
| Text | `#202124` (dark charcoal) |
| Accent | `#5B5BD6` (muted purple) |
| Success | `#2e7d32` (green) |
| Error | `#c62828` (red) |

## Design Choices

- **Inter** font for clean readability
- Simple CSS variables for theming (including dark mode)
- Cards with subtle borders and shadows — no glassmorphism
- Minimal hover effects (slight translateY, border color changes)
- Straightforward class names (`society-card`, `quiz-option`, `form-group`)
- Comments throughout the code explaining each section
