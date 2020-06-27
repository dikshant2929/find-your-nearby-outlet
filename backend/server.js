const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const routes = require("./routes");

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false })) //Body-parser 
    .use(bodyParser.json())


app.use("/api", routes());

//Server Starting
app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));