import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { baseurl } from "../utils/apiCalls";
import { toast } from "react-toastify";
const axios = require('axios');

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, []);
  const {token} = useAuth();

  useEffect(() => {
    (async function () {
      const response = await axios.get(`${baseurl}/api/wishlist`)
      dispatch({ type: "LOAD_WISHLIST_DATA", payload: response.data.Wishlist })
    })()
  }, [token])

  const addToWishList = async (product) => {
    // console.log(product)
    const response = await axios.post(`${baseurl}/api/wishlist/${product._id}`, {})
    if (response.status === 200) {
      toast.success("Added to wishlist")
      // console.log("added")
      dispatch({ type: "ADD", payload: product })
      return true
    } else {
      // console.log("error")
    }
  }
// console.log(state)
  const removeFromWishList = async (product) => {
    // console.log(product)
    const response = await axios.delete(`${baseurl}/api/wishlist/${product._id}`)
    if (response.status === 200) {
      dispatch({ type: "REMOVE", payload: product })
      toast.success("Removed from wishlist")
    } else {
      // console.log("error")
    }
  }

  return (
    <WishlistContext.Provider value={{ wishState: state, dispatch, addToWishList, removeFromWishList }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

const wishlistReducer = (state, { type, payload }) => {
  switch (type) {

    case "LOAD_WISHLIST_DATA":
            return state = payload;
    case "ADD":
      let flag = 0;
      state.map((item)=>{
        if(item._id===payload._id){
          flag = 1
        }
      })
      if(flag === 0){
        state = [...state,{...payload, wishlisted: true}];
        return state;
      }
     
      return state;

    case "REMOVE":
      return state.filter((item) => {

        return item._id !== payload._id;
      });

    default:
      break;
  }
};
