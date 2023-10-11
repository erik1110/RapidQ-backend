import './database/db.js';
import http from 'node:http';
import express from 'express';
import cors from 'cors';
import consola from 'consola';
import routes from './routes/index.js';

import { socker } from './socker/index.js';
import { handleError, authenticated } from './middleware/index.js';
import { config } from './config.js';

const app = express();
const server = new http.Server(app);
socker(server);

app.use(cors({ origin: config.ALLOWLIST_HOSTS, credentials: true }));
app.use(express.json());

routes(app);

app.use((error, _request, response, _) => {
  handleError(error, response);
});

app.listen(config.API_PORT, () => {
  consola.success(`Api listening on port ${config.API_PORT}!`);
  consola.success(`Swagger docs on http://localhost:${config.API_PORT}/api-docs'`);
});
