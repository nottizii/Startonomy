require('dotenv').config()
/* eslint-disable no-undef, no-unused-vars */
let test = {
    run: async () => {

        const { economyManager, interactionManager } = require('../index.js')

        const db = {
            ip: process.env.IP,
            user: process.env.USER,
            password: process.env.PASSWORD,
            name: process.env.NAME
        
        }

        const imanager = new interactionManager(db)
        const e = await imanager.getData('573991320897716224', '791232784898195456')
        console.log(e)
    }
}

test.run()

/// YAY test passed ///