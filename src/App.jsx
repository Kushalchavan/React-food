import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

const App = () => {
  return (
    <div className="w-full px-36 py-10 max-md:px-28">
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart/>
          <Checkout/>
        </CartContextProvider>
      </UserProgressContextProvider>
    </div>
  );
};

export default App;
