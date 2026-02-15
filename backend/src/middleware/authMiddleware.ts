import { Request, Response, NextFunction } from 'express';
import { firebaseAdminAuth } from '../firebase/firebase-admin';
import type { User } from '../types/types';

export interface AuthRequest extends Request {
    user?: {
        uid: string;
        email: string | undefined;
        provider: string;
    };
    dbUser?: User;
}


export const verifyToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'No token provided. '});
            return;
        }


        const token = authHeader.split(' ')[1];
        const decodedToken = await firebaseAdminAuth.verifyIdToken(token, true);

        /* Adding User Data on the Request Object */
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            provider: decodedToken.firebase.sign_in_provider,
        };

        next();
    } catch (error: any) {
        console.error('Token Verification Failed: ', error);

        if (error?.code === 'auth/id-token-revoked') {
            res.status(401).json({ code: 'TOKEN_REVOKED', message: 'Token is revoked.'});
            return; 
        }

        if (error?.code === 'auth/user-disabled') {
            res.status(401).json({ code: 'USER_DISABLED', message: 'User account is disabled.'});
            return;
        }


        res.status(401).json({ message: 'Invalid Token' });
    }

};


