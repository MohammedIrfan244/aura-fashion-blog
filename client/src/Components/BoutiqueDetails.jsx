import { useState } from 'react';
import PropTypes from 'prop-types';
import { LuExternalLink } from "react-icons/lu";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { IoMdCloseCircleOutline } from "react-icons/io";

function BoutiqueDetails({ boutiqueItemProp, close }) {
  const [mainImage, setMainImage] = useState(boutiqueItemProp.firstImage);
  const [thumbnails, setThumbnails] = useState([
    boutiqueItemProp.secondImage,
    boutiqueItemProp.thirdImage,
    boutiqueItemProp.fourthImage,
  ]);

  const handleImageClick = (index) => {
    const updatedThumbnails = [...thumbnails];
    const newMainImage = updatedThumbnails[index];
    updatedThumbnails[index] = mainImage;
    setMainImage(newMainImage);
    setThumbnails(updatedThumbnails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={close}
      ></div>
      <div className="relative z-10 w-[90%] sm:w-[900px] h-[500px] bg-black text-white overflow-y-auto">
        <div className="flex flex-col sm:flex-row gap-1 h-[90vh] sm:h-[400px]">
          <div className="hidden sm:flex flex-col h-full gap-1">
            {thumbnails.map((thumbnail, index) => (
              <div key={index} className="h-1/3 w-28">
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
            <img
              src={mainImage}
              alt="Main product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow flex flex-col justify-between sm:ms-3">
            <div className="hidden sm:flex justify-end">
              <button className="text-xl mt-1 me-1" onClick={close}>
              <IoMdCloseCircleOutline />
              </button>
            </div>
            <p className="text-xl font-bold">{boutiqueItemProp.name}</p>
            <div className="flex justify-between items-center">
              <a
                href={boutiqueItemProp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm gap-3 hover:text-blue-500"
              >
                Checkout <LuExternalLink />
              </a>
              <p className="text-lg font-bold pe-2">${boutiqueItemProp.price}</p>
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
  );
}
BoutiqueDetails.propTypes = {
  boutiqueItemProp: PropTypes.shape({
    firstImage: PropTypes.string.isRequired,
    secondImage: PropTypes.string.isRequired,
    thirdImage: PropTypes.string.isRequired,
    fourthImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
};

export default BoutiqueDetails;