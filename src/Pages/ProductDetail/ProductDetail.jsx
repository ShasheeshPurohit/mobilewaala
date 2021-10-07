import "./ProductDetail.css"
import { data } from "../../Data/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { baseurl } from "../../utils/apiCalls";
import {useFilter} from "../../Contexts/FilterContext";
import { Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useWishlist } from "../../Contexts/WishlistContext";

export default function ProductDetail(){
    const {state, dispatch} = useCart();
    const {wishState, addToWishList, removeFromWishList} = useWishlist();

    const {productId} = useParams();
    const {filteredData} = useFilter();

    // console.log(filteredData)

    const addToCart = async (product) => {
        // console.log(product)
        // setloading(true);
        const response = await axios.post(`${baseurl}/api/cart/${product._id}`, { });
        if (response.status === 200) {
          dispatch({ type: "ADD_TO_CART", payload: product });
          
        //   toast.success("Added to cart")
        //   setloading(false);
        }
        // setloading(false);

        const cresponse = await axios.get(`${baseurl}/api/cart`)
      // console.log(cresponse)
      if(cresponse.status === 200){
        // console.log(cresponse.data.cartData)
        dispatch({ type: "LOAD_DATA", payload: cresponse.data.cartData })
      }
        
      };
    

    const product = filteredData.filter((item)=>item._id===productId)[0]
    // console.log(product)

    return(
        <div className="product-detail-layout">
          <div className="product-detail-display flex mt-16 pr-16 pl-16 justify-around pb-8">
          <div className="product-detail-image-container">
             <img src={product.image} className="product-detail-image"/>
            </div>
            <div className="product-detail-details border-l-4 border-black flex flex-col w-1/2 pt-8">
                <p className="mt-8 product-detail-product-name">{product.name}</p>
                <p className="mt-8 product-detail-product-brand">{product.brand}</p>
                <p className="mt-8 product-detail-product-price">₹{product.price}</p>
                <p className="mt-8 product-detail-product-offer uppercase">{product.offer} off!</p>
                <div className="product-deliver-icons flex justify-center mt-8">
                    {product.fastDelivery && <div className="product-delivery-details flex flex-col"><i className="fas fa-bolt"></i> <p>Fast Delivery</p></div>}
                </div>
                <div className="product-detail-buttons">
                <button className="product-detail-btn mt-8 mr-16 ml-16 p-2 bg-black active:scale-90 text-xl rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>addToCart(product)}>Add <i class="fas fa-shopping-cart"></i></button>
                <button className="product-detail-btn mt-8 mr-16 ml-16 p-2 bg-black active:scale-90 text-xl rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>addToWishList(product)}>Add <i class="fas fa-heart"></i></button>
                </div>
            </div>
            </div>
            <div className="product-detail-description pl-16 pr-16 pb-16 pt-8 border-t-4 border-black text-justify">
                <p className="section-heading text-2xl uppercase font-font-bold">Description:</p>
                <p className="mt-8">{product.description}</p>
            </div>
        </div>
    );
}