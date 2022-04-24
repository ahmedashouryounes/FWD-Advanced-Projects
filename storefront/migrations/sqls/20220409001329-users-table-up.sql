CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);