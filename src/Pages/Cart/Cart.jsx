import "./Cart.css"
import {cartData} from "../../Data/data"
import CartCard from "../../Components/Cards/CartCard/CartCard";
import { useCart } from "../../Contexts/CartContext";
import { useEffect, useState } from "react";

export default function Cart(){

    const {state, dispatch} = useCart();
    const [total, setTotal] = useState(0);


    function getTotal(){
       let sum = 0;
        
        {state===undefined?sum=0:(state.map((product)=>{
            sum+=product.price*product.qty
        }))}

        return sum;
    }


    return(
        <div className="cart-layout flex flex-wrap h-full">
            <div className="cart-display p-10 w-3/4 h-full flex flex-wrap">
                {
                
                        state===undefined?"Loading":(
                            state.length===0?<div className="m-32"><i className="empty-wishlist-icon fas fa-box-open"></i><p className="uppercase mt-8 text-2xl">It's lonely in here, add something to cart to see them here</p></div>:(
                                state.map((product)=>{
                                    return(
                                    <div className="m-4">
                                     <CartCard product={product}/>
                                    </div>
                                    );
                                })
                            )
                            )
                   
                }
            </div>
            <div className="cart-invoice-section w-1/4 h-full pt-8">
             <p className="text-xl text-bold">{getTotal()>0?`₹Total: ${getTotal()}`:"No items in cart"}</p>
                <div className="cart-invoice mt-8 flex flex-col">
                    {
                        state===undefined?"Loading":(
                            state.map((product)=>{
                                return(
                                    <div className="product-invoice h-20 border-2 rounded-lg border-black flex bg-yellow-100 m-2 justify-between pr-2 pl-2">
                                        <div className="product-details-invoice">
                                        <p>{product.name}</p>
                                        <p>x{product.qty}</p>
                                        </div>
                                        <p>₹{product.price*product.qty}</p>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                <button className="cart-add-btn p-1 bg-black active:scale-90 text-xl rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase">Checkout</button>
            </div>
        </div>
    );
}