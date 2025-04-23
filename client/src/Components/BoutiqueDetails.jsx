import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LuExternalLink } from "react-icons/lu";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axiosInstance from "../Utilities/axiosInstance";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import BoutiqueDetailsSkeleton from "../skeltons/BoutiqueDetailsSkeleton";

function BoutiqueDetails({ id, close }) {
  const [boutiqueItem, setBoutiqueItem] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBoutiqueItem = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance(
          `/boutique/get-boutique-by-id/${id}`
        );
        setBoutiqueItem(response.data.boutique);
      } catch (error) {
        console.log(axiosErrorManager(error));
      } finally {
        setLoading(false);
      }
    };
    getBoutiqueItem();
  }, [id]);

  useEffect(() => {
    if (boutiqueItem) {
      setMainImage(boutiqueItem.firstImage);
      setThumbnails([
        boutiqueItem.secondImage,
        boutiqueItem.thirdImage,
        boutiqueItem.fourthImage,
      ]);
    }
  }, [boutiqueItem]);

  const handleImageClick = (index) => {
    const updatedThumbnails = [...thumbnails];
    const newMainImage = updatedThumbnails[index];
    updatedThumbnails[index] = mainImage;
    setMainImage(newMainImage);
    setThumbnails(updatedThumbnails);
  };

  return (
    <>
      {loading ? (
        <BoutiqueDetailsSkeleton />
      ) : (
        <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={close}
          ></div>
          {/* Modal Content */}
          <div className="relative z-10 w-[90%] sm:w-[900px] h-[500px] bg-black text-white overflow-y-auto">
            <div className="flex flex-col sm:flex-row gap-1 h-auto sm:h-[400px]">
              <div className="hidden sm:flex flex-col h-full gap-1">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="h-1/3 w-28">
                    <img
                      onClick={() => handleImageClick(index)}
                      src={thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover h-full w-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full sm:w-[350px] h-[400px] overflow-hidden">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt="Main product"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Mobile thumbnails */}
              <div className="flex sm:hidden gap-1 mt-1 h-20">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="flex-1 h-full">
                    <img
                      onClick={() => handleImageClick(index)}
                      src={thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover h-full w-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-grow flex flex-col justify-between sm:ms-3 mt-2 sm:mt-0">
                <div className="flex justify-end">
                  <button className="text-xl mt-1 me-1" onClick={close}>
                    <IoMdCloseCircleOutline />
                  </button>
                </div>
                <p className="text-xl font-bold -mt-6 sm:mt-0">
                  {boutiqueItem?.name}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={boutiqueItem?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm gap-3 hover:text-blue-500"
                  >
                    Checkout <LuExternalLink />
                  </a>
                  <p className="text-lg font-bold pe-2">
                    ${boutiqueItem?.price}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 px-1">
              <div className="relative">
                <textarea
                  className="w-full bg-gray-800 rounded-md px-3 py-1 outline-none text-xs"
                  placeholder="Comment here..."
                  disabled
                />
                <button className="absolute bottom-3 right-2">
                  <PiPaperPlaneTilt />
                </button>
              </div>

              <div className="bg-gray-800 rounded-md text-xs mb-1">
                <div className="group mb-1 hover:bg-black w-full p-1 relative">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-700" />
                      <p className="font-semibold">Username</p>
                    </div>
                  </div>
                  <p className="ps-6">Example comment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

BoutiqueDetails.propTypes = {
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default BoutiqueDetails;
