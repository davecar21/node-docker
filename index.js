const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json


const port = 8080;


const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/test', { useNewUrlParser: true }).then(()=>{
    console.log('DB connected.');
});

const Cat = mongoose.model('Cat', {
    username: String,
    password: String
});

app.post('/', async function(req, res) {
    try{
        const saltRounds = 10;
        let hashedPass = await bcrypt.hash(req.user.password, saltRounds);
        req.body.password = hashedPass;
        console.log(req.body);
        const kitty = new Cat(req.body);
        let userData = await kitty.save();
        return res.send(`${userData} ADDED!`);
    }catch(err){
        res.send('Error: ' + err);
    }
    
});

app.post('/login', function(req, res) {

})

app.get('/', function(req,res) {
    const cat = Cat.find({name: 'davecar'}, function(err, doc){
        res.send(`${JSON.stringify(doc)} is found.`);
    });
    
})


app.get('/', (req, res) => res.send('Hello Worlds!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))