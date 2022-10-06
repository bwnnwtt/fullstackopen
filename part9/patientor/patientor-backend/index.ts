import express from 'express';
import cors from 'cors';
const app = express();


const PORT = 3001;
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors<cors.CorsRequest>(options));
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});