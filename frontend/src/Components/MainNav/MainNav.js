import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const activeClass = "text-orange-600";
const hoverClass = "hover:text-orange-500";

function MainNav() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  //used in small screens to close the nav when close button is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className=" fixed bg-[#c9c2c2]  top-0 left-0 w-full min-h-[30px] sm:min-h-[60px] z-50">
      <nav>
        <div className="flex items-center justify-between px-4  w-full font-serif min-h-[70px]">
          <div>
            <button
              onClick={toggleMenu}
              className="text-blue-400 hover:text-stone-300 focus:outline-none sm:hidden text-2xl">
              ☰
            </button>
          </div>

          {/* overlay over body when nav is opened */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-gray-600  z-50 slideBar"
              onClick={toggleMenu}></div>
          )}

          {/* main navbar */}
          <ul
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex w-full sm:w-auto sm:space-x-4 text-slate-800 text-center sm:justify-around text-base sm:text-[30px] md:text-lg lg:text-xl xl:text-2xl z-50 absolute top-0 left-0 right-0 bg-transparent py-4`}>
            {/*close button only for small screens  */}
            <li className={`mb-1 sm:mb-0 ${hoverClass} sm:hidden`}>
              <button
                onClick={toggleMenu}
                className="text-re hover:text-stone-300  focus:outline-none">
                ✕
              </button>
            </li>
            <li className={`mb-1 sm:mb-0 ${hoverClass}`}>
              <NavLink
                to=""
                className={({ isActive }) =>
                  `text-re ${hoverClass} ${isActive ? activeClass : ""}`
                }
                end
                onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className={`mb-1 sm:mb-0 ${hoverClass}`}>
              <NavLink
                to="blogs"
                className={({ isActive }) =>
                  `text-re ${hoverClass} ${isActive ? activeClass : ""}`
                }
                onClick={closeMenu}>
                Blogs
              </NavLink>
            </li>
            <li className={`mb-1 sm:mb-0 ${hoverClass}`}>
              <NavLink
                to="studio"
                className={({ isActive }) =>
                  `text-re ${hoverClass} ${isActive ? activeClass : ""}`
                }
                onClick={closeMenu}>
                Your Studio
              </NavLink>
            </li>
            {/* //! show  a logout button when user is logged in and have a token */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default MainNav;
