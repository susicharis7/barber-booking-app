import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

type RawServiceAccount = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

const normalizeServiceAccount = (raw: RawServiceAccount) => {
  const projectId = raw.project_id;
  const clientEmail = raw.client_email;
  const privateKey = raw.private_key?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Invalid Firebase service account JSON. Required: project_id, client_email, private_key'
    );
  }

  return { projectId, clientEmail, privateKey };
};

const readFromPath = (rawPath: string): RawServiceAccount => {
  const serviceAccountPath = path.resolve(process.cwd(), rawPath);
  return JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8')) as RawServiceAccount;
};

const readServiceAccount = () => {
  // Default for deploy 
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const fromEnv = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) as RawServiceAccount;
    return normalizeServiceAccount(fromEnv);
  }

  // Default for local 
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const fromFile = readFromPath(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    return normalizeServiceAccount(fromFile);
  }

  throw new Error(
    'Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON'
  );
};

const serviceAccount = readServiceAccount();

const app: App =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

export const firebaseAdminAuth = getAuth(app);
