/*
*   @Authors: Carmen Alvarez
*   @Version: 1.0
*   @Date: 2024/07/05
*   Index file who content all the imports and configuration of server.
*/

//Init variables
const express = require('express')
const app = express()
var session = require('express-session')
var helmet = require('helmet')
const bodyParser = require("body-parser");
const port = 8080
var redis = require("redis"), client = redis.createClient();

//Import all dependecies
require('./private/variableData')
/*require('./private/Register_Login/Register')
require('./private/Register_Login/Login')

require('./private/Chat/preChat')
require('./private/Administr/administrLoads')
require('./private/Administr/adminTools')
require('./private/Register_Login/GestorPassUser')
require('./private/DataBase/Redis')*/

//Start view engine and session
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
var sessionMiddleware = session({secret:'ASIR', resave:false, saveUninitialized:false})
app.use(sessionMiddleware)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet())
app.set('views', __dirname + '/public/views')

app.get('/', function(req, res){
    if(req.session.datosView==undefined){
		req.session.datosView = JSON.parse(JSON.stringify(datosSesion))
    }
    req.session.datosView.tituloPagina = "AdoptMe - Inicio"
    res.render('index', req.session.datosView)
})

const server = app.listen(port, () =>{
    console.log("Adotpme iniciado en: " + port)
 })