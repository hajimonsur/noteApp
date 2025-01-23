import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = import.meta.env.VITE_REACT_APP_API;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${api}/api/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch notes.");
        }

        const data = await response.json();
        console.log(data);
        setNotes(data || []); // Adjust based on your API response structure
      } catch (error) {
        setError(error.message || "An error occurred while fetching notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [api]);

  if (loading) {
    return (
      <div className="text-center mt-6 text-blue-600">Loading notes...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-600">{error}</div>;
  }

  const handleRowClick = (noteId) => {
    navigate(`/notes/${noteId}`); // Navigate to the note detail page
  };

  const handleAddNewNote = () => {
    navigate("/add-note"); // Navigate to the "Add New Note" page
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">My Notes</h1>
      {/* If no notes, show button to add new note */}
      {notes.length === 0 ? (
        <div className="text-center mt-6 text-gray-500">
          No notes available.
          <button
            onClick={handleAddNewNote}
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New Note
          </button>
        </div>
      ) : (
        // Notes Table
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 p-4 text-left">Title</th>
                <th className="border border-gray-300 p-4 text-left">
                  Created At
                </th>
                <th className="border border-gray-300 p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr
                  key={note._id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(note._id)}
                >
                  <td className="border border-gray-300 p-4 break-words">
                    {note.title}
                  </td>
                  <td className="border border-gray-300 p-4 break-words">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click event
                        navigate(`/notes/${note._id}`);
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NoteList;
