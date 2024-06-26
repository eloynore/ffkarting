import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Switcher from "../components/Switcher";
import LogoutButton from "../components/LogoutButton";
import RenderLanguageSelector from "../components/LanguajeSelector";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: t("leaderboard"), to: "/" },
    { id: 2, text: t("teams"), to: "/teams" },
  ];

  const classLink =
    "p-4 hover:bg-[#00df9a] rounded m-2 cursor-pointer duration-300 hover:text-black";
  const classActive = "p-4 text-[#00df9a] rounded m-2 underline";

  // LangOptions

  const handleLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
  };

  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div className="bg-black flex justify-between items-center h-24 mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-5xl font-bold text-white flex items-center">
        <img src="tractor.png" />
        {url === "/" ? "FFK" : <NavLink to="/">FFK </NavLink>}
      </h1>
      <Switcher />
      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={url === item.to ? classActive : classLink}
          >
            {url === item.to ? (
              item.text
            ) : (
              <NavLink to={item.to}>{item.text}</NavLink>
            )}
          </li>
        ))}
        <li className="p-4 m-2 rounded cursor-pointer border-gray-600">
          <RenderLanguageSelector
            onClickLanguageChange={handleLanguageChange}
          />
        </li>
        <LogoutButton />
      </ul>

      {/* Mobile Navigation Icon */}
      <button onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </button>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-5xl font-bold text-[#00df9a] m-4">FFK</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className={url === item.to ? classActive : classLink}
          >
            {url === item.to ? (
              item.text
            ) : (
              <NavLink onClick={handleNav} to={item.to}>
                {item.text}
              </NavLink>
            )}
          </li>
        ))}
        <li className="p-4 rounded m-2 cursor-pointer border-gray-600">
          <RenderLanguageSelector
            onClickLanguageChange={handleLanguageChange}
          />
        </li>
        <li className="p-4 rounded m-2 border-gray-600">
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
