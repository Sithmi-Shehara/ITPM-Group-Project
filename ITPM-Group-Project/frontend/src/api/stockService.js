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

    static async getStocks(substr) {
        const response = await axios.get(`${this.BASE_URL}/find/all?substr=${substr}`, {
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