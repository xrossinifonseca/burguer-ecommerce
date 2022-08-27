import React, { useState } from "react";
import { client, urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";

// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { FooterBanner, HeroBanner } from "../components";

export default function Menu({ products, camps }) {
  const { qty, decQty, incQty, onAdd } = useStateContext();
  const [menuHamb, setMenuHamb] = useState(false);
  const [menuAcomp, setMenuAcomp] = useState(false);

  const ShowMenuHamb = () => {
    menuHamb ? setMenuHamb(false) : setMenuHamb(true);
    setMenuAcomp(false);
  };
  const ShowMenuAcomp = () => {
    menuAcomp ? setMenuAcomp(false) : setMenuAcomp(true);
    setMenuHamb(false);
  };

  return (
    <>
      <div className="menu-heading">
        <button type="button" className="btn-hamb" onClick={ShowMenuHamb}>
          Hambugueres
        </button>

        <button type="button" className="btn-acamp" onClick={ShowMenuAcomp}>
          Acompanhamentos
        </button>
      </div>

      {menuHamb && (
        <div>
          {products?.map((product) => (
            //   <Product key={product._id} product={product} />
            <div key={product._id} className="menu-container">
              <img
                src={urlFor(product.image && product.image[0])}
                className="product-image"
                width={220}
                height={160}
              />
              <div className="menu-details">
                <h3>{product.name}</h3>
                <h4>Detalhes:</h4>
                <p> {product.details}</p>
                <p className="menu-price">R$ {product.price}</p>

                <button
                  type="button"
                  className="menu-btn"
                  onClick={() => onAdd(product, qty)}
                >
                  Adicionar a sacola
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* acompanhamento */}

      {menuAcomp && (
        <div>
          {camps?.map((camp) => (
            //   <Product key={product._id} product={product} />
            <div key={camp._id} className="menu-container">
              <img
                src={urlFor(camp.image && camp.image[0])}
                className="product-image"
                width={220}
                height={160}
              />
              <div className="menu-details">
                <h3>{camp.name}</h3>
                <h4>Detalhes:</h4>
                <p> {camp.details}</p>
                <p className="menu-price">R$ {camp.price}</p>

                <button
                  type="button"
                  className="menu-btn"
                  onClick={() => onAdd(camp, qty)}
                >
                  Adicionar a sacola
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const campsQuery = '*[_type == "camps"]';
  const camps = await client.fetch(campsQuery);

  return {
    props: {
      products,
      camps,
    },
  };
};
