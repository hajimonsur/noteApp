import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = import.meta.env.VITE_REACT_APP_API;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`${api}/api/notes/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch note.");
        }

        const data = await response.json();
        setNote(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch note.");
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, api]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, content } = e.target;

    try {
      const response = await fetch(`${api}/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: title.value, content: content.value }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the note.");
      }

      alert("Note updated successfully.");
      navigate(`/notes/${id}`); // Redirect back to note detail page
    } catch (error) {
      setError(error.message || "An error occurred while updating the note.");
    }
  };

  if (loading)
    return <div className="text-center text-blue-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        Update Note
      </h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            defaultValue={note?.title}
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            defaultValue={note?.content}
            name="content"
            required
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate(`/notes/${id}`)}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNote;
