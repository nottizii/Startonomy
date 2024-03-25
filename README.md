# Startonomy

[![Node.js CI](https://github.com/xAtsuUC/Startonomy/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/xAtsuUC/Startonomy/actions/workflows/node.js.yml) [![Node.js Package](https://github.com/xAtsuUC/Startonomy/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/xAtsuUC/Startonomy/actions/workflows/npm-publish.yml)

### Description
Hey! this package makes your discord economy-management easyer
You just need a `mysql` database

### Installation
To install this package, run `npm i startonomy`, now you can use it by adding a `const { economyManager } = require('startonomy')`

### Examples

Here is a short example of how to use this package :)
```js
const { economyManager } = require('startonomy')

const manager = new economyManager({
    host: '127.0.0.1', // your database IP
    user: 'me', // your database user
    password: 'StartonomyIsCool', // your database password
    database: 'a_database_name', // your database name
    port: 
})

manager.registerGuild('12345') // register your guild to the database, you need a guild id as parameter

manager.registerUser('Guild ID', 'User ID') // register a user to the guild's economy system, by using ids

manager.addBalance('User ID', 'Guild ID', 'Ammount to add', 'Wallet or bank') // Select a user, a guild, an ammount and where to add the money

manager.addRemove('User ID', 'Guild ID', 'Ammount to add', 'Wallet or bank') // Select a user, a guild, an ammount and where to remove the money

manager.getData('User ID', 'Guild ID') // Get data of the economy from a specific user in a guild

manager.resetEconomy('User ID', 'Guild ID') // Resets ALL the data of a player in a guild, but without un-registering it

manager.unregisterUser('User ID', 'Guild ID') // Unregisters a user from a guild (this will delete ALL the asociated data)

manager.unregisterGuild('Guild ID') // Unregisters a guild from the manager (this will delete ALL user AND guild data)
```

### Documentation
For extended info, examples, values, please refer to [Our Documentation](https://startonmc.github.io/Startonomy/startonomy/0.1.3/)

#### For MongoDB Users:
I'm simultaneously working on a mongodb package for this lib, but as I'm unexperienced with it, it might take some time.