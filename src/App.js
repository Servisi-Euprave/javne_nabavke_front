import './App.css';
import {Route, Routes} from "react-router-dom"
import TokenReciever from './pages/tokenReciever';
import CreateProcurement from './components/CreateProcurement';
import RightBar from './components/RightBar';
import Procurements from './components/Procurements';
import CreateProcurementPlan from './components/CreateProcPlan';
import Results from './components/Results';
import CreateOffer from './components/CreateOffer';
import CompanyProcurements from  './components/CompanyProcurements';


function App() {

  return (
    <>
    <div className="homeContainer">
    <RightBar/>
      
    <Routes>
        <Route path='/' element={<Procurements/>}/>
        <Route path='/results' element={<Results/>}/>
        <Route path="/createProcurement" element={<CreateProcurement/>}/>
        <Route path="/createProcPlan" element={<CreateProcurementPlan/>}/>
        <Route path="/tokenReciever" element={<TokenReciever/>}/>
        <Route path="/createOffer/:id" element={<CreateOffer/>}/>
        <Route path="/tokenReciever" element={<TokenReciever/>}/>
        <Route path="/companyProc" element={<CompanyProcurements/>}/>


    </Routes>
    </div>
    <footer className="homeFooter">
        <p>Author: Bukvic Milica</p>
        <br></br>
    </footer>
  
    </>

  ) 
}
export default App;
