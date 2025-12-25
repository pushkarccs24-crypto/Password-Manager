import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPasswords = async () => {
      try {
        const res = await fetch("http://localhost:5100/api/passwords", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setPasswords(data || []);
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-semibold text-indigo-400">
          Password Manager
        </h1>

        <div className="space-x-6 text-sm">
          <Link to="/add-password" className="hover:text-indigo-400">
            Add Password
          </Link>
          <Link to="/edit-password" className="hover:text-indigo-400">
            Edit Password
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

          <div className="mb-10">
            <h3 className="text-xl font-medium mb-4">Saved Passwords</h3>

            {passwords.length === 0 ? (
              <p className="text-gray-400">No passwords saved yet.</p>
            ) : (
              <div className="space-y-4">
                {passwords.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-800 p-4 rounded-xl"
                  >
                    <p className="font-medium">{item.site}</p>
                    <p className="text-sm text-gray-400">
                      {item.username}
                    </p>
                    <p className="text-sm text-gray-500">••••••••</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
