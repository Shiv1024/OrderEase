import React from "react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import CheckoutPage from "./components/Checkout";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import MenuAdmin from "./components/Menu_Admin";
const App=()=>{
    return(<div>
        <Routes>
            <Route exact path={"/"} element={<Login />}/>
            <Route path={"/menu"} element = {<Menu />}/>
            <Route path={"/menu_admin"} element = {<MenuAdmin />}/>
            <Route path={"/admin"} element = {<Admin />}/>
            <Route path={"/cart"} element = {<Cart />}/>
            <Route path={"/checkout"} element = {<CheckoutPage />}/>
            <Route path={"/profile"} element = {<Profile />}/>
        </Routes>
    </div>)
}
export default App;