import { CartProvider } from "../app/context/CartContext";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <CartProvider>
      <Slot />
    </CartProvider>
  );
}
