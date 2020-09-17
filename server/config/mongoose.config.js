const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/belt_prep_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection to the database established"))
    .catch(err => console.log("An error occurred when connecting to the database"))