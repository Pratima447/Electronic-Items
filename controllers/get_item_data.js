var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Promise = require('promise');


exports.get_data = async function (item_id) {
    return new Promise(async function (resolve, reject) {
    
        await MongoClient.connect(url, (err, db) => {
            if (err) {
                return reject(err);
            } else {
                var database = db.db('electronic_items');
                database.collection("item_data").findOne({ 'id': parseInt(item_id) }, function (err, result) {
                    if (err) {
                        return reject(err);
                    } else {
                        db.close();
                        return resolve(result);
                    }
                })
            }
        });
    })
}