import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; // Import useNavigate

const Exhibitors = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('');
    const getExhibitors = async () => {
        try {
            const response = await axios.get('http://localhost:3500/registerred/exhibitors');
            return response.data;
        } catch (error) {
            console.error(error);
            return []; // Return an empty array in case of error
        }
    }

    const [exhibitors, setExhibitors] = useState([]);

    useEffect(() => {
        const fetchExh = async () => {
            const exhData = await getExhibitors();
            setExhibitors(exhData);
        };

        fetchExh();
    }, []);

    // Filter exhibitors based on search query
    const filteredExhibitors = exhibitors.filter(exh =>
        exh.compname.toLowerCase().includes(searchQuery.toLowerCase())
        &&
        exh.products.toLowerCase().includes(filter.toLowerCase())
    );
  return (
    <>
    <section id="hotels" className="section-with-bg wow fadeInUp">

<div className="container">
  <div className="section-header">
    <h2>Exhibitors</h2>
    <p>Her are some Exhibitors</p>
  </div>
        
  <section id="subscribe2">
 
   
    <form method="POST" action="#">
      <div className="form-row justify-content-center">
        <div className="col-md-6">
          <input type="text" onChange={(e) => setSearchQuery(e.target.value)} className="form-control" placeholder="Search" />
        </div>
        <div className="col-auto">
         <select name="" id=""onChange={(e) => setFilter(e.target.value)}>
            <option selected value=''>Filter</option>
            <option value="Accessories">Accessories</option>
            <option value="Apparels">Apparels</option>
            <option value="Art Silk and Synthetic Textile">Art Silk and Synthetic Textile</option>
            <option value="Carpets">Carpets</option>
            <option value="Denim">Denim</option>
            <option value="Fabric and Yarn">Fabric and Yarn</option>
            <option value="Footwear">Footwear</option>
            <option value="Gloves">Gloves</option>
            <option value="High-End-Fashion Garments">High-End-Fashion Garments</option>
            <option value="Home Textiles">Home Textiles</option>
            <option value="Hosiery">Hosiery</option>
            <option value="Knitwear">Knitwear</option>
            <option value="Leather">Leather</option>
            <option value="Personal Protective Garments">Personal Protective Garments</option>
            <option value="Readymade Garments">Readymade Garments</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Tech. Solutions">Tech. Solutions</option>
            <option value="Tents and Canvas">Tents and Canvas</option>
            <option value="Textile Machinery">Textile Machinery</option>
            <option value="Towels">Towels</option>
         </select>
        </div>
      </div>
    </form>
 
</section>
<br />

  <div className="row">


  {filteredExhibitors.length > 0 ? (
                            filteredExhibitors.map((exh, index) => (
                                <div className="col-lg-4 col-md-6" key={index}>
                                    <div className="hotel">
                                        <div className="hotel-img">
                                            <img
                                                src={`http://localhost:3500/${exh.logo}`}
                                                className="img-fluid"
                                                alt={exh.compname}
                                            />
                                        </div>
                                        <h3><Link to={`/details/exhibitor/${exh._id}`}>{exh.compname}</Link></h3>
                                        <a
                                            onClick={() => window.location.href = `http://${exh.webaddress}`}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{ margin: '20px' }}
                                        >
                                            {exh.webaddress}
                                        </a>
                                        <p>{exh.city}</p>
                                        <p>{exh.nature}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p>No exhibitors found</p>
                            </div>
                        )}
    

    

    

  </div>
</div>

</section>
    </>
  )
}

export default Exhibitors