import { useEffect, useRef, useState } from "react";
import { LuContact, LuSearch, LuUser } from "react-icons/lu";
import { PiTrademarkRegisteredBold } from "react-icons/pi";
import { FaBars } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [navListVisible, setNavListVisible] = useState(false);
  const [searchResult,setSearchResults]=useState([])
  const [searchInput,setSearchInput]=useState("")
  const {styles,boutiques,users}=useSelector(state=>state)
  const [scrollVisible, setScrollVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
setSearchResults()
  },[])

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
      setScrollVisible(false);
    } else {
      setScrollVisible(true);
    }
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
          className="absolute top-3 py-8 gap-y-2  left-0 right-0 bg-richBlack text-snowWhite z-40 p-5 shadow-lg animate-slideY"
          style={{
            animationDuration: "300ms",
            "--tw-translate-y": "-15px",
            "--tw-translate-y-70": "0px",
          }}
        >
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li
              onClick={() => {
                navigate("/");
                closeMenu();
              }}
              className="cursor-pointer hover:text-electricBlue transition-all"
            >
              HOME
            </li>
            <li
              onClick={() => {
                navigate("/boutiques");
                closeMenu();
              }}
              className="cursor-pointer hover:text-electricBlue transition-all"
            >
              BOUTIQUES
            </li>
            <li
              onClick={() => {
                navigate("/styles");
                closeMenu();
              }}
              className="cursor-pointer hover:text-electricBlue transition-all"
            >
              STYLES
            </li>
            <li
              onClick={() => {
                navigate("/posts");
                closeMenu();
              }}
              className="cursor-pointer hover:text-electricBlue transition-all"
            >
              POSTS
            </li>
          </ul>
        </div>
      )}

      {navListVisible && (
        <ul className="hidden sm:flex gap-2 sm:gap-20 text-sm font-medium">
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer animate-slideY hover:text-electricBlue transition-all"
            style={{
              animationDuration: "600ms",
              "--tw-translate-y": "15px",
              "--tw-translate-y-70": "0px",
            }}
          >
            HOME
          </li>
          <li
            onClick={() => navigate("/boutiques")}
            className="cursor-pointer animate-slideY hover:text-electricBlue transition-all"
            style={{
              animationDuration: "700ms",
              "--tw-translate-y": "15px",
              "--tw-translate-y-70": "0px",
            }}
          >
            BOUTIQUES
          </li>
          <li
            onClick={() => navigate("/styles")}
            className="cursor-pointer animate-slideY hover:text-electricBlue transition-all"
            style={{
              animationDuration: "800ms",
              "--tw-translate-y": "15px",
              "--tw-translate-y-70": "0px",
            }}
          >
            STYLES
          </li>
          <li
            onClick={() => navigate("/posts")}
            className="cursor-pointer animate-slideY hover:text-electricBlue transition-all"
            style={{
              animationDuration: "850ms",
              "--tw-translate-y": "15px",
              "--tw-translate-y-70": "0px",
            }}
          >
            POSTS
          </li>
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
              onChange={(e)=>setSearchInput(e.target.value)}
              type="text"
              placeholder="Search here ..."
              className="w-full placeholder:text-xs text-xs bg-transparent border-2 border-electricBlue pt-[3px] focus:outline-none rounded-3xl ps-3"
            />
          <div className={searchVisible?"w-40 absolute top-7":"w-0"}>
            <ul>
              {
                searchResult?.map((items,index)=>{
                  return <li key={index}>{items}</li>
                })
              }
            </ul>
          </div>
          </div>
          <LuSearch
            onClick={() => setSearchVisible(!searchVisible)}
            className="hover:scale-110 cursor-pointer hover:text-electricBlue"
          />
          <LuContact className="hover:scale-110 cursor-pointer hover:text-electricBlue" />
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
