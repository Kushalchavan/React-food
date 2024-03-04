import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./Modal";
import { currencyFormater } from "./util/formater";
import UserProgressContext from "../store/UserProgressContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => {
    userProgressCtx.hideCart();
  };

  const handleGoToCheckout = () => {
    userProgressCtx.showCheckout();
  };

  return (
    <Modal
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2 className="mb-3 font-semibold">Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4 mt-3 mb-3">
            <p>
              {item.name} - {item.quantity} x{" "}
              {currencyFormater.format(item.price)}
            </p>
            <p className="flex gap-4">
              <button
                onClick={() => cartCtx.removeItems(item)}
                className="w-5 rounded-full bg-meal-background text-text-color font-bold"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => cartCtx.addItems(item.id)}
                className="w-5 rounded-full bg-meal-background text-text-color font-bold"
              >
                +
              </button>
            </p>
          </li>
        ))}
      </ul>
      <p className="font-semibold">{currencyFormater.format(cartTotal)}</p>
      <div className="flex justify-end gap-5">
        <button onClick={handleCloseCart}>Close</button>
        {cartCtx.items.length > 0 && (
          <button
            onClick={handleGoToCheckout}
            className="outline-none border-none px-4 py-1 bg-yellow-400 text-gray-800 rounded shadow-md hover:bg-yellow-500"
          >
            Go To Checkout
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
