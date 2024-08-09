const mongoose = require('mongoose')

const adminschema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
})

const Admin = mongoose.model('admin', adminschema)
module.exports = Admin