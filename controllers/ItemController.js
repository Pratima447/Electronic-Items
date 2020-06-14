var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"; 

var local_url = require('url');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        let ext_array = file.mimetype.split("/");
        let extension = ext_array[ext_array.length - 1];
        // cb(null, file.originalname + '.' + extension);
        cb(null, file.originalname);

    }
})

var insert_DB = require('../controllers/insert_item_data.js');
var update_DB = require('../controllers/update_item_data.js');
var delete_DB = require('../controllers/delete_item.js');
var get_item_data = require('../controllers/get_item_data.js');

exports.get_items = function (req, res) {
   
    MongoClient.connect(url, (err, db) => {
        if (err) {
            res.send({
                'msg': 'Eror occured, please try again',
                'status': 0
            });
        }
        var database = db.db('electronic_items');
        database.collection("item_data").find({}).toArray(function (err, result) {
            if (err) {
                res.send({
                    'msg': 'Eror occured, please try again',
                    'status': 0
                });
            } else if (result != null) {
                // console.log(result);
                res.send({
                    'msg': 'Got item data',
                    'status': 1,
                    data : result
                });

            } else {
                res.send({
                    'msg': 'No data!!',
                    'status': 0
                });
            }
            db.close();
        })    
    });
}

exports.save_img = function (req, res) {
    let upload = multer({ storage: storage }).single('pic');

    upload(req, res, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send(req.file.path);
        }
    })
}


exports.save_item = function (req, res) {

    var name       = req.body.name;
    var desc       = req.body.desc;
    var type       = req.body.type;
    var attributes = req.body.attributes;
    var pic_path = 'uploads/' + req.body.pic_name;

    if (type == 'mobile') {
        var processor = attributes[0];
        var ram = attributes[1];
        var screen = attributes[2];
        var color = attributes[3];
        var hd = null;

    } else {
        var processor = attributes[0];
        var ram = attributes[1];
        var hd = attributes[2];
        var color = null;
        var screen = null;
    }   

    var item_data = {
        'name': name,
        'desc': desc,
        'type': type,
        'processor': processor,
        'ram': ram,
        'screen': screen,
        'color': color,
        'hd': hd,
        'pic': pic_path
    };

    var result = insert_data();

    if (result) {
        res.send({ 'msg': ' Item data Inserted successfully..' });
    } else {
        res.send('Sorry, Try Again');
    }
    async function insert_data() {
        try {
            let result = await (insert_DB.save_now(item_data));
            if (result) {
                return 1;
            } else {
                return 0;
            }
          
        } catch (error) {
            console.log('Error Occurred');
            console.log(error);
            res.send('Sorry, Try Again');
        }
    }
}

exports.get_details = function (req, res) {
    var id = req.body.item_id;
    var result = get_data(id);

    console.log('sending dtaa....')
    if (result != 0) {
        res.send(result);
    } else {
        res.send('Sorry, Try Again');
    }
    async function get_data(id) {
        try {
            var result = await get_item_data.get_data(id);
            console.log('done with promise');
            return (res.send(result));
            return result;
          
        } catch (error) {
            console.log('Error Occurred');
            console.log(error);
            return 0;
        }
    }
    
}

exports.edit_item = function (req, res) {
    var url_parts = local_url.parse(req.url, true);
    var query = url_parts.query;
    var id = query.id;
    
    var result = get_data(id);

    async function get_data(id) {
        try {
            var result = await get_item_data.get_data(id);
            res.render('home/edit_item',{data:result})
          
        } catch (error) {
            console.log('Error Occurred');
            console.log(error);
            return 0;
        }
    }
    
}
exports.update_item = function (req, res) {
    var id         = req.body.id;
    var name       = req.body.name;
    var desc       = req.body.desc;
    var type       = req.body.type;
    var attributes = req.body.attributes;
    var pic_path = 'uploads/' + req.body.pic_name;

    if (type == 'mobile') {
        var processor = attributes[0];
        var ram = attributes[1];
        var screen = attributes[2];
        var color = attributes[3];
        var hd = null;

    } else {
        var processor = attributes[0];
        var ram = attributes[1];
        var hd = attributes[2];
        var color = null;
        var screen = null;
    }   

    var item_data = {
        'id': id,
        'name': name,
        'desc': desc,
        'type': type,
        'processor': processor,
        'ram': ram,
        'screen': screen,
        'color': color,
        'hd': hd,
        'pic': pic_path
    };

    console.log(item_data);
    update_data();


    async function update_data() {
        try {
            let result = await (update_DB.save_now(item_data));
            if (result) {
                res.send({ 'msg': ' Item data Updated successfully..' });
            }
          
        } catch (error) {
            console.log('Error Occurred');
            console.log(error);
            res.send('Sorry, Try Again');
        }
    }

}

exports.delete_item = function (req, res) {
    var id = req.body.item_id;
    console.log('id=' + id);
    
    delete_data(id);
    async function delete_data(id) {
        try {
            let result = await (delete_DB.delete_now(id));
            if (result) {
                res.send({ 'msg': ' Item data Deleted successfully..' });
            }
        
        } catch (error) {
            console.log('Error Occurred');
            console.log(error);
            res.send('Sorry, Try Again');
        }
    }

}