import SerchFilter from "../components/SerchFilter";
import CategoryFilter from "../components/CategoryFilter";

import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const context = useCart();
  const products = context?.products || [];
  console.log();
  return (
    <div>
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <SerchFilter />
        <CategoryFilter />

        <h2 className="text-2xl font-extrabold mx-auto px-4 md:px-4 pt-4">
          Featured Gear ({products.length} Items)
        </h2>
      </div>
      <div className="container mx-auto px-4 md:px-8">
        <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
