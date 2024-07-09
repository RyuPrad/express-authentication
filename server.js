const express = require('express');
const userRoutes = require('./userRoutes');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
