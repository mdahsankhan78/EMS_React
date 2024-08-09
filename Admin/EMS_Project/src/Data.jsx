import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; // Import useNavigate
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const getExhibitors = async () => {
    try {
        const response = await axios.get('http://localhost:3500/registerred/exhibitors');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}
const getAttendees = async () => {
    try {
        const response = await axios.get('http://localhost:3500/get/attendees');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}
const getExpos = async () => {
    try {
        const response = await axios.get('http://localhost:3500/get/expo');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const Data = () => {
    const [exhibitors, setExhibitors] = useState({});
    const [attendees, setAttendees] = useState({});
    const [expos, setExpos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const exhibitorData = await getExhibitors();
            const attendeeData = await getAttendees();
            const expoData = await getExpos();
            setExhibitors(exhibitorData);
            setAttendees(attendeeData);
            setExpos(expoData);
        };

        fetchData();
    }, []);

    const formatDate = (isoString) => {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
      
        const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
        const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);
      
        return `${date} ${time}`;
      };
  return (
    <>
    <div className="container-fluid pt-4 px-4">
    <div className="row g-4">
        <div className="col-sm-6 col-xl-4">
            <div className="rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-line fa-3x text-primary"></i>
                <div className="ms-3">
                    <p className="mb-2">Expos</p>
                    <h6 className="mb-0">{expos.length}</h6>
                </div>
            </div>
        </div>
        <div className="col-sm-6 col-xl-4">
            <div className="rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                <div className="ms-3">
                    <p className="mb-2">Exhibitors</p>
                    <h6 className="mb-0">{exhibitors.length}</h6>
                </div>
            </div>
        </div>
        <div className="col-sm-6 col-xl-4">
            <div className="rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-area fa-3x text-primary"></i>
                <div className="ms-3">
                    <p className="mb-2">Attendees</p>
                    <h6 className="mb-0">{attendees.length}</h6>
                </div>
            </div>
        </div>
       
    </div>
</div>

<div className="container-fluid pt-4 px-4">
    <div className="text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Events</h6>
            <Link to="/events">Show All</Link>
        </div>
        <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                    <tr className="text-white">
                        
                        <th scope="col">Date</th>
                        <th scope="col">Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Theme</th>
                        <th scope="col">Desciption</th>
                    </tr>
                </thead>
                <tbody>
                    {expos.map((expo, index)=>(
                        <tr key={index}>
                        <td>{formatDate(expo.date)}</td>
                        <td>{expo.title}</td>
                        <td>{expo.location}</td>
                        <td>{expo.theme}</td>
                        <td>{expo.description}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
</>
  )
}

export default Data