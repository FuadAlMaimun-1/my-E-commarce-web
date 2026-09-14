import { CheckCircle, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DeliveryDetails {
  name?: string
  phone?: string
  address?: string
  city?: string
  zip?: string
}

interface OrderConfirmationProps {
  deliveryDetails?: DeliveryDetails
}

const OrderConfirmation = ({ deliveryDetails }: OrderConfirmationProps) => {
  return (
    <div className="container mx-auto md:px-8 pt-12 pb-16">
      <div className="p-8 sm:p-12 bg-gray-900 rounded-3xl shadow-2xl max-w-2xl mx-auto text-center border border-green-600/50 text-white">
        <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto mb-6 drop-shadow-lg" />
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Order Confirmed!
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-8">
          Your transaction is complete. We have received your order details and will process it shortly.
        </p>

        {/* Shipping Summary Box */}
        <div className="w-full p-6 bg-green-950/40 border border-green-800/60 rounded-2xl text-left space-y-3 text-gray-200">
          <h3 className="text-xs uppercase tracking-wider font-bold text-green-400 border-b border-green-800/50 pb-2">
            Shipping Address
          </h3>

          <div className="space-y-1 font-mono text-sm sm:text-base">
            <p className="font-bold text-lg text-green-300">
              {deliveryDetails?.name || "Customer Name"}
            </p>

            {deliveryDetails?.phone && (
              <p className="flex items-center space-x-2 text-green-400 font-sans text-sm py-1">
                <Phone className="w-4 h-4 text-green-500" />
                <span>{deliveryDetails.phone}</span>
              </p>
            )}

            <div className="flex items-start space-x-2 pt-1">
              <MapPin className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <div>
                <p>{deliveryDetails?.address}</p>
                <p>
                  {deliveryDetails?.city}
                  {deliveryDetails?.zip ? `, ${deliveryDetails.zip}` : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-8 w-full py-4 bg-orange-600 text-white font-extrabold rounded-full shadow-lg shadow-orange-900/50 cursor-pointer hover:bg-orange-700 transition duration-300 flex items-center justify-center space-x-2 uppercase tracking-wider text-sm sm:text-base hover:ring-4 hover:ring-orange-500/30"
        >
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation