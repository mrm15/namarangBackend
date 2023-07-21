const express = require('express');
const router = express.Router();
const Products = require('../models/products')

router.get('/', async (req, res) => {

  const searchOptions = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};

  console.log('searchOptions', searchOptions)
  try {

    const products = await Products.find(searchOptions);
    // res.render('authors/index', {authors: authors, searchOptions: req.query.name})
    res.send({
      status: true,
      data: products
    })
  } catch (err) {

    res.send({
      status: false,
      data: [],
      message: err
    })
  }
});

//new product
router.get('/new', (req, res) => {
  // res.render('authors/new', {author: new Author()})
});

router.post('/', async (req, res) => {


  const product = new Products({
    name: req.body.name,
    description: req.body.description,
    unit: req.body.unit,
    price: req.body.price,
    number: 1,
  });
  try {
    const newProduct = await product.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.send({
      status: true,
      message: "کالا ثبت شد",
    })


  } catch (err) {
    res.send({
      status: false,
      message: err,
    })

  }
  // res.send(req.body.name)
})

module.exports = router
