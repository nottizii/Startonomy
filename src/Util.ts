import { Pool } from "mysql";

/**
 * @class Util
 * @description A class that contains utility functions that are used throughout the application
 * @constructor
 * @hidden
 */
export default class Util {
    constructor() {}

    /**
     * @hidden
     * @param connection MySQL connection pool
     * @param query The query to be executed
     * @returns {Promise<any>} The result of the query
     * I still do not understand why or how this works, but it does (kinda). I will have to look into this more.
     */
    public _queryDatabase(connection: Pool, query: string):Promise<any> {
        return new Promise((resolve, reject) => {
            connection.getConnection((sqlerr, con) => {
                if (sqlerr) throw sqlerr
                con.query(query, (err, rows) => {
                    if (err) reject(err);
                    con.release()
                    resolve(rows[0]);
                })
            });
        })
    }
}