import { useContext } from "react";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
  }, 0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  };

  return (
    <header className="w-full flex justify-between items-center">
      <div className="flex justify-center items-center gap-2">
        <img
          src={logo}
          alt="Food logo"
          width={40}
          height={40}
          className="outline outline-yellow-400 object-center rounded-full"
        />
        <h1 className="text-2xl font-semibold uppercase text-yellow-400 tracking-widest">
          ReactFood
        </h1>
      </div>
      <div>
        <button
          className="outline-none border-none text-xl text-yellow-400 tracking-wider"
          onClick={handleShowCart}
        >
          Cart ({totalCartItems})
        </button>
      </div>
    </header>
  );
};

export default Header;
