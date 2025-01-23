import React from "react";
import {  Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup";
import AddNote from "./components/pages/AddNote";
import NoteList from "./components/pages/NoteList";
import NoteDetail from "./components/pages/NoteDetail";
import UpdateNote from "./components/pages/UpdateNote";
const App = () => {
  return (

      <div className="flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content */}
        <div className="flex-grow">
   
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/update-note/:id" element={<UpdateNote />} />
          </Routes>
  
        </div>

        {/* Footer */}
        <Footer />
      </div>
  
  );
};

export default App;
