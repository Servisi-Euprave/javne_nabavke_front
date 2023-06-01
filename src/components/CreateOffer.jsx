import { useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import './CreateOffer.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function CreateOffer(){
    const[price, setPrice] = useState("");
    const[termAndPayment, setTermAndPayment] = useState("");
    const[quantity, setQuantity] = useState("");
    const [currency, setCurrency] = useState("RSD");
    let { id } = useParams();    
    const navigate = useNavigate(); 

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();    
        const value = parseInt(price)
        const offer = { price:`${currency} ${value}`,procurement_id: id, term_and_payment:termAndPayment,quantity:parseInt(quantity)}
        try{
            const resp = await ProcurementService.createOffer(offer);
            navigate("/");

        } catch(error){
            console.log(error)
        }
    }
    return(
        <div className="createOffer">
        <form className="form-style-9" onSubmit={handleSubmit}>
            <div class="cardHeader">
                    <h2>Kreiranje Ponude</h2>
            </div>

          <ul>
            <li>
              <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="field-style field-split align-left" placeholder="Cena za koju nudite proizvod" />
              <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="field-style field-split align-right" placeholder="Količina" />            </li>
            <li>
            <select value={currency} onChange={handleCurrencyChange}>
              <option value="USD">RSD</option>
              <option value="EUR">EUR</option>
            </select>
              <input type="text" name="termAndPayment" value={termAndPayment}  onChange={(e) => setTermAndPayment(e.target.value)} className="field-style field-full align-none" placeholder="Rok i Način plaćanja" />
            </li>

            <li>
              <input type="submit" value="Završi" />
            </li>
          </ul>
        </form>
        </div>

    )
}