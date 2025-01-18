import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import PopUpMessage from "../Utilities/PopUpMessage";
import axiosInstance from "../Utilities/axiosInstance";
import { useNavigate } from "react-router-dom";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import { login, logout } from "../Redux/Auth";

function User() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [username, setUsername] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const { currentUser } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (username.length > 10) {
      return "Username cannot exceed 10 characters";
    }
    if (!/^[a-z_]+$/.test(username)) {
      return "Username can only contain lowercase letters and underscores";
    }
    if(username === currentUser.username) {
      return "Username cannot be the same as your current username";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (password.length > 15) {
      return "Password cannot exceed 15 characters";
    }
    return null;
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      setProfileFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (username) {
      const usernameError = validateUsername(username);
      if (usernameError) {
        setError(usernameError);
        setTimeout(() => setError(""), 3000);
        return;
      }
    }

    try {
      const formData = new FormData();
      if (username) formData.append('username', username);
      if (profileFile) formData.append('file', profileFile);

      const response = await axiosInstance.put("/update/update-user", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(login(response.data.userCredentials))
      setSuccess(response.data.message);
      setEditMode(false);
      setUsername("");
      setProfileFile(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(axiosErrorManager(err) || "Update failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleGetOTP = async (e) => {
    e.preventDefault();
    if (currentPassword === "") {
      setError("Current password is required");
      return;
    }
    
    try {
      const response = await axiosInstance.post("/update/send-password-reset-otp", {
        currentPassword
      });
      setSuccess(response.data.message);
      setOtpSent(true);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword === "" || confirmPassword === "" || otp === "") {
      setError("All fields are required");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      const response = await axiosInstance.post("/update/verify-otp-and-reset-password", {
        email: currentUser.email,
        otp,
        newPassword
      });
      setSuccess(response.data.message);
      setShowPasswordReset(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
      setOtpSent(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCancel = () => {
    setUsername("");
    setProfileFile(null);
    setEditMode(false);
    setShowPasswordReset(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOtp("");
    setOtpSent(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const loggingOut = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(logout());
      navigate('/login_Signup');
    } catch (err) {
      setError(axiosErrorManager(err) || "Logout failed");
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername !== "") {
      const error = validateUsername(newUsername);
      if (error) {
        setError(error);
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  const handleNewPasswordChange = (e) => {
    const newPass = e.target.value;
    setNewPassword(newPass);
    if (newPass !== "") {
      const error = validatePassword(newPass);
      if (error) {
        setError(error);
      } else if (confirmPassword !== "" && newPass !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-richBlack">
      <div className="bg-richBlack shadow-lg shadow-black p-10 max-w-md w-full">
        <h2 className="text-2xl font-beban text-snowWhite text-center mb-6">
          Welcome, {currentUser?.username || "User"}!
        </h2>

        <div className="space-y-5 text-center">
          <div className="flex flex-col items-center">
            <img
              src={currentUser?.profile || "https://i.pinimg.com/736x/f2/ec/bc/f2ecbcde9918a1b5f0806fd001c6fd7a.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-electricBlue shadow-lg mb-4"
            />
            <p className="text-snowWhite text-lg">
              User:{" "}
              <span className="text-electricBlue">
                {currentUser?.username || "No Username Found"}
              </span>
            </p>
          </div>

          {!editMode && !showPasswordReset ? (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-snowWhite text-[#2E2E33] text-sm font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowPasswordReset(true)}
                className="w-full bg-snowWhite text-[#2E2E33] text-sm font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
              >
                Change Password
              </button>
              <button
                onClick={() => setShowPopUp(true)}
                className="w-full bg-snowWhite text-[#2E2E33] font-medium text-sm py-1 px-2 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
              >
                Logout
              </button>
            </>
          ) : editMode ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={username}
                  className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                  placeholder="Enter new username"
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <input
                  type="text"
                  className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm cursor-pointer"
                  placeholder="Choose profile picture"
                  readOnly
                  value={profileFile ? profileFile.name : ""}
                  onClick={() => fileInputRef.current.click()}
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
                  className="w-full bg-snowWhite text-sm text-[#2E2E33] font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={!otpSent ? handleGetOTP : handlePasswordUpdate} className="space-y-4">
              {!otpSent ? (
                <div>
                  <input
                    type="password"
                    value={currentPassword}
                    className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                    placeholder="Current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <>
                  <div>
                    <input
                      type="text"
                      value={otp}
                      className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={newPassword}
                      className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                      placeholder="New password"
                      onChange={handleNewPasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={confirmPassword}
                      className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
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
                  className="w-full bg-snowWhite text-sm text-[#2E2E33] font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
                >
                  {!otpSent ? "Get OTP" : "Update Password"}
                </button>
              </div>
            </form>
          )}
          
          {(error || success) && (
            <p className={`text-sm ${error ? 'text-red-500' : 'text-green-500'}`}>
              {error || success}
            </p>
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