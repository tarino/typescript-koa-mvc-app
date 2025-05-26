const itemModel = require('../models/item');
const ejs = require('ejs');
const path = require('path');

module.exports = {
  index: async (ctx) => {
    const items = itemModel.getAll();
    await ctx.render('index', { items });
  },
  show: (ctx) => {
    const item = itemModel.getById(ctx.params.id);
    if (item) {
      ctx.body = `Item ID: ${item.id}, Name: ${item.name}`;
    } else {
      ctx.status = 404;
      ctx.body = 'Item not found';
    }
  }
};
