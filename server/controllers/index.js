const Books = require('../models');

module.exports = {
  create: (req, res) => {
    const new_book = new Books();
    new_book.name = req.body.name;
    new_book.count = req.body.count;

    new_book.save((err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        res.status(201).json(book);
      } else {
        // [WIP] - Add check for book exists
        res.status(409).json({message: 'Book already exists'});
      }
    });
  },

  findOne: (req, res) => {
    Books.findById({_id: req.params.id}, (err, book) => {
      err ? res.status(404).send(err) : res.status(200).json(book);
    });
  },

  findAll: (req, res) => {
    Books.find({}, (err, books) => {
      err ? res.status(404).send(err) : res.status(200).json(books);
    });
  },

  update: (req, res) => {
    Books.findById({_id: req.params.id}, (err, book) => {
      if (req.body.name) {book.name = req.body.name}
      if (req.body.available) {book.available = req.body.available}
      if (req.body.count) {book.count = req.body.count}

      book.save(() => {
        err ? res.status(404).send(err) : res.status(200).json(book);
      });
    });
  },

  delete: (req, res) => {
    Books.findByIdAndRemove({_id: req.params.id}, (err) => {
      err ? res.status(404).send(err) : res.status(200).json({message: 'Book Deleted!'});
    })
  }
};
