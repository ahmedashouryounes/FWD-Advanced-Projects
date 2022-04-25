import { Client } from './../database';
import { ORDER_PRODUCTS } from './../types/order_products_type';

export class Order_ProductsModel {
    async create(
        quantity: number,
        orderId: string,
        productId: string
    ): Promise<Omit<ORDER_PRODUCTS, 'id'>> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [orderId]);
            const order = result.rows[0];
            if (order.status !== 'active') {
                throw new Error(
                    `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
                );
            }
            connection.release();
        } catch (err) {
            throw new Error(
                `Could not find order with id ${orderId}. Error: ${err}`
            );
        }

        try {
            const connection = await Client.connect();
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            const orderProduct = result.rows[0];
            connection.release();
            return orderProduct;
        } catch (err) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}. Error: ${err}`
            );
        }
    }

    async getMany(): Promise<ORDER_PRODUCTS[]> {
        try {
            const connection = await Client.connect();
            const sql =
                'SELECT order_products.id,order_products.order_id , order_products.quantity , orders.status , products.name , products.price as unit_price , (products.price * order_products.quantity) as total_price FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products in orders. Error: ${err}`);
        }
    }

    async getOne(id: string): Promise<any> {
        try {
            const connection = await Client.connect();
            const sql =
                'SELECT order_products.id,order_products.order_id , order_products.quantity , orders.status , products.name , products.price as unit_price , (products.price * order_products.quantity) as total_price FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id WHERE order_products.id = $1';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            `Could not get product in order. Error: ${err}`;
        }
    }

    async update(orderProducts: ORDER_PRODUCTS): Promise<any> {
        const { id, order_id, product_id, quantity } = orderProducts;
        try {
            const connection = await Client.connect();
            const checkIfOrderProductsCount = await (
                await connection.query(
                    'SELECT * FROM order_products WHERE id = $1',
                    [id]
                )
            ).rowCount;
            if (checkIfOrderProductsCount <= 1) {
                try {
                    const sql =
                        'UPDATE order_products SET order_id = $1 , product_id = $2 , quantity =$3 WHERE id = $4;';
                    await connection.query(sql, [
                        order_id,
                        product_id,
                        quantity,
                        id,
                    ]);
                    const result = await connection.query(
                        'SELECT order_products.id,order_products.order_id , order_products.quantity , orders.status , products.title , products.price as unit_price , (products.price * order_products.quantity) as total_price FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id WHERE order_products.id = $1',
                        [id]
                    );
                    connection.release();
                    return result.rows[0];
                } catch (err) {
                    `Could not find order product with id ${id}. Error: ${err}`;
                }
            }
        } catch (err) {
            `Could not update order product with id ${id}. Error: ${err}`;
        }
    }

    async remove(id: string): Promise<ORDER_PRODUCTS> {
        try {
            const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        } catch (err) {
            throw new Error(
                `Could not delete order product with id ${id}. Error: ${err}`
            );
        }
    }
}
