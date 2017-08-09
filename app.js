// app.js

// BASE SETUP
// ==============================================

const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var allRobots;


// Connection URL
var url = 'mongodb://localhost:27017/robots';


const data = require('./data');
// const users = data.users;

// for(let i =0; i < users.length; i++) {
//     console.log([i]);
//     console.log(users[i].address.city);
//     console.log(users[i].address.country);
//     console.log('__________________')
// }

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, '/public')));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');







//  Route Handlers



// find All users
app.get('/', function (req, res) {



    MongoClient.connect(url, async function (error, database) {
        var robot = await database.collection('users').find({}).toArray();
       
        database.close();
        //response.json(robot);
        res.render('home', { users: robot });
    });


});



// findOne user who works
app.get('/profilework/:id', function (req, res) {
var id = parseInt(req.params.id);

    MongoClient.connect(url, async function (error, database) {
        var robot = await database.collection('users').find({ id: id }).toArray(); 
        database.close();
        //response.json(robot);
        res.render('profilework', { user:robot, layout: false });
    });
 
});




//find one user looking for work  
app.get('/profilelook/:id', function (req, res) {
    var id = parseInt(req.params.id);

      MongoClient.connect(url, async function (error, database) {
        var robot = await database.collection('users').find({ id: id }).toArray();
        console.log(robot);
        database.close();
        //response.json(robot);
           res.render('profilelook', { user: robot, layout: false });
    });
    


});




// find all users that are unemployed
app.get('/unemployed', function(req, res){

      MongoClient.connect(url, async function (error, database) {
        var robot = await database.collection('users').find({ company: null}).toArray();
        console.log(robot);
        database.close();
        //response.json(robot);
           res.render('unemployed', { users: robot, layout: false });
    });
});



// find all users that are unemployed
app.get('/working', function(req,res){
        MongoClient.connect(url, async function (error, database) {
        var robot = await database.collection('users').find({ company: {$not: {$in: [null]}}}).toArray();
        console.log(robot);
        database.close();
        //response.json(robot);
           res.render('working', { users: robot, layout: false });
    });
});






// START THE SERVER
// ==============================================
// Use connect method to connect to the server
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});