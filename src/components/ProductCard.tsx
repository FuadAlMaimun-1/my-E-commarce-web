import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl transition duration-500 hover:scale-[1.03] hover:shadow-orange-900/40">
      <Link
        to={`/product/${product.id}`}
        className="relative block cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover object-center transition duration-500 group-hover:scale-110 group-hover:opacity-90"
        />

        <div className="absolute bottom-0 left-0 rounded-tr-xl bg-orange-600/95 px-5 py-2 text-xl font-extrabold text-white shadow-lg">
          ৳{product.price.toFixed(2)}
        </div>
      </Link>

      <div className="flex grow flex-col p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 line-clamp-1 cursor-pointer text-2xl font-extrabold text-white transition duration-200 hover:text-orange-400">
            {product.name}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-3 text-sm text-gray-400">
          {product.description}
        </p>

        <div className="mb-4 flex items-center text-xs text-gray-500">
          <span className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 font-semibold">
            {product.category}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-orange-600 py-3 font-bold uppercase tracking-wide text-white shadow-lg shadow-orange-800/50 transition duration-300 hover:bg-orange-700 hover:ring-4 hover:ring-orange-500/30"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;