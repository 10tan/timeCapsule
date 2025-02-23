const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const imgroute = require('./routes/imgup');
const emailr = require('./routes/email');
const photor = require('./routes/photo');
app.use('/api/auth', authRoutes);
app.use('/api/img', imgroute);
app.use('/api/email',emailr);
app.use('/api/ph',photor);
// Connect to Database & Start Server
mongoose.connect(process.env.MONGO_URI,{
    writeConcern: { w: "majority" } // Use "majority" instead of "maj"
})
    .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
    .catch(err => console.log(err));
    mongoose.connection.on('connected', () => {
        console.log('✅ MongoDB Connected');
    });
    
    mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB Connection Error:', err);
    });
    