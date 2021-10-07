import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {CartProvider} from "./Contexts/CartContext";
import {WishlistProvider} from "./Contexts/WishlistContext";
import {FilterProvider} from "./Contexts/FilterContext";
import {AuthProvider} from "./Contexts/AuthContext"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <FilterProvider>
          <CartProvider>
           <WishlistProvider>
             <App />
          </WishlistProvider>
         </CartProvider>
       </FilterProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
