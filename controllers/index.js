const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const dbOptions = {
    host: 'be8c3nariggcsvjq05zw-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'uvikprtnvy3izrou',
    password: 'n3QNqn1hV5pwD46wV7ia',
    database: 'be8c3nariggcsvjq05zw'
}


//configuraciones

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(myconn(mysql, dbOptions, 'single'))


//rutas
app.use(require('./rutas/ingredientes'));
app.use(require('./rutas/productos'))
app.use(require('./rutas/ingresonegocio'))


// Aca comenzamos el sv

app.listen(app.get('port'), () => {
    console.log("el server esta en el puerto:", app.get('port'));
})