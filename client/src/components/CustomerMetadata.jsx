import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Modal } from "@mui/material";
import axios from "axios";
import { Table, TableBody, TableHeader, TableRow, TableCell } from "./ui/table";

function CustomerMetadata() {
  const [metadata, setMetadata] = useState([]);
  const [newMetadata, setNewMetadata] = useState({
    customer_id: "",
    meta_key: "",
    meta_value: "",
  });
  const [updateMetadata, setUpdateMetadata] = useState({
    customer_id: "",
    meta_key: "",
    meta_value: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/customer-metadata`);
        setMetadata(res.data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };
    fetchMetadata();
  }, []);

  const handleChange = (e) => {
    setNewMetadata({
      ...newMetadata,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateMetadata({
      ...updateMetadata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4000/customer-metadata`,
        newMetadata
      );
      alert("New metadata added successfully");
      const updatedMetadata = await axios.get(
        `http://localhost:4000/customer-metadata`
      );
      setMetadata(updatedMetadata.data);
    } catch (error) {
      console.error("Error adding metadata:", error);
      alert("Error adding metadata");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/customer-metadata/` + actualUpdatingId,
        updateMetadata
      );
      alert("Metadata updated successfully");
      const updatedMetadata = await axios.get(
        `http://localhost:4000/customer-metadata`
      );
      setMetadata(updatedMetadata.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating metadata:", error);
      alert("Error updating metadata");
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
    try {
      await axios.delete(`http://localhost:4000/customer-metadata/` + id);
      alert("Metadata deleted successfully");
      const updatedMetadata = await axios.get(
        `http://localhost:4000/customer-metadata`
      );
      setMetadata(updatedMetadata.data);
    } catch (error) {
      console.error("Error deleting metadata:", error);
      alert("Error deleting metadata");
    }
  };

  return (
    <div className="container mx-auto p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Customer ID</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            name="customer_id"
            placeholder="Customer ID"
            value={newMetadata.customer_id}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Meta Key</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            name="meta_key"
            placeholder="Meta Key"
            value={newMetadata.meta_key}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Meta Value</label>
          <input
            className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            name="meta_value"
            placeholder="Meta Value"
            value={newMetadata.meta_value}
            type="text"
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Add Metadata</Button>
      </form>

      <div className="flex justify-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Meta Key</TableCell>
              <TableCell>Meta Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metadata.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.customer_id}</TableCell>
                <TableCell>{item.meta_key}</TableCell>
                <TableCell>{item.meta_value}</TableCell>
                <TableCell>
                  <Button
                    className="bg-blue-500 m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleOpenModal(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(item.id)}
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
              Edit Metadata
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Customer ID</label>
                <input
                  className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="customer_id"
                  value={updateMetadata.customer_id}
                  type="text"
                  onChange={handleChangeOnUpdating}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Meta Key</label>
                <input
                  className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="meta_key"
                  value={updateMetadata.meta_key}
                  onChange={handleChangeOnUpdating}
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Meta Value</label>
                <input
                  className="bg-black text-white border-2 border-gray-500 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="meta_value"
                  value={updateMetadata.meta_value}
                  onChange={handleChangeOnUpdating}
                  type="text"
                />
              </div>
              <Button type="submit">Update Metadata</Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CustomerMetadata;
