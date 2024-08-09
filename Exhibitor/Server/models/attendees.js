const mongoose = require('mongoose')

const attendeeschema = new mongoose.Schema({

    name: String,
    compname: String,
    designation : String,
    address: String,
    
   
    
  
    city: String,
    country: String,
    number: String,
    email: { type: String, unique: true },
    password: String,
    webaddress: String,
   
    nature: String,

    bookmarkedSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expo.sessions' }]

})

const Attendee = mongoose.model('attendees', attendeeschema)
module.exports = Attendee