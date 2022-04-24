import { Client } from '../database';
import {USER} from '../types/user_type';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const pepper = BCRYPT_PASSWORD as string;
const saltRounds = SALT_ROUNDS as string;

export class AuthModel {


    async create(u: Omit<USER,"id">): Promise<USER> {
        try {
            const connection = await Client.connect();
            const sql =
                'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *';
            const hashPassword = bcrypt.hashSync(u.password + pepper,parseInt(saltRounds));
            const result = await connection.query(sql, [u.username, hashPassword]);
            const user = result.rows[0];
            delete user.password
            connection.release();
            return user;
        } catch (err) {
            throw new Error(`unable create user (${u.username}): ${err}`);
        }
    }

    async authenticate(u: Omit<USER,"id">): Promise<USER | null> {
        const connection = await Client.connect();
        const sql =
            'SELECT * FROM users WHERE username=($1)';
        const result = await connection.query(sql, [u.username]);

        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(u.password + pepper, user.password)) {
                delete user.password;
                return user;
            }
        }
        connection.release();
        return null;
    }
}
