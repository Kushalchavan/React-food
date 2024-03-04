import { useContext } from "react";

import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currencyFormater } from "./util/formater";
import Input from "../components/UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

   // Sending request to out dummy backend..
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries()); // example@gmail.com

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

  };

  let actions = (
    <>
      <button type="button" onClick={handleClose}>
        Close
      </button>
      <button className="outline-none border-none px-4 py-1 bg-yellow-400 text-gray-800 rounded shadow-md hover:bg-yellow-500">
        Submit Order
      </button>
    </>
  );

  if (isSending) {
    actions = <span className="font-semibold">Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2 className="font-bold text-xl mb-2">Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="flex justify-end">
          <button
            onClick={handleFinish}
            className=" mt-2 outline-none border-none px-4 py-1 bg-yellow-400 text-gray-800 rounded shadow-md hover:bg-yellow-500"
          >
            Okay
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl mb-3">Checkout</h2>
        <p className="mb-3 font-semibold">
          Total Amount : {currencyFormater.format(cartTotal)}
        </p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="flex gap-4">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="w-full mt-5 flex justify-end gap-4">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
