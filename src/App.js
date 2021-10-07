import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './Pages/Home/Home';
import Products from "./Pages/Products/Products"
import Navbar from './Components/Navbar/Navbar';
import Cart from './Pages/Cart/Cart';
import Wishlist from './Pages/Wishlist/Wishlist';
import PrivateRoute from './utils/privateRoute';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import ProductDetail from './Pages/ProductDetail/ProductDetail';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="App-screen">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <PrivateRoute path="/cart" element={<Cart/>}/>
        <PrivateRoute path="/wishlist" element={<Wishlist/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/products/:productId" element={<ProductDetail/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
