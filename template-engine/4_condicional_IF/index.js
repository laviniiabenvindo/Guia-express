const express = require('express');
const exphbs = require('express-handlebars');

const port = 3333;

//UTILIZANDO O EXPRESS
const app = express();
//UTILIZANDO O HANDLEBARS
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})



app.get('/', (req, res)=>{
    const user = {
        name:'Carlos',
        surname: 'Wilton',
        age: 31
    }
    const palavra = 'teste'
    const auth = true
    const approved = false
    return res.render('home', {user:user, palavra, auth, approved})
});

app.listen(port, ()=>{
    console.log(`localhost ${port} 🚀`);
});