const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/madbook';

let connectToDB = () => {
    mongoose.connect(url).then(() => {
        console.log("Connected to Database Successfully");
    })
}

module.exports = connectToDB;