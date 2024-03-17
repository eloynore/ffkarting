import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <div className={"nav__menu"} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                Clasificación
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/teams" className="nav__link">
                Equipos
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
