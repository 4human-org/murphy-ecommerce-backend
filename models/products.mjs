// Purpose: Define the Product class.

// This can be used to create a new product object with the provided properties.

class Product {
  constructor({
    id = "",
    name = "",
    price = 0,
    description = "",
    imagesUrl = [],
    sourcing = "",
    stock = 0,
    categories = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imagesUrl = imagesUrl;
    this.sourcing = sourcing;
    this.stock = stock;
    this.categories = categories;
  }
}

export default Product;
