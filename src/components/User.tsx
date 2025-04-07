import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios";
import CommitsChart from "./CommitsChart";

interface User {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  location?: string;
  blog?: string;
  html_url: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

interface CommitDay {
  date: string;
  count: number;
}

const User: React.FC = () => {
  const { login } = useParams<{ login: string }>();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [commitData, setCommitData] = useState<CommitDay[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          axios.get(`/users/${login}`),
          axios.get(`/users/${login}/repos`),
        ]);

        setUserInfo(userRes.data);
        setRepos(repoRes.data);

        if (repoRes.data.length > 0) {
          const repoName = repoRes.data[0].name;
          const commitsRes = await axios.get(
            `/repos/${login}/${repoName}/commits`
          );

          const commitMap: { [date: string]: number } = {};
          commitsRes.data.forEach((commit: { commit: { author: { date: string } } }) => {
            const date = new Date(
              commit.commit.author.date
            ).toISOString().split("T")[0];
            commitMap[date] = (commitMap[date] || 0) + 1;
          });

          const last7Days: CommitDay[] = Array.from({ length: 7 }).map(
            (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              const formatted = date.toISOString().split("T")[0];
              return {
                date: formatted,
                count: commitMap[formatted] || 0,
              };
            }
          );

          setCommitData(last7Days);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [login]);

  if (!userInfo) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <Link to="/" className="text-blue-400 underline mb-4 block">
        ← Back to Search
      </Link>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <img
          src={userInfo.avatar_url}
          alt={userInfo.name}
          className="w-40 h-40 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-bold">{userInfo.name}</h2>
          <p className="text-gray-300">{userInfo.bio}</p>
          <p className="mt-2">
            <strong>{userInfo.followers}</strong> Followers •{" "}
            <strong>{userInfo.following}</strong> Following
          </p>
          {userInfo.location && <p>📍 {userInfo.location}</p>}
          {userInfo.blog && <p>🔗 {userInfo.blog}</p>}
          <p className="mt-2">
            <a href={userInfo.html_url} className="text-blue-400 underline">
              View GitHub Profile →
            </a>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Repositories</h3>
        <ul className="mt-4 grid gap-4">
          {repos.map((repo) => (
            <li key={repo.id} className="bg-gray-800 p-4 rounded-lg">
              <a
                href={repo.html_url}
                className="text-blue-300 font-semibold text-lg underline"
              >
                {repo.name}
              </a>
              <p className="text-gray-400">{repo.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {commitData.length > 0 && <CommitsChart data={commitData} />}
    </div>
  );
};

export default User;
