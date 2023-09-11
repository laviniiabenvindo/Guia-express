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

app.get('/users/:id', async (req, res)=>{
    const id = req.params.id
    console.log(id)
    const user = await User.findOne({raw: true, where: {id:id}})
    console.log(user)

    return res.render('viewuser', {user})
})

app.post('/users/delete/:id', async (req, res)=>{
    const id = req.params.id
    console.log(id)
    await User.destroy({where: { id:id }})
    return res.redirect('/')
})

app.get('/', async (req, res) => {
    const users = await User.findAll({raw: true})
    console.log(users)
    return res.render('home', {users});
})

conn.sync().then(() => {
    app.listen(3333, () => {
        console.log('Servidor Onlline');
    })
}).catch((err) => console.log(err)) 