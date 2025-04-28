import { useEffect, useRef, useState } from "react";
import { LuContact, LuSearch, LuUser } from "react-icons/lu";
import { PiTrademarkRegisteredBold } from "react-icons/pi";
import { SiStylelint } from "react-icons/si";
import { GiNotebook } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchBar, toggleSearchBar } from "../Redux/CommonSlice";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import axios from "axios";

function Navbar() {
  const [navListVisible, setNavListVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.currentUser);
  const { searchBar } = useSelector((state) => state.common);
  const [searchResults, setSearchResults] = useState({
    styles: [],
    boutiques: [],
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const inputRef = useRef();
  const menuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchClick = () => {
    dispatch(toggleSearchBar());
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setScrollVisible(currentScroll <= lastScroll);
    setLastScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScroll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavListVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchBar) {
      inputRef.current.focus();
    }
  }, [searchBar]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleSearch = async (query) => {
    try {
      setSearchLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/public/search?query=" + query
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setSearchLoading(false);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(handleSearch, 1000);

  return (
    <div
      className={`${
        scrollVisible
          ? "animate-bouncing px-5 backdrop-blur-md z-50 fixed w-screen flex justify-between items-end py-3"
          : "hidden"
      } transition-all`}
    >
      <div className="flex cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-3xl font-semibold font-agdasima">AURA</h1>
        <PiTrademarkRegisteredBold className="text-electricBlue" />
      </div>

      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute top-3 py-8 gap-y-2 left-0 mx-4 right-0 bg-richBlack text-snowWhite z-40 p-5 shadow-lg animate-slideY rounded-lg"
          style={{
            animationDuration: "300ms",
            "--tw-translate-y": "-15px",
            "--tw-translate-y-70": "0px",
            maxWidth: "calc(100% - 2rem)",
            minHeight: "200px",
          }}
        >
          <ul className="flex flex-col gap-6 text-base font-medium">
            {["HOME", "BOUTIQUES", "STYLES"].map((label) => (
              <li
                key={label}
                onClick={() => {
                  label === "HOME"
                    ? navigate("/")
                    : label === "BOUTIQUES"
                    ? navigate("/boutiques?brand=Fenty Beauty")
                    : navigate("/styles?category=Everyday Makeup");
                  closeMenu();
                }}
                className="cursor-pointer hover:text-electricBlue transition-all p-2 hover:bg-richBlack/10 rounded"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {navListVisible && (
        <ul
          className="hidden sm:flex gap-4 sm:gap-20 text-sm font-medium"
          onClick={() => dispatch(hideSearchBar())}
        >
          {["HOME", "BOUTIQUES", "STYLES"].map((label, index) => (
            <li
              key={label}
              onClick={() =>
                label === "HOME"
                  ? navigate("/")
                  : label === "BOUTIQUES"
                  ? navigate("boutiques?brand=fentybeauty")
                  : navigate("/styles?category=everydaymakeup")
              }
              className="cursor-pointer animate-slideY hover:text-electricBlue transition-all"
              style={{
                animationDuration: `${600 + index * 100}ms`,
                "--tw-translate-y": "15px",
                "--tw-translate-y-70": "0px",
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}

      {navListVisible && (
        <div
          className="relative flex items-end gap-5 sm:gap-7 text-lg animate-slideX"
          style={{
            animationDuration: "600ms",
            "--tw-translate-x": "15px",
            "--tw-translate-x-70": "0px",
          }}
        >
          <div
            className={`overflow-hidden transition-all flex duration-500 ease-out ${
              searchBar ? "w-40" : "w-0"
            }`}
          >
            <input
              ref={inputRef}
              onChange={(e) => {
                debouncedSearch(e.target.value);
              }}
              type="text"
              placeholder="Search here ..."
              className="w-full text-electricBlue placeholder:text-xs text-xs bg-transparent border-2 border-electricBlue pt-[3px] focus:outline-none rounded-3xl ps-3"
            />
            <div
              className={
                (searchResults.boutiques?.length > 0 ||
                  searchResults.styles?.length > 0) &&
                searchBar &&
                inputRef.current.value.length > 0
                  ? "w-60 max-h-72 justify-between bg-richBlack overflow-y-auto px-2 py-1 text-snowWhite absolute top-10 gap-5 text-xs flex"
                  : "w-0 h-0 overflow-hidden"
              }
            >
              {/* the boutique lists */}
              <div>
                <p className="text-sm mb-2">
                  <SiStylelint />
                </p>
                {searchLoading ? (
                  <ul className="flex flex-col gap-2 animate-pulse">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <li
                        key={index}
                        className="h-6 bg-richBlack/10 rounded p-2"
                      />
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {searchResults.boutiques?.map((item, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:text-electricBlue transition-all p-2 hover:bg-richBlack/10 rounded"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* the style lists */}
              <div>
                <p className="text-sm mb-2">
                  <GiNotebook />
                </p>
                {searchLoading ? (
                  <ul className="flex flex-col gap-2 animate-pulse">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <li
                        key={index}
                        className="h-6 bg-richBlack/10 rounded p-2"
                      />
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {searchResults.styles?.map((item, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:text-electricBlue transition-all p-2 hover:bg-richBlack/10 rounded"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <LuSearch
            onClick={searchClick}
            className="hover:scale-110 cursor-pointer hover:text-electricBlue"
          />
          <LuContact
            className="hover:scale-110 cursor-pointer hover:text-electricBlue"
            onClick={() => navigate("/contact")}
          />
          <LuUser
            className="hover:scale-110 cursor-pointer hover:text-electricBlue"
            onClick={() => navigate(currentUser ? "/user" : "/login_signup")}
          />
          <button
            className="text-lg sm:hidden"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <FaBars />
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
