import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNote = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const api = import.meta.env.VITE_REACT_APP_API;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!title || !content) {
      setError("Both title and content are required.");
      setSuccess(null);
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      const response = await fetch(`${api}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add note.");
      }

      const data = await response.json();
      setSuccess("Note added successfully!");
      setTitle("");
      setContent("");
      navigate("/notes");
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      setSuccess(null);
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Add a New Note
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note Content"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
