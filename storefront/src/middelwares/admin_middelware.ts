import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

const token_secure = process.env.TOKEN_SECURE as string;

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, token_secure);
        // if (decoded.role == "admin") {
        //     next();
        // }
    } catch (err) {
        res.status(401);
        res.json('Invalid Token');
        return;
    }
};
export default adminAuth;
