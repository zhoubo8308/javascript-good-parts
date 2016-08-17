function Product(name, price) {
  this.name = name;
  this.price = price;
 
  if (price < 0)
    throw RangeError('Cannot create product "' + name + '" with a negative price');
  return this;
	
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
Food.prototype = new Product();
 
function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}
Toy.prototype = new Product();
 
var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);