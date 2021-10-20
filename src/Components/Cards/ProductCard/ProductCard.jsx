import "./ProductCard.css"
import { useCart } from "../../../Contexts/CartContext";
import axios from "axios";
import { baseurl } from "../../../utils/apiCalls";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useWishlist} from "../../../Contexts/WishlistContext"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../../Contexts/AuthContext"
import { toast } from "react-toastify";

export default function ProductCard({product}){
  const navigate = useNavigate()

    const {token} = useAuth();
    const {state,dispatch} = useCart();
    const {wishState, addToWishList, removeFromWishList} = useWishlist();
    // const [cartArr, setCartArr] = useState([])
    const [cartFlag, setCartFlag] = useState([])


    useEffect(()=>{

      if(state!==undefined){
      setCartFlag(
        state.filter((item)=>item._id===product._id)
      )
      }
    },[state])


    const addToCart = async (product) => {
        // console.log(product)
        // setloading(true);
        const response = await axios.post(`${baseurl}/api/cart/${product._id}`, { });
        if (response.status === 200) {
          dispatch({ type: "ADD_TO_CART", payload: product });
          
          toast.success("Added to cart");
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

      const wishlistFlag = wishState.filter((item)=>item._id===product._id)

     

    return(
        <div className="product-card">
          <div className="product-image-container">
                <img className="product-image" src={product.image} alt="product-img"></img>
                {token?(wishlistFlag.length>0?
                <button className="wishlist-add-btn"><i class="fas fa-heart" style={{color:"red"}} onClick={()=>removeFromWishList(product)}></i></button>
                :
                    <button className="wishlist-add-btn"><i class="far fa-heart" onClick={()=>{addToWishList(product)}}></i></button>
    ): <button disabled className="wishlist-add-btn"><i class="fas fa-heart" onClick={()=>{
      toast.info("Login to add to wishlist")
    }}></i></button>}
            </div>
            <div className="product-details flex">
             <Link to={`/products/${product._id}`}><p className="product-name">{product.name}</p></Link>
                <p className="product-price">₹{product.price}</p>
            </div>
            {token?(cartFlag.length>0?
          <button className="cart-add-btn p-1 bg-black active:scale-90 text-xs rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>navigate("/cart")}>go to cart</button>
          :
          <button className="cart-add-btn p-1 bg-black active:scale-90 text-xs rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>addToCart(product)}>Add to cart</button>  
          ):<button className="cart-add-btn p-1 bg-black active:scale-90 text-xs rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>{
            toast.info("Login to add to cart")
          }}>Add to cart</button>  }
        </div>
    );
}