# 🌍 REST Countries Explorer

A fully responsive and modern React application that lets users explore country data using the REST Countries API. Users can search for countries, filter by region, view detailed information, and manage favorites with session-based login.

---

## 🚀 Features

- 🔎 Search for countries by name  
- 🌍 Filter by region  
- 🗣️ View details: capital, population, region, flag, and languages  
- ⭐ Favorite countries after logging in  
- 🧭 Navigation bar for easy access  
- 🎨 Responsive UI built with Tailwind CSS  
- 🔐 User login & signup with session management  
- ⚙️ Component-based architecture using React functional components  

---

## 📦 Tech Stack

- **React** (with functional components and hooks)  
- **Tailwind CSS** for styling  
- **REST Countries API** for data  
- **Local Storage / Session state** for authentication and favorites  

---

## 🛠️ Setup Instructions

⚠️ Ensure **Node.js** and **npm** are installed before starting.

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rest-countries-app.git
   cd rest-countries-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**  
   Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Build & Run in Production

```bash
npm run build
npm run preview
```

This will generate the production build and serve it for preview at [http://localhost:4173](http://localhost:4173).

---

## 🌐 REST Countries API Endpoints Used

1. `GET /all?fields=...` – Fetch all countries with limited fields for performance  
2. `GET /name/{name}?fields=...` – Search country by name  
3. `GET /region/{region}?fields=...` – Filter countries by region  
4. `GET /subregion/{subregion}?fields=...` – Filter countries by subregion  
5. `GET /currency/{currency}?fields=...` – Filter countries by currency  
6. `GET /lang/{language}?fields=...` – Filter countries by language  
7. `GET /capital/{capital}?fields=...` – Filter countries by capital  
8. `GET /alpha/{code}` – Fetch full details by code  

**Data used includes:**

- Country Name  
- Capital  
- Population  
- Region  
- Subregion  
- Flags  
- CCA3 Code  
- Borders  
- Currencies  
- Languages  
- Top-Level Domain (TLD)  

---

## 👤 User Management

- Users can **sign up**, **log in**, and **log out**  
- Logged-in users can **save favorite countries** (stored in local/session storage)  

---

## 📁 Project Structure

```
├── App.jsx
├── main.jsx
├── components/
│   ├── Navbar.jsx
│   ├── CountryCard.jsx
│   ├── CountryGrid.jsx
│   ├── FilterBar.jsx
│   ├── FilterControls.jsx
│   ├── SearchBar.jsx
│   ├── CountryDetail.jsx
│   ├── Favorites.jsx
│   └── Icons.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── index.css
└── tailwind.config.js
```

---

## ✅ Deployment

📌 Hosted on: **[https://rest-countries-api-frontend-delta.vercel.app](https://rest-countries-api-frontend-delta.vercel.app)**

---
