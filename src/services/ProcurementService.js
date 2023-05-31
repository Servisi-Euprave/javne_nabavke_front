import axios from "axios";
import interceptor from "./InterceptorService";
const PROCUREMENT_BASE_URL = "http://localhost:8081/api";

class ProcurementService {
    createProcurement(procurement) {
        return interceptor.post('/createProcurement', procurement);
    }
    createProcurementPlan(procurementPlan) {
        return interceptor.post('/createProcurementPlan', procurementPlan);
    }
    getProcurements() {
        return axios.get(PROCUREMENT_BASE_URL + '/getProcurements');
    }
    getProcurementAndOffer(){
        return axios.get(PROCUREMENT_BASE_URL + '/getProcurementAndOfferList');
    }
    createOffer(offer){
        return interceptor.post('/postOffer', offer)
    }

}
export default new ProcurementService()