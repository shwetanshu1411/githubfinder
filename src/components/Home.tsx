import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const navigate = useNavigate();

  const handleQueryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await axios.get(`/search/users?q=${query}`);
      setUsers(response.data.items);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">
        Find GitHub Account with Username
      </h1>

      <form onSubmit={handleSearchUsers} className="flex flex-col items-center">
        <input
          value={query}
          onChange={handleQueryInput}
          type="text"
          placeholder="Enter GitHub Username"
          className="p-3 w-80 rounded-lg border text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-white">Search Results</h2>
        <div className="mt-4 grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-600"
              onClick={() => navigate(`/user/${user.login}`)}
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full mr-4"
              />
              <h3 className="text-white text-lg font-semibold">{user.login}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
