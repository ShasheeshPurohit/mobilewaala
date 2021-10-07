import { createContext, useContext, useReducer, useEffect } from "react";
import { baseurl } from "../utils/apiCalls";
import { useAuth } from "./AuthContext";
import axios from "axios";
// import { cartReducer } from "./Reducers/CartReducer";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const{token} = useAuth();
  const [state, dispatch] = useReducer(cartReducer, []);
  
  useEffect(() => {
    (async function () {
      const response = await axios.get(`${baseurl}/api/cart`)
      // console.log(response)
      if(response.status === 200){
        // console.log(response.data.cartData)
        dispatch({ type: "LOAD_DATA", payload: response.data.cartData })
      }
    })()
  }, [token])

  return (
    <CartContext.Provider value={{ dispatch, state }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

const cartReducer = (state, { type, payload }) => {

  switch (type) {
    case "LOAD_DATA":
      return state = payload;

    case "ADD":
      return state = [...state, {...payload, qty: 1}];

    case "INCREMENT":
      return state = state.map(item => {
        if(item._id === payload._id){
          return {...payload, qty: payload.qty + 1}
        } else {
          return item
        }
      })

    case "DECREMENT":
      return state = state.map(item => {
        if(item._id === payload._id){
          return {...payload, qty: payload.qty - 1}
        } else {
          return item
        }
      })

    case "REMOVE":
      return state = state.filter(item => item._id !== payload._id);
      
    default:
      break;
    }
};

