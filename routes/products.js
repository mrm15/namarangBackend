const express = require('express');
const router = express.Router();
const Author = require('../models/author')

router.get('/', async (req, res) => {

  const searchOptions = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};

  console.log('searchOptions', searchOptions)
  try {

    const authors = await Author.find(searchOptions);
    res.render('authors/index', {authors: authors, searchOptions: req.query.name})
  } catch {
    console.log('errrrror')
    res.redirect('/')
  }
});

//new author
router.get('/new', (req, res) => {
  res.render('authors/new', {author: new Author()})
});

router.post('/', async (req, res) => {
  // const authors = await Author.find({name:'test'});
  //
  //
  //
  //
  // res.send({
  //   status: true,
  //   authors
  //
  // })
  //
  // return;

  console.log("req.body.name:", req.body.name)
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`/authors`);


  } catch {
    console.log("there is a error");
    res.render('authors/new', {
      author: author, errorMessage: 'Error Creating  New User!'
    })

  }
  // res.send(req.body.name)
})

module.exports = router
