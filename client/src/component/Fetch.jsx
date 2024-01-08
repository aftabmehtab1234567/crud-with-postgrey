import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fetch = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateData, setUpdateData] = useState({ email: '', password: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getData');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();

  useEffect(() => {
   
  }, []);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setUpdateData({ email: item.email, password: item.password });
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:5000/updateData/${selectedItem.id}`, updateData);
      fetchData();
      setSelectedItem(null);
      setUpdateData({ email: '', password: '' });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteData/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <h2>Fetched Data</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button onClick={() => handleEditClick(item)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <div>
          <h2>Edit Data</h2>
          <label>Email:</label>
          <input
            type="text"
            value={updateData.email}
            onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
          />
          <label>Password:</label>
          <input
            type="text"
            value={updateData.password}
            onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
          />
          <button onClick={handleUpdateClick}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Fetch;
