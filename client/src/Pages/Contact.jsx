import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideSearchBar } from "../Redux/CommonSlice";

function Contact() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {currentUser}=useSelector((state)=>state.currentUser)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_5mpp4sr",
        "template_pv9suw1",
        formData,
        "_VNHLR1ntbZuSJLEc"
      )
      .then(
        () => {
          toast.success("Message sent successfully");
        },
        () => {
          toast.error("Failed to send message. Please try again.");
        }
      );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-richBlack"  onClick={()=>dispatch(hideSearchBar())}>
      <div className="bg-richBlack shadow-lg shadow-black p-10 max-w-md w-full">
        <h2 className="text-2xl font-beban text-snowWhite text-center mb-6">
          Contact Us
        </h2>
        <form onSubmit={currentUser?sendMail:()=>navigate("/login_Signup")} className="space-y-5">
          <div>
            <input
              name="name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, ["name"]: e.target.value })
              }
              className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div>
            <input
              name="email"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ ...formData, ["email"]: e.target.value })
              }
              className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              required
              onChange={(e) =>
                setFormData({ ...formData, ["message"]: e.target.value })
              }
              className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite px-3 py-1 placeholder:text-snowWhite placeholder:text-sm"
              placeholder="Your Message..."
              rows="4"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-snowWhite text-[#2E2E33] font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
