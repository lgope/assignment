const Product = ({ product }) => (
  <li>
    <strong className='product-name'>Name : </strong>
    {product.name}
    <strong className='product-price'>Price : </strong> {product.price}
  </li>
);
export default Product;
