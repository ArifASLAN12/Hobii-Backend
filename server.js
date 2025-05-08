const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reportRoutes = require('./routes/reportRoutes');
const postRoutes = require('./routes/postRoutes');
const followRoutes = require('./routes/followRoutes');
require('dotenv').config();

app.use(express.json());

// Kullanıcı route'ları
app.use('/api', userRoutes);

// Admin route'ları
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follow', followRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});