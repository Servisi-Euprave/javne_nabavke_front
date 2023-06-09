import React, { useEffect, useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import { Link } from 'react-router-dom';
import './CompanyProcurements.css'


const CompanyProcurements = () => {
  const [procurements, setProcurements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [company, setCompany] = useState(null);

  const fetchData = async () => {
    const { data } = await ProcurementService.getCompanyProcurements();
    setProcurements(data);
  };

  const fetchDataAboutCompany = async () => {
    const { data } = await ProcurementService.getInfoAboutCompany();
    setCompany(data);
  }


  useEffect(() => {
    fetchDataAboutCompany();
    fetchData();
    console.log(company)
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log("dfffffffff")
  console.log(company)

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
          <h2>Kreirane Nabavke</h2>
          <br></br>
          <p>{company?.naziv}</p>
          <br></br>
      <p>{company?.adresaSedista}</p>
    
      <p>{company?.mesto}</p>
          
        </div>

        <table>
          <thead>
            <tr>
              <td>Naručilac</td>
              <td>Naziv nabavke</td>
              <td>Opis nabavke</td>
              <td>Datum objavljivanja</td>
              <td>Rok za podnošenje</td>
              <td>Prikaži ponude</td>
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
                  {proc.winner_id !== "empty" ? (
                    <button className='buttonClassRed'>Potražnja je završena</button>
                  ) : <Link to={`/listOffers/${proc.id}`}>

                    <button className='buttonClass'>Prikaži ponude</button>
                  </Link>
                  }
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

export default CompanyProcurements;