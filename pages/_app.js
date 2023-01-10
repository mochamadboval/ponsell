import { Inter, Libre_Barcode_39_Text } from "@next/font/google";

import { Fragment } from "react";

import MenuItem from "../components/MenuItem";

import "../styles/globals.css";

const libreBarcode39Text = Libre_Barcode_39_Text({
  subsets: ["latin"],
  weight: "400",
});
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <header
        className={`${libreBarcode39Text.className} bg-white border-b-2 border-white fixed py-1 shadow-sm top-0 w-full`}
      >
        <h1 className="text-4xl text-center">Ponsell</h1>
      </header>
      <main className={`${inter.className} py-12 text-sm`}>
        <nav className="bg-white bottom-0 fixed shadow-sm w-full z-50">
          <ul className="flex items-center justify-center">
            <MenuItem name="home">Home</MenuItem>
            <MenuItem name="categories">Categories</MenuItem>
            <MenuItem name="cart">Cart</MenuItem>
            <MenuItem name="wishlist">Wishlist</MenuItem>
            <MenuItem name="account">Account</MenuItem>
          </ul>
        </nav>
        <Component {...pageProps} />
      </main>
    </Fragment>
  );
}
