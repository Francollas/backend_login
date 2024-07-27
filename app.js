const app = require(`express`)();
const http=require(`http`).Server(app);


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://frnbjr:30Rdqhp3a75y72L3@test-pro-db.qumop9d.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db")

const User = require('./models/userModel');

async function insert() {

    await User.create({
        name: 'frnbjr',
        email: 'fnbjr@gmail.com',
         
    });
}

insert();
http.listen(3000, function(){
    console.log('Server is running');
});