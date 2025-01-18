import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BoutiqueDetails from "../Components/BoutiqueDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  BiSolidChevronLeftCircle,
  BiSolidChevronRightCircle,
} from "react-icons/bi";
import BoutiqueCollectionCard from "../Shared/BoutiqueCollectionCard";
import GoTopPopUp from "../Utilities/GoTop";
import { hideSearchBar } from "../Redux/CommonSlice";

// const boutiqueMap=[
//   {
//     name:"Fenty Beauty",
//     banner:"https://www.edgars.co.za/cdn/shop/files/07_FB_Gloss_Bomb_EDGARS_Brand_Page_Banner_Desktop_1700_w_x480_h_d187962c-0e49-48a7-938c-4541191cdeae.png?v=1725615104&width=1920"
//   },
//   {
//     name:"Gucci",
//     banner:"https://images.squarespace-cdn.com/content/v1/5ada10c6710699da7e536301/1533810240561-W8N4GF8Q6VMGVMP66RWR/Gucci+Header.jpg?format=2500w"
//   },
//   {
//     name:"Maybelline",
//     banner:"https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/new-beauty-products-new-makeup/title-banner/maybelline-new-banner-1980x375.jpg?rev=fe515d525439440aa2152d346f9dcbf2&cx=0.28&cy=0.54&cw=1320&ch=250&hash=6970D3D8852F8974328D51DD497985EF"
//   },
//   {
//     name:"Victoria's Secret",
//     banner:"https://cashback.me/img/victorias-secret-store-banner.jpg"
//   },
//   {
//     name:"Huda Beauty",
//     banner:"https://www.spireclick.pk/cdn/shop/files/Huda_Beauty_6591ca72-4a34-4127-8842-1fef485befb6.png?v=1693934756"
//   },
//   {
//     name:"Prada",
//     banner:"https://www.pradagroup.com/content/dam/pradagroup/immagini/newsandmedia/2019-news/double-exposure-adv-campaign/immagini/Cover.jpg/_jcr_content/renditions/cq5dam.web.1920.1920.jpeg"
//   },
//   {
//     name:"O P I",
//     banner:"https://www.modernhairbeauty.com/wp-content/uploads/2023/05/OPI-Website-brand-banner-1920-600.jpg"
//   },
//   {
//     name:"Balenciaga",
//     banner:"https://wallpapercat.com/w/middle-retina/5/d/b/51591-3840x2160-desktop-4k-balenciaga-background-image.jpg"
//   }
// ]
function BoutiquePage() {
  const [aniDirection, setAniDirection] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);
  const location = useLocation();
  const {name,selected}=location.state || {name:"Fenty Beauty"}
  const [selectedItem, setSelectedItem] = useState(selected);
  const { boutiques } = useSelector((state) => state.boutiques);
  const [currentIndex,setCurrentIndex]=useState(boutiqueMap.findIndex((item)=>item.name===name))
  const currentBoutique=boutiques?.filter((item)=>item.collectionCategory===boutiqueMap[currentIndex]?.name)
  const dispatch=useDispatch()

  const handleInc = () => {
    setAniDirection(true);
    setAnimateKey((prev) => prev + 1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % boutiqueMap.length);
  };

  const handleDec = () => {
    setAniDirection(false);
    setAnimateKey((prev) => prev + 1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + boutiqueMap.length) % boutiqueMap.length
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  return (
    <div onClick={()=>dispatch(hideSearchBar())} className="min-h-screen">
      <div
        key={animateKey}
        className={`pt-16 animate-slideX ${
          selectedItem ? "blur-sm ove" : "blur-0"
        }`}
        style={{
          "--tw-translate-x": aniDirection ? "100px" : "-100px",
          "--tw-translate-x-70": aniDirection ? "-10px" : "10px",
          animationDuration: "700ms",
        }}
      >
        <div className="h-20 overflow-hidden flex items-center">
          <BiSolidChevronLeftCircle
            className="absolute top-26 left-3 text-2xl text-electricBlue cursor-pointer"
            onClick={handleDec}
          />
          <img src={boutiqueMap[currentIndex]?.banner} alt="banner" className="w-full" />
          <BiSolidChevronRightCircle
            className="absolute top-26 right-3 text-2xl text-electricBlue cursor-pointer"
            onClick={handleInc}
          />
        </div>
        <div className="flex items-center justify-between h-auto w-full p-3">
          <p className="text-2xl font-beban text-electricBlue">
            {boutiqueMap[currentIndex]?.name}
          </p>
          <p className="text-[10px] font-thin w-80">
            *Products displayed here are for inspiration and exploration. <br />
            No purchases available. (purchase source available) <br />
            *We value your feedback! Please keep comments respectful and
            constructive to help others in our community.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto place-items-center gap-y-5">
        {currentBoutique?.map((item, index) => (
          <BoutiqueCollectionCard
            key={index}
            boutique={item}
            click={() => setSelectedItem(item)}
            blur={selectedItem}
        z  />
        ))}
      </div>
      {selectedItem && (
        <BoutiqueDetails boutiqueItemProp={selectedItem} close={setSelectedItem} />
      )}
      <GoTopPopUp />
    </div>
  );
}

export default BoutiquePage;

