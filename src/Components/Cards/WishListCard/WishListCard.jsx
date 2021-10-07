import "./WishListCard.css"
import { useCart } from "../../../Contexts/CartContext";
import { useWishlist } from "../../../Contexts/WishlistContext";
import axios from "axios";
import { baseurl } from "../../../utils/apiCalls";

export default function WishListCard({product}){

    const {dispatch} = useCart();
    const{removeFromWishList} = useWishlist();

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

    return(
        <div className="wishlist-card">
             <div className="wishlist-image-container">
                <img className="wishlist-image" src={product.image} alt="product-img"></img>
                <button className="wishlist-remove-btn"><i class="fas fa-times-circle" onClick={()=>{
                     removeFromWishList(product)
                }}></i></button>
            </div>
            <div className="wishlist-details flex">
                <p className="wishlist-name">{product.name}</p>
                <p className="wishlist-price">₹{product.price}</p>
            </div>
            <button className="cart-add-btn p-1 bg-black active:scale-90 text-xs rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>{
                addToCart(product)
                removeFromWishList(product)
                }}>Move to cart</button>
        </div>
    );
}