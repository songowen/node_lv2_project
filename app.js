const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
const productsRouter = require('./routers/products.router');
const usersRouter = require('./routers/users.router');

app.use('/products', productsRouter);
app.use('/users', usersRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
