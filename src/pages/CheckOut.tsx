import { useState } from "react";
import { useCart } from "../context/CartContext";
import OrderConfirmation from "./OrderConfermation";
import { Package, MapPin, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";

interface DeliveryDetails {
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
}

type DeliveryField = keyof DeliveryDetails;

const Checkout = () => {
  const { cartTotal, clearCart, cart } = useCart();

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!deliveryDetails.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!deliveryDetails.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!deliveryDetails.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!deliveryDetails.zip.trim()) {
      newErrors.zip = "Zip code is required";
    } else if (!/^\d{4,}$/.test(deliveryDetails.zip)) {
      newErrors.zip = "Please enter a valid zip code";
    }

    if (!deliveryDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(deliveryDetails.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10+ digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartTotal <= 0 || cart.length === 0) {
      alert("Your cart is empty. Please add some products first.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // প্রোডাক্টের তালিকা ইমেইলের জন্য পর পর সাজানো
    const itemsFormatted = cart
      .map(
        (item, index) =>
          `${index + 1}. Product: ${item.name} | Quantity: ${item.quantity} | Unit Price: ৳${item.price} | Total: ৳${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const templateParams = {
      name: deliveryDetails.name,
      phone: deliveryDetails.phone,
      address: deliveryDetails.address,
      city: deliveryDetails.city,
      zip: deliveryDetails.zip,
      total_price: `৳${cartTotal.toFixed(2)}`,
      order_items: itemsFormatted,
    };

    try {
      await emailjs.send(
        "service_job04ro",
        "template_87zis0h",
        templateParams,
        "_OYXvALcWdjQBD040"
      );
      console.log("Order email notification sent successfully!");
    } catch (error) {
      console.error("Failed to send order email notification:", error);
    } finally {
      setIsSubmitting(false);
      clearCart();
      setIsConfirmed(true);
    }
  };

  if (isConfirmed) {
    return <OrderConfirmation deliveryDetails={deliveryDetails} />;
  }

  const inputFields: { key: DeliveryField; label: string; type: string; placeholder: string }[] = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { key: "address", label: "Street Address", type: "text", placeholder: "Enter your street address" },
    { key: "city", label: "City", type: "text", placeholder: "Enter your city" },
    { key: "zip", label: "Zip Code", type: "number", placeholder: "Enter zip code" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "Enter phone number" },
  ];

  return (
    <div className="container mx-auto px-4 pt-8 md:px-8">
      <h2 className="mb-10 text-5xl font-extrabold tracking-tight text-white">
        Finalize Order
      </h2>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Shipping Information */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl lg:col-span-2">
          <h3 className="mb-6 flex items-center space-x-3 border-b border-gray-700 pb-4 text-3xl font-bold text-orange-400">
            <MapPin className="h-7 w-7 text-orange-500" />
            <span>Shipping Information</span>
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {inputFields.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <label htmlFor={key} className="mb-2 block text-sm font-semibold text-gray-300">
                    {label}
                  </label>
                  {errors[key] && (
                    <span className="text-xs font-medium text-red-400">{errors[key]}</span>
                  )}
                </div>

                <div className="relative">
                  {key === "phone" && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <Phone className="h-5 w-5" />
                    </div>
                  )}

                  <input
                    type={type}
                    id={key}
                    name={key}
                    value={deliveryDetails[key]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className={`mt-1 block w-full rounded-xl border bg-gray-800 px-5 py-3 text-white shadow-inner outline-none transition duration-300 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                      key === "phone" ? "pl-12" : ""
                    } ${
                      errors[key]
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  />
                </div>

                {key === "phone" && (
                  <p className="mt-1 text-xs text-gray-500">
                    We'll use this to contact you about your delivery
                  </p>
                )}
              </div>
            ))}

            <div className="pt-6">
              <button
                type="submit"
                disabled={cartTotal <= 0 || cart.length === 0 || isSubmitting}
                className={`flex w-full items-center justify-center space-x-2 rounded-full py-4 text-xl font-extrabold uppercase tracking-wider text-white shadow-lg transition duration-300 ${
                  cartTotal <= 0 || cart.length === 0 || isSubmitting
                    ? "cursor-not-allowed bg-gray-600 opacity-60"
                    : "cursor-pointer bg-orange-600 shadow-orange-800/50 hover:bg-orange-700 hover:ring-4 hover:ring-orange-500/30"
                }`}
              >
                <span>
                  {isSubmitting
                    ? "Processing Order..."
                    : cartTotal <= 0 || cart.length === 0
                    ? "Cart is Empty"
                    : `৳ Pay and Confirm Order (৳${cartTotal.toFixed(2)})`}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="sticky top-20 h-fit rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl lg:col-span-1">
          <h3 className="mb-5 flex items-center space-x-2 border-b border-gray-700 pb-3 text-3xl font-bold text-white">
            <Package className="h-6 w-6 text-orange-400" />
            <span>Summary</span>
          </h3>

          <div className="space-y-4 text-gray-400">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-gray-800 pb-2 text-base"
                >
                  <span className="truncate text-gray-300">{item.name}</span>
                  <span className="font-medium text-orange-300">
                    ৳{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-5 text-center text-gray-500">Your cart is empty</p>
            )}

            <div className="flex justify-between text-xl">
              <span>Subtotal:</span>
              <span className="font-semibold text-white">৳{cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl">
              <span>Shipping:</span>
              <span className="font-semibold text-green-400">Free</span>
            </div>

            <div className="flex justify-between border-t border-gray-700 pt-6">
              <span className="text-2xl font-extrabold text-white">Total Due:</span>
              <span className="text-3xl font-extrabold text-orange-400">
                ৳{cartTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;