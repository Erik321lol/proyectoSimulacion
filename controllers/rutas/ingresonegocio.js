const { Router } = require('express');
const router = Router();

router.get('/test2', (req, res) => {
    res.send('"Titulo": "la pupuseria ingreso negocio"');
})

module.exports = router;