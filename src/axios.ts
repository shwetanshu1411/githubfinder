// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://api.github.com",
// });

// export default instance;


// axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-User-Finder-App', 
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,

    
  },
});

export default instance;
