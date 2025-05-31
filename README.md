# HomeStock

## Introduction

HomeStock is a web application designed to help users efficiently manage their household grocery inventory and expenses. Our system allows users to track grocery stock, set budget limits, and monitor expenses. Users can also generate and manage shopping lists and receive alerts before items expire.

## Features

*   **Inventory Management**: Track your household groceries, including quantities and expiration dates.
*   **Budget Tracking**: Set budget limits for your grocery spending and monitor your expenses.
*   **Shopping Lists**: Generate and manage shopping lists based on your inventory and needs.
*   **Expiration Alerts**: Receive notifications for items nearing their expiration date to reduce waste.
*   **Smart Pantry Forecasting**: Analyzes stock usage trends to predict when items will run low. This feature is developed using Python in Jupyter Notebook and is currently not integrated into the Spring Boot backend but can be executed separately for stock analysis.
*   **Secure Authentication**: Role-based user authentication ensures personalized and protected access for each user.

## Technologies Used

### Frontend
*   React 19
*   Vite
*   Tailwind CSS
*   Material-UI (MUI)
*   React Router
*   Axios
*   Chart.js
*   Recharts

### Backend (Separate Repository)
*   Spring Boot

### Forecasting (Separate Execution)
*   Python
*   Jupyter Notebook

## Prerequisites

### Frontend
*   Node.js (latest LTS version recommended)
*   npm or yarn

### Backend & Forecasting
*   The backend and forecasting components are managed in separate repositories/environments and have their own prerequisites. Please refer to their respective documentation for details.

## Installation and Setup

### Frontend
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/homestock.git
    ```
2.  **Navigate to the frontend directory:**
    ```bash
    cd homestock/frontend
    ```
3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
4.  **Run the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if specified by Vite).

### Backend & Forecasting
*   Installation and setup for the backend (Spring Boot) and forecasting (Python/Jupyter Notebook) components are separate. Please refer to their respective documentation.

## Usage

Once the frontend application is running, you can access it through your web browser. Users can register for an account or log in if they already have one. After logging in, users can:
*   Add items to their pantry, specifying quantity, purchase date, and expiration date.
*   View their current inventory and see items sorted by expiration date.
*   Create and manage shopping lists.
*   Set a monthly or weekly budget for groceries.
*   Track expenses as they add purchased items.
*   View charts and reports on their spending habits and inventory usage.

## Project Structure

*   **`frontend/`**: Contains the React-based frontend application.
    *   **`src/`**: Main source code for the frontend application.
        *   **`components/`**: Reusable UI components.
        *   **`pages/`**: Top-level page components.
        *   **`App.jsx`**: Main application component.
        *   **`main.jsx`**: Entry point for the React application.
    *   **`public/`**: Static assets.
*   **Backend**: The Spring Boot backend is located in a separate repository.
*   **Forecasting**: The Python scripts and Jupyter Notebooks for forecasting are also managed separately.

## Contributing

We welcome contributions to HomeStock! If you'd like to contribute, please follow these guidelines:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Make your changes.** Ensure your code adheres to the project's coding standards (ESLint will help enforce this for the frontend).
4.  **Commit your changes** with a clear and descriptive commit message.
5.  **Push your changes** to your forked repository.
6.  **Create a Pull Request (PR)** to the `main` branch of the original repository. Please provide a detailed description of your changes in the PR.

We use ESLint for linting the frontend code. Please ensure your contributions pass linting checks.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (if one exists, otherwise assume MIT License).

## Contact/Support

For issues, questions, or support, please open a GitHub issue in the repository.
