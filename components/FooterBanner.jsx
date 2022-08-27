import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    midText,
    largeText2,
    saleTime,
    smallText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{midText}</h3>
          <h3>{largeText2}</h3>
        </div>
        <div className="right">
          <p>{smallText}</p>
          {/* <h3>{midText}</h3> */}
          <Link href={`product/big-react`}>
            <button type="button"> {buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
