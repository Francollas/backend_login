const app = require(`express`)();
const http=require(`http`).Server(app);


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://frnbjr:pi7imy6w8ThT5ont@login.luwik3e.mongodb.net/?retryWrites=true&w=majority&appName=login")

const User = require('./models/userModel');

async function insert() {

    await User.create({
        name: 'FNBJ',
        email: 'fnbjr@gmail.com',
        password: 'pi7imy6w8ThT5ont',
    });
}
http.listen(3000, function(){
    console.log('Server is running');
});