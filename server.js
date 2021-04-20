const express = require("express");
const app = express();
const cors = require('cors');
const { postgrator } = require('./lib/db')

const router = require('./routes/routes');

const port = "5000";
const host = "0.0.0.0"

app.use(cors());
app.use(express.json());

app.use("/animals", router)

postgrator.migrate().then((result) => {
    console.log(`migrated db successfully:`, result)
    app.listen(port, host, () => {
        console.log(`The server is listening on http://${host}:${port}`)
    });
})
 