import { PRODUCT } from './../types/product_type';
import { Request, Response } from 'express';
import { ProductModel } from "./../models/product_model"

const productModel = new ProductModel();


export const create = async (req: Request, res: Response) => {
    const newProduct: Omit<PRODUCT,"id"> = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const product = await productModel.create(newProduct);
        res.send(product);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};


export const getMany = async (_req: Request, res: Response) => {
    try {
        const products = await productModel.getMany();
        res.send(products);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const product = await productModel.getOne(req.params.id);
        res.send(product);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};


export const update = async (req: Request, res: Response) => {
    const updateProduct: PRODUCT = {
        id: req.params.id,
        name: req.body.name,
        price: req.body.price
    };
    try {
        const product = await productModel.update(updateProduct);
        res.send(product);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const prodduct = await productModel.remove(req.params.id);
        res.send(prodduct);
    } catch (err) {
        res.status(400).json({"err" : err});
    }
};
