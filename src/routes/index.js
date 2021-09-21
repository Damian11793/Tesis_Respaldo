const express = require('express');//rutas principales de mi app en este caso modulo router
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});//voy a definirle una ruta inicial '/'

module.exports = router;