import { Link } from "react-router-dom";
import "./Navbar.css"
import {useAuth} from "../../Contexts/AuthContext";
import {toast} from "react-toastify";

export default function Navbar(){

    const {token,loginHandler, logoutHandler} = useAuth();

    return (
        <nav className="bg-black p-5 w-full flex flex-wrap justify-between navbar">
            <p><Link className="nav-brand text-white font-bold uppercase" to="/">Mobilewaala</Link></p>
            <ul className="nav-links uppercase">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/products">Products</Link></li>
                {!token && <li><Link className="nav-link" to="/login">Login</Link></li>}
                {!token && <li><Link className="nav-link" to="/signup">Signup</Link></li>}
                {!token && <li className="nav-logout-btn text-white" onClick={()=>loginHandler("testt","testt1234")}>Login as guest</li>}
                {token && <li><Link className="nav-link" to="/wishlist">Wishlist</Link></li>}
                {token && <li><Link className="nav-link" to="/cart">Cart</Link></li>}
                {token && <li className="nav-logout-btn text-white" onClick={()=>logoutHandler()}>log out</li>}
            </ul>
        </nav>
    );
}