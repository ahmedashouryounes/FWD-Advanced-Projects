import { USER } from './../types/user_type';
import { Request, Response } from 'express';
import { AuthModel } from '../models/auth_model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const token_secure = process.env.TOKEN_SECURE as string;

const authModel = new AuthModel();

export const signup = async (req: Request, res: Response) => {
    const user : Omit<USER,"id">= {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const u = await authModel.create(user);
        const token = jwt.sign(user, token_secure);
        res.send({ ...u, token });
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};

export const signin = async (req: Request, res: Response) => {
    const user : Omit<USER,"id">= {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const u = await authModel.authenticate(user);
        if (u != null) {
            const token = jwt.sign(user, token_secure);
            res.status(200).send({ ...u, token });
        } else {
            throw new Error('wrrong username or password');
        }
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};