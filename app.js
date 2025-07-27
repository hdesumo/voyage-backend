const express = require('express');
const app = express();
app.use(express.json());
app.use('/admin', require('./routes/adminRoutes'));
app.use('/enterprise', require('./routes/enterpriseRoutes'));
app.use('/passenger', require('./routes/passengerRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));