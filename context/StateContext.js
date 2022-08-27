import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantitites, setTotalQuantitites] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //   add na sacola

  const onAdd = (product, quantity) => {
    //adicionar e indentificar se ja existe o produto no carrinho

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    // atualizar preço total carrinho confrome aumentar a qualidade
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    //   atualizar quantidade
    setTotalQuantitites(
      (prevTotalQuantitites) => prevTotalQuantitites + quantity
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} adicionado ao carrinho!`);
  };
  // remover produto da sacola
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantitites(
      (prevTotalQuantitites) => prevTotalQuantitites - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  //aumentar e diminuir produto do carrinho atualizando preço
  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantitites((prevTotalQuantitites) => prevTotalQuantitites + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantitites((prevTotalQuantitites) => prevTotalQuantitites - 1);
      }
    }
  };

  //  aumentar e diminuir produto
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantitites,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuanitity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
