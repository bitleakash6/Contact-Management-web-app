console.log("this is my express js project");
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();


const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const contact = require("./routes/contactRoutes");
app.use("/api/contacts", contact);
const user = require("./routes/userRouter");
app.use("/api/user", user);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});