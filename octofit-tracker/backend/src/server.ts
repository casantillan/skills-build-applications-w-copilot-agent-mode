import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();
const port = Number(process.env.PORT || 8080);
const frontendOrigin = process.env.FRONTEND_URL || (process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`
  : 'http://localhost:5173');
const allowedOrigins = new Set([frontendOrigin, 'http://localhost:5173']);
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8080.app.github.dev`
  : 'http://localhost:8080';

app.use(express.json());
app.use((request, response, next) => {
  const requestOrigin = request.header('Origin');
  if (requestOrigin && allowedOrigins.has(requestOrigin)) {
    response.header('Access-Control-Allow-Origin', requestOrigin);
  }
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
  console.log(`API base URL: ${apiBaseUrl}`);
});

void connectDatabase();
