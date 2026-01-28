import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import './db/pool'; 

import { firebaseAdminAuth } from './firebase/firebase-admin';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});




app.get("/auth/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await firebaseAdminAuth.verifyIdToken(token);

    return res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      provider: decodedToken.firebase.sign_in_provider,
    });
  } catch (error) {
    console.error("VERIFY TOKEN ERROR:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
