const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Exhibitor = require('./models/exhibitors')
const authenticateToken = require('./token'); // Adjust the path to your middleware
const Attendee = require('./models/attendees')
const Admin = require('./models/admin')
const Expo = require('./models/expo')
const BoothRequests = require('./models/eventrequests')
const Contact = require('./models/contactus')


const app = express()
app.use("/uploads", express.static("uploads"))
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/EMS")

app.post('/registeradmin', async (req, res) => {
    try {
        const { name, email, password} = req.body;

        // Check if the email already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already taken' });
        }

        // Hash the password
        const hashpass = await bcrypt.hash(password, 10);

        // Create a new user
        const admin = new Admin({ name, email, password: hashpass});

        // Save the new user
        await admin.save();

         // Check if the email already exists
         const registereduser = await Admin.findOne({email});    
         if (registereduser) {
        
             const token = jwt.sign(
                 { id : registereduser._id},
                 'Your Private Key',
                 {expiresIn : '2h'},
             )
             res.json({token})
            
         }
         else{
         // Respond with the created user
         res.status(201).json(admin);
         }
    } catch (e) {
        console.error(e); // Log the error for debugging
        
    }
});

app.post('/loginadmin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await Admin.findOne({email});    
        if (existingUser) {
           const compare = await bcrypt.compare(password , existingUser.password)
           if (compare) {
            const token = jwt.sign(
                { id : existingUser._id},
                'Your Private Key',
                {expiresIn : '2h'},
            )
            res.json({token})
           }
           else {
            return res.status(600).json({ message: 'Invalid Password' });
        }
    } else {
        return res.status(400).json({ message: 'Invalid Email' });
    }

        
    } catch (e) {
        console.error(e); // Log the error for debugging
    }
});

const mystorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: mystorage})

