import { ORDER } from './../types/order_type';
import { Client } from '../database';

export class OrderModel {

    
    async create(o: Omit<ORDER,"id">): Promise<ORDER> {
        try {
            const connection = await Client.connect();
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await connection.query(sql, [o.status, o.user_id]);
            const order = result.rows[0];
            connection.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async getmany(): Promise<ORDER[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async getOne(id: string): Promise<ORDER> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order with id ${id}. Error: ${err}`);
        }
    }

    async update(o:ORDER): Promise<ORDER> {
        try {
            const connection = await Client.connect();
            const sql =
                'UPDATE orders SET status=$1, user_id=$2 WHERE id=($3) RETURNING *';
            const result = await connection.query(sql, [o.status, o.user_id,o.id]);
            connection.release();
            const order = result.rows[0];
            return order
        } catch (err) {
            throw new Error(`Could not find order with id ${o.id}. Error: ${err}`);
        }
    }

    async remove(id: string): Promise<ORDER> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            const order = result.rows[0];
            connection.release();
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }

}
