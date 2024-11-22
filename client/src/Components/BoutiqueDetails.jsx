import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addComment,
  patchBoutiques,
  removeComment
} from "../Redux/BoutiqueSlice";
import { LuTrash } from "react-icons/lu";
import PopUpMessage from "../Shared/PopUpMessage";

// eslint-disable-next-line react/prop-types
function BoutiqueDetails({ boutiqueItemProp, close }) {
  const { currentUser } = useSelector((state) => state.currentUser);
  const { users } = useSelector((state) => state.users);
  const [boutiqueItem, setBoutiqueItem] = useState(boutiqueItemProp);
  const [message, setMessage] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
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
    if (message.trim()) {
      const newComment = {
        comment: message,
        commenterId: currentUser?.id,
      };
      setBoutiqueItem((prev) => ({
        ...prev,
        collectionReview: [...prev.collectionReview, newComment],
      }));
      dispatch(
        addComment({ comment: newComment, boutiqueId: boutiqueItem?.id })
      );
      dispatch(patchBoutiques({ boutiqueId: boutiqueItem?.id }));
    } else {
      alert("Please enter a comment.");
    }
    setMessage("");
  };

  const handleDeleteComment = () => {
    if (commentToDelete) {
      setBoutiqueItem((prev) => ({
        ...prev,
        collectionReview: prev.collectionReview.filter(
          (c) =>
            c.comment !== commentToDelete.comment ||
            c.commenterId !== commentToDelete.commenterId
        ),
      }));
      dispatch(
        removeComment({
          comment: commentToDelete,
          boutiqueId: boutiqueItem?.id,
        })
      );
      dispatch(patchBoutiques({ boutiqueId: boutiqueItem?.id }));
      setShowPopUp(false);
      setCommentToDelete(null);
    }
  };

 

  const commenter = (id) =>
    users?.find((user) => user.id === id) || {
      userName: "Unknown",
      profile: "",
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => close(null)}
      ></div>
      <div className="relative z-10 w-[90%] sm:w-[900px] h-[500px] bg-richBlack text-snowWhite overflow-y-auto">
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
            <div className="flex justify-end">
            <button className="text-xl mt-1 me-1" onClick={() => close(null)}>
              <RiCloseCircleLine />
            </button>
            </div>
            <p className="text-xl font-bold">{boutiqueItem?.collectionName}</p>
            <div className="flex justify-between items-center">
              <a
                href={boutiqueItem?.collectionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm gap-3 hover:text-electricBlue"
              >
                Checkout <FiExternalLink />
              </a>
              <p className="text-lg font-bold pe-2">{`$${boutiqueItem?.collectionPrice}`}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 px-1">
          <form
            onSubmit={
              currentUser ? handleSubmit : () => navigate("/login_Signup")
            }
            className="relative"
          >
            <textarea
              className="w-full bg-[#2E2E33] rounded-md px-3 py-1 outline-none text-xs"
              value={message}
              placeholder="Comment here..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="absolute bottom-3 right-2">
              <TbSend />
            </button>
          </form>

          <div className="bg-[#2E2E33] rounded-md text-xs mb-1">
            {boutiqueItem?.collectionReview
              ?.slice()
              .reverse()
              .map((item, index) => (
                <div
                  className="group mb-1 hover:bg-richBlack w-full p-1 relative"
                  key={index}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <img
                          src={commenter(item.commenterId)?.profile}
                          alt={commenter(item.commenterId)?.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-semibold">
                        {commenter(item.commenterId)?.userName}
                      </p>
                    </div>

                    {item.commenterId === currentUser?.id && (
                      <div className="hidden text-red-700 group-hover:block">
                        <LuTrash
                          onClick={() => {
                            setCommentToDelete(item);
                            setShowPopUp(true);
                          }}
                          className="text-sm cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                  <p className="ps-6">{item.comment}</p>
                </div>
              ))}
          </div>
        </div>


        {showPopUp && (
          <PopUpMessage
            onCancel={() => setShowPopUp(false)}
            onConfirm={handleDeleteComment}
            message="Are you sure you want to delete this comment?"
          />
        )}
      </div>
    </div>
  );
}

export default BoutiqueDetails;
