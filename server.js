const express = require("express");
const app = express();
const cors = require('cors');
const { postgrator } = require('./lib/db')
const { uploadedFilesFolderName } = require('./middlewares/multipart')

const routerAnimals = require('./routes/animals');
const routerUsers = require('./routes/users')

const port = "5000";
const host = "0.0.0.0"

// uploading file storage and all GET request to /public  will be served as file
app.use('/' + uploadedFilesFolderName, express.static(uploadedFilesFolderName))
// uploading file storage

app.use(cors());
app.use(express.json()); 

app.use("/animals", routerAnimals)
app.use("/users", routerUsers)


postgrator.migrate().then((result) => {
    console.log(`migrated db successfully:`, result)
    app.listen(port, host, () => {
        console.log(`The server is listening on http://${host}:${port}`)
    });
}).catch(error => console.error(error))
