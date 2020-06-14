var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Promise = require('promise');

exports.delete_now = async function (id) {
    
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                reject(err);
            }
            var database = db.db('electronic_items');
            database.collection("item_data").deleteOne({"id": parseInt(id)}, function (err, res) {
                if (err) {
                    return reject(err);
                }
                console.log('Deleted data');
                db.close();
                return resolve(1);
            })
               
            
        });

    })
}