app.post('/exhibitorregister',upload.single('logo'), async (req, res) => {
    try {
        const { compname,address,webaddress,compnumber,city,nature,ntn,details,name,useremail,password,usernumber,designation,ceoname,ceoemail,ceonumber,products} = req.body;
        const logo = req.file.path

        const existingUser = await Exhibitor.findOne({ useremail });
        const existingUser2 = await Exhibitor.findOne({ ceoemail });
        if (existingUser) {
            return res.status(400).json({ message: 'User Email already taken' });
        }
        else if (existingUser2) {
            return res.status(400).json({ message: 'CEO Email already taken' });
        }
        // Hash the password
        const hashpass = await bcrypt.hash(password, 10);
        // Create a new user
        const exhibitor = new Exhibitor({ compname,address,webaddress,compnumber,city,nature,ntn,details,logo,name,useremail,password : hashpass,usernumber,designation,ceoname,ceoemail,ceonumber,products});

        
        // Save the new user
        await exhibitor.save();


        const registereduser = await Exhibitor.findOne({useremail});    
        if (registereduser) {
       
            const token = jwt.sign(
                { id : registereduser._id},
                'Your Private Key',
                {expiresIn : '1d'},
            )
            res.json({token})
           
        }
        else{
        // Respond with the created user
        res.status(201).json(exhibitor);
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        
    }
});

app.post('/login/exhibitor', async (req, res) => {
    try {
        const { useremail, password } = req.body;

        // Check if the email already exists
        const existingUser = await Exhibitor.findOne({useremail});    
        if (existingUser) {
           const compare = await bcrypt.compare(password , existingUser.password)
           if (compare) {
            const token = jwt.sign(
                { id : existingUser._id},
                'Your Private Key',
                {expiresIn : '1d'},
            )
            res.json({token})
           }

           else{
           return res.status(600).json({ message: 'Invalid Password' });
        }
        }
        else{
        return res.status(400).json({ message: 'Invalid Email' });
        }

        
    } catch (e) {
        console.error(e); // Log the error for debugging
    }
});

app.put('/update/exhibitor/:id',upload.single('logo'), async (req, res) => {
    try {
        const { compname,address,webaddress,compnumber,city,nature,ntn,details,name,useremail,usernumber,designation,ceoname,ceoemail,ceonumber,products} = req.body;
        const logo = req.file.path
        
        const updatedExhibitor = await Exhibitor.findByIdAndUpdate(req.params.id, 
            { compname,address,webaddress,compnumber,city,nature,ntn,details,logo,name,useremail,usernumber,designation,ceoname,ceoemail,ceonumber,products}, 
            { new: true });

        if (!updatedExhibitor) {
            return res.status(404).send('Exhibitor not found');
        }
        res.json(updatedExhibitor);


    } catch (e) {
        console.error(e); // Log the error for debugging
        
    }
});

app.get("/get/expo", async (req, res) => {
    try {
        var expo = await Expo.find();
        res.json(expo);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/get/expo/:id", async (req, res) => {
    try {
        const id = req.params.id;
        var expo = await Expo.findById(id); // Assuming you're using Mongoose
        res.json(expo);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/register/expo/attendee', async (req, res) => {
    try {
        const { eventId, userId, compname} = req.body;

        if (!eventId || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const expo = await Expo.findById(eventId);
        if (expo) {
            // Check if the user is already an attendee
            const attendeeExists = expo.attendees.some(attendee => attendee.userId.toString() === userId);

            if (!attendeeExists) {
                // Add the new attendee to the array
                expo.attendees.push({ userId, compname });
                await expo.save();
            }
        }

        res.json({ message: 'Request approved' });
    } catch (error) {
        console.error(error);
    }
}); 

app.post('/bookmark/session', async (req, res) => {
    try {
        const { session_Id, userId} = req.body;

        if (!session_Id || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const attendee = await Attendee.findById(userId);
        if (attendee) {
            // Check if the user is already an attendee
            const sessionExists = attendee.bookmarkedSessions.some(session => session.toString() === session_Id);

            if (!sessionExists) {
                // Add the new attendee to the array
                attendee.bookmarkedSessions.push(session_Id);
                await attendee.save();
            }
        }

        res.json({ message: 'Request approved' });
    } catch (error) {
        console.error(error);
    }
}); 

app.delete('/bookmark/remove/:sessionId', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const attendeeId = req.exhibitor.id;
    
        const attendee = await Attendee.findById(attendeeId);
        if (!attendee) {
          return res.status(404).json({ message: 'Attendee not found' });
        }
    
        // Remove the session ID from the bookmarkedSessions array
        attendee.bookmarkedSessions = attendee.bookmarkedSessions.filter(id => id.toString() !== sessionId);
        await attendee.save();
    
        res.json({ message: 'Bookmark removed successfully' });
      } catch (e) {
        console.error(e);
        res.status(500).send('Error removing bookmark: ' + e.message);
      }
}); 


app.post('/attendeeregister', async (req, res) => {
    try {
        const { name, compname, designation,address, city, country, number, email,password, webaddress, nature} = req.body;
       

        const existingUser = await Attendee.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already taken' });
        }

        const hashpass = await bcrypt.hash(password, 10);
        // Create a new user
        const attendee = new Attendee({ name, compname, designation,address, city, country, number, email,password : hashpass, webaddress, nature});

        
        // Save the new user
        await attendee.save();


        // Check if the email already exists
        const registereduser = await Attendee.findOne({email});    
        if (registereduser) {
       
            const token = jwt.sign(
                { id : registereduser._id},
                'Your Private Key',
                {expiresIn : '1d'},
            )
            res.json({token})
           
        }

        // Respond with the created user
        res.status(201).json(attendee);
    } catch (e) {
        console.error(e); // Log the error for debugging
        
    }
});

app.post('/login/attendee', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await Attendee.findOne({email});    
        if (existingUser) {
           const compare = await bcrypt.compare(password , existingUser.password)
           
           if (compare) {
            const token = jwt.sign(
                { id : existingUser._id},
                'Your Private Key',
                {expiresIn : '1d'},
            )
            res.json({token})
           }

           else{
           return res.status(600).json({ message: 'Invalid Password' });
            }
        }
        else{
        return res.status(400).json({ message: 'Invalid Email' });
        }

        
    } catch (e) {
        console.error(e); // Log the error for debugging
    }
});
app.get("/get/attendees", async (req, res) => {
    try {
        var attendee = await Attendee.find();
        res.json(attendee);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/get/attendee', authenticateToken, async (req, res) => {
    try {
      const attendee = await Attendee.findById(req.exhibitor.id)
      if (!attendee) {
        return res.status(404).json({ message: 'User not found' });
      }
      const sessions = await Expo.find({ 'sessions._id': { $in: attendee.bookmarkedSessions } }, 'sessions');
      const bookmarkedSessionsDetails = sessions.flatMap(expo => 
        expo.sessions.filter(session => attendee.bookmarkedSessions.includes(session._id))
      );
  
      res.json({ ...attendee.toObject(), bookmarkedSessions: bookmarkedSessionsDetails });
    } catch (e) {
      console.error(e);
      res.status(500).send('Error fetching user: ' + e.message);
    }
  });


app.get('/getexhibitor', authenticateToken, async (req, res) => {
    try {
      const exhibitor = await Exhibitor.findById(req.exhibitor.id).select('-password');
      if (!exhibitor) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(exhibitor);
    } catch (e) {
      console.error(e);
      res.status(500).send('Error fetching user: ' + e.message);
    }
  });

  app.get("/details/exhibitor/:id", async (req, res) => {
    try {
        const id = req.params.id;
        var exhibitor = await Exhibitor.findById(id);
        res.json(exhibitor);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).send("Internal Server Error");
    }
});

  app.get('/registerred/exhibitors', async (req, res) => {
    try {
      const exhibitor = await Exhibitor.find()
      if (!exhibitor) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(exhibitor);
    } catch (e) {
      console.error(e);
    //   res.status(500).send('Error fetching user: ' + e.message);
    }
  });

  app.get('/getadmin', authenticateToken, async (req, res) => {
    try {
      const admin = await Admin.findById(req.exhibitor.id).select('-password')
      if (!admin) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(admin);
    } catch (e) {
      console.error(e);
      res.status(500).send('Error fetching user: ' + e.message);
    }
    
  });


  // API Endpoint to handle form submission
