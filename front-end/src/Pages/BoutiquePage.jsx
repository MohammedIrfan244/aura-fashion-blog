import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BoutiqueDetails from "../Components/BoutiqueDetails";
import { useSelector } from "react-redux";
import { BiSolidChevronLeftCircle,BiSolidChevronRightCircle } from "react-icons/bi";
import BoutiqueCollectionCard from "../Shared/BoutiqueCollectionCard";
import GoTopPopUp from "../Shared/GoTopPopUp";

function BoutiquePage() {
    const{boutiques}=useSelector(state=>state.boutiques)
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const { boutiqueIndex } = location.state || {};
  const[currentIndex,setCurrentIndex]=useState(boutiqueIndex||0)
  const currentBoutique=boutiques.find((_,index)=>index==currentIndex)
  const handleInc=()=>{
        setCurrentIndex(prevIndex=>(prevIndex+1)%boutiques?.length)
  }
  const handleDec=()=>{
        setCurrentIndex((prevIndex)=>(prevIndex-1+boutiques?.length)%boutiques?.length)
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);
  return (
    <div className="pt-16 relative">
      <div className="h-20 overflow-hidden flex items-center">
        <p className="absolute top-22 left-16  font-agdasima text-electricBlue">{currentBoutique?.name}</p>
      <BiSolidChevronLeftCircle className="absolute top-26 left-3 text-xl text-electricBlue cursor-pointer" onClick={handleDec}/>
        <img src={currentBoutique?.banner} alt="banner" className="w-full" />
        <BiSolidChevronRightCircle className="absolute top-26 right-3 text-xl text-electricBlue cursor-pointer" onClick={handleInc}/>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto place-items-center gap-y-5 mt-20">
        {currentBoutique?.collections?.map((item, index) =><BoutiqueCollectionCard key={index} boutique={item} click={()=>setSelectedItem(item)}/>)}
      {selectedItem && (
        <BoutiqueDetails boutiqueItem={selectedItem} close={setSelectedItem} />
      )}
        </div>
        <GoTopPopUp/>
    </div>
  );
}

export default BoutiquePage;
