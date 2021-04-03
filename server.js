require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const {Global, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middlaware')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); // mensagens salvas em sessions
const helmet = require('helmet'); /// deixa o head mais seguro
const csrf = require('csurf');

app.use(helmet())
app.use(express.urlencoded({ extended: true })); //Permitindo enviar formulários dentro da aplicação
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public'))); //Imagens, css, 
app.use(flash());


//Database
mongoose.connect( process.env.CONNECTDB , { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Conectado ao banco de dados.")
    app.emit('check')
  })
  .catch(e => console.log(e))

const sessionOptions = session({
  secret: process.env.SECRETSESSION,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTDB }),
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

app.use(sessionOptions);

//Engine
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(csrf())
app.use(Global);
app.use(checkCsrfError);
app.use(csrfMiddleware);

//Rotas
app.use(routes);

app.on('check', () => {
  app.listen(3000, () => {
    console.log('Servidor executando na porta 3000');
  })
})
