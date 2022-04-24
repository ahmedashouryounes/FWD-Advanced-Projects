import { USER } from './../types/user_type';
import { Request, Response } from 'express';
import { UserModel } from "./../models/user_model"

const userModel = new UserModel();



export const getMany = async (_req: Request, res: Response) => {
    try {
        const users = await userModel.getMany();
        res.send(users);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const user = await userModel.getOne(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};


export const update = async (req: Request, res: Response) => {
    const updateUser: USER = {
        id: req.params.id,
        username: req.body.username,
        password: req.body.password
    };
    try {
        const user = await userModel.update(updateUser);
        res.send(user);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const user = await userModel.remove(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};
