const express = require('express');
const app = express();

// middlewares
app.use(morgan('combined'));

// Aca comenzamos el sv

app.listen(3000, () => {
    console.log(`el server esta en el puerto: $(3000)`)
})