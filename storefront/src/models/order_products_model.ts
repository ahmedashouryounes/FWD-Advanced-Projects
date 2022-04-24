async addProduct(
    quantity: number,
    orderId: string,
    productId: string
): Promise<{
    id: string;
    quantity: number;
    order_id: string;
    product_id: string;
}> {
    try {
        const ordersql = 'SELECT * FROM orders WHERE id=($1)';
        const conn = await Client.connect();
        const result = await conn.query(ordersql, [orderId]);
        const order = result.rows[0];
        if (order.status !== 'open') {
            throw new Error(
                `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
            );
        }

        conn.release();
    } catch (err) {
        throw new Error(`${err}`);
    }

    try {
        const conn = await Client.connect();
        const sql =
            'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
        const result = await conn.query(sql, [
            quantity,
            orderId,
            productId,
        ]);
        const order = result.rows[0];
        conn.release();
        return order;
    } catch (err) {
        throw new Error(
            `Could not add product ${productId} to order ${orderId}: ${err}`
        );
    }
}