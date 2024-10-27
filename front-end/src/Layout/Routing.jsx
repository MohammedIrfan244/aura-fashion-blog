import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import BoutiquePage from "../Pages/BoutiquePage"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchBoutiques } from "../Redux/BoutiqueSlice"


function Routing() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchBoutiques("http://localhost:3001/buotiques"))
  },[dispatch])

  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/boutiques" element={<BoutiquePage/>}/>
    </Routes>
  )
}

export default Routing