import dotenv from 'dotenv';
dotenv.config();

import './db/pool';
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


/* Just runs the server, loads .env, runs server on PORT */
