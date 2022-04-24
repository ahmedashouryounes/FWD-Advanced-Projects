import { ORDER } from './../types/order_type';
import { Request, Response } from 'express';
import { OrderModel } from "./../models/order_model"

const orderModel = new OrderModel();


export const create = async (req: Request, res: Response) => {
    const neworder: Omit<ORDER,"id"> = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    try {
        const order = await orderModel.create(neworder);
        res.send(order);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};


export const getMany = async (_req: Request, res: Response) => {
    try {
        const orders = await orderModel.getmany();
        res.send(orders);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const order = await orderModel.getOne(req.params.id);
        res.send(order);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};


export const update = async (req: Request, res: Response) => {
    const updateOrder: ORDER = {
        id: req.params.id,
        status: req.body.status,
        user_id: req.body.user_id
    };
    try {
        const order = await orderModel.update(updateOrder);
        res.send(order);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const order = await orderModel.remove(req.params.id);
        res.send(order);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};
