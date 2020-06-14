var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Promise = require('promise');

exports.save_now = async function (data) {
    
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                reject(err);
            }
            var database = db.db('electronic_items');
            database.collection("item_data").find({}).toArray(function (err, result) {
                if (err) {
                    return reject(err);
                } else {
                    if (result.length < 1) {
                        var id = 1;
                    } else {
                        var id = result.length + 1;
                    }
                    data.id = id;

                    database.collection("item_data").insertOne(data, function (err, res) {
                        if (err) {
                            return reject(err);
                        }
                        console.log('Inserted data');
                        db.close();
                        return resolve(1);
                    })
                }
                return resolve(0);
            })

                // database.collection("item_data").insertOne(data, function (err, res) {
                //     if (err) {
                //         return reject(err);
                //     }
                //     console.log('Inserted data');
                //     db.close();
                //     return resolve(0);
                // })
               
            
        });

    })
}