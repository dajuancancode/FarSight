require('dotenv').config();
require('./database/mongoose');

const express = require('express')
const apiRouter = require('./routes/routes')

const app = express();

app.use(express.json());

app.use('/city', apiRouter)

const port = process.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello Shellhacks')
})


app.listen(port, () => console.log(`Now listening on port ${port}`))