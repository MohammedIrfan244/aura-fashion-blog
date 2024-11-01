import { useEffect, useRef, useState } from "react";
import { LuContact, LuSearch, LuUser } from "react-icons/lu";
import { PiTrademarkRegisteredBold } from "react-icons/pi";
import { AiOutlineProduct } from "react-icons/ai";
import { SiStylelint } from "react-icons/si";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [navListVisible, setNavListVisible] = useState(false);
  const [searchResult, setSearchResults] = useState({
    userSearch: [],
    boutiqueSearch: [],
    styleSearch: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const { styles } = useSelector((state) => state.styles);
  const { boutiques } = useSelector((state) => state.boutiques);
  const { users } = useSelector((state) => state.users);

  const [scrollVisible, setScrollVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    let usersArr = [];
    let stylesArr = [];
    let boutiqueArr = [];
    styles?.forEach((style) => {
      if (
        style?.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        searchInput != "" &&
        searchInput != " "
      ) {
        stylesArr.push(style.name);
      }
    });
    boutiques?.forEach((boutique) => {
      if (
        boutique?.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        searchInput != "" &&
        searchInput != " "
      ) {
        boutiqueArr.push(boutique.name);
      }
    });
    users?.forEach((user) => {
      if (
        user?.userName.toLowerCase().includes(searchInput.toLowerCase()) &&
        searchInput != "" &&
        searchInput != " "
      ) {
        usersArr.push(user.userName);
      }
    });
    setSearchResults({
      userSearch: usersArr,
      boutiqueSearch: boutiqueArr,
      styleSearch: stylesArr,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const searchClick = () => {
    setSearchInput("");
    setSearchVisible(!searchVisible);
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
    if (searchVisible) {
      inputRef.current.focus();
    }
  }, [searchVisible]);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div
      className={`${
        scrollVisible
          ? "animate-bouncing px-5 backdrop-blur-md z-50 fixed w-screen flex justify-between items-end pb-3"
          : "hidden"
      } transition-all`}
    >
      <div className="flex cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-3xl font-semibold font-agdasima">AURA</h1>
        <PiTrademarkRegisteredBold className="text-electricBlue" />
      </div>

      {menuVisible && (
        <div
          className="absolute top-3 py-8 gap-y-2 left-0 right-0 bg-richBlack text-snowWhite z-40 p-5 shadow-lg animate-slideY"
          style={{
            animationDuration: "300ms",
            "--tw-translate-y": "-15px",
            "--tw-translate-y-70": "0px",
          }}
        >
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {["HOME", "BOUTIQUES", "STYLES", "POSTS"].map((label) => (
              <li
                key={label}
                onClick={() => {
                  navigate(`/${label.toLowerCase()}`);
                  closeMenu();
                }}
                className="cursor-pointer hover:text-electricBlue transition-all"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {navListVisible && (
        <ul className="hidden sm:flex gap-2 sm:gap-20 text-sm font-medium">
          {["HOME", "BOUTIQUES", "STYLES", "POSTS"].map((label, index) => (
            <li
              key={label}
              onClick={() =>
                navigate(label == "HOME" ? "/" : `/${label.toLowerCase()}`)
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
          className="relative flex items-end gap-2 sm:gap-7 text-lg animate-slideX"
          style={{
            animationDuration: "600ms",
            "--tw-translate-x": "15px",
            "--tw-translate-x-70": "0px",
          }}
        >
          <div
            className={`overflow-hidden transition-all flex duration-500 ease-out ${
              searchVisible ? "w-40" : "w-0"
            }`}
          >
            <input
              ref={inputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search here ..."
              className="w-full placeholder:text-xs text-xs bg-transparent border-2 border-electricBlue pt-[3px] focus:outline-none rounded-3xl ps-3"
            />
            <div
              className={
                searchVisible
                  ? "w-72 justify-between bg-richBlack px-2 py-1 anim text-snowWhite absolute h-auto top-10 gap-5 text-xs flex"
                  : "w-0 h-0"
              }
            >
              <ul>
                <p className="text-sm mb-2">
                  <LuUser />
                </p>
                {searchResult.userSearch.map((u, i) => {
                  return (
                    <li className="cursor-pointer" key={i}>
                      {u}
                    </li>
                  );
                })}
              </ul>
              <ul>
                <p className="text-sm mb-2">
                  <AiOutlineProduct />
                </p>
                {searchResult.boutiqueSearch.map((u, i) => {
                  return (
                    <li className="cursor-pointer" key={i}>
                      {u}
                    </li>
                  );
                })}
              </ul>
              <ul>
                <p className="text-sm mb-2">
                  <SiStylelint />
                </p>
                {searchResult.styleSearch.map((u, i) => {
                  return (
                    <li className="cursor-pointer" key={i}>
                      {u}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <LuSearch
            onClick={() => searchClick()}
            className="hover:scale-110 cursor-pointer hover:text-electricBlue"
          />
          <LuContact
            className="hover:scale-110 cursor-pointer hover:text-electricBlue"
            onClick={() => navigate("/contact")}
          />
          <LuUser className="hover:scale-110 cursor-pointer hover:text-electricBlue" />
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
