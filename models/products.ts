type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  categories?: string[];
  imagesUrl?: string[];
  stock?: number;
  sourcing?: string;
};

export default Product;
