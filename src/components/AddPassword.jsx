// AddPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPassword() {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP frontend-only logic
    console.log({ site, username, password });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Add Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Website / App"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            required
          />

          <input
            type="text"
            placeholder="Username / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            required
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg text-white">
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
}
