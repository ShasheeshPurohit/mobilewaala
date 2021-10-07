import "./Home.css"
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="home-layout h-full flex flex-col align-center">
        <div className="home-hero bg-hero-image relative bg-fixed bg-cover bg-opacity-20 h-96 flex justify-start items-start flex-col">
       <div className="heading-box absolute top-50 left-50">
           <p className="main-heading uppercase text-bold text-white">Mobilewaala</p>
           <p className="sub-heading uppercase text-bold text-white">One stop for all the gadgets you need.</p>
       </div>
      </div>
       <div class="wrapper product-animation">
         <ul class="dynamic-txts">
            <li><span>Mobiles</span></li>
            <li><span>Tablets</span></li>
            <li><span>Laptops</span></li>
            <li><span>Headphones</span></li>
          </ul>
        </div>
        <div className="home-button-main">
            <Link to="/products" className="home-btn p-2 bg-black active:scale-90 text-xl rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase">Explore</Link>
        </div>
      </div>
    );
}