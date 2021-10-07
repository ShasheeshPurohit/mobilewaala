import "./CartCard.css"
import {useCart} from "../../../Contexts/CartContext";
import { useWishlist } from "../../../Contexts/WishlistContext";
import { baseurl } from "../../../utils/apiCalls";
import axios from "axios";

export default function CartCard({product}){

    const {state, dispatch} = useCart();
    const {addToWishList} = useWishlist();

    const increaseQuantity = async (product) => {
        // setAdd(true);
        const response = await axios.post(`${baseurl}/api/cart/${product._id}/inc`, {});
        // console.log(response)
        if (response.status === 200) {
          dispatch({ type: "INCREMENT", payload: product });
        //   setAdd(false);
        }
        // setAdd(false);
      };
    
      const decreaseQuantity = async (product) => {
        if (product.qty > 1) {
        //   setLess(true);
          const response = await axios.post(`${baseurl}/api/cart/${product._id}/dec`, { });
          if (response.status === 200) {
            dispatch({ type: "DECREMENT", payload: product });
          }
        } else {
          removeFromCart(product);
        }
        // setLess(false);
      };
    
      const removeFromCart = async (product) => {
        // setRemove(true);
        const response = await axios.delete(`${baseurl}/api/cart/${product._id}`);
        if (response.status === 200) {
          dispatch({ type: "REMOVE", payload: product });
        //   setRemove(false);
        }
        // setRemove(false);
      };


    return(
        <div className="cart-card">
            <div className="cart-image-container">
                <img className="cart-image" src={product.image} alt="product-img"></img>
            </div>
            <div className="cart-details flex">
                <p className="cart-name">{product.name}</p>
                <p className="cart-price">₹{product.price}</p>
            </div>
            <div className="quantity-buttons mt-2 flex justify-center ">
            <i class="fas fa-minus-circle p-1 quantity-btn" onClick={()=>decreaseQuantity(product)}></i>
              <p className="mr-2 ml-2">{product.qty}</p>
              <i class="fas fa-plus-circle p-1 quantity-btn" onClick={()=>increaseQuantity(product)}></i>
            </div>
            <div className="flex justify-between">
            <button className="cart-card-btn cart-add-btn p-1 bg-black active:scale-90 text-xs rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>{
                removeFromCart(product)
            }
            }>Remove</button>
            <button className="cart-card-btn cart-add-btn p-1 bg-black active:scale-90 text-xs rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>{
                removeFromCart(product)
                addToWishList(product)
            }
            }>Move to wishlist</button>
            </div>
        </div>
    );
}