// Import required modules and files
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const recordsRoutes = require('./routes/record');
const rbacMiddleware = require('./middleware/rbacMiddleware');

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Define routes
app.use('/auth', authRoutes);
app.use('/records', rbacMiddleware.checkRole('user'), recordsRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
