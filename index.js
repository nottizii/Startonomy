class economyManager {
    constructor(database) {
        const mysql = require('mysql')
        this.ip = database.ip
        this.user = database.user
        this.password = database.password
        this.db = database.name
        this.connection = mysql.createPool({
            host     : this.ip,
            user     : this.user,
            password : this.password,
            database : this.db
        });
    }
    async getData(userID, guildID) {
        this.guildID = guildID ?? null
        this.userID = userID ?? null
        this.data = await this.queryDatabase({guildID: this.guildID, userID: this.userID})
        return this.data;
    }
    
    queryDatabase(payload) {
        return new Promise((resolve, reject) => {
            this.connection.getConnection((sqlerr, con) => {
                con.query(`SELECT * FROM data_${payload.guildID} WHERE id = '${payload.userID}'`, (err, rows) => {
                    if(err) reject(err);
                    con.release()
                    resolve(rows[0]);
                })
            });
        })
    }
    
    async addBalance(userID, guildID, ammount, WoB) {
        this.guildID = guildID ?? null
        this.userID = userID ?? null
        this.ammount = ammount ?? 10
        this.WoB = WoB ?? 'bank'
        this.connection.getConnection((err, con) => {
            con.query(`SELECT ${this.WoB} FROM data_${this.guildID} WHERE id  = '${this.userID}'`, (err, rows) => {
                if(err) throw err;
                this.oldBal = rows
                if(this.WoB == 'wallet') this.newBal = Number(this.oldBal[0].wallet) + this.ammount
                if(this.WoB == 'bank') this.newBal = Number(this.oldBal[0].bank) + this.ammount
                con.query(`UPDATE data_${this.guildID} SET ${this.WoB}='${this.newBal}' WHERE id = '${this.userID}'`, (err => {
                    if(err) throw err
                }))
            })
            con.release()
        })
    }
    
    async removeBalance(userID, guildID, ammount, WoB) {
        this.guildID = guildID ?? null
        this.userID = userID ?? null
        this.ammount = ammount ?? 10
        this.WoB = WoB ?? 'bank'
        this.connection.getConnection((err, con) => {
            con.query(`SELECT ${this.WoB} FROM data_${this.guildID} WHERE id  = '${this.userID}'`, (err, rows) => {
                if(err) throw err;
                this.oldBal = rows
                if(this.WoB == 'wallet') this.newBal = Number(this.oldBal[0].wallet) - this.ammount
                if(this.WoB == 'bank') this.newBal = Number(this.oldBal[0].bank) - this.ammount
                con.query(`UPDATE data_${this.guildID} SET ${this.WoB}='${this.newBal}' WHERE id = '${this.userID}'`, (err => {
                    if(err) throw err
                }))
            })
            con.release()
        })
    }
    
    async resetEconomy(userID, guildID) {
        this.guildID = guildID ?? null
        this.userID = userID ?? null
        this.connection.getConnection((err, con) => {
            con.query(`UPDATE data_${this.guildID} SET bank = '0', wallet = '0', unlimited = 'false' WHERE id = '${this.userID}'`)
            con.release();
        })
    }

    registerguild(guildID) {
        this.guildID = guildID ?? null
        this.connection.getConnection((err, con) => {
            con.query(`CREATE TABLE IF NOT EXISTS 'data_${this.guildID}' ( 'id' varchar(18) CHARACTER SET utf8 DEFAULT 'No id',  'bank' varchar(9) CHARACTER SET utf8 DEFAULT '0',  'wallet' varchar(9) CHARACTER SET utf8 DEFAULT '0',  'unlimited' varchar(5) CHARACTER SET utf8 DEFAULT 'false') ENGINE=InnoDB DEFAULT CHARSET=latin1`)
            con.release();
        })
    }
    registerUser(userID, guildID) {
        this.userID = userID ?? null
        this.guildID = guildID ?? null
        this.connection.getConnection((err, con) => {
            con.query(`INSERT INTO 'data_${this.guildID}' ('id') VALUES ('${this.userID}')`)
            con.release();
        })
    }
}

module.exports = { economyManager }