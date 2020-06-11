const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/secret');
const app = express();

let database = config.database;
let port = config.port;


//Ofline configuration
const http = require('http').Server(app);
//---end offline configuratrion -///


//Conection to DataBase
mongoose.connect(database, { useNewUrlParser: true,  useUnifiedTopology: true }, function(err) {
    if (err) console.log(err);
    console.log("Connected to the database");
});

//MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Allow api function to apps
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, cache-control');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//Public a folder to have access to files  
  app.use(express.static(__dirname + '/upload'));
// app.use('/assets',express.static(__dirname + '/assets'));
// app.use(express.static(__dirname + '/../frontend/dist/angularListing'));


// Routes
const articuloRoute = require('./routes/articulo');
const adminRoute = require('./routes/admin');


 app.use( '/apiblogadmin', articuloRoute);
 app.use( '/apiblogadmin', adminRoute);


//Offline configuration
http.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Running on port ${port}`);
});


module.exports = app;
