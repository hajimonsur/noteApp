import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const user = JSON.parse(localStorage.getItem("user"));


  const handleGetStarted = () => {
    if (user) {
      navigate("/add-note"); // Redirect to Add Note page if logged in
    } else {
      navigate("/login"); // Redirect to Login page if not logged in
    }
  };

  const handleSignUpBtn = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to <span className="text-yellow-400">Lex Note App</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            The perfect place to organize your thoughts, ideas, and tasks.
          </p>
          <button onClick={handleGetStarted} className="mt-6 bg-yellow-400 text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Why Choose Lex NoteApp?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">
                Easy Note Management
              </h3>
              <p className="text-gray-600">
                Create, edit, and delete notes with a user-friendly interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your notes are stored securely, accessible only to you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
              <p className="text-gray-600">
                Use Lex NoteApp on any device with internet connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      {!user && (
        <section className="bg-yellow-400 py-16">
          <div className="max-w-screen-lg mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              Start Organizing Your Notes Today
            </h2>
            <p className="mt-4 text-lg md:text-xl text-blue-800">
              Sign up now and take the first step toward better productivity!
            </p>
            <button
              onClick={handleSignUpBtn}
              className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
