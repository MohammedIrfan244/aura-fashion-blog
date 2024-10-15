import { useEffect, useState } from "react";
import { LuContact,LuSearch , LuUser} from "react-icons/lu";
import { PiTrademarkRegisteredBold  } from "react-icons/pi";

function Navbar() {
  const[visible,setVisible]=useState(false)
  const[scrollVisible,setScrollVisible]=useState(true)
  const[lastScroll,setLastScroll]=useState(0)

  const handleScroll=()=>{
    const currentScroll=window.scrollY
    if(currentScroll>lastScroll){
      setScrollVisible(false)
    }else{
      setScrollVisible(true)
    }
    setLastScroll(currentScroll)
  }
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lastScroll])
  useEffect(()=>{
    const timer=setTimeout(()=>{
      setVisible(true)
    },500)
    return ()=>clearTimeout(timer)
  },[])
  return (
    <div className={`${scrollVisible?"animate-bouncing px-5 backdrop-blur-md bg-lavendarBlush bg-opacity-40 fixed w-screen shadow-sm flex justify-between items-end pb-3":"hidden"}`}>
      <div className="flex cursor-pointer">
      <h1 className="text-3xl font-semibold font-agdasima">AURA</h1>
      <PiTrademarkRegisteredBold />
      </div>
      {
        visible&&<ul className="flex justify-between w-60 animate-slideUp">
        <li className="hover:font-medium cursor-pointer">HOME</li>
        <li className="hover:font-medium cursor-pointer">BOUTIQUE</li>
        <li className="hover:font-medium cursor-pointer">STYLES</li>
      </ul>
      }
      {
        visible&&<div className="flex gap-5 text-lg animate-slideLeft">
        <LuSearch className="hover:scale-110 cursor-pointer" />
        <LuContact className="hover:scale-110 cursor-pointer"/>
        <LuUser className="hover:scale-110 cursor-pointer"/>
        </div>
      }
    </div>
  );
}

export default Navbar;
