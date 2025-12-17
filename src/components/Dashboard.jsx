
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-semibold text-indigo-400">Password Manager</h1>

        <div className="space-x-6 text-sm">
          <Link to="/login" className="hover:text-indigo-400 transition">Login</Link>
          <Link to="/signup" className="hover:text-indigo-400 transition">Signup</Link>
          <Link to="/add-password" className="hover:text-indigo-400 transition">Add Password</Link>
          <Link to="/edit-password" className="hover:text-indigo-400 transition">Edit Password</Link>
        </div>
      </nav>

      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-300">
            Welcome to your dashboard. From here, you can manage your passwords securely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg font-medium mb-2">Add Password</h3>
              <p className="text-gray-400 text-sm mb-3">
                Store a new password securely in your vault.
              </p>
              <Link
                to="/add-password"
                className="inline-block text-indigo-400 hover:underline text-sm"
              >
                Go to Add Password
              </Link>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg font-medium mb-2">Edit Passwords</h3>
              <p className="text-gray-400 text-sm mb-3">
                Update or delete existing saved passwords.
              </p>
              <Link
                to="/edit-password"
                className="inline-block text-indigo-400 hover:underline text-sm"
              >
                Go to Edit Passwords
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
