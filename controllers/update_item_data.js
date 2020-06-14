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
            var condition = { id: parseInt(data.id) };
            var newvalues = { $set: {name: data.name, desc: data.desc, type: data.type, processor:data.processor, ram: data.ram, screen: data.screen, color:data.color,hd:data.hd } };

            database.collection("item_data").updateOne(condition, newvalues, function (err, res) {
                if (err) {
                    return reject(err);
                }
                console.log('Updated data');
                db.close();
                return resolve(1);
            })
               
            
        });

    })
}