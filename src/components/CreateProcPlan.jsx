import { useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import './CreateProcPlan.css'
export default function CreateProcurementPlan(){
    const[productType, setProductType] = useState("");
    const[estimatedValue, setEstimatedValue] = useState("");
    const[quantity, setQuantity] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault();    
        const procurementPlan = { productType:productType, estimatedValue:estimatedValue,quantity:parseInt(quantity)}
        try{
            const resp = await ProcurementService.createProcurementPlan(procurementPlan);
            
        } catch(error){
            console.log(error)
        }
    }
    return(
        <div className="createProcurementplan">
        <form className="form-style-9" onSubmit={handleSubmit}>
            <div class="cardHeader">
                    <h2>Kreiranje Plana Javne Nabavke</h2>
            </div>

          <ul>
            <li>
              <input type="text" name="productType" value={productType} onChange={(e) => setProductType(e.target.value)} className="field-style field-split align-left" placeholder="Tip Proizvoda" />
              <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="field-style field-split align-right" placeholder="Kolicina" />            </li>
            <li>
              <input type="text" name="estimatedValue" value={estimatedValue}  onChange={(e) => setEstimatedValue(e.target.value)} className="field-style field-full align-none" placeholder="Procenjena Vrednost" />
            </li>

            <li>
              <input type="submit" value="Zavrsi" />
            </li>
          </ul>
        </form>
        </div>

    )
}