

const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'byron95',
    database: 'hospital'
})

conexion.connect(function (error){
    if (error){
        console.log(`ocurrior un error en la conexion ${error}`)
        return;
    }else{
        console.log('conexion exitosa')
    }
})

module.exports = {conexion}
