import './CreateProcurement.css'
import ProcurementService from '../services/ProcurementService';
import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
export default function CreateProcurement() {
  const [procurementName, setProcurementName] = useState("");
  const [description, setDescription] = useState("");
  const [procurementPlanId, setProcurementPlanId] = useState("");
  const [plans, setPlans] = useState([]);
  const [endDate, setEndDate] = useState(null)
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await ProcurementService.getProcurementPlans();
      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const procurement = {
      procurement_name: procurementName,
      procurement_plan_id: procurementPlanId,
      end_date: endDate,
      description: description,
    };

    try {
      const resp = await ProcurementService.createProcurement(procurement);
      navigate("/");

    } catch (error) {
      console.log(error.response)
    }
  }
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!procurementName.trim()) {
      errors.procurementName = "Naziv Javne Nabavke je obavezan.";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Opis Javne Nabavke je obavezan.";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };
  return (
    <div className="createProcurement">
      <form className="form-style-9" onSubmit={handleSubmit}>
        <div class="cardHeader">
          <h2>Kreiranje Javne Nabavke</h2>
        </div>
        <ul>
          <li>
            <input type="text" name="procurementName" value={procurementName} onChange={(e) => setProcurementName(e.target.value)} className="field-style field-full align-none" placeholder="Naziv Javne Nabavke" />
            {formErrors.procurementName && (
              <p className="error red-text">{formErrors.procurementName}</p>
            )}
          </li>
          <li>
            <DatePicker selected={endDate} isClearable minDate={new Date()} onChange={date => setEndDate(date)}
            ></DatePicker>
          </li>


          {/*----- OVAJ DEO JE PROBLEM ----- */}
          {/*Drop down bude popunjen podacima ali selecija podatka ne radi, uvek vraca prazan string u resp bodiju*/}
                  {/*Ovo bude rezultat
                  {
                      "procurement_name": "name",
                      "procurement_plan_id":"",
                      "description": "opis",
                      "end_date": "2023-05-31T00:00:00Z"
                  }*/}
          <li className="dropdown">
            <label htmlFor="plan" className="plan">
              Odaberite Plan Javne Nabavke:
            </label>
            <select
              name="plan"
              id="dropdown"
              value={procurementPlanId}
              onChange={(e) => setProcurementPlanId(e.target.value)}>
              {plans.map((plan) => (
                <option key={plan.procurement_plan_id} value={plan.procurement_plan_id}>
                  {/*ovde ispisuje proc_plan_id u listi povuce kako trb*/}
                  {plan.procurement_plan_id}
                </option>
              ))}
            </select>
          </li>
          {/*----- OVAJ DEO JE PROBLEM ----- */}

          <li>
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="field-style" placeholder="Opis Javne Nabavke"></textarea>
            {formErrors.description && (
              <p className="error red-text">{formErrors.description}</p>)}
          </li>
          <li>
            <input type="submit" value="Zavrsi" />
          </li>
        </ul>
      </form>
    </div>
  );
}