# Startonomy

[![Node.js CI](https://github.com/StartonMC/Startonomy/actions/workflows/node.js.yml/badge.svg)](https://github.com/StartonMC/Startonomy/actions/workflows/node.js.yml)

### Description {#description}
Hey! this package makes your discord economy-management easyer
You just need a `mysql` database

### Installation {#installation}
To install this package, run `npm i startonomy`, now you can use it by adding a `const { economyManager } = require('startonomy')`

### Examples {#examples}

Here is a short example of how to use this package :)
```js
const { economyManager } = require('startonomy')

const manager = new economyManager({
    ip: '127.0.0.1', // your database IP
    user: 'me', // your database user
    password: 'StartonomyIsCool', // your database password
    name: 'a_database_name' // your database name
})

manager.registerGuild('12345') // register your guild to the database, you need a guild id as parameter

manager.registerUser('Guild ID', 'User ID') // register a user to the guild's economy system, by using ids

manager.addBalance('User ID', 'Guild ID', 'Ammount to add', 'Wallet or bank') // Select a user, a guild, an ammount and where to add the money

manager.addRemove('User ID', 'Guild ID', 'Ammount to add', 'Wallet or bank') // Select a user, a guild, an ammount and where to remove the money

manager.getData('User ID', 'Guild ID') // Get data of the economy from a specific user in a guild

manager.resetEconomy('User ID', 'Guild ID') // Resets ALL the data of a player in a guild, but without un-registering it
```

### To do list {#todo}
- [] Add global methods for economyManager
- [] Add documentation for the lib
- [] Add a web with some kind of js docgen