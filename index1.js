var express = require("express")
var mongoose = require("mongoose")
var bodyparser = require("body-parser")

var app = express();
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://0.0.0.0:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})
app.post("/log_in", (req, res) => {
    var userName = req.body.email;
    var pass = req.body.password;
    

    const userMail = db.collection('users').findOne({email:userName}, (err, res) => {
        if (res===null) {
            console.log("Invalid User");
            
        }
        else if (err) {
            throw err;
        }
        if (res.password === pass) {
            
            console.log("Valid User");
            
          
        }
        else {
            
            console.log("Password Does Not Match !...")
            
            
            
        }
    });

    

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('register.html');
}).listen(400);

console.log("Hello this is 400 port !...");