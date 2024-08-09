const mongoose = require('mongoose')

const boothSpaceSchema = new mongoose.Schema({
    boothNumber: String,
    size: String,
    location: String,
    availabilityStatus: String,
    allocatedExhibitor: String
  });
  const sessionSchema = new mongoose.Schema({
    sessiontitle: String,
    sessiontime: String,
    sessionlocation: String,
    sessiondescription: String,
    speakers: [String],
    topics: [String]
  });

  const attendeeSchema = new mongoose.Schema({
    userId: String,
    compname: String,
    
  });

  const expoSchema = new mongoose.Schema({
    title: String,
    date: Date,
    location: String,
    description: String,
    theme: String,
    boothSpaces: [boothSpaceSchema],
    sessions: [sessionSchema],
    attendees: [attendeeSchema]
  });
  
  const Expo = mongoose.model('Expo', expoSchema);
  
  module.exports = Expo