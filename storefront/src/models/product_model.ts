import { PRODUCT } from './../types/product_type';
import { Client } from '../database';

export class ProductModel {

    async create(p: Omit<PRODUCT,"id">): Promise<PRODUCT> {
        try {
            const sql =
                'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(
                `Could not add new product ${p.name}. Error: ${err}`
            );
        }
    }


    async getMany(): Promise<PRODUCT[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }


    async getOne(id: string): Promise<PRODUCT> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product with id ${id}. Error: ${err}`);
        }
    }


    async update(p:PRODUCT): Promise<PRODUCT> {
        try {
            const conn = await Client.connect();
            const sql =
                'UPDATE products SET name=$1, price=$2 WHERE id=($3) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${p.id}. Error: ${err}`);
        }
    }

    async remove(id: string): Promise<PRODUCT> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
