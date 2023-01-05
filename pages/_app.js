import { Inter } from "@next/font/google";

import MenuItem from "../components/MenuItem";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
      <nav className="bg-white bottom-0 fixed w-full">
        <ul className="flex items-center justify-center">
          <MenuItem name="home">Home</MenuItem>
          <MenuItem name="categories">Categories</MenuItem>
          <MenuItem name="cart">Cart</MenuItem>
          <MenuItem name="wishlist">Wishlist</MenuItem>
          <MenuItem name="account">Account</MenuItem>
        </ul>
      </nav>
    </main>
  );
}
