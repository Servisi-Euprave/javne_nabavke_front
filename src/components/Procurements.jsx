import React, { useEffect, useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import { Link } from 'react-router-dom';
import './Procurements.css'


const Procurements = () => {
  const [procurements, setProcurements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [errorMessage, setErrorMessage] = useState("Ne možete postaviti ponudu za sopstvenu potražnju");

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

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };


  const handlePostaviPonudu = async (procEntity, procId) => {
    try {
      const { data } = await ProcurementService.checkifCanCreateOffer(procEntity);
      window.location.href = `/createOffer/${procId}`;
    } catch (error) {

      setErrorMessage('Ne možete postaviti ponudu za sopstvenu potražnju');
      window.alert(errorMessage);
    }
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
              <td>Naručilac</td>
              <td>Naziv nabavke</td>
              <td>Opis nabavke</td>
              <td>Datum objavljivanja</td>
              <td>Rok za podnošenje</td>
              {isLoggedIn() ? (
                <td>Postavi Ponudu</td>
              ) : null}

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
                <td>
                  {isLoggedIn() ? (
                    <button className='buttonAddOffer' onClick={() => handlePostaviPonudu(proc.procuring_entity_pi_b, proc.id)} >Postavi ponudu</button>

                  ) : null}
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

export default Procurements;