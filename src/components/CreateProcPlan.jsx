import { useState } from 'react'
import ProcurementService from '../services/ProcurementService';
import './CreateProcPlan.css'
import { useNavigate } from 'react-router-dom';
export default function CreateProcurementPlan() {
  const [productType, setProductType] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [formErrors, setFormErrors] = useState({})


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const procurementPlan = { product_type: productType, estimated_value: estimatedValue, quantity: quantity }
    try {
      const resp = await ProcurementService.createProcurementPlan(procurementPlan);
      navigate("/");

    } catch (error) {
      console.log(error)
    }
  }
  const validateForm = () => {
    const errors = {}
    let isValid = true;
    if (!productType.trim()) {
      errors.productType = "Tip proizvoda je obavezan";
      isValid = false;
    }
    if (!estimatedValue.trim()) {
      errors.estimatedValue = "Procenjena vrednost je obavezna";
      isValid = false;
    }
    if (!quantity.trim()) {
      errors.quantity = "Količina je obavezna";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  }
  return (
    <div className="createProcurementplan">
      <form className="form-style-9" onSubmit={handleSubmit}>
        <div class="cardHeader">
          <h2>Kreiranje Plana Javne Nabavke</h2>
        </div>

        <ul>
          <li>
            <input type="text" name="productType" value={productType} onChange={(e) => setProductType(e.target.value)} className="field-style field-split align-left" placeholder="Tip Proizvoda" />
            <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="field-style field-split align-right" placeholder="Količina" />
            {formErrors.productType && (
              <p className="error red-text">{formErrors.productType}</p>
            )}
            {formErrors.quantity && (
              <p className="error red-text">{formErrors.quantity}</p>
            )}
          </li>
          <li>
            <input type="text" name="estimatedValue" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} className="field-style field-full align-none" placeholder="Procenjena Vrednost" />
            {formErrors.estimatedValue && (
              <p className="error red-text">{formErrors.estimatedValue}</p>
            )}
          </li>

          <li>
            <input type="submit" value="Zavrsi" />
          </li>
        </ul>
      </form>
    </div>

  )
}