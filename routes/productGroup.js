const express = require('express');
const router = express.Router();
const ProductGroup = require('../models/productGroup')


//new product
router.post('/new', async (req, res) => {

  // res.send({stat:req.body.newCategory})
  const doc = {name: req.body.newCategory}
  const productGroup = new ProductGroup(doc);
  const isItThere = await ProductGroup.find(doc)
  try {
    if (isItThere.length !== 0) {
      res.send({
        status: false,
        message: "نام دسته بندی تکراری"
      })
      return
    }
    const newCategory = await productGroup.save();
    res.send({
      status: true,
      message: "دسته بندی ثبت شد",
      newCategory
    })
  } catch (err) {
    res.send({
      status: false,
      message: err
    })
  }


});

router.get('/', async (req, res) => {
  // res.render('authors/new', {author: new Author()})

  try {

    let productGroup = await ProductGroup.find({});

    const data = productGroup.map(row => {
      const label = row.name;
      const value = row['_id'];
      return {value, label}
    })
    // res.render('authors/index', {authors: authors, searchOptions: req.query.name})
    res.send({
      status: true,
      data: {productGroup:data}
    })
  } catch (err) {

    res.send({
      status: false,
      message: err
    })
  }


});

module.exports = router
