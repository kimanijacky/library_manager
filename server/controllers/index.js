const Books = require('../models');

module.exports = {
  create: () => {
    const new_book = new Book();
    new_book.name = req.body.name;

    new_book.save((err, book) => {
      if (err) {
        res.status(500).send(err)
      } else if (book) {
        res.status(201).json(book);
      } else {
        res.status(409).json({message: 'Book already exists'});
      }
    });
  },

  findOne: () => {
    Books.findById({_id: req.params.id}, (err, book) => {
      err ? res.status(404).send(err) : res.status(200).json(book);
    });
  },

  findAll: () => {
    Books.find({}, (err, books) => {
      err ? res.status(404).send(err) : res.status(200).json(books);
    });
  },

  update: () => {
    Books.findById({_id: req.params.id}, (err, book) => {
      if (req.body.name) {book.name = req.body.name}
      if (req.body.available) {book.available = req.body.available}
      if (req.body.count) {book.count = req.body.count}

      book.save(() => {
        err ? res.status(404).send(err) : res.status(200).json(book);
      });
    });
  },

  delete: () => {
    Books.findByIdAndRemove({_id: req.params.id}, (err) => {
      err ? res.status(404).send(err) : res.status(200).json({message: 'Book Deleted!'});
    })
  }
};
