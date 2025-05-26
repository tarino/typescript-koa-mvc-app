const items = [
  { id: 1, name: 'Item 1 change' },
  { id: 2, name: 'Item 2 change' },
  { id: 3, name: 'Item 3' },
];

module.exports = {
  getAll: () => items,
  getById: (id) => items.find(item => item.id === parseInt(id)),
};
