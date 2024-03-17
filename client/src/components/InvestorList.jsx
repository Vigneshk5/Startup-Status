import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Modal } from "@mui/material";
import axios from "axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function InvestorList() {
  const [investors, setInvestors] = useState([]);
  const [newInvestor, setNewInvestor] = useState({
    name: "",
    amount_invested: 0,
    date: "",
    shares_acquired: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();
  const [investmentsData, setInvestmentsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvestor((prevInvestor) => ({
      ...prevInvestor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/investors`, newInvestor);
      if (res.data.name === "error") {
        alert("This investor already exists");
      } else {
        alert("A new investor has been added");
        fetchData();
      }
    } catch (error) {
      console.error("Error adding investor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/investors/` + id);
      alert("An investor has been deleted");
      fetchData();
    } catch (error) {
      console.error("Error deleting investor:", error);
    }
  };

  const handleOpenModal = (id) => {
    setShowModal(true);
    setActualUpdatingId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/investors`);
      setInvestors(res.data);

      const investments = {};
      res.data.forEach((investor) => {
        if (!investments[investor.date]) {
          investments[investor.date] = investor.amount_invested;
        } else {
          investments[investor.date] += investor.amount_invested;
        }
      });

      const investmentsArray = Object.keys(investments).map((date) => ({
        date,
        amount_invested: investments[date],
      }));

      setInvestmentsData(investmentsArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/investors/` + actualUpdatingId,
        newInvestor
      );
      alert("Investor updated successfully");
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error updating investor:", error);
    }
  };

  return (
    <div className="container mx-auto p-3">
      <h1>Investment</h1>
      <div className="flex justify-center">
        <LineChart
          width={800}
          height={400}
          data={investmentsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 20000]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount_invested" stroke="#8884d8" />
        </LineChart>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Investor Name</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            placeholder="Investor Name"
            value={newInvestor.name}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Amount Invested</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="amount_invested"
            value={newInvestor.amount_invested}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Date</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            value={newInvestor.date}
            onChange={handleChange}
            type="date"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Shares Acquired</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="shares_acquired"
            value={newInvestor.shares_acquired}
            onChange={handleChange}
            type="number"
          />
        </div>

        <Button type="submit">Add Investor</Button>
      </form>

      <div className="flex justify-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell width="20%">Investor Name</TableCell>
              <TableCell width="20%">Amount Invested</TableCell>
              <TableCell width="20%">Date</TableCell>
              <TableCell width="20%">Shares Acquired</TableCell>
              <TableCell width="20%">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investors.map((investor) => (
              <TableRow key={investor.id}>
                <TableCell>{investor.name}</TableCell>
                <TableCell>{investor.amount_invested}</TableCell>
                <TableCell>{investor.date}</TableCell>
                <TableCell>{investor.shares_acquired}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleOpenModal(investor.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(investor.id)}
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
        <Modal open={showModal} onClose={handleCloseModal}>
          <div className="container mx-auto p-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit Investor
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Investor Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  value={newInvestor.name}
                  type="text"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount Invested
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="amount_invested"
                  value={newInvestor.amount_invested}
                  onChange={handleChange}
                  type="number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="date"
                  value={newInvestor.date}
                  onChange={handleChange}
                  type="date"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Shares Acquired
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="shares_acquired"
                  value={newInvestor.shares_acquired}
                  onChange={handleChange}
                  type="number"
                />
              </div>

              <Button type="submit">Update Investor</Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default InvestorList;
