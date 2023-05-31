import React, { useEffect, useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import './Procurements.css'


const Procurements = () => {
    const [procurements, setProcurements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
  
    const fetchData = async () => {
      const { data } = await ProcurementService.getProcurements();
      setProcurements(data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const getPageCount = () => {
      return Math.ceil(procurements.length / itemsPerPage);
    };
  
    const getPageItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return procurements.slice(startIndex, endIndex);
    };
  
    return (
      <div class="details">
        <div class="recentOrders">
          <div class="cardHeader">
            <h2>Aktivne javne nabavke</h2>
          </div>
  
          <table>
            <thead>
              <tr>
                <td>Narucilac</td>
                <td>Naziv nabavke</td>
                <td>Opis nabavke</td>
                <td>Datum objavljivanja</td>
                <td>Rok za podnosenje</td>
              </tr>
            </thead>
  
            <tbody>
              {getPageItems().map((proc) => (
                <tr key={proc.id}>
                  <td>{proc.procuring_entity_pi_b}</td>
                  <td>{proc.procurement_name}</td>
                  <td>{proc.description}</td>
                  <td>{proc.start_date.split("T")[0]}</td>
                  <td>{proc.end_date.split("T")[0]}</td>

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
  
  export default Procurements;