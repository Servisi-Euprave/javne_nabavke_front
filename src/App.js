import './App.css';
import {Route, Routes} from "react-router-dom"
import TokenReciever from './pages/tokenReciever';
import CreateProcurement from './components/CreateProcurement';
import RightBar from './components/RightBar';
import Procurements from './components/Procurements';
import CreateProcurementPlan from './components/CreateProcPlan';
import Results from './components/Results';


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
        <Route path="/tokenReciever/:token" element={<TokenReciever/>}/>
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
