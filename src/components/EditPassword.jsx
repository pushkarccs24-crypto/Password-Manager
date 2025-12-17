// EditPassword.jsx
import { useState } from "react";

export default function EditPassword() {
  const [passwords, setPasswords] = useState([
    { id: 1, site: "Gmail", username: "user@gmail.com" },
    { id: 2, site: "GitHub", username: "devuser" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedSite, setEditedSite] = useState("");
  const [editedUsername, setEditedUsername] = useState("");

  const handleDelete = (id) => {
    setPasswords(passwords.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditedSite(item.site);
    setEditedUsername(item.username);
  };

  const handleSave = (id) => {
    setPasswords(
      passwords.map((item) =>
        item.id === id
          ? { ...item, site: editedSite, username: editedUsername }
          : item
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Edit Passwords
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {passwords.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-4 rounded-xl space-y-3"
          >
            {editingId === item.id ? (
              <>
                <input
                  value={editedSite}
                  onChange={(e) => setEditedSite(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Website"
                />

                <input
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Username"
                />

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleSave(item.id)}
                    className="bg-green-600 px-4 py-1 rounded hover:bg-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 px-4 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="font-medium">{item.site}</p>
                  <p className="text-sm text-gray-400">{item.username}</p>
                </div>

                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
