import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../utils/axiosSecure";

const CheckoutForm = ({ order, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    setProcessing(true);

    try {
      // 1. Create payment intent on server
      const { data } = await axiosSecure.post("/create-payment-intent", {
        totalAmount: order.price * order.quantity * 100, // Stripe uses cents
      });

      // 2. Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: order.userEmail,
          },
        },
      });

      if (result.error) {
        Swal.fire("Payment Failed", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        // 3. Update order status on server
        await axiosSecure.patch(`/orders/${order._id}/pay`);
        Swal.fire("Success!", "Payment completed successfully!", "success");
        onSuccess(); // refresh orders list
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed. Try again.", "error");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-base-100">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-success btn-lg w-full"
      >
        {processing ? (
          <span className="loading loading-spinner"></span>
        ) : (
          `Pay ৳${order.price * order.quantity}`
        )}
      </button>

      <p className="text-sm text-center text-gray-500">
        Use test card: <strong>4242 4242 4242 4242</strong> • Any future date •
        Any CVC
      </p>
    </form>
  );
};

export default CheckoutForm;
