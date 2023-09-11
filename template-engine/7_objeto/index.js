const express = require('express')
const exphbs = require('express-handlebars')
const port = 3333

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.get('/dashboard', (req, res)=>{
    // receber --> insomnia
    const items = ['Item 01','Item 02','Item03']
    return res.render('dashboard', {items})
})

app.get('/post', (req, res)=>{
    const post = {
        title: 'Aprendendo NodeJs',
        category: 'JavaScript',
        body: 'Este arquivo vai te ajudar a aprender Handlebars.',
        comments: 8
    }

    return res.render('blogpost', {post})
})

app.get('/', (req, res)=>{
    const user = {
        name:'Carlos',
        surname:'Wilton',
        age: 31
    }
    const palavra = "teste"
    const auth = true
    const approved = false
    return res.render('home', {user:user, palavra, auth, approved}) 
})

app.listen(port, ()=>{
    console.log(`ON at ${port}`)
})