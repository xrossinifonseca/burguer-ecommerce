import React, { useState } from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import { MdRestaurantMenu } from "react-icons/md";
import Link from "next/link";

const Home = ({ products, bannerData }) => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Melhores Hambugueres para devs</h2>
        {/* <p>conheça o cardapio!</p> */}
      </div>
      {/* loop dos Produtos */}
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <Link href="/menu">
        <button
          type="button"
          className="btn-menu"
          onClick={() => setMenu(true)}
        >
          cardápio <MdRestaurantMenu />
        </button>
      </Link>

      {/* {menu && (
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )} */}

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};

export default Home;
