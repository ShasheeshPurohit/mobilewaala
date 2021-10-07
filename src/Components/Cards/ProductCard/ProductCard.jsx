import "./ProductCard.css"
import { useCart } from "../../../Contexts/CartContext";
import axios from "axios";
import { baseurl } from "../../../utils/apiCalls";
import { Link } from "react-router-dom";
import {useWishlist} from "../../../Contexts/WishlistContext"

export default function ProductCard({product}){

    const {state, dispatch} = useCart();
    const {wishState, addToWishList, removeFromWishList} = useWishlist();

    const addToCart = async (product) => {
        console.log(product)
        // setloading(true);
        const response = await axios.post(`${baseurl}/api/cart/${product._id}`, { });
        if (response.status === 200) {
          dispatch({ type: "ADD_TO_CART", payload: product });
          
        //   toast.success("Added to cart")
        //   setloading(false);
        }
        // setloading(false);

        const cresponse = await axios.get(`${baseurl}/api/cart`)
      console.log(cresponse)
      if(cresponse.status === 200){
        console.log(cresponse.data.cartData)
        dispatch({ type: "LOAD_DATA", payload: cresponse.data.cartData })
      }
        
      };

      const wishlistFlag = wishState.filter((item)=>item._id===product._id)

      console.log(wishlistFlag)

    return(
        <div className="product-card">
          <div className="product-image-container">
                <img className="product-image" src={product.image} alt="product-img"></img>
                {wishlistFlag.length>0?
                <button className="wishlist-add-btn"><i class="fas fa-heart" style={{color:"red"}} onClick={()=>removeFromWishList(product)}></i></button>
                :
                    <button className="wishlist-add-btn"><i class="fas fa-heart" onClick={()=>addToWishList(product)}></i></button>
                }
            </div>
            <div className="product-details flex">
             <Link to={`/products/${product._id}`}><p className="product-name">{product.name}</p></Link>
                <p className="product-price">₹{product.price}</p>
            </div>
            <button className="cart-add-btn p-1 bg-black active:scale-90 text-xs rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>addToCart(product)}>Add to cart</button>
        </div>
    );
}