import React, {useEffect} from "react";
import {Header} from "./components";
import {Home, Cart} from "./pages";
import {Route, Routes} from "react-router";
import {fetchPizzas} from './redux/actions/pizzas'
import {useDispatch} from "react-redux";

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

