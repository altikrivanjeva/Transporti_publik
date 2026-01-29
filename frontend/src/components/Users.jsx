import { useEffect, useState } from "react";
import API from "../api";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Merr userat nga serveri
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Gabim gjatë marrjes së userave:", err);
      setError(err.response?.data?.message || "Gabim gjatë marrjes së userave!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fshi user
  const deleteUser = async (id) => {
    if (window.confirm("A je i sigurt që dëshiron ta fshish këtë user?")) {
      try {
        await API.delete(`/users/${id}`);
        // përditëso lokalisht pa rifreskuar
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } catch (err) {
        console.error("❌ Gabim gjatë fshirjes:", err);
      }
    }
  };

  // Ruaj ndryshimet
  const saveEdit = async (id) => {
    if (!editData.username.trim() || !editData.email.trim()) {
      return alert("Plotëso të gjitha fushat!");
    }

    try {
      const res = await API.put(`/users/${id}`, {
        username: editData.username,
        email: editData.email,
      });

      console.log("✅ Përditësim:", res.data);

      // përditëso lokalisht users
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, username: editData.username, email: editData.email } : u
        )
      );

      // reseto edit mode
      setEditingUser(null);
      setEditData({ username: "", email: "" });
    } catch (err) {
      console.error("❌ Gabim gjatë përditësimit:", err);
      setError(err.response?.data?.message || "Gabim gjatë përditësimit të përdoruesit!");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
        Lista e Përdoruesve
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Duke u ngarkuar...</p>
      ) : error ? (
        <div className="text-center text-red-500 p-4">{error}</div>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">Nuk ka përdorues ende...</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Emri</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-2 border">{u.id}</td>

                <td className="p-2 border">
                  {editingUser === u.id ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                    />
                  ) : (
                    u.username
                  )}
                </td>

                <td className="p-2 border">
                  {editingUser === u.id ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>

                <td className="p-2 border flex gap-2">
                  {editingUser === u.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(u.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Ruaj
                      </button>
                      <button
                        onClick={() => {
                          setEditingUser(null);
                          setEditData({ username: "", email: "" });
                        }}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Anulo
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingUser(u.id);
                          setEditData({ username: u.username, email: u.email });
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Ndrysho
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Fshi
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
