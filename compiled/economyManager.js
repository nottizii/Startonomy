"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.economyManager = void 0;
const node_events_1 = require("node:events");
class economyManager extends node_events_1.EventEmitter {
    /**
     * @param {Database} database object database object to be used to store the data
     */
    constructor(database) {
        super();
        const mysql = require('mysql');
        this.depType = [];
        this.test = 'test';
        this.ip = database.host ?? '127.0.0.1';
        this.user = database.user ?? 'me';
        this.password = database.password ?? 'secret';
        this.db = database.database ?? 'cool_db';
        this.port = database.port ?? 3306;
        this.connection = mysql.createPool({
            host: this.ip,
            user: this.user,
            password: this.password,
            database: this.db,
            port: this.port
        });
    }
    /**
     *
     * @param {String} userID User ID to get the data
     * @param {String} guildID  Guild ID to get the data from
     * @returns { Object }
     * @public
     * @example
     * const data = economyManager.getData("573991320897716224", "793292273159766056")
     * console.log(data)
     * // { id: "573991320897716224", wallet: "843", bank: "284824", unlimited: 0 }
     */
    getData(userID, guildID) {
        this.guildID = guildID ?? null;
        this.userID = userID ?? null;
        if (typeof this.guildID !== 'string' || this.guildID === 'undefined' || this.guildID === null || typeof this.userID !== 'string' || this.userID === 'undefined' || this.userID === null)
            throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
        this._queryDatabase({ guildID: this.guildID, userID: this.userID }).then(d => { this.data = d; });
        return this.data;
    }
    /**
     *
     * @private
     * @returns { Promise<economyData> }
     */
    _queryDatabase(payload) {
        return new Promise((resolve, reject) => {
            this.connection.getConnection((sqlerr, con) => {
                if (sqlerr)
                    throw sqlerr;
                con.query(`SELECT * FROM data_${payload.guildID} WHERE id = '${payload.userID}'`, (err, rows) => {
                    if (err)
                        reject(err);
                    con.release();
                    resolve(rows[0]);
                });
            });
        });
    }
    /**
     *
     * @param {String} userID User ID to add the balance to
     * @param {String} guildID Guild ID where to add the balance
     * @param {Number} ammount Ammount to add
     * @param {String} WoB If the money should be added to wallet or bank
     * @public
     * @returns { Promise<economyData> }
     * @example
     * economyManager.addBalance("573991320897716224", "793292273159766056", 300, wallet)
     */
    async addBalance(userID, guildID, ammount, WoB) {
        return new Promise((res, rej) => {
            if (typeof WoB !== 'string')
                throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
            this.guildID = guildID ?? null;
            this.userID = userID ?? null;
            this.ammount = ammount ?? 10;
            this.WoB = WoB.toLowerCase() ?? 'bank';
            if (!this.depType.includes(WoB) || isNaN(this.ammount) || typeof this.guildID !== 'string' || this.guildID === 'undefined' || this.guildID === null || typeof this.userID !== 'string' || this.userID === 'undefined' || this.userID === null)
                throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
            this.connection.getConnection((err, con) => {
                con.query(`SELECT ${this.WoB} FROM data_${this.guildID} WHERE id  = '${this.userID}'`, (err, rows) => {
                    if (err)
                        rej(err);
                    this.oldBal = rows;
                    if (this.WoB == 'wallet')
                        this.newBal = Number(this.oldBal[0].wallet) + this.ammount;
                    if (this.WoB == 'bank')
                        this.newBal = Number(this.oldBal[0].bank) + this.ammount;
                    con.query(`UPDATE data_${this.guildID} SET ${this.WoB}='${this.newBal}' WHERE id = '${this.userID}'`, (err, rows) => {
                        if (err)
                            rej(err);
                        res(rows);
                    });
                });
                con.release();
            });
        });
    }
    /**
     *
     * @param {String} userID User ID to remove the balance to
     * @param {String} guildID Guild ID where to remove the balance
     * @param {Number} ammount Ammount to remove
     * @param {String} WoB If the money should be removed from wallet or bank
     * @returns { Promise<economyData> }
     * @public
     * @example
     * economyManager.addBalance("573991320897716224", "793292273159766056", 300, wallet)
     */
    async removeBalance(userID, guildID, ammount, WoB) {
        return new Promise((res, rej) => {
            if (typeof WoB !== 'string')
                throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
            this.guildID = guildID ?? null;
            this.userID = userID ?? null;
            this.ammount = ammount ?? 10;
            this.WoB = WoB.toLowerCase() ?? 'bank';
            if (!this.depType.includes[WoB] || isNaN(this.ammount) || typeof this.guildID !== 'string' || this.guildID === 'undefined' || this.guildID === null || typeof this.userID !== 'string' || this.userID === 'undefined' || this.userID === null)
                throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
            this.connection.getConnection((err, con) => {
                con.query(`SELECT ${this.WoB} FROM data_${this.guildID} WHERE id  = '${this.userID}'`, (err, rows) => {
                    if (err)
                        rej(err);
                    this.oldBal = rows;
                    if (this.WoB == 'wallet')
                        this.newBal = Number(this.oldBal[0].wallet) - this.ammount;
                    if (this.WoB == 'bank')
                        this.newBal = Number(this.oldBal[0].bank) - this.ammount;
                    con.query(`UPDATE data_${this.guildID} SET ${this.WoB}='${this.newBal}' WHERE id = '${this.userID}'`, (err, rows) => {
                        if (err)
                            rej(err);
                        res(rows);
                    });
                });
                con.release();
            });
        });
    }
    /**
     *
     * @param {String} userID User to reset the economy
     * @param {String} guildID Guild to reset the economy
     * @public
     * @returns { economyData }
     * @example
     * economyManager.resetEconomy("573991320897716224", "793292273159766056")
     */
    resetEconomy(userID, guildID) {
        this.guildID = guildID ?? null;
        this.userID = userID ?? null;
        if (typeof this.guildID !== 'string' || this.guildID === 'undefined' || this.guildID === null || typeof this.userID !== 'string' || this.userID === 'undefined' || this.userID === null)
            throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
        this.connection.getConnection((err, con) => {
            con.query(`UPDATE data_${this.guildID} SET bank = '0', wallet = '0', unlimited = 'false' WHERE id = '${this.userID}'`);
            con.release();
        });
        return {
            id: userID,
            wallet: 0,
            bank: 0,
            unlimited: false
        };
    }
    /**
     *
     * @param {String} guildID ID of the guild to register
     * @public
     * @example
     * economyManager.addBalance("573991320897716224", "793292273159766056", 300, wallet)
     * @returns { null }
     */
    registerguild(guildID) {
        this.guildID = guildID ?? null;
        if (typeof this.guildID !== 'string' || this.guildID === 'undefined' || this.guildID === null)
            throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
        this.connection.getConnection((err, con) => {
            con.query(`CREATE TABLE IF NOT EXISTS data_${this.guildID} (id varchar(18) CHARACTER SET utf8 DEFAULT 'No id', bank varchar(9) CHARACTER SET utf8 DEFAULT '0',  wallet varchar(9) CHARACTER SET utf8 DEFAULT '0', unlimited int(5) CHARACTER SET utf8 DEFAULT 'false') ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => { if (err)
                throw err; });
            con.release();
        });
        return null;
    }
    /**
     *
     * @param {String} userID ID of the user to register
     * @param {String} guildID ID of the guild where the user will be registered
     * @public
     * @returns {null}
     * @example
     * economyManager.registerUser("573991320897716224", "793292273159766056")
     */
    registerUser(userID, guildID) {
        this.userID = userID ?? null;
        this.guildID = guildID ?? null;
        if (typeof this.guildID !== 'string' || this.guildID === 'undefined' || this.guildID === null || typeof this.userID !== 'string' || this.userID === 'undefined' || this.userID === null)
            throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
        this.connection.getConnection((err, con) => {
            if (err)
                throw err;
            con.query(`CREATE TABLE IF NOT EXISTS data_${this.guildID} (id varchar(18) CHARACTER SET utf8 DEFAULT 'No id', bank varchar(9) CHARACTER SET utf8 DEFAULT '0',  wallet varchar(9) CHARACTER SET utf8 DEFAULT '0', unlimited varchar(5) CHARACTER SET utf8 DEFAULT 'false') ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => { if (err)
                throw err; });
            con.release();
            this.connection.getConnection((err, con) => {
                if (err)
                    throw err;
                con.query(`INSERT INTO data_${this.guildID} SET id='${this.userID}'`, (err) => { if (err)
                    throw err; });
                con.release();
            });
        });
        return null;
    }
    /**
     * @param {String} guildID ID of the guild that will be unregistered
     * @public
     * @returns {String} The same ID as provided.
     */
    unregisterGuild(guildID) {
        this.guildID = guildID ?? null;
        if (typeof this.guildID !== 'string' || this.guildID === null)
            throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
        this.connection.getConnection((err, con) => {
            if (err)
                throw err;
            con.query(`DROP TABLE IF EXISTS data_${this.guildID}`, (err) => { if (err)
                throw err; });
        });
        return guildID;
    }
    /**
     * @param {String} userID ID of the user to unregister
     * @param {String} guildID ID of the guild where the user should be unregistered
     * @public
     */
    unregisterUser(userID, guildID) {
        this.userID = userID ?? null;
        this.guildID = guildID ?? null;
        if (typeof this.guildID !== 'string' || this.guildID === 'undefined' || this.guildID === null || typeof this.userID !== 'string' || this.userID === 'undefined' || this.userID === null)
            throw new TypeError('[ERR_BAD_DATA] Data supplied is invalid, please re-check your function parameters');
        this.connection.getConnection((err, con) => {
            if (err)
                throw err;
            con.query(`DELETE FROM data_${this.guildID} WHERE id = '${this.userID}'`, (err) => { if (err)
                throw err; });
        });
    }
}
exports.economyManager = economyManager;
/**
 * @typedef { Object } economyData
 * @property {string} [id] The id of the user
 * @property {number} [wallet] The amount of money in the user's wallet
 * @property {number} [bank] The amount of money in the user's bank
 * @property {boolean} [unlimited] Whenever the money is unlimited or not
 */ 
