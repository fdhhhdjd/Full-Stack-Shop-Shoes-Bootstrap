import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RelatedProductStyle } from "../../../styles/Related/RelatedProductStyle";
import STORAGES from "../../../utils/storage";
const Relation_Product = () => {
  const [relation, setRelation] = useState([]);
  const { result_product, result_product_detail } = useSelector((state) => ({
    ...state.Products_user,
  }));
  useEffect(() => {
    if (result_product?.length > 0) {
      result_product?.map((item) => {
        if (
          item?.categories ===
            result_product_detail.product_detail[0]?.categories &&
          result_product_detail.product_detail[0]?._id != item?._id
        ) {
          return setRelation((oldArray) => [...oldArray, item]);
        }
      });
    }
  }, [result_product?.length > 0]);
  return (
    <React.Fragment>
      <RelatedProductStyle />
      {relation.length > 0 && (
        <div className="maylike-products-wrapper">
          <h2>Relation Product Categories </h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {relation.map((relation, index) => {
                return (
                  <Link to={`/product/${relation._id}`} key={index}>
                    <div className="product-card">
                      <img
                        src={relation.image.url}
                        width={250}
                        height={250}
                        className="product-image"
                        alt="img"
                      />
                      <p className="product-name123">
                        {STORAGES.except(relation.name, 15)}
                      </p>
                      <p className="product-price">${relation.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Relation_Product;
