require('dotenv').config()
/* eslint-disable no-undef, no-unused-vars */
let test = {
    run: async () => {

        const { economyManager } = require('startonomy')

        const db = {
            ip: process.env.IP,
            user: process.env.USER,
            password: process.env.PASSWORD,
            name: process.env.NAME
        
        }

        const manager = new economyManager(db)
        const e = await manager.getData('123432', '793292273159766056')
        console.log(e)

    }
}

test.run()