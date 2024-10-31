import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import BoutiquePage from "../Pages/BoutiquePage"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchBoutiques } from "../Redux/BoutiqueSlice"
import { fetchStyles } from "../Redux/StyleSlice"
import { fetchUsers } from "../Redux/UserSlice"


function Routing() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchBoutiques("http://localhost:3001/buotiques"))
  },[dispatch])
  useEffect(()=>{
    dispatch(fetchStyles("http://localhost:3001/styles"))
  },[dispatch])
  useEffect(()=>{
    dispatch(fetchUsers('http://localhost:3001/users'))
  },[dispatch])

  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/boutiques" element={<BoutiquePage/>}/>
    </Routes>
  )
}

export default Routing