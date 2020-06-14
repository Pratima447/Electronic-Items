// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path    = require("path");
var router    = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' })

// let upload = multer({ storage: storage }).single('pic');

var login_controlller = require('./controllers/LoginController.js');
var item_controller = require('./controllers/ItemController.js');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());

/**
 *  App Configuration
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


/**
 * Routes Definitions
 */

app.post('/add_user', login_controlller.add_user);

app.get('/', (req, res) => {
    var is_valid = req.cookies.login_id;
    if (is_valid != null) {
        res.redirect('/items');
    } else {
        res.render('home/login');
    }
});

app.get('/items', (req, res) => {
    var is_valid = req.cookies.login_id;
    if (is_valid == null) {
        res.redirect('/');
    } else {
        res.render('home/all_items');
    }
});


app.post('/login', login_controlller.check_credentials);
app.post('/logout', login_controlller.log_out);

app.post('/items', item_controller.get_items);
app.post('/save_img',item_controller.save_img);
app.post('/create', item_controller.save_item);
app.get('/get_details', item_controller.get_details);
app.post('/update_item', item_controller.update_item);
app.post('/delete_item', item_controller.delete_item);
app.get('/edit_item', item_controller.edit_item);
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});