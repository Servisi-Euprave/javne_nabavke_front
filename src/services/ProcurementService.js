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
    getProcurementAndOffer() {
        return axios.get(PROCUREMENT_BASE_URL + '/getProcurementAndOfferList');
    }
    createOffer(offer) {
        return interceptor.post('/postOffer', offer)
    }
    getProcurementPlans() {
        return interceptor.get('/getProcurementPlans');
    }
    getCompanyProcurements() {
        return interceptor.get('/getCompProcurements');
    }
    getProcurementOffers(id) {
        return interceptor.get(`/getProcurementOffers/${id}`);
    }
    declareWinner(id) {
        return interceptor.put(`/declareWinner/${id}`);
    }

}
export default new ProcurementService()