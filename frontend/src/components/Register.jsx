import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      setMessage("Plotëso të gjitha fushat!");
      return;
    }

    if (password.length < 6) {
      setMessage("Fjalëkalimi duhet të ketë të paktën 6 karaktere!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/auth/register", {
        username: username.trim(),
        email: email.trim(),
        password,
      });
      setMessage(res.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gabim gjatë regjistrimit!";
      setMessage(errorMsg);
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Regjistrohu
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="submit"
            disabled={!username.trim() || !email.trim() || !password.trim()}
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white w-full py-2 rounded-lg font-semibold transition"
          >
            Regjistrohu
          </button>

            
            <a href="/login" className="text-teal-500 hover:underline ml ">Already have an account</a>

        </form>

        {message && (
          <p className={`text-center mt-4 font-medium ${
            message.includes("sukses") ? "text-green-600" : "text-red-600"
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
