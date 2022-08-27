import React from "react";
import { urlFor } from "../lib/client";
import Link from "next/link";

const Camps = ({ camps: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/camps/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={230}
            height={180}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">R${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Camps;
