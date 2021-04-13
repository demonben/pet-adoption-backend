const express = require("express");
const app = express();

const router = require('./routes/routes')

const port = 5000;

app.use(router)

app.listen(port, () => {
    console.log(`The server is listening on http://localhost:${port}`)
})
