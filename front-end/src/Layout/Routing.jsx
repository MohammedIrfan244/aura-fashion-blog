import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import BoutiquePage from "../Pages/BoutiquePage"


function Routing() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/boutiques/:id" element={<BoutiquePage/>}/>
    </Routes>
  )
}

export default Routing