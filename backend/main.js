const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const noteRoutes = require('./Routes/noteRoutes');
const users = require("./Routes/users")
const Cors = require('cors');

dotenv.config(); 
connectDB();

const app = express();
app.use(Cors());

// Middleware
app.use(express.json()); 

// Routes
app.use('/api/notes', noteRoutes); // Notes API
app.use('/api/users', users)



// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack.red);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Server Listener
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
