const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn');
const User = require('./models/User');

const Usar = require('./models/User');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.render('home');
})

app.get('/user/create', (req, res)=>{
    return res.render('userAdd')
})
app.post('/user/create', async (req, res)=>{
    const {name, occupation} = req.body
    let newsletter = req.body.newsletter

    console.log(name, occupation, newsletter)

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name, occupation, newsletter})
    return res.redirect('/')
})

conn.sync().then(() => {
    app.listen(3333, () => {
        console.log('Servidor Onlline');
    })
}).catch((err) => console.log(err)) 