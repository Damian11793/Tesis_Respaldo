const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const {database} = require('./keys');

//inizialitations
const app = express();
require('./lib/passport');

// settings configuraciones que necesita mi serv
app.set('port', process.env.PORT || 4000); //Si existe un puerto en el sistema tomalo si no toma el 4000
app.set('views', path.join(__dirname, 'views'));//__dirname regresa direccion de carpeta donde se ejecuta
app.engine('.hbs', exphbs({//configurar handlebass
    defaultLayout: 'main',//nombre de la platilla principal
    layoutsDir: path.join(app.get('views'), 'layouts'),//unir directorios views con layout para saber donde esta la carpeta
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));//configuracion de motor

app.set('view engine', 'hbs'); //configuro mi motor de marcacion y digo que esta en hbs

// Middlewares
app.use(session({
    secret: 'Damiansesion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));// muestra determinado mensaje por consola
app.use(express.urlencoded({extended: false}));//para poder aceptar desde los formularios los datos que me den los usuarios, tan solo datos sencillos
app.use(express.json());//para validar json al recibir
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {//que variables pueden ser accedidas desde mi aplicacion
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();//toma info del usuario, lo que el serv quiere responder, toma para ejecutar lo que sigue despues del codigo
});

// Routes que hara el serv cuando el usuario visite esta URL definira la ruta
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

// Pubilc archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

// Starting index server//se define la URL de nuestr
app.listen(app.get('port'),()  =>{
    console.log(' Sever on port', app.get('port'));//concateno con puerto definido
})



