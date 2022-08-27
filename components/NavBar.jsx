import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { MdRestaurantMenu, MdHome } from "react-icons/md";
import { GiBarbecue } from "react-icons/gi";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const NavBar = () => {
  const { showCart, setShowCart, totalQuantitites } = useStateContext();
  return (
    <div className="navbar-container">
      <ul className="ul-nav">
        <Link href="/">
          <li>
            <MdHome /> Home
          </li>
        </Link>
        <Link href="/menu">
          <li>
            <MdRestaurantMenu /> Cardápio
          </li>
        </Link>
      </ul>

      <div className="logo">
        <GiBarbecue />
        <p>BurguerScript</p>
      </div>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantitites}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
