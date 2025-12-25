import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditPassword() {
  const [passwords, setPasswords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedSite, setEditedSite] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5100/api/passwords", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then((data) => setPasswords(data || []))
      .catch(() => navigate("/login"));
  }, [navigate]);

  // OPEN MODAL
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // DELETE PASSWORD
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5100/api/passwords/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setPasswords(passwords.filter((item) => item._id !== deleteId));
    setShowModal(false);
    setDeleteId(null);

    setMessage("Password deleted successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditedSite(item.site);
    setEditedUsername(item.username);
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5100/api/passwords/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          site: editedSite,
          username: editedUsername
        })
      }
    );

    const updated = await res.json();

    setPasswords(
      passwords.map((item) =>
        item._id === id ? updated : item
      )
    );

    setEditingId(null);
    setMessage("Password updated successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white relative">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Edit Passwords
      </h2>

      {message && (
        <div className="mb-4 text-green-400 text-center text-sm">
          {message}
        </div>
      )}

      <div className="space-y-4 max-w-3xl mx-auto">
        {passwords.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 p-4 rounded-xl space-y-3"
          >
            {editingId === item._id ? (
              <>
                <input
                  value={editedSite}
                  onChange={(e) => setEditedSite(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <input
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleSave(item._id)}
                    className="bg-green-600 px-4 py-1 rounded hover:bg-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
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
                    onClick={() => confirmDelete(item._id)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Delete Password
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete this password? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 rounded bg-red-600 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
