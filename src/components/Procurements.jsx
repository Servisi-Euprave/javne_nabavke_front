import React, { useEffect, useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import './Procurements.css'

const  Procurements = () =>{
    const [procurements, setProcurements] = useState([]);
    const fetchData = async () => {
        const { data } = await ProcurementService.getProcurements();
        setProcurements(data);
    };
    useEffect(() =>{
        fetchData();
    },[])
    return ( 
        <div class="details">
            <div class="recentOrders">
                <div class="cardHeader">
                    <h2>Recent Procurements</h2>
                    <a href="#" class="btn">View All</a>
                </div>

                <table>

                    <thead>
                        <tr>
                            <td>Procuring Entity</td>
                            <td>Procurement Name</td>
                            <td>Description</td>
                        </tr>
                    </thead>

                    <tbody>
                        {procurements.map((proc, id) => (
                            <tr key={proc.id}>
                            <td>{proc.procuringEntity}</td>
                            <td>{proc.procurementName}</td>
                            <td>{proc.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Procurements;