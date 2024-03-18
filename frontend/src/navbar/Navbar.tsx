import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IoClose, IoMenu } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { render } from "@testing-library/react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
  };

  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  // to see if the menu should be open and how
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  const renderLinks = () => {
    return (
      <>
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              className={"nav__link" + (url === "/" ? " active" : "")}
            >
              {t("leaderboard")}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/teams"
              className={"nav__link" + (url === "/teams" ? " active" : "")}
            >
              {t("teams")}
            </NavLink>
          </li>
        </ul>
        {isMobile ? <IoClose onClick={() => toggleMenu()} /> : <></>}
      </>
    );
  };

  return (
    <header className="header">
      <nav className="nav container">
        <div className={"nav__menu"} id="nav-menu">
          <select
            className="custom-select"
            style={{ width: 200 }}
            onChange={onClickLanguageChange}
          >
            <option value="en">🇬🇧 </option>
            <option value="es">🇪🇸 </option>
            <option value="eus">🏴󠁥󠁳󠁰󠁶󠁿 </option>
          </select>
          {isMobile ? (
            <>
              {isMenuOpen ? (
                renderLinks()
              ) : (
                <IoMenu onClick={() => toggleMenu()} />
              )}
            </>
          ) : (
            renderLinks()
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
