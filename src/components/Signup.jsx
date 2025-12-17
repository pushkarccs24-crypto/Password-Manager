// signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ type: "", text: "" });

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (strength !== "Strong") {
      setAlert({
        type: "error",
        text: "Password does not meet the required strength criteria.",
      });
      return;
    }

    try {

      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({
          type: "error",
          text: errorData.error || "Something went wrong.",
        });
        return;
      }

      const data = await response.json();
      setAlert({
        type: "success",
        text: data.message || "Account created successfully!",
      });

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        text: "Cannot connect to the server.",
      });
    }
  };

  const getStrength = (pwd) => {
    if (!pwd) return "";
    let score = 0;
    const rules = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/];
    rules.forEach((rule) => rule.test(pwd) && score++);

    if (pwd.length < 8) return "Too Short";
    if (score <= 1) return "Weak";
    if (score === 2 || score === 3) return "Medium";
    if (score === 4) return "Strong";
    return "";
  };

  const getStrengthColor = (strengthLevel) => {
    if (strengthLevel === "Too Short" || strengthLevel === "Weak")
      return "bg-red-500";
    if (strengthLevel === "Medium") return "bg-yellow-500";
    if (strengthLevel === "Strong") return "bg-green-500";
    return "";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const strengthVal = getStrength(pwd);
    setStrength(strengthVal);

    if (strengthVal === "Too Short") {
      setMessage(
        "Password must be at least 8 characters with at least one uppercase letter, lowercase letter, number, and special character."
      );
    } else {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg relative">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Sign Up
        </h2>

        {alert.text && (
          <div
            className={`mb-4 p-3 rounded ${
              alert.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {alert.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a password"
              required
            />
            {strength && (
              <div className="mt-1 h-2 w-full rounded-full bg-gray-700">
                <div
                  className={`${getStrengthColor(
                    strength
                  )} h-2 rounded-full transition-all`}
                  style={{
                    width:
                      strength === "Too Short" || strength === "Weak"
                        ? "33%"
                        : strength === "Medium"
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>
            )}
            {strength && (
              <p className="text-gray-300 mt-1 text-sm">
                Password Strength: {strength}
              </p>
            )}
            {message && (
              <p className="text-red-400 mt-1 text-xs">{message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-gray-400 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
