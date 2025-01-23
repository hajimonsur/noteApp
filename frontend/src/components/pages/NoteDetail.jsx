import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../Modal";

const NoteDetail = () => {
  const { id } = useParams(); // Extract the note ID from the URL
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility state
  const navigate = useNavigate(); // Navigate to other pages

  const api = import.meta.env.VITE_REACT_APP_API;

  // Fetch the note details
  useEffect(() => {
    const fetchNote = async () => {
      if (!id) {
        setError("Note ID is missing in the URL.");
        setLoading(false);
        return;
      }

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
        console.log("Fetched Note:", data); // Debug API response
        setNote(data.note || data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching note:", error);
        setError(error.message || "An error occurred while fetching the note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, api]);

  // Delete the note
  const handleDelete = async () => {
    try {
      const response = await fetch(`${api}/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the note.");
      }

      alert("Note deleted successfully.");
      navigate("/notes"); // Redirect to the notes list page
    } catch (error) {
      console.error("Error deleting note:", error);
      setError(error.message || "An error occurred while deleting the note.");
    }
  };

  // Update the note (navigate to a new page for updating)
  const handleUpdate = () => {
    navigate(`/update-note/${id}`); // Navigate to the update page
  };

  if (loading) {
    return (
      <div className="text-center mt-6 text-blue-600">Loading note...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-600">{error}</div>;
  }

  if (!note) {
    return (
      <div className="text-center mt-6 text-gray-500">Note not found.</div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-screen-lg w-full bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          {note?.title || "Untitled"}
        </h1>
        <p className="text-gray-700 text-base md:text-lg text-center">
          {note?.content || "No content available."}
        </p>
        <p className="text-gray-500 mt-4 text-sm md:text-base text-center">
          Created At:{" "}
          {note?.createdAt
            ? new Date(note.createdAt).toLocaleString()
            : "Unknown"}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row sm:gap-4 justify-center">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 mb-2 sm:mb-0 sm:w-auto bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm sm:text-base"
          >
            Update
          </button>
          <button
            onClick={() => setShowDeleteModal(true)} // Show delete confirmation modal
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base"
          >
            Delete
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <Modal
            message="Are you sure you want to delete this note?"
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
