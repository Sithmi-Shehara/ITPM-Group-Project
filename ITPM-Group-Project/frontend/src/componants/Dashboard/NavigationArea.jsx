import React from "react";
import { Routes, Route } from "react-router-dom";

import AddExpenses from "../Expenses/AddExpenses";
import ViewExpenses from "../Expenses/ViewExpenses";
import ShoppingListPage from "../ShoppingList/ShoppingListPage";
import ExpensesMainPage from "../Expenses/ExpensesMainPage";
import IncomeMainPage from "../ExpensesTrack/IncomeMainPage";

function NavigationArea() {
  return (
    <React.Fragment>
      <section>
        <Routes>
          <Route path="/expenses" element={<ExpensesMainPage />} />
          <Route path="/shoppinglist" element={<ShoppingListPage />} />
          <Route path="/expensestrack" element={<IncomeMainPage />} />
        </Routes>
      </section>
    </React.Fragment>
  );
}

export default NavigationArea;
