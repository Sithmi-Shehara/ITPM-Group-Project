import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getIncomeForMonth = async (year, month) => {
  return axios.get(`${API_BASE_URL}/monthly-income/${year}/${month}`);
};

export const addIncome = async (income) => {
  return axios.post(`${API_BASE_URL}/monthly-income/add`, income);
};

export const updateIncome = async (id, income) => {
  return axios.put(`${API_BASE_URL}/monthly-income/update/${id}`, income);
};

export const deleteIncome = async (id) => {
  return axios.delete(`${API_BASE_URL}/monthly-income/delete/${id}`);
};

export const getMonthlyBalance = async (year, month) => {
  return axios.get(`${API_BASE_URL}/monthly-income/balance/${year}/${month}`);
};

export const getYearlyIncome = async (year) => {
  return axios.get(`${API_BASE_URL}/monthly-income/yearly/${year}`);
};
