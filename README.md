# 📊 Sentiment Dashboard

A simple sentiment analysis dashboard built with **Vue 3**, **Pinia**, and **ApexCharts**.  
This project visualizes sentiment data per channel with filters, bar charts, and clean UI.

---

## ✨ Features

- 📈 Interactive bar/pie/histogram chart with ApexCharts
- 🎛️ Table Sendtiment (Searc, Sorting)   
- 🎛️ Filter data by channels  
- 🌗 Gradient background theme  
- ⚡ Lazy loading chart component for performance  
- 🗂️ State management with Pinia  

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/) - UI Framework  
- [Pinia](https://pinia.vuejs.org/) - State Management  
- [ApexCharts](https://apexcharts.com/) - Charting Library  
- [Tailwind CSS](https://tailwindcss.com/) or custom CSS for styling  

---

src/
├─ assets/ # Static assets (images, css)
├─ components/ # Reusable components (Chart, Filter, etc.)
├─ stores/ # Pinia store for sentiment data
├─ views/ # Page views
├─ App.vue # Main app entry
└─ main.ts # Vue entry point

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/ARKANnnur/kaze-tes.git
```

cd kaze-tes
```sh
cd kaze-tes
```

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

### DEMO [https://kaze-tes.vercel.app/](https://kaze-tes.vercel.app/)

```sh
npm run lint
```


