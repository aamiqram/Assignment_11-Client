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

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setProcessing(true);

    try {
      // Create payment intent on server
      const { data } = await axiosSecure.post("/create-payment-intent", {
        totalAmount: order.price * order.quantity * 100, // cents
      });

      // Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: order.userEmail || "anonymous@example.com",
          },
        },
      });

      if (result.error) {
        Swal.fire("Payment Failed", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        // Update payment status on server
        await axiosSecure.patch(`/orders/${order._id}/pay`);
        Swal.fire("Success!", "Payment completed!", "success");
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed. Try again.", "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="p-4 border rounded-box bg-base-200">
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
        className="btn btn-success btn-lg w-full mt-6"
      >
        {processing ? (
          <>
            <span className="loading loading-spinner"></span>
            Processing...
          </>
        ) : (
          `Pay ৳${order.price * order.quantity}`
        )}
      </button>

      <p className="text-sm text-center mt-4 text-gray-500">
        Test card: <strong>4242 4242 4242 4242</strong> • Any expiry • Any CVC
      </p>
    </form>
  );
};

export default CheckoutForm;
