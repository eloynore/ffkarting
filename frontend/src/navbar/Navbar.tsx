import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

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

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
  };

  function addLanguageSelector() {
    return (
      <select className="bg-black " onChange={onClickLanguageChange}>
        <option value="en">en</option>
        <option value="es">es</option>
        <option value="eus">eus</option>
      </select>
    );
  }

  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <div className="bg-black flex justify-between items-center h-24 mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">FFK</h1>

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
          {addLanguageSelector()}
        </li>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden" role="button">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">FFK</h1>

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
          {addLanguageSelector()}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
