import React, { useContext } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import Camps from "../../components/Camps";

const ProductDetails = ({ product, products, camps }) => {
  const { image, name, details, price } = product;
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
          {/* <div className="small-images-container">
            {image?.map((item,i)=>(
                <img  src={urlFor(item)} className="" onMouseEnter=""/>
            ))}
        </div> */}
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
              onClick={() => onAdd(product, qty)}
            >
              Adicionar a sacola
            </button>
            <button type="button" className="buy-now" onClick="">
              Comprar agora
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Turbine seu lanche</h2>
        <div className="marquee">
          {/* <div className="maylike-products-container track">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div> */}
          {/* camps teste */}

          <div className="maylike-products-container track">
            {camps?.map((camp) => (
              <Camps key={camp._id} camps={camp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'product']{
        slug {
            current
        }
    }`;
  // camps

  // const campsQuery = `*[_type == 'camps']{
  //     slug{
  //       current
  //     }
  //   }`;
  // const camps = await client.fetch(campsQuery);
  // const pathsCamps = camps.map((camps) => ({
  //   params: {
  //     slug: camps.slug.current,
  //   },
  // }));

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    // pathsCamps,
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  //  camps

  const campsQuery = '*[_type == "camps"]';
  const camps = await client.fetch(campsQuery);

  return {
    props: {
      products,
      product,
      camps,
    },
  };
};

export default ProductDetails;
