import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      });
      setMessage(res.data.message);

      // ✅ ruaj userin në localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ thirr funksionin për të kaluar në dashboard
      onLogin(res.data.user);
    } catch (err) {
      setMessage(err.response?.data?.message || "Gabim gjatë login-it!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Hyrje</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Fjalëkalimi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2 rounded-lg font-semibold"
          >
            Hyr
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
