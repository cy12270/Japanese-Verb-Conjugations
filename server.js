// server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.static('.')); // Serve your static HTML file

app.get('/api/search', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const jishoUrl = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`;
    const response = await fetch(jishoUrl);
    const data = await response.json();

    // This is the important part for your frontend
    // It tells the browser that your HTML file is allowed to read this response
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Jisho API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});