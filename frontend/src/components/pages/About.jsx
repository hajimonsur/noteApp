import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight transition-all duration-300 ease-in-out transform hover:scale-105">
            About <span className="text-yellow-400">Lex Note App</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-80 hover:opacity-100 transition-opacity duration-300">
            Discover the story behind the app that simplifies your life.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 text-center transition-all duration-300">
            At <span className="font-semibold">Lex NoteApp</span>, our goal is
            to provide an intuitive and secure platform for organizing your
            thoughts, ideas, and tasks. We believe that everyone deserves a
            simple, effective tool to increase productivity and stay on top of
            their goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
              <div className="text-blue-600 text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">
                Organized and Accessible
              </h3>
              <p className="text-gray-600">
                Your notes are neatly organized and accessible across devices.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
              <div className="text-blue-600 text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">
                Designed for Simplicity
              </h3>
              <p className="text-gray-600">
                A clean, intuitive interface designed to save time and reduce
                clutter.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
              <div className="text-blue-600 text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-gray-600">
                Use Lex NoteApp anywhere in the world with internet access.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">
                Your Data is Secure
              </h3>
              <p className="text-gray-600">
                We prioritize your privacy and ensure your notes are encrypted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-blue-600 mb-8">
            Meet the Team
          </h2>
          <p className="text-gray-600 mb-8 text-lg transition-all duration-300">
            Lex NoteApp is built by a passionate team of developers and
            designers dedicated to making productivity tools accessible to
            everyone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105">
              <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Alex Tech</h3>
              <p className="text-blue-600 font-medium">Full Stack Developer</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105">
              <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Adunni</h3>
              <p className="text-blue-600 font-medium">UX/UI Designer</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105">
              <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Xhina Tech</h3>
              <p className="text-blue-600 font-medium">Backend Specialist</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
