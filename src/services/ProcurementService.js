import axios from "axios";
const PROCUREMENT_BASE_URL = "http://localhost:8081/api";

class ProcurementService {
    createProcurement(procurement) {
        return axios.post(PROCUREMENT_BASE_URL + '/createProcurement', procurement);
    }
    createProcurementPlan(procurementPlan) {
        return axios.post(PROCUREMENT_BASE_URL + '/createProcurementPlan', procurementPlan);
    }
    getProcurements() {
        return axios.get(PROCUREMENT_BASE_URL + '/getProcurements');
    }
}
export default new ProcurementService()