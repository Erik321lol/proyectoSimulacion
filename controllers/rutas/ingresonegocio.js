const { Router } = require('express');
const router = Router();

router.get('/test2', (req, res) => {
        res.send('"Titulo": "la pupuseria ingreso negocio"');
    })
    // aca generamos una consulta general con un select y returna un json se consulta http://localhost:3000/ingresonegocio

router.get('/ingresonegocio', (req, res) => { //aca difinimos la ruta en la que vamos a consultar
    req.getConnection((err, conn) => {
        if (err) return res.send(err); // esto es general para todos

        conn.query('Select * from ingreso_negocio', (err, rows) => { //aca definimos la consutla como tal que queremos para este caso es solo para un select ya que estamos obteniendo un get
            if (err) return res.send(); // esto es general para todos 

            res.json(rows) // aca estamos obteniendo las rows y las estamos mandando como json a la consulta
        });
    });
});

// Este metodo es para poder consultar un dato en especifico la forma para consultarlo es http://localhost:3000/ingresonegocio/cod 
router.get('/ingresonegocio/:dia', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('select * from ingreso_negocio WHERE dia_atendido = ? ', [req.params.dia], (err, rows) => { //aca definimos la consutla como tal este caso es un select en especifico
            if (err) return res.send(); // esto es general para todos 

            res.json(rows) // aca estamos obteniendo las rows y las estamos mandando como json a la consulta
        });
    });
})

//este metodo como tal sirve para poder generar una peticion de tipo post esta funciona para poder ingresar datos se consulta http://localhost:3000/ingresonegocio

router.post('/ingresonegocio', (req, res) => { // para este caso es tipo post con esto generamos ingreso de datos
    req.getConnection((err, conn) => {
        if (err) return res.send(err); // esto es general para todos
        console.log([req.body]);
        conn.query('INSERT INTO ingreso_negocio set ? ', [req.body], (err, rows) => { //aca definimos la consutla como tal este caso es un insert para insertar datos a una tabla este es tipo post
            if (err) return res.send(); // esto es general para todos 

            res.send('se ingreso el registro de ingreso') // aca estamos obteniendo las rows y las estamos mandando como json a la consulta
        });
    });
})

// Este metodo es para poder eliminar un dato en especifico la forma para consultarlo es http://localhost:3000/ingresonegocio/cod 
router.delete('/ingresonegocio/:cod', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('DELETE FROM ingreso_negocio WHERE cod_ingreso_negocio = ? ', [req.params.cod], (err, rows) => { //aca definimos la consutla como tal este caso es un delete
            if (err) return res.send(); // esto es general para todos 

            res.send('se elimino el ingreso')
        });
    });
})

//este metodo es para poder actualizar registros en especifico la forma para consultarlo es http://localhost:3000/ingredientes/cod y se envia el json

router.put('/ingresonegocio/:cod', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        console.log(req.body);
        console.log(req.params.cod);
        conn.query('UPDATE ingreso_negocio set ? WHERE cod_ingreso_negocio = ?', [req.body, req.params.cod], (err, rows) => { //aca definimos la consutla como tal este es un uptadate
            if (err) return res.send(); // esto es general para todos 

            res.send('se actualizo el ingreso')
        });
    });
})

module.exports = router;