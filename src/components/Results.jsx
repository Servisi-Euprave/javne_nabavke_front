import { useEffect, useState } from 'react';
import ProcurementService from '../services/ProcurementService';
import './Results.css'


const Results = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchData = async () => {
        const{ data } = await ProcurementService.getProcurementAndOffer();
        setResults(data);
    };
    useEffect(() =>{
        fetchData();
    },[]);
    
    const handlePageChange = (pageNumber) =>{
        setCurrentPage(pageNumber);
    };
    const getPageCount = () => {
        return Math.ceil(results.length/itemsPerPage);
    };
    const getPageItems = () =>{
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return results.slice(startIndex, endIndex);
    }
    
    return (
        <div class="results">
          <div class="recentOrders">
            <div class="cardHeader">
              <h2>Rezultati javnih nabavki</h2>
            </div>
    
            <table>
              <thead>
                <tr>
                  <td>Narucilac</td>
                  <td>Dobavljač</td>
                  <td>Naziv nabavke</td>
                  <td>Opis nabavke</td>
                  <td>Dogovorena cena</td>
                  <td>Rok i način plaćanja</td>
                  <td>Datum objavljivanja</td>
                  <td>Rok za podnosenje</td>
                </tr>
              </thead>
    
              <tbody>
                {getPageItems().map((proc) => (
                  <tr key={proc.id}>
                    <td>{proc.procuring_entity_pi_b}</td>
                    <td>{proc.bidder_pib}</td>
                    <td>{proc.procurement_name}</td>
                    <td>{proc.description}</td>
                    <td>{proc.price}</td>
                    <td>{proc.term_and_payment}</td>
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
}
export default Results;