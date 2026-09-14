import { useParams } from "react-router-dom";
import { initialProducts } from "../data/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Tag, Zap } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<
    (typeof initialProducts)[0] | undefined
  >();

  useEffect(() => {
    setProduct(initialProducts.find((data) => data.id === Number(id)));
  }, [id]);

  return (
    <>
     <div className="container mx-auto my-8 min-h-screen rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl md:p-12">
  {/* Back Button */}
  <Link to="/">
    <button className="mb-12 flex cursor-pointer items-center text-lg font-semibold text-gray-400 transition duration-150 hover:text-orange-400">
      <ChevronLeft className="mr-1 h-6 w-6" />
      <span>Back to All Products</span>
    </button>
  </Link>

  <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
    
    {/* Left: Image Card */}
    <div className="flex h-[360px] w-full items-center justify-center lg:w-[85%] rounded-2xl p-4 ">
      <img
        src={product?.image}
        alt={product?.name}
        className="max-h-100 max-w-[800px] object-contain rounded-xl"
      />
    </div>

    {/* Right: Product Info */}
    <div className="flex min-h-[360px] flex-col justify-between py-2 gap-5">
      
      {/* Product Name */}
      <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
        {product?.name}
      </h1>

      {/* Price */}
      <p className="text-3xl font-extrabold text-orange-400">
        ৳{product?.price?.toLocaleString("en-IN")}.00
      </p>

      {/* Overview */}
      <div className="space-y-4">
        <h2 className="flex items-center space-x-2 border-b border-gray-700 pb-3 text-xl font-bold text-gray-200">
          <Tag className="h-5 w-5 text-orange-500" />
          <span>Product Overview</span>
        </h2>

        <p className="text-base leading-relaxed text-gray-400">
          {product?.description}
        </p>

        <ul className="space-y-3 text-gray-300 p-4 bg-gray-800 rounded-xl border-gray-700">
          <li className="flex items-center space-x-3 text-lg">
            <Zap className="w-5 h-5 text-orange-500" />
            <span>High-Quality, Professional Grade Materials</span>
          </li>
          <li className="flex items-center space-x-3 text-lg">
            <Zap className="w-5 h-5 text-orange-500" />
            <span>Comprehensive 1-year Manufacturer Warranty</span>
          </li>
          <li className="flex items-center space-x-3 text-lg">
            <Zap className="w-5 h-5 text-orange-500" />
            <span>Immediate Shipping for In-Stock Items</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-3 pt-4">

  {/* Add to Cart Button */}
  <div className="grid gap-5">
    <button className="flex w-full cursor-pointer gap- items-center justify-center space-x-2 rounded-full bg-orange-600 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition duration-200 hover:bg-orange-700 active:scale-[0.99]">
    <ShoppingCart className="h-5 w-5" />
    <span>Add to Cart</span>
  </button>

  {/* Keep Shopping Button */}
  <button className="w-full cursor-pointer rounded-full border border-orange-600 bg-transparent py-3 text-sm font-bold uppercase tracking-wider text-orange-500 transition duration-200 hover:bg-orange-600/10 active:scale-[0.99]">
    Keep Shopping
  </button>
  </div>
</div>
    </div>

  </div>
</div>
    </>
  );
};

export default ProductDetail;
