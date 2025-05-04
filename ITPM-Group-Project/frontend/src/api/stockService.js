import axios from "axios";
import config from "../config";
export default class StockService {

    static BASE_URL = config.API_URL + "/api/stocks";


    /**  Stock Category API */

    static async addStock(stockData) {
        const response = await axios.post(`${this.BASE_URL}/add`, stockData, {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response;
    }

    static async getStocksByFilter(filter) {
        const response = await axios.post(`${this.BASE_URL}/find/filter`, filter, {
            "Content-Type": "application/json"
        });
        return response;
    }

    static async getStocks() {
        const response = await axios.get(`${this.BASE_URL}/find/all`, {
            "Content-Type": "application/json"
        });
        return response;
    }

    static async generateReport(availability, config = {}) {
        const response = await axios.get(`${this.BASE_URL}/generate/report/${availability}`, {
            ...config,
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });
        return response;
    }

    static async getCategoryCounts() {
        const response = await axios.get(`${this.BASE_URL}/category/counts`, {
            "Content-Type": "application/json"
        });
        return response;
    }

    static async getCategoryQuantities() {
        const response = await axios.get(`${this.BASE_URL}/category/quantities`, {
            "Content-Type": "application/json"
        });
        return response;
    }

    static async findStockById(stockId) {
        const response = await axios.get(`${this.BASE_URL}/find/${stockId}`, {
            "Content-Type": "application/json"
        });
        return response;
    }

    static async updateStock(stockId, stockData) {
        const response = await axios.put(`${this.BASE_URL}/update/${stockId}`, stockData, {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response;
    }

    static async deleteStockById(stockId) {
        const response = await axios.delete(`${this.BASE_URL}/delete/${stockId}`, {
            "Content-Type": "application/json"
        });
        return response;
    }
}