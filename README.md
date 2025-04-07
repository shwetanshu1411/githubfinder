🔍 GitHub Profile Finder
A sleek web application to search for GitHub users by username and view detailed profile information, repositories, and commit activity.


✨ Features

🔎 Search GitHub Users by username

👤 View User Profile including bio, followers, following, location, and blog

📁 List of Public Repositories

📈 Commit Activity Visualization (last 7 days) using Recharts

⚡ Built with React, TypeScript, Tailwind CSS, and GitHub REST API

🛠️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS

Routing: React Router DOM

HTTP Client: Axios

Data Visualization: Recharts

API: GitHub REST API

🚀 Getting Started
1. Clone the repository
  https://github.com/shwetanshu1411/githubfinder.git

2. Install dependencies
npm install
# or
yarn install

3. Start the development server
npm run dev
# or
yarn dev
📂 Project Structure
pgsql
Copy
Edit
📁 src
 ┣ 📁 components
 ┃ ┣ 📄 Home.tsx         → User search and result listing
 ┃ ┣ 📄 User.tsx         → Detailed user profile and commit chart
 ┃ ┗ 📄 CommitsChart.tsx → Commit activity line chart (Recharts)
 ┣ 📄 App.tsx            → App entry with route definitions
 ┣ 📄 axios.tsx          → Axios instance configured with GitHub API
📊 Commit Chart Logic
Fetches commit history from the most recently updated repo

Aggregates commits from the last 7 days

Displays the commit count per day using a Line Chart

