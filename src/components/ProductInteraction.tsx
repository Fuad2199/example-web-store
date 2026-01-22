'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductType } from "../types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import useCartStore from "../store/cartStore";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  // --- URL param update ---
  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // --- Add to cart ---
  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: product.id ?? "Product ID Missing",
      name: product.name ?? "Unnamed Product",
      price: product.price,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart");
  };

  // --- Quantity change ---
  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // --- Buy now / Checkout ---
const handleBuyNow = async () => {
  try {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        quantity,
        selectedSize,
        selectedColor,
      }),
    });

    const { clientSecret } = await res.json();

    if (!clientSecret) throw new Error("Failed to create payment intent");

    router.push(`/checkout?clientSecret=${clientSecret}`);
  } catch (error) {
    console.error(error);
    toast.error("Failed to start checkout");
  }
};


  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              key={size}
              className={`cursor-pointer border p-0.5 ${
                selectedSize === size ? "border-gray-200" : "border-gray-300"
              }`}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-6 h-6 text-center flex items-center justify-center ${
                  selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              key={color}
              className={`cursor-pointer border p-0.5 ${
                selectedColor === color ? "border-gray-300" : "border-white"
              }`}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className="w-6 h-6" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>

      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>

      {/* BUY NOW / CHECKOUT BUTTON */}
      <button
        onClick={handleBuyNow}
        className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 text-sm font-medium"
      >
        <ShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>
    </div>
  );
};

export default ProductInteraction;