app.post('/create/expo', (req, res) => {

    try{
    const expoData = req.body;
    const newExpo = new Expo(expoData);
    
    newExpo.save();
        res.json(newExpo);

} catch (e) {
    console.error(e); // Log the error for debugging
    
}
  });
  
app.put('/update/expo/:id', async (req, res) => {
try {
    // Find the expo event by ID and update it with the new data from the request body
    const updatedExpo = await Expo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedExpo) {
        return res.status(404).send('Expo event not found');
    }

    res.json(updatedExpo);
} catch (error) {
    console.error('Error updating expo:', error);
    res.status(500).send('Server error');
}
});

app.delete("/delete/expo/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deleteExpo = await Expo.findByIdAndDelete(id, req.body, { new: true });
        if (!deleteExpo) {
            return res.status(404).json({ message: 'Expo not found' });
        }
        res.json(deleteExpo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/request/booth', async (req, res) => {
  const { eventId, eventTitle, userId, userName, boothNumber, status } = req.body;

  if (!eventId || !userId || !boothNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newRequest = new BoothRequests({
      eventId,
      eventTitle,
      userId,
      userName,
      boothNumber,
      status
    });

    await newRequest.save();
    return res.status(201).json({ message: 'Booth request submitted successfully', request: newRequest });
  } catch (error) {
    console.error('Error saving booth request:', error);
  }
});

app.get('/list/notes', async (req, res) => {
    try {
      const notes = await BoothRequests.find().sort({ requestDate: -1 });
      if (!notes) {
        return res.status(404).json({ message: 'BoothRequests not found' });
      }
      res.json(notes);
    } catch (e) {
      console.error(e);
    }
  });

app.get('/list/notes/:id', async (req, res) => {
try {
    const userId = req.params.id;
    const notes = await BoothRequests.find({ userId: userId }).sort({ requestDate: -1 });
    if (!notes) {
    return res.status(404).json({ message: 'BoothRequests not found' });
    }
    res.json(notes);
} catch (e) {
    console.error(e);
}
});

app.post('/approve/:id', async (req, res) => {
    try {
        const note = await BoothRequests.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Request not found' });
        }

        note.status = 'Approved';
        await note.save();

        const expo = await Expo.findById(note.eventId);
        if (expo) {
            const boothIndex = expo.boothSpaces.findIndex(booth => booth.boothNumber === note.boothNumber);
            if (boothIndex !== -1) {
                expo.boothSpaces[boothIndex].allocatedExhibitor = note.userName; // Assuming userName is the company name
                expo.boothSpaces[boothIndex].availabilityStatus = 'Booked'; // Assuming userName is the company name
                await expo.save();
            }
        }

        res.json({ message: 'Request approved' });
    } catch (error) {
        console.error(error);
    }
});  

app.post('/reject/:id', async (req, res) => {
    try {
        const note = await BoothRequests.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Request not found' });
        }

        note.status = 'Rejected';
        await note.save();

    } catch (error) {
        console.error(error);
    }
});

app.post('/contactus',async (req, res) => {

    try{
    const {name, email, subject, message} = req.body;
    const existingcontact = await Contact.findOne({email});
        if (existingcontact) {
            return res.status(400).json({ message: 'Email already taken' });
        }
    const newcontact = new Contact({name, email, subject, message});
    
    newcontact.save();
    res.json(newcontact);

} catch (e) {
    console.error(e); 
    
}
  });
app.get("/get/contacts", async (req, res) => {
try {
    var contacts = await Contact.find();
    res.json(contacts);
} catch (e) {
    console.log("Error:", e);
    res.status(500).send("Internal Server Error");
}
});
app.listen(3500, () => {
    console.log("server is running")
})