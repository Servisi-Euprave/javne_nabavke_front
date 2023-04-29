import './CreateProcurement.css'
import ProcurementService from '../services/ProcurementService';
import { useState } from 'react'


export default function CreateProcurement() {
  const[procurementName, setProcurementName] = useState("");
  const[endDate, setEndDate] = useState("");
  const[description, setDescription] = useState("");
  const[procurementPlanId, setProcurementPlanId] = useState("");

  const handleSubmit = async (e) =>{
      e.preventDefault();    
      setProcurementPlanId("didi")
      const procurement = { procurementName:procurementName, procurementPlanId:procurementPlanId, endDate:endDate, description:description}
      try{
          const resp = await ProcurementService.createProcurement(procurement);
          
      } catch(error){
          console.log(error.response)
      }
  }
    return (
      <div className="createProcurement">
        <form className="form-style-9" onSubmit={handleSubmit}>
            <div class="cardHeader">
                    <h2>Kreiranje Javne Nabavke</h2>
            </div>

          <ul>
            <li>
            <input type="text" name="procurementName" value={procurementName} onChange={(e) => setProcurementName(e.target.value)} className="field-style field-full align-none" placeholder="Naziv Javne Nabavke" />
            </li>
            <li>
              <input type="text" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="field-style field-full align-none" placeholder="Zavrsetak javne nabavke" />
            </li>
            <li class="dropdown">
            <label for="plan" class="plan">Odaberite Plan Javne Nabavke:</label>
            <select name="plan" id="language">
            <option value="Voce">Voce</option>
            <option value="Povrce">Povrce</option>
            <option value="Motor" disabled>Motor</option>
            <option value="Stampac" selected>Stampac</option>
            </select>
            </li>


            <li>
              <textarea name="description"  value={description} onChange={(e) => setDescription(e.target.value)} className="field-style" placeholder="Opis Javne Nabavke"></textarea>
            </li>
            <li>
              <input type="submit" value="Zavrsi" />
            </li>
          </ul>
        </form>
      </div>
    );
  }