import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import useNavigate
import { useEffect, useState } from 'react'


const getNotes = async () => {
    try {
        const response = await axios.get('http://localhost:3500/list/notes');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const getExhibitors = async () => {
    try {
        const response = await axios.get('http://localhost:3500/registerred/exhibitors');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

const NotesList = () => {
    const [request, setRequest] = useState({});
    const [request2, setRequest2] = useState({});

    useEffect(() => {
        const fetchNotes = async () => {
            const notesData = await getNotes();
            const exhData = await getExhibitors();
            setRequest(notesData);
            setRequest2(exhData);
            
        };

        fetchNotes();
    }, []);
// console.log(request);
  return (
    <>

    
            {request.length > 0 ? (
               
                        request.filter(note => note.status === 'Pending').map((note, index) => (
                            <div key={index}>
                                <Link to="/notifications" className="dropdown-item">
                                    <h6 className="fw-normal mb-0">{note.userName} sent request for {note.eventTitle}</h6>
                                    <small>{formatDate(note.requestDate) || 'No Timestamp'}</small>
                                </Link>
                                {index < request.length - 1 && <hr className="dropdown-divider" />}
                            </div>
                        ))
                    
            ) : (
                <p>No notes available.</p>
            )}
            
            {/* for exhibitors registration */}

            {request2.length > 0 ? (
                
                        request2.map((note, index) => (
                            <div key={index}>
                                <Link to="/notifications" className="dropdown-item">
                                    <h6 className="fw-normal mb-0">{note.name} registerred as exhibitor</h6>
                                    <small>{formatDate(note.date) || 'No Timestamp'}</small>
                                </Link>
                                {index < request2.length - 1 && <hr className="dropdown-divider" />}
                            </div>
                        ))
                    
            ) : (
                <p>No notes available.</p>
            )}
                      
                        </>
  )
}

export default NotesList