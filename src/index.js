const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(userRouter);

app.get('/', (req,res) => {
    console.log("hello world");
})

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
})