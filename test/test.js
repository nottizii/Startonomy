let test = {
    run: async () => {
        const { economyManager } = require('../index.js')

        const manager = new economyManager({
            ip: '209.222.98.118',
            user: 'u30490_phdZd60lLV',
            password: 'vbGB=T+Bjff+K44XiPzu5Z0w',
            name: 's30490_economy'
        })

        manager.registerUser('573991320897716224', '791232784898195456')
    }
}

test.run()