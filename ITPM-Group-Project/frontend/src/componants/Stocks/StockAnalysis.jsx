import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import StockService from '../../api/stockService';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate unique colors based on number of categories
const generateColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
    
    for (let i = 0; i < count; i++) {
        const hue = (i * hueStep) % 360;
        colors.push({
            background: `hsla(${hue}, 70%, 60%, 0.7)`,
            border: `hsla(${hue}, 70%, 50%, 1)`
        });
    }
    return colors;
};

const StockAnalysis = () => {
    const [categoryCounts, setCategoryCounts] = useState({});
    const [categoryQuantities, setCategoryQuantities] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryCountsResponse = await StockService.getCategoryCounts();
                const categoryQuantitiesResponse = await StockService.getCategoryQuantities();

                setCategoryCounts(categoryCountsResponse.data);
                setCategoryQuantities(categoryQuantitiesResponse.data);
            } catch (error) {
                console.error('Error fetching category counts:', error);
            }
        };
        fetchData();
    }, []);
    
    // Prepare data for the first pie chart (Category Counts)
    const countsData = {
        labels: Object.keys(categoryCounts),
        datasets: [
            {
                data: Object.values(categoryCounts),
                backgroundColor: generateColors(Object.keys(categoryCounts).length).map(color => color.background),
                borderColor: generateColors(Object.keys(categoryCounts).length).map(color => color.border),
                borderWidth: 1,
            },
        ],
    };

    // Prepare data for the second pie chart (Category Quantities)
    const quantitiesData = {
        labels: Object.keys(categoryQuantities),
        datasets: [
            {
                data: Object.values(categoryQuantities),
                backgroundColor: generateColors(Object.keys(categoryQuantities).length).map(color => color.background),
                borderColor: generateColors(Object.keys(categoryQuantities).length).map(color => color.border),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        }
    };
    
    return (
        <div className="stock-analysis">
            <h1 className="analysis-title">Stock Analysis</h1>
            <div className="charts-container">
                <div className="chart-wrapper">
                    <h2>Number of Items by Category</h2>
                    <div className="chart">
                        <Pie data={countsData} options={options} />
                    </div>
                </div>
                <div className="chart-wrapper">
                    <h2>Total Quantity by Category</h2>
                    <div className="chart">
                        <Pie data={quantitiesData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StockAnalysis;