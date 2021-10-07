import "./Wishlist.css"
import { wishListData } from "../../Data/data";
import WishListCard from "../../Components/Cards/WishListCard/WishListCard";
import { useWishlist } from "../../Contexts/WishlistContext";

export default function Wishlist(){

    const {wishState} = useWishlist();

    return(
        <div className="wishlist-layout h-full pt-16 flex flex-col">
            <p className="wishlist-title font-semibold text-2xl uppercase">Wishlist:</p>
         <div className="pr-16 pl-16 pb-16 pt-8 flex justify-center flex-wrap">
            {wishState.map((product)=>{
                return(
                    <div className="wishlist-product m-2">
                        <WishListCard product={product}/>
                    </div>
                );
            })}
            </div>
        </div>
    );
}