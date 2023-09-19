import React from "react";
import 'antd/dist/reset.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Itempage from "./pages/Itempage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Homepage/>}/>
  <Route path="/items" element={<Itempage/>}/>
  <Route path="/cart" element={<CartPage/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
</Routes>
</BrowserRouter>
</>
  );
}

export default App;

// export function ProtectedRoute({children}){
//  if(localStorage.getItem("auth")){
//    return children;
//   }else{
//     return <Navigate to="/login"/>
//   }
// }