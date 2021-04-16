require('dotenv').config()
/* eslint-disable */
let test = {
    run: async () => {

        const { economyManager } = require('../index.js')

        const db = {
            ip: process.env.IP,
            user: process.env.USER,
            password: process.env.PASSWORD,
            name: process.env.NAME
        
        }
        const manager = new economyManager(db)

        manager.unregisterGuild('714444297776398369')
    }
}

test.run()

/// YAY test passed ///