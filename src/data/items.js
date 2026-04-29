const { v4: uuidv4 } = require('uuid');

const items = [
  {
    id: uuidv4(),
    name: 'Notebook Dell XPS',
    description: 'Laptop 15 polegadas, 16GB RAM, 512GB SSD',
    price: 7499.99,
    category: 'electronics',
    inStock: true,
    createdAt: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Teclado Mecânico Keychron K2',
    description: 'Teclado compacto 75%, switches Brown',
    price: 599.9,
    category: 'peripherals',
    inStock: true,
    createdAt: new Date('2026-02-14T14:30:00Z').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Monitor LG UltraWide 34"',
    description: 'Monitor curvo 34 polegadas, resolução 3440x1440',
    price: 3299.0,
    category: 'electronics',
    inStock: false,
    createdAt: new Date('2026-03-05T09:15:00Z').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Mouse Logitech MX Master 3',
    description: 'Mouse ergonômico sem fio com scroll magnético',
    price: 449.9,
    category: 'peripherals',
    inStock: true,
    createdAt: new Date('2026-04-01T11:00:00Z').toISOString(),
  },
];

module.exports = items;
