import { useEffect, useRef, useState } from "react";
import { LuContact, LuSearch, LuUser } from "react-icons/lu";
import { PiTrademarkRegisteredBold } from "react-icons/pi";
// import { AiOutlineProduct } from "react-icons/ai";
import { SiStylelint } from "react-icons/si";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchBar, toggleSearchBar } from "../Redux/CommonSlice";

function Navbar() {
  const [navListVisible, setNavListVisible] = useState(false);
  // const [searchResult, setSearchResults] = useState({
  //   boutiqueSearch: [],
  //   styleSearch: [],
  // });
  const [searchInput, setSearchInput] = useState("");
  // const { styles } = useSelector((state) => state.styles);
  // const { boutiques } = useSelector((state) => state.boutiques);
  // const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.currentUser);
  const { searchBar } = useSelector((state) => state.common);

  const [scrollVisible, setScrollVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/users");
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  // useEffect(() => {
  //   let stylesArr = [];
  //   let boutiqueArr = [];

  //   const lowercasedInput = searchInput.trim().toLowerCase();

  //   if (lowercasedInput) {
  //     styles.forEach((i) => {
  //       const author = users.find((u) => u.id == i.styleAuthorId)?.userName;
  //       if (
  //         i.styleName?.toLowerCase().includes(lowercasedInput) ||
  //         i.category?.toLowerCase().includes(lowercasedInput)
  //       ) {
  //         stylesArr.push({ style: i, author: author });
  //       }
  //     });
  //     boutiques.forEach((i) => {
  //       if (
  //         i.collectionName.toLowerCase().includes(lowercasedInput) ||
  //         i.collectionCategory.toLowerCase().includes(lowercasedInput)
  //       ) {
  //         boutiqueArr.push(i);
  //       }
  //     });
  //   }

  //   setSearchResults({
  //     boutiqueSearch: boutiqueArr,
  //     styleSearch: stylesArr,
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchInput]);

  const searchClick = () => {
    setSearchInput("");
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

  const closeMenu = () => {
    setMenuVisible(false);
  };

  // const handleNavigateBoutiques = (boutique) => {
  //   navigate("/boutiques", {
  //     state: { name: boutique.collectionCategory, selected: boutique },
  //   });
  //   searchClick();
  // };
  // const handleNavigateStyles = (styleId, style, author) => {
  //   navigate(`/styles/${styleId}`, { state: { style: style.style, author } });
  //   searchClick();
  // };

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
          className="absolute top-3 py-8 gap-y-2 left-0 right-0 bg-richBlack text-snowWhite z-40 p-5 shadow-lg animate-slideY"
          style={{
            animationDuration: "300ms",
            "--tw-translate-y": "-15px",
            "--tw-translate-y-70": "0px",
          }}
        >
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {["HOME", "BOUTIQUES", "STYLES"].map((label) => (
              <li
                key={label}
                onClick={() => {
                  label == "HOME"
                    ? navigate("/")
                    : label == "BOUTIQUES"
                    ? navigate("/boutiques?brand=Fenty Beauty")
                    : navigate("/styles?category=Everyday Makeup");
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
        <ul
          className="hidden sm:flex gap-4 sm:gap-20 text-sm font-medium"
          onClick={() => dispatch(hideSearchBar())}
        >
          {["HOME", "BOUTIQUES", "STYLES"].map((label, index) => (
            <li
              key={label}
              onClick={() =>
                label == "HOME"
                ? navigate("/")
                : label == "BOUTIQUES"
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
          className="relative flex items-end gap-2 sm:gap-7 text-lg animate-slideX"
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search here ..."
              className="w-full text-electricBlue placeholder:text-xs text-xs bg-transparent border-2 border-electricBlue pt-[3px] focus:outline-none rounded-3xl ps-3"
            />
            <div
              className={
                searchBar
                  ? "w-72 justify-between bg-richBlack px-2 py-1 text-snowWhite absolute top-10 gap-5 text-xs flex"
                  : "w-0 h-0"
              }
            >
              {/* <ul className="flex flex-col gap-2">
                <p className="text-sm mb-2">
                  <AiOutlineProduct />
                </p>
                {searchResult.boutiqueSearch.map((u, i) => {
                  return (
                    <li
                      onClick={() => handleNavigateBoutiques(u)}
                      className="cursor-pointer hover:text-electricBlue"
                      key={i}
                    >
                      {u?.collectionName}
                    </li>
                  );
                })}
              </ul> */}
              <ul className="flex flex-col gap-2">
                <p className="text-sm mb-2">
                  <SiStylelint />
                </p>
                {/* {searchResult.styleSearch.map((style, i) => {
                  return (
                    <li
                      onClick={() =>
                        handleNavigateStyles(
                          style?.style.id,
                          style,
                          style.author
                        )
                      }
                      className="cursor-pointer hover:text-electricBlue"
                      key={i}
                    >
                      {style?.style.styleName}
                    </li>
                  );
                })} */}
              </ul>
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
