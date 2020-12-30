import Product from './Product';

const Products = ({ products }) => (
  <ol className='product-list'>
    {products.map((product, index) => (
      <Product key={index} product={product} />
    ))}
  </ol>
);

export default Products;
