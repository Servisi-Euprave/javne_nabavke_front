import React, { useEffect, useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import { Link } from 'react-router-dom';
import './CompanyOffers.css'
import { useParams } from 'react-router-dom';


const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    let { id } = useParams();    

  
    const fetchData = async () => {  
      const { data } = await ProcurementService.getProcurementOffers(id);
      setOffers(data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const getPageCount = () => {
      return Math.ceil(offers.length / itemsPerPage);
    };
  
    const getPageItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return offers.slice(startIndex, endIndex);
    };
    const handleButtonClick = async (offerId) => {
        try {
          const response = await ProcurementService.declareWinner(id,offerId);
          console.log(response);
          window.location.href = '/';
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
      <div class="details">
        <div class="recentOrders">
          <div class="cardHeader">
            <h2>Pregled ponuda</h2>
          </div>
  
          <table>
            <thead>
              <tr>
                <td>Ponuđač</td>
                <td>Cena</td>
                <td>Količina prozvoda</td>
                <td>Datum konkurisanja</td>
                <td>Odaberi ponudu</td>
              </tr>
            </thead>
  
            <tbody>
              {getPageItems().map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.bidder_pib}</td>
                  <td>{offer.price}</td>
                  <td>{offer.quantity}</td>
                  <td>{offer.start_date.split("T")[0]}</td>
                  <td>
                  <button onClick={() => handleButtonClick(offer.id)}>Odaberi</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div class="pagination">
            {Array.from({ length: getPageCount() }).map((_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Offers;