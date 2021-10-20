import ProductCard from "../../Components/Cards/ProductCard/ProductCard";
import "./Products.css";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { data } from "../../Data/data";
import { baseurl } from "../../utils/apiCalls";
import { useFilter } from "../../Contexts/FilterContext";
import { useCart } from "../../Contexts/CartContext";

export default function Products(){

    const {filteredData, dispatch} = useFilter();

    const [idArray, setIdArray] = useState([]);

    const [toastStatus, setToastStatus] = useState(false)
    const {token} = useAuth();

    const {state} = useCart();
    


    return(
        <div className="products-layout  bg-white flex">
            <div className="product-filters w-1/5 flex p-16 flex-col">
                <p className="text-2xl mb-4 text-bold">Filters:</p>
                <div className="filter-menu flex flex-col">
                    <p className="text-lg">Sorty by:</p>
                    <div><input className="mr-2" type="radio" name="price-sort" onChange={() =>
                dispatch({ type: "SORT", payload: "LOW-TO-HIGH" })
              }/><label>High-to-Low</label></div>
                    <div><input className="mr-2" type="radio" name="price-sort" onChange={() =>
                dispatch({ type: "SORT", payload: "HIGH-TO-LOW" })
              }/><label>Low-to-High</label></div>
                </div>
                <div className="filter-menu flex flex-col item-start mt-8">
                    <p className="text-lg">Filter by:</p>
                    <div><input className="mr-2" type="checkbox" onChange={() => dispatch({ type: "FAST-DELIVERY" })}/><label>Fast Delivery</label></div>
                    <div><input className="mr-2" type="checkbox" onChange={() => dispatch({ type: "SHOW-IN-STOCK-ONLY" })}/><label>In stock only</label></div>
                </div>
            </div>
            <div className="product-display w-4/5 pt-8 pb-8 pl-16 w-full flex item-start flex-col">
                <div className="product-display-products flex flex-wrap">
                   {filteredData.map((product)=>{
                       return(
                           <ProductCard product={product} />
                       );
                   })}
                </div>
            </div>
        </div>
    );
}