import axios from "axios";
import config from "../config";
export default class StockCategoryService {

    static BASE_URL = config.API_URL + "/api/category";


    /**  Stock Category API */

    static async addCategory(categoryData) {
        const response = await axios.post(`${this.BASE_URL}/add`, categoryData, {
            "Content-Type": "application/json"
        })
        return response;
    }

    static async getAllCategories() {
        const response = await axios.get(`${this.BASE_URL}/find/all`, {
            "Content-Type": "application/json"
        });
        return response;
    }


    static async findCategoryById(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/find/${categoryId}`, {
            "Content-Type": "application/json"
        });
        return response;
    }

    static async updateCategory(categoryId, categoryData) {
        const response = await axios.put(`${this.BASE_URL}/update/${categoryId}`, categoryData, {
            "Content-Type": "application/json"
        });
        return response;
    }

    static async deleteCategoryById(categoryId) {
        const response = await axios.delete(`${this.BASE_URL}/delete/${categoryId}`, {
            "Content-Type": "application/json"  
        });
        return response;
    }
}