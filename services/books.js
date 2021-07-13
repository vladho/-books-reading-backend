// const { Book } = require('../models');

const getAll = (filter) => {
  //   return Book.find(filter);
  console.log('Yes man all');
};

const getOne = (id) => {
  //   return Book.findById(id);
  console.log('Yes man one');
};

const addOne = (body) => {
  //   return Book.create(body);
  console.log('Yes man add');
};

module.exports = { getAll, getOne, addOne };
