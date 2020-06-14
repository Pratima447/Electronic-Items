const { renderFile } = require("pug");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"; 

exports.check_credentials = function (req, res) {
    console.log(req.body);
    var login_id = req.body.id;
    var pass = req.body.password;
    var cookie = req.cookies.cookieName;

    data = {
        'username': login_id,
        'password': pass
    };

    if (!login_id || !pass) {
        res.send('Loginid or password is missing');
    } else {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                res.send({
                    'msg': 'Eror occured, please try again',
                    'status': 0
                });
            }
            var database = db.db('electronic_items');
            database.collection("users").findOne(data, function (err, result) {
                console.log(res);
                if (err) {
                    res.send({
                        'msg': 'Eror occured, please try again',
                        'status': 0
                    });
                } else if (result != null) {
                    res.cookie('login_id', login_id, { maxAge: 900000, httpOnly: true });
                    res.send({
                        'msg': 'Successfully login',
                        'status': 1
                    });

                } else {
                    res.send({
                        'msg': 'Invalid credentials!!',
                        'status': 0
                    });
                }
                db.close();
            })    
        });
    }
}

exports.add_user = function (req, res) {
    var username = req.body.name;
    var password = req.body.password;

    data = {
        'username': username,
        'password': password
    }
   
    MongoClient.connect(url, (err, db) => {
        if (err) {
            reject(err);
        }
        var database = db.db('electronic_items');
        database.collection("users").insertOne(data, function (err, res) {
            if (err) {
                res.send({
                    'msg': 'Eror occured, please try again',
                    'status': 0
                });
            }
            console.log('Inserted data');
            db.close();
        })
               
        res.send({
            'msg': 'Inserted Credentials successfully',
            'status': 1
        });

    });
}

exports.log_out = function (req, res) {
    res.cookie('login_id', 'test', { maxAge: 0 });
    res.send(1);
    // res.redirect('/login')
}