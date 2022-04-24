# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

**_Table of Contents_**

-   [API and Database Requirements](#api-and-database-requirements)
    -   [API Endpoints](#api-endpoints)
        -   [Authenticate](#Authenticate)
        -   [Users](#users)
        -   [Products](#products)
        -   [Orders](#orders)
        -   [Order Products](#order_Products)
    -   [Data Schema](#data-schema)
        -   [Products Schema](#products-schema)
        -   [Users Schema](#users-schema)
        -   [Orders Schema](#orders-schema)
        -   [Order Products Schema](#Order_Products-Schema)

## API Endpoints

### auth

-   signup

    -   HTTP verb `POST`
    -   Endpoint:- `/api/users/signup`
    -   Request Body

        ```json
        {
            "username": "ahmed",
            "password": "12756as"
        }
        ```

    -   Response Body -- `User Token Text`

        ```
        {
            "id": "b98468c1-52cc-43ea-b8ed-d1f41e93f3fa",
            "username": "ahmed",
            "token": "....",
        }
        ```

-   Login

    -   HTTP verb `POST`
    -   Endpoint:- `/api/users/signin`
    -   Request Body

        ```json
        {
            "username": "ahmed",
            "password": "12756as"
        }
        ```

    -   Response Body -- `User object & Token`

        ```json
        {
            "id": "b98468c1-52cc-43ea-b8ed-d1f41e93f3fa",
            "username": "ahmed",
            "token": "...."
        }
        ```

### users

-   get many need admin token

    -   HTTP verb `GET`
    -   Endpoint:- `/api/users`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Array of users Objects`

        ```json
        [
            {
                "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
                "username": "Test product"
            },
            {
                "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
                "username": "Test product"
            },
            {
                "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
                "username": "Test product"
            }
        ]
        ```

-   get one need user token

    -   HTTP verb `GET`
    -   Endpoint:- `/api/users/:id`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `user object`

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "username": "Test product"
        }
        ```

-   update need user token

    -   HTTP verb `PUT`
    -   Endpoint:- `/api/users/:id`
    -   Request Body

        ```json
        {
            "username": "ahmed updated",
            "password": "545ee54e"
        }
        ```

    -   Response Body -- `Updated user object`

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "username": "ahmed updated"
        }
        ```

-   remove need admin token

    -   HTTP verb `DELETE`
    -   Endpoint:- `/api/users/:id`
    -   Request Body

        ```json
        N/A
        ```

    -   Response Body

        ```json
        {
            "id": "23er23423-52cc-43ea-fdf3-v5435353b6",
            "username": "ahmed"
        }
        ```

### Products

-   Create need admin token

    -   HTTP verb `POST`
    -   Endpoint:- `/api/products`
    -   Request Body

        ```json
        {
            "name": "Test product",
            "price": 150
        }
        ```

    -   Response Body -- `User object`

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "name": "Test product",
            "price": 150
        }
        ```

-   get many

    -   HTTP verb `GET`
    -   Endpoint:- `/api/products`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Array of Products Objects`

        ```json
        [
            {
                "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
                "name": "Test product",
                "price": 150
            }
        ]
        ```

-   get one

    -   HTTP verb `GET`
    -   Endpoint:- `/api/products/:id`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Product object`

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "name": "Test product",
            "price": 150
        }
        ```

-   update need amin token

    -   HTTP verb `PUT`
    -   Endpoint:- `/api/products/:id`
    -   Request Body

        ```json
        {
            "title": "Test Product updated",
            "price": 250
        }
        ```

    -   Response Body -- `Updated Product object`

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "name": "Test Product updated",
            "price": 250
        }
        ```

-   remove need admin token

    -   HTTP verb `DELETE`
    -   Endpoint:- `/api/products/:id`
    -   Request Body

        ```json
        N/A
        ```

    -   Response Body

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "name": "Test Product updated",
            "price": 250
        }
        ```

### Orders

-   Create need user token

    -   HTTP verb `POST`
    -   Endpoint:- `/api/orders`
    -   Request Body

        ```json
        {
            "status": "active",
            "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
        }
        ```

    -   Response Body -- `Order object`

        ```json
        {
            "id": "64465454n-52cc-43ea-fdf3-hghgfhgdf456",
            "status": "active",
            "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
        }
        ```

-   get many

    -   HTTP verb `GET`
    -   Endpoint:- `/api/orders`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Array of Order Objects`

        ```json
        [
            {
                "id": "ghjvjhrttbr-52cc-43ea-fdf3-hghgfhgdf456",
                "status": "active",
                "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
            },
            {
                "id": "fafafafdcv-52cc-43ea-fdf3-hghgfhgdf456",
                "status": "disactive",
                "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
            }
        ]
        ```

-   get one

    -   HTTP verb `GET`
    -   Endpoint:- `/api/orders/:id`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Order object With Products Array Object`

        ```json
        {
            "id": "fafafafdcv-52cc-43ea-fdf3-hghgfhgdf456",
            "status": "disactive",
            "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
        }
        ```

-   update need amin token

    -   HTTP verb `PUT`
    -   Endpoint:- `/api/orders/:id`
    -   Request Body

        ```json
        {
            "status": "disactive",
            "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
        }
        ```

    -   Response Body -- `Updated Product object`

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "status": "active",
            "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
        }
        ```

-   Delete need admin token

    -   HTTP verb `DELETE`
    -   Endpoint:- `/api/orders/:id`
    -   Request Body

        ```json
        N/A
        ```

    -   Response Body

        ```json
        {
            "id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa",
            "status": "active",
            "user_id": "544fgvbc-52cc-43ea-fdf3-d1f41e93f3fa"
        }
        ```

## Data Schema

### Users Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);
```

### Products Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL
);
```

### Orders Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(15),
    user_id uuid DEFAULT uuid_generate_v4() REFERENCES users(id)
);
```

### Order Products Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity INTEGER,
    order_id uuid DEFAULT uuid_generate_v4() REFERENCES orders(id),
    product_id uuid DEFAULT uuid_generate_v4() REFERENCES products(id)
);
```
