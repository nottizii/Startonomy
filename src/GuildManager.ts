import { Pool, ConnectionConfig } from "mysql"
import { EventEmitter } from "node:events"
import Util from "./Util"

/**
 * Guild Manager
 * @class GuildManager
 * @extends EventEmitter
 * @param {ConnectionConfig} database - The database connection configuration
 * @example
 * const economy = new guildManager({
 *     host: "localhost",
 *     user: "root",
 *     password: "password",
 *     database: "database"
 * });
 */
class GuildManager extends EventEmitter {
    database: ConnectionConfig
    util: Util
    constructor(database: ConnectionConfig) {
        super()
        this.database = database
        this.util = new Util()
    }

    public test() {
        console.log("Test")
    }
}

export default GuildManager