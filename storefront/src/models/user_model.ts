import { USER } from './../types/user_type';
import { Client } from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const pepper = BCRYPT_PASSWORD as string;
const saltRounds = SALT_ROUNDS as string;

export class UserModel {
    async getMany(): Promise<USER[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT id,username FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async getOne(id: string): Promise<USER> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            const user = result.rows[0];
            delete user.password;
            return user;
        } catch (err) {
            throw new Error(`Could not find user with id ${id}. Error: ${err}`);
        }
    }

    async update(u: USER): Promise<USER> {
        try {
            const connection = await Client.connect();
            const sql =
                'UPDATE users SET username=$1, password=$2 WHERE id=($3) RETURNING *';
            const hashPassword = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );
            const result = await connection.query(sql, [
                u.username,
                hashPassword,
                u.id,
            ]);
            connection.release();
            const user = result.rows[0];
            delete user.password;
            return user;
        } catch (err) {
            throw new Error(
                `Could not find user with id ${u.id}. Error: ${err}`
            );
        }
    }

    async remove(id: string): Promise<USER> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const connection = await Client.connect();
            const result = await connection.query(sql, [id]);
            const user = result.rows[0];
            connection.release();
            delete user.password;
            return user;
        } catch (err) {
            throw new Error(
                `Could not delete user with id ${id}. Error: ${err}`
            );
        }
    }
}
