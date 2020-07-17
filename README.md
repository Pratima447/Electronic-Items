# Electronic-Items
Application which stores electronic products into a remote database and performs CRUD on it

This simple system is developed using nodejs, mongoDb, css, html+ejs and javascript for performing the actions.

Steps to Deploy :
    sudo apt install nodejs
    sudo apt install npm
    sudo apt install -y mongodb
    npm i --save-dev nodemon
    nodemon index.js

API to create user account

URL : http://localhost:8000/add_user
parameters :  name, password
Method : POST

eg: http://localhost:8000/add_user?name=admin&password=admin
