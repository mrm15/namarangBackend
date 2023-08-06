// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').parse();
// }
const express = require('express');
const cors = require("cors");


const app = express();
app.use(cors({
  origin: '*'
}));
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts)
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(bodyParser.json());
// app.use(express.json()) // add to test


// const mongoURI = `mongodb+srv://root:09384642159@cluster0.l53kbk3.mongodb.net/`;
const mongoURI = `mongodb://127.0.0.1:27017/test`;


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log('Database Connected'));


const indexRouter = require('./routes/index');
app.use('/api', indexRouter);
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);
const productGroupRouter = require('./routes/productGroup');
app.use('/api/productGroup', productGroupRouter);


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});