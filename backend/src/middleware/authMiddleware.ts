import { Request, Response, NextFunction } from 'express';
import { firebaseAdminAuth } from '../firebase/firebase-admin';

export interface AuthRequest extends Request {
    user?: {
        uid: string;
        email: string | undefined;
        provider: string;
    };
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
        const decodedToken = await firebaseAdminAuth.verifyIdToken(token);

        /* Adding User Data on the Request Object */
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            provider: decodedToken.firebase.sign_in_provider,
        };

        next();
    } catch (error) {
        console.error('Token Verification Failed: ', error);
        res.status(401).json({ message: 'Invalid Token' });
    }

};


