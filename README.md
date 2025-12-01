🎬 Movie Explorer App

A modern movie search web application built with React, TailwindCSS, TMDB API, and Appwrite.
Users can search thousands of movies, view ratings, languages, release years, and discover trending movies based on real-time search activity stored in Appwrite.

🚀 Features

🔍 Search Movies using TMDB API with live debounce.

⭐ Movie Cards with ratings, poster, year, and language.

📈 Trending Movies Section powered by Appwrite database.

⚡ Loading Spinner for smooth fetching UX.

🎨 Responsive UI styled with TailwindCSS.

🧠 Search Analytics stored using Appwrite's updateSearchCount.

🌄 Hero Section + Clean UI Layout.

🛠️ Tech Stack

React + Vite

TailwindCSS

Appwrite (Database & Functions)

TMDB API (Authorization Bearer Token)

React-use (Debounce)

📦 Project Setup
1️⃣ Install dependencies
npm install

2️⃣ Create a .env file
VITE_API_TOKEN=YOUR_TMDB_BEARER_TOKEN

3️⃣ Run development server
npm run dev

📁 Folder Structure (Important)
src/
 ├── App.jsx
 ├── appwrite.js
 ├── components/
 │     ├── MovieCard.jsx
 │     ├── Search.jsx
 │     └── Spinner.jsx
 ├── assets/
 ├── index.css

🧩 Core Logic
✔ Fetch Movies

Uses TMDB API with Authorization Bearer token.

✔ Trending Movies

Loaded from Appwrite → getTrendingMovies().

✔ Search Tracking

Each successful search updates Appwrite via:

updateSearchCount(query, movie)

📡 Environment Requirements

TMDB Bearer Token

Appwrite Project

Appwrite Collection for storing trending searches:

query

count

poster_url

movie_id

📸 UI Components

MovieCard.jsx – displays movie details

Search.jsx – search bar

Spinner.jsx – loading animation

📤 Deployment

To deploy on Vercel:

Push project to GitHub

Import into Vercel

Add env variable:

VITE_API_TOKEN

Deploy 🚀