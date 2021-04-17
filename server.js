const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const router = require('./routes/routes');

app.use('/animals',require('./routes/routes'))

const port = "5000";
const host = "0.0.0.0"

app.use(router)

app.listen(port, host, () => {
    console.log(`The server is listening on http://${host}:${port}`)
})
