var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
const app = express();
// const port = 3000;
const connectionparams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
    // const uri = process.env.MONGODB_URI;
mongoose.connect("mongodb+srv://joypradhan:SnLbw6q-p9dF6KS@cluster0.eqnuobf.mongodb.net/FullFledged?retryWrites=true&w=majority", connectionparams).then(() => { console.log("connected to the db") }).catch((e) => { console.log(e) })



var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    gender: String,
    desc: String
})
var Contact = mongoose.model('Contact', contactSchema);

app.use("/static", express.static("static"))
app.use(express.urlencoded())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    const params = {}
    res.render("index.ejs", params)
})
app.get("/About", (req, res) => {
    const params = {}
    res.render("aboutnew.ejs", params)
})
app.get("/Contact", (req, res) => {
    const params = {}
    res.render("Contact.ejs", params)
})

app.post("/Contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
            // res.send("This item is saved to the database")
            res.render("Successnew.ejs")
        }).catch(() => {
            // res.status(400).send("Item was not saved to database.")
            res.status(400).render("errornew.ejs")
        })
        // res.status(200).render("contact.pug")
})

app.listen(process.env.PORT || 5000)