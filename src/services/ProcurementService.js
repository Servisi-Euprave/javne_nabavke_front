import axios from "axios";
const PROCUREMENT_BASE_URL = "http://localhost:8080/api";

class ProcurementService {
    createProcurement(procurement) {
        return axios.post(PROCUREMENT_BASE_URL + '/createProcurement', procurement);
    }
    createProcurementPlan(procurementPlan) {
        return axios.post(PROCUREMENT_BASE_URL + '/createProcurementPlan', procurementPlan);
    }
    getProcurements() {
        return axios.get(PROCUREMENT_BASE_URL);
    }
}
export default new ProcurementService()