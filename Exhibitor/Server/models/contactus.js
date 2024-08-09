const mongoose = require('mongoose')

const contactschema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    subject: String,
    message : String
})

const Contact = mongoose.model('contact', contactschema)
module.exports = Contact
