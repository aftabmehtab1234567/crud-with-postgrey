// index.mjs
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { client, connectAndQuery } from './Db/Connection.js';

dotenv.config();
connectAndQuery();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply CORS middleware
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define a route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a route to handle form submission
app.post('/adddata', async (req, res) => {
    try {
      await insertData(req.body);
      res.status(200).json({ message: 'Data inserted successfully!' });
    } catch (error) {
      console.error('Error inserting data into PostgreSQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/getData', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM singup ORDER BY Id ASC');
      res.status(200).json({ data: result.rows });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

  
  async function insertData({ username, password }) {
    const result = await client.query('INSERT INTO singup (email, password) VALUES ($1, $2) RETURNING *', [username, password]);
//     console.log('Data inserted successfully:', result.rows[0]);
  }

//   update the data
app.put('/updateData/:id', async (req, res) => {
    const id = req.params.id;
    const { email, password } = req.body;
  
    try {
      const result = await client.query('UPDATE singup SET email = $1, password = $2 WHERE id = $3 RETURNING *', [email, password, id]);
      console.log('Data updated successfully:', result.rows[0]);
      res.json({ message: 'Data updated successfully!' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.delete('/deleteData/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await client.query('DELETE FROM singup WHERE id = $1 RETURNING *', [id]);
      console.log('Data deleted successfully:', result.rows[0]);
      res.json({ message: 'Data deleted successfully!' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
