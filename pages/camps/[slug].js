import { client, urlFor } from "../../lib/client";
import React from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ camp, camps, products }) => {
  const { image, name, details, price } = camp;
  const { qty, incQty, decQty, onAdd } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[0])}
              className="product-detail-image"
            />
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Detalhes:</h4>
          <p> {details}</p>
          <p className="price">R$ {price}</p>
          <div className="quantity">
            <h3>Quantidade:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(camp, qty)}
            >
              Adicionar a sacola
            </button>
            <button type="button" className="buy-now">
              Comprar agora
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Turbine seu lanche</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const campsQuery = `*[_type == 'camps']{
      slug{
        current
      }
    }`;
  const camps = await client.fetch(campsQuery);
  const paths = camps.map((camp) => ({
    params: {
      slug: camp.slug.current,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "camps" && slug.current == "${slug}"][0]`;
  const campsQuery = '*[_type == "camps"]';

  const camp = await client.fetch(query);
  const camps = await client.fetch(campsQuery);

  //   product

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: {
      camps,
      camp,
      products,
    },
  };
};

export default ProductDetails;
