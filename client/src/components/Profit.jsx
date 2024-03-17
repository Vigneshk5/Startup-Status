import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Modal } from "@mui/material";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function Profit() {
  const [profits, setProfits] = useState([]);
  const [newProfit, setNewProfit] = useState({
    id: "",
    description: "",
    amount: 0,
    date: "",
  });
  const [updateProfit, setUpdateProfit] = useState({
    updateId: newProfit.updateId,
    updateDescription: newProfit.description,
    updateAmount: newProfit.amount,
    updateDate: newProfit.date,
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();

  useEffect(() => {
    const getProfits = async () => {
      const res = await axios.get(`http://localhost:4000/profits`);
      setProfits(res.data);
    };
    getProfits();
  }, []);

  const handleChange = (e) => {
    setNewProfit({
      ...newProfit,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateProfit({
      ...updateProfit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:4000/profits`, newProfit);
    if (res.data.description === "error") alert("This profit entry already exists");
    else {
      alert("A new profit entry has been created");
      const res = await axios.get(`http://localhost:4000/profits`);
      setProfits(res.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:4000/profits/` + actualUpdatingId, {
      id: updateProfit.updateId,
      description: updateProfit.updateDescription,
      amount: updateProfit.updateAmount,
      date: updateProfit.updateDate,
    });
    if (res.data.description === "error") alert("This profit entry already exists");
    else {
      alert("A profit entry has been updated");
      const res = await axios.get(`http://localhost:4000/profits`);
      setProfits(res.data);
      handleCloseModal();
    }
  };

  const handleOpenModal = (id) => {
    setShowModal(true);
    setActualUpdatingId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:4000/profits/` + id);
    alert("A profit entry has been deleted");
    const res = await axios.get(`http://localhost:4000/profits`);
    setProfits(res.data);
  };

  return (
    <div className="container mx-auto p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2"> Description</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={newProfit.description}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Amount</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="amount"
            value={newProfit.amount}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Date</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            value={newProfit.date}
            onChange={handleChange}
            type="date"
          />
        </div>

        <Button type="submit">Add Profit</Button>
      </form>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={profits} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis domain={[0, 5000]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#67a2e6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell width="20%">Profit ID</TableCell>
              <TableCell width="30%">Description</TableCell>
              <TableCell width="15%">Amount</TableCell>
              <TableCell width="15%">Date</TableCell>
              <TableCell width="20%">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profits.map((profit) => (
              <TableRow key={profit.id}>
                <TableCell>{profit.id}</TableCell>
                <TableCell>{profit.description}</TableCell>
                <TableCell>{profit.amount}</TableCell>
                <TableCell>{profit.date}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleOpenModal(profit.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(profit.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showModal && (
        <Modal open={showModal} handleCloseModal={handleCloseModal}>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit Profit Entry
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profit Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="updateDescription"
                  value={updateProfit.updateDescription}
                  type="text"
                  onChange={handleChangeOnUpdating}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="updateAmount"
                  value={updateProfit.updateAmount}
                  onChange={handleChangeOnUpdating}
                  type="number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="updateDate"
                  value={updateProfit.updateDate}
                  onChange={handleChangeOnUpdating}
                  type="date"
                />
              </div>

              <Button type="submit">Update Profit Entry</Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Profit;
