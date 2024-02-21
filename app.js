const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json());

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

    //   Defining Mongoose schema
    const contactSchema = new mongoose.Schema({
        name: String,
        age: String,
        gender: String,
        phone: String,
        email: String,
        desc: String,
    });

    const contact = mongoose.model('contact', contactSchema);

    app.post('/contact', (req, res) => {
        var myData = new contact(req.body);
        myData.save().then(() => {
            res.send("This item has been saved to the database")
        }).catch(() => {
            res.status(400).send("This item was not saved to the database")
        });
        // res.status(200).render('contact.pug');
    })
}
const port = 8000;

// EXPRESS SPECIFIC STUFF
// app.use(express.static('static', options))
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})



app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/classes', (req, res) => {
    const params = {}
    res.status(200).render('classes.pug', params);
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
