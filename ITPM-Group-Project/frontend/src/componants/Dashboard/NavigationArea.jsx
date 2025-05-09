import React from "react";
import { Routes, Route } from "react-router-dom";

import AddExpenses from "../Expenses/AddExpenses";
import ViewExpenses from "../Expenses/ViewExpenses";
import ShoppingListPage from "../ShoppingList/ShoppingListPage";
import ExpensesMainPage from "../Expenses/ExpensesMainPage";
import IncomeMainPage from "../ExpensesTrack/IncomeMainPage";
import StockViewPage from "../Stocks/StockView";
import CategoryPage from "../Stocks/CategoryPage";
import AddEditStockPage from "../Stocks/AddEditStockPage";
import StockAnalysis from "../Stocks/StockAnalysis";
import BudgetTrack from "../../pages/BudgetTrack";
function NavigationArea() {
  return (
    <React.Fragment>
      <section>
        <Routes>
          <Route path="/shoppinglist" element={<ShoppingListPage />} />
          <Route path="/stocks" element={<StockViewPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/add-stock" element={<AddEditStockPage />} />
          <Route path="/edit-stock/:stockId" element={<AddEditStockPage/>}/>
          <Route path="/stock-analysis" element={<StockAnalysis />} />
          <Route path="/budgets/*" element={<BudgetTrack />} />
        </Routes>
      </section>
    </React.Fragment>
  );
}

export default NavigationArea;