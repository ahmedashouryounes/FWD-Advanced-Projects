import { Order_ProductsModel } from './../models/order_products_model';
import { Request, Response } from 'express';
import { ORDER_PRODUCTS } from '../types/order_products_type';

const order_ProductsModel = new Order_ProductsModel();

export const create = async (req: Request, res: Response) => {
    try {
        const { quantity, order_id, product_id } = req.body;
        const results = await order_ProductsModel.create(
            quantity,
            order_id,
            product_id
        );
        res.send(results);
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

export const getMany = async (req: Request, res: Response) => {
    try {
        const results = await order_ProductsModel.getMany();
        res.json(results);
    } catch (err) {
        res.status(400).json({ err: err });
    }
};
export const getOne = async (req: Request, res: Response) => {
    try {
        const results = await order_ProductsModel.getOne(req.params.id);
        res.send(results);
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const updateOrderProduct: ORDER_PRODUCTS = {
            id: req.params.id,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const results = await order_ProductsModel.update(updateOrderProduct);
        res.send(results);
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const orderProdduct = await order_ProductsModel.remove(req.params.id);
        res.send(orderProdduct);
    } catch (err) {
        res.status(400).json({ err: err });
    }
};
