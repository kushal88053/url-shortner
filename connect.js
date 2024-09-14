const mongoose = require('mongoose');

async function  connetToDb(url) {
    return await mongoose.connect(url) ; 
}

module.exports = {connetToDb} ; 