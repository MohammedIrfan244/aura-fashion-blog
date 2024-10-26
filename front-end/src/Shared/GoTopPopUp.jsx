import { useEffect, useState } from "react";
import { CiCircleChevUp } from "react-icons/ci";

function GoTopPopUp() {
    const[visible,setVisible]=useState(false)

    useEffect(()=>{
        const toggleVisiblity=()=>{
            if(window.scrollY>window.innerHeight){
                setVisible(true)
            }else{
                setVisible(false)
            }
        }
        window.addEventListener("scroll",toggleVisiblity)
        return ()=>window.removeEventListener("scroll",toggleVisiblity)
    },[])

    const scrollTop=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

  return (
    <div className={`${visible?"z-40 flex fixed bottom-5 right-[49%] text-2xl animate-pulse":"hidden"} cursor-pointer`}>
      <CiCircleChevUp onClick={scrollTop}/>
    </div>
  )
}

export default GoTopPopUp
