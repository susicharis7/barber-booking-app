import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";

const serviceAccountPath = path.resolve(
  __dirname,
  "firebase-service-account.json"
);

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

const app: App =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

export const firebaseAdminAuth = getAuth(app);
