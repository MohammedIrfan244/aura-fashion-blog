import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment, patchBoutiques } from "../Redux/BoutiqueSlice";
import { CiCircleInfo } from "react-icons/ci";

// eslint-disable-next-line react/prop-types
function BoutiqueDetails({ boutiqueItemProp, close }) {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [boutiqueItem, setBoutiqueItem] = useState(boutiqueItemProp);
  const reversedComment = JSON.parse(
    JSON.stringify(boutiqueItem?.collectionReview)
  );
  const { users } = useSelector((state) => state.users);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message?.trim() !== "") {
      setBoutiqueItem((prev) => ({
        ...prev,
        collectionReview: [
          ...prev.collectionReview,
          { comment: message, commentorId: currentUser?.id },
        ],
      }));
      dispatch(
        addComment({
          comment: { comment: message, commentorId: currentUser?.id },
          boutiqueId: boutiqueItem?.id,
        })
      );
      dispatch(
        patchBoutiques({
          url: `http://localhost:3001/buotiques/${boutiqueItem?.id}`,
          id: boutiqueItem?.id,
        })
      );
    } else {
      alert("please text");
    }
    setMessage("");
  };

  const commentor = (id) => {
    let commentUser = users?.find((u) => u.id == id);
    return commentUser ? commentUser : null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => close(null)}
      ></div>
      <div
        className="relative z-10 w-[90%] sm:w-[900px] h-[500px] text-snowWhite bg-richBlack overflow-y-auto animate-slideY"
        style={{
          animationDuration: "500ms",
          "--tw-translate-y": "100px",
          "--tw-translate-y-70": "0px",
        }}
      >
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
            <img
              src={mainImage}
              alt="Main product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col flex-grow items-end justify-between sm:ms-3">
            <button
              className="text-xl mt-1 me-1 opacity-0 sm:opacity-100"
              onClick={() => close(null)}
            >
              <RiCloseCircleLine />
            </button>
            <p className="text-xl font-bold me-1 self-start">
              {boutiqueItem?.collectionName}
            </p>
            <div className="flex justify-between items-end w-full">
              <a
                href={boutiqueItem?.collectionLink}
                target="blank"
                className="flex items-center text-sm gap-3 hover:text-electricBlue transition-colors"
              >
                Checkout <FiExternalLink />
              </a>
              <p className="text-lg font-bold me-1">{`$${boutiqueItem?.collectionPrice}`}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 h-auto px-1">
          <form
            className="relative"
            onSubmit={
              currentUser
                ? (e) => handleSubmit(e)
                : () => navigate("/login_Signup")
            }
          >
            <textarea
              className="w-full bg-[#2E2E33] rounded-md focus:outline-none px-3 py-1 text-xs"
              value={message}
              placeholder="Comment here...."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="absolute bottom-3 right-2 text-snowWhite"
            >
              <TbSend />
            </button>
          </form>
          <div className="-full bg-[#2E2E33] rounded-md text-xs mb-1">
            {reversedComment.reverse().map((item, index) => {
              return (
                <div className="mb-1 hover:bg-richBlack w-full p-1" key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <img
                          src={commentor(item.commentorId)?.profile}
                          className="w-full h-full object-cover"
                          alt={commentor(item.commentorId)?.userName}
                        />
                      </div>
                      <p className="font-semibold">
                        {commentor(item.commentorId)?.userName}
                      </p>
                    </div>
                    {commentor(item.commentorId)?.id === currentUser?.id && (
                      <CiCircleInfo className="text-sm cursor-pointer" />
                    )}
                  </div>
                  <p className="ps-6">{item.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoutiqueDetails;
