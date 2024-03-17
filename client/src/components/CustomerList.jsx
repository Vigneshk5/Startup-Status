import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Modal } from "@mui/material";
import axios from "axios";
import { Table, TableBody, TableHeader, TableRow, TableCell } from "./ui/table";
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

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    type: "",
    age: 0,
    acquiringCost: 0,
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    updateId: newCustomer.updateId,
    updateType: newCustomer.type,
    updateAge: newCustomer.age,
    updateAcquiringCost: newCustomer.acquiringCost,
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();

  useEffect(() => {
    const getCustomers = async () => {
      const res = await axios.get(`http://localhost:4000/customers`);
      setCustomers(res.data);
    };
    getCustomers();
  }, []);

  const handleChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateCustomer({
      ...updateCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:4000/customers`, newCustomer);
    if (res.data.description === "error") alert("This customer already exists");
    else {
      alert("A new customer has been created");
      const res = await axios.get(`http://localhost:4000/customers`);
      setCustomers(res.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:4000/customers/` + actualUpdatingId, {
      id: updateCustomer.updateId,
      type: updateCustomer.updateType,
      age: updateCustomer.updateAge,
      acquiringCost: updateCustomer.updateAcquiringCost,
    });
    if (res.data.description === "error") alert("This customer already exists");
    else {
      alert("A customer has been updated");
      const res = await axios.get(`http://localhost:4000/customers`);
      setCustomers(res.data);
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
    await axios.delete(`http://localhost:4000/customers/` + id);
    alert("A customer has been deleted");
    const res = await axios.get(`http://localhost:4000/customers`);
    setCustomers(res.data);
  };

  return (
    <div className="container mx-auto p-3">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={customers}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="age" fill="#8884d8" />
            <Bar dataKey="acquiringCost" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Type</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="type"
            placeholder="type"
            value={newCustomer.type}
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Age</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="age"
            value={newCustomer.age}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Acquiring Cost</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="acquiringCost"
            value={newCustomer.acquiringCost}
            onChange={handleChange}
            type="number"
          />
        </div>

        <Button type="submit">Add Customer</Button>
      </form>

      <div className="flex justify-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Acquiring Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.type}</TableCell>
                <TableCell>{customer.age}</TableCell>
                <TableCell>{customer.acquiring_cost}</TableCell>
                <TableCell>
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleOpenModal(customer.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </Button>
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
              Edit Customer
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Type
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="updateType"
                  value={updateCustomer.updateType}
                  type="text"
                  onChange={handleChangeOnUpdating}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Age
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="updateAge"
                  value={updateCustomer.updateAge}
                  onChange={handleChangeOnUpdating}
                  type="number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Acquiring Cost
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="updateAcquiringCost"
                  value={updateCustomer.updateAcquiringCost}
                  onChange={handleChangeOnUpdating}
                  type="number"
                />
              </div>

              <Button type="submit">Update Customer</Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CustomerList;
