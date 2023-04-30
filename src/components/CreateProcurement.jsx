import './CreateProcurement.css'
import ProcurementService from '../services/ProcurementService';
import { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
export default function CreateProcurement() {
  const[procurementName, setProcurementName] = useState("");
  const[description, setDescription] = useState("");
  const[procurementPlanId, setProcurementPlanId] = useState("");
  const[endDate, setEndDate] = useState(null)
  
  const navigate = useNavigate();  
  const handleSubmit = async (e) =>{
      e.preventDefault();    
      setProcurementPlanId("didi")
      const procurement = { procurement_name:procurementName, procurement_plan_id:procurementPlanId, end_date:endDate, description:description}
      try{
          const resp = await ProcurementService.createProcurement(procurement);
          navigate("/");
          
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
              <DatePicker selected={endDate} isClearable minDate={new Date()} onChange={date => setEndDate(date)}
              ></DatePicker>
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