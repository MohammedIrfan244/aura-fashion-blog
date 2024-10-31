import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import { IoMdArrowRoundDown } from "react-icons/io";

// eslint-disable-next-line react/prop-types
function BoutiqueDetails({ boutiqueItem = {}, close }) {
  const [message,setMessage]=useState("")
  const [mainImage, setMainImage] = useState(boutiqueItem?.collectionImage);
  const [thumbnails, setThumbnails] = useState([
    boutiqueItem?.collectionSecondaryImage,
    boutiqueItem?.collectionThirdImage,
    boutiqueItem?.collectionFourthImage,
  ]);

  const handleImageClick = (index) => {
    const updatedThumbnails = [...thumbnails];
    const newMainImage = updatedThumbnails[index];
    updatedThumbnails[index] = mainImage;
    setMainImage(newMainImage);
    setThumbnails(updatedThumbnails);
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(message)
    setMessage("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={() => close(null)}
      ></div>
      <div className="relative z-10 w-[90%] sm:w-[700px] h-[400px] text-snowWhite bg-richBlack overflow-y-auto">
        <div className="flex flex-col sm:flex-row gap-1 h-[90vh] sm:h-[400px] overflow-hidden">
          
          <div className="hidden sm:flex flex-col h-full gap-1">
            {thumbnails.map((thumbnail, index) => (
              <div key={index} className="h-1/3 w-28 overflow-hidden">
                <img
                  onClick={() => handleImageClick(index)}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover h-full w-full cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="w-[350px] h-[400px] overflow-hidden">
            <img src={mainImage} alt="Main product" className="w-full h-full object-cover" />

          </div>

          <div className="flex flex-col flex-grow items-end justify-between">
  <button className="text-xl mt-1 me-1" onClick={() => close(null)}>
    <RiCloseCircleLine />
  </button>
  <p className="text-xl font-bold me-1 self-start">{boutiqueItem?.collectionName}</p>
  <div className="flex justify-between items-end w-full">
    <p className="text-xs w-[60%]">Used this product before? Feel free to share your experience <IoMdArrowRoundDown /></p>
    <p className="text-lg font-bold me-1">{`$${boutiqueItem?.collectionPrice}`}</p>
  </div>
</div>

        </div>
        <div className="mt-5 h-auto px-1">
          <form className="relative" onSubmit={(e)=>handleSubmit(e)} >
          <textarea className="w-full bg-[#2E2E33] rounded-md focus:outline-none px-3 text-xs" value={message} placeholder="Message here...." onChange={(e)=>setMessage(e.target.value)}/>
          <button type="submit" className="absolute bottom-3 right-2 text-snowWhite"><TbSend /></button>
          </form>
          <div className="-full bg-[#2E2E33] rounded-md p-3 text-xs mb-2">
          {
            boutiqueItem?.collectionReview?.map((item,index)=>{
              return (
                <div className="mb-2" key={index}>
                 <div className="flex items-center gap-1"><div className="w-5 h-5 rounded-full bg-slate-500"></div>User</div>
                  <p className="ps-6">{item.comment}</p>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoutiqueDetails;
