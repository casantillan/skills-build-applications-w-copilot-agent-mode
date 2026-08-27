import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});

void connectDatabase();
