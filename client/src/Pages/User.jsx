import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../Redux/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpMessage from "../Utilities/PopUpMessage";
import { toast } from "react-toastify";
import axios from "axios";

function User() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newProfile, setNewProfile] = useState("");
  const { currentUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggingOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newUserName.trim() && !newProfile.trim()) {
      toast.error("Please provide a valid username or profile URL!");
      return;
    }

    try {
      await axios.patch(`http://localhost:3001/users/${currentUser.id}`, {
        userName: newUserName || currentUser.userName,
        profile: newProfile || currentUser.profile,
      });
      dispatch(updateUser({
        userName: newUserName || currentUser.userName,
        profile: newProfile || currentUser.profile
      }))

      toast.success("Profile updated successfully!");
      setEditMode(false);
      setNewUserName("");
      setNewProfile("");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  const handleCancel = () => {
    setNewUserName("");
    setNewProfile("");
    setEditMode(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-richBlack">
      <div className="bg-richBlack shadow-lg shadow-black p-10 max-w-md w-full">
        <h2 className="text-2xl font-beban text-snowWhite text-center mb-6">
          Welcome, {currentUser?.userName || "User"}!
        </h2>
        <div className="space-y-5 text-center">
          <div className="flex flex-col items-center">
            <img
              src={currentUser?.profile || "https://i.pinimg.com/736x/f2/ec/bc/f2ecbcde9918a1b5f0806fd001c6fd7a.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-electricBlue shadow-lg mb-4"
            />
            <p className="text-snowWhite text-lg">
              Email:{" "}
              <span className="text-electricBlue">
                {currentUser?.email || "No Email Found"}
              </span>
            </p>
          </div>

          {!editMode ? (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-snowWhite text-[#2E2E33] text-sm font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowPopUp(true)}
                className="w-full bg-snowWhite text-[#2E2E33] font-medium text-sm py-1 px-2 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1 mt-3"
              >
                Logout
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={newUserName}
                  className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                  placeholder="Enter new username"
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="url"
                  value={newProfile}
                  className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                  placeholder="Enter new profile picture URL"
                  onChange={(e) => setNewProfile(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-snowWhite text-sm text-[#2E2E33] font-medium py-1 px-2 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="w-full bg-snowWhite text-sm text-[#2E2E33] font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>

        {showPopUp && (
          <PopUpMessage
            onConfirm={loggingOut}
            onCancel={() => setShowPopUp(false)}
            message={"Are you sure you want to logout?"}
          />
        )}
      </div>
    </div>
  );
}

export default User;
