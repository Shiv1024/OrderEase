import React from "react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router-dom";

const App=()=>{
    return(<div>
        <Routes>
            <Route exact path={"/"} element={<Login />}/>
            <Route path={"/menu"} element = {<Menu />}/>
            <Route path={"/menu"} element = {<Menu />}/>
            <Route path={"/cart"} element = {<Cart />}/>
        </Routes>
    </div>)
}
export default App;