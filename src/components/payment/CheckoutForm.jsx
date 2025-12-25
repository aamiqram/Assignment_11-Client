import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../utils/axiosSecure";
import { FiCreditCard, FiLock, FiCheck } from "react-icons/fi";

const CheckoutForm = ({ order, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setProcessing(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        totalAmount: order.price * order.quantity * 100,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: order.userEmail || "anonymous@example.com",
            name: order.userEmail.split("@")[0],
          },
        },
      });

      if (result.error) {
        Swal.fire({
          title: "Payment Failed",
          text: result.error.message,
          icon: "error",
        });
      } else if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.patch(`/orders/${order._id}/pay`);
        Swal.fire({
          title: "Success!",
          text: "Payment completed successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Payment failed. Please try again.",
        icon: "error",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
          <FiCreditCard className="w-6 h-6 text-primary-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Complete Payment
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Pay securely with your card
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-neutral-600 dark:text-neutral-400">Meal:</span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {order.mealName}
          </span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-neutral-600 dark:text-neutral-400">
            Quantity:
          </span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {order.quantity}
          </span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-neutral-600 dark:text-neutral-400">
            Price per plate:
          </span>
          <span className="font-medium text-neutral-900 dark:text-white">
            ৳{order.price}
          </span>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-600 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              Total:
            </span>
            <span className="text-2xl font-bold text-primary-600">
              ৳{order.price * order.quantity}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Details */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Card Details
          </label>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#374151",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <FiLock className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">
              Secure Payment
            </p>
            <p className="text-xs text-green-600 dark:text-green-500">
              Your payment is secured with 256-bit SSL encryption. We never
              store your card details.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <FiCheck className="w-5 h-5" />
              Pay ৳{order.price * order.quantity}
            </>
          )}
        </button>

        {/* Test Card Info */}
        <div className="text-center">
          <p className="text-sm text-neutral-500 mb-2">Test card for demo:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
            <code className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300">
              <strong>4242 4242 4242 4242</strong>
            </code>
            <span className="text-neutral-500">• Any expiry • Any CVC</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
