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

        manager.registerUser('573991320897716224', '791232784898195456')
    }
}

test.run()