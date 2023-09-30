import "./ProductComponent.css"
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../lib/firebase';
import Loader from "../Loader/Loader"
import ActionBtn from "../ActionBtn/ActionBtn";

const ProductComponent = () => {
  const { product_id } = useParams();
  const [productData, setProductData, isFetchingRef] = useProductData(product_id)

  return (
    <div className="product_data_container">
      {isFetchingRef ? (
        <Loader />
      ) : (
        <>
          <div className="product_image_container">
            <img
              src={productData.image}
              alt={productData.artName}
              className="product_image"
            />
          </div>
          <div className="product_details_container">
            <h1 className="main_para_styling product_name">
              {productData.artName}
            </h1>
            <div>
              <p className="sub_para_styling product_price_label">
                Price: {" "}
                <span className="product_price">
                  {productData.artPrice} ₹
                </span>
              </p>
            </div>
            <div>
              <p className="product_description">
                {productData.artDetails}
              </p>
            </div>
            <div className="product_buy_btn">
              <ActionBtn text="Buy Now" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductComponent


function useProductData(uid) {
  const [productData, setProductData] = useState({})
  const isFetchingRef = useRef(true);

  useEffect(() => {
    const workRef = db.collection("work").doc(uid);

    const unsubscribe = workRef.onSnapshot((doc) => {
      if (doc.exists) {
        setProductData(doc.data());
      } else {
        setProductData(null);
      }

      isFetchingRef.current = false;
    });

    return unsubscribe
  }, [uid])

  return [productData, setProductData, isFetchingRef.current]
}