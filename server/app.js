import express from 'express';

const app = express();

app.use(express.json());

const port = process.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello Shellhacks')
})

app.listen(port, () => console.log(`Now listening on port ${port}`))