const mongoose = require('mongoose')

const exhibitorschema = new mongoose.Schema({
    compname: String,
    address: String,
    webaddress: String,
    compnumber: String,
    city: String,
    nature: String,
    logo: String,
    ntn: String,
    details: String,

    name: String,
    useremail: { type: String, unique: true },
    password : String,
    usernumber: String,
    designation : String,

    ceoname: String,
    ceoemail: String,
    ceonumber: String,

    products: String,
})

const Exhibitor = mongoose.model('exhibitors', exhibitorschema)
module.exports = Exhibitor