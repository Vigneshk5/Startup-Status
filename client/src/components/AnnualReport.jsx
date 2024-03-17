import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip as PieTooltip,
  Legend as PieLegend,
} from "recharts";

function AnnualReport() {
  const [expenses, setExpenses] = useState([]);
  const [profits, setProfits] = useState([]);
  const [ebitdaPercentage, setEbitdaPercentage] = useState(2);
  useEffect(() => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });

    axios
      .get("http://localhost:4000/profits")
      .then((response) => {
        setProfits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profits:", error);
      });
  }, []);

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const calculateTotalProfits = () => {
    return profits.reduce((total, profit) => total + parseFloat(profit.amount), 0);
  };

  const calculateTotalRevenue = () => {
    return calculateTotalExpenses() + calculateTotalProfits();
  };

  const calculateEbitda = () => {
    return calculateTotalRevenue() * (ebitdaPercentage / 100);
  };

  const calculateTotalLoss = () => {
    return calculateTotalExpenses() - calculateEbitda();
  };

  const combinedData = expenses.map((expense, index) => {
    return {
      date: expense.date,
      expenses: parseFloat(expense.amount),
      profits: parseFloat(profits[index].amount),
      netLoss: parseFloat(profits[index].amount) - parseFloat(expense.amount),
    };
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Annual Financial Report</h1>
      <div className=" rounded-lg p-6 mb-3">
        <h2 className="text-xl font-bold mb-3">Financial Overview</h2>
        <h3 className="font-semibold">Total Expenses: {calculateTotalExpenses()} </h3>
        <h3 className="font-semibold">Total Profits: {calculateTotalProfits()}</h3>
        <h3 className="font-semibold">Total Revenue: {calculateTotalRevenue()}</h3>
        <div className="mt-4">
          <label htmlFor="ebitdaPercentage" className="block  font-semibold">
            Enter EBITDA Percentage:
          </label>
          <input
            type="number"
            id="ebitdaPercentage"
            value={ebitdaPercentage}
            onChange={(e) => setEbitdaPercentage(e.target.value)}
            className="bg-black text-white border-2 border-gray-500 mt-1 block w-full  rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 "
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={combinedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#8884d8" />
          <Line type="monotone" dataKey="profits" name="Profits" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={combinedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="profits" name="Profits" stroke="#82ca9d" />
          <Line type="monotone" dataKey="netLoss" name="Net Loss" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={[
              {
                name: "Total Revenue",
                value: calculateTotalRevenue(),
                fill: "#8884d8",
              },
              { name: "EBITDA", value: calculateEbitda(), fill: "#ffc658" },
              { name: "Total Loss", value: calculateTotalLoss(), fill: "#ff7300" },
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          />
          <PieTooltip />
          <PieLegend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnnualReport;
