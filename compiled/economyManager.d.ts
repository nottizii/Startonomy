/// <reference types="node" />
import { Pool, ConnectionConfig } from "mysql";
import { EventEmitter } from "node:events";
export declare class economyManager extends EventEmitter {
    test: string;
    ip: string;
    user: string;
    password: string;
    db: string;
    connection: Pool;
    guildID: string;
    userID: string;
    data: economyData;
    ammount: number;
    WoB: string;
    oldBal: number;
    newBal: number;
    depType: string[];
    port: number;
    /**
     * @param {Database} database object database object to be used to store the data
     */
    constructor(database: ConnectionConfig);
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
    getData(userID: string, guildID: string): economyData;
    /**
     *
     * @private
     * @returns { Promise<economyData> }
     */
    private _queryDatabase;
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
    addBalance(userID: string, guildID: string, ammount: number, WoB?: string): Promise<economyData>;
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
    removeBalance(userID: string, guildID: string, ammount: number, WoB: string): Promise<economyData>;
    /**
     *
     * @param {String} userID User to reset the economy
     * @param {String} guildID Guild to reset the economy
     * @public
     * @returns { economyData }
     * @example
     * economyManager.resetEconomy("573991320897716224", "793292273159766056")
     */
    resetEconomy(userID: string, guildID: string): economyData;
    /**
     *
     * @param {String} guildID ID of the guild to register
     * @public
     * @example
     * economyManager.addBalance("573991320897716224", "793292273159766056", 300, wallet)
     * @returns { null }
     */
    registerguild(guildID: string): null;
    /**
     *
     * @param {String} userID ID of the user to register
     * @param {String} guildID ID of the guild where the user will be registered
     * @public
     * @returns {null}
     * @example
     * economyManager.registerUser("573991320897716224", "793292273159766056")
     */
    registerUser(userID: string, guildID: string): null;
    /**
     * @param {String} guildID ID of the guild that will be unregistered
     * @public
     * @returns {String} The same ID as provided.
     */
    unregisterGuild(guildID: string): string;
    /**
     * @param {String} userID ID of the user to unregister
     * @param {String} guildID ID of the guild where the user should be unregistered
     * @public
     */
    unregisterUser(userID: string, guildID: string): void;
}
interface economyData {
    id: string;
    wallet: number;
    bank: number;
    unlimited: boolean;
}
export {};
/**
 * @typedef { Object } economyData
 * @property {string} [id] The id of the user
 * @property {number} [wallet] The amount of money in the user's wallet
 * @property {number} [bank] The amount of money in the user's bank
 * @property {boolean} [unlimited] Whenever the money is unlimited or not
 */ 
