const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(express.json());

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
    return;
  }
  console.log('Conexión a la base de datos establecida.');
});
app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use('/', routes());

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
