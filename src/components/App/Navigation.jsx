import React from "react";
import PropTypes from "prop-types";
import { iconApp } from "../../images";
import { Link, useNavigate } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { RiLineChartLine } from "react-icons/ri";
import { MdLogout, MdOutlineLogin } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import { useSelector } from "react-redux";

export default function Navigation({ toggleTheme, onSignOut = () => {} }) {
  const { authUser = null, theme = "light" } = useSelector((states) => states);
  const navigate = useNavigate();

  function toggleSideMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");
  }

  function onSignOutHandler() {
    toggleSideMenu();
    onSignOut();
    navigate("/login");
  }

  return (
    <div className="container lg:px-4">
      <div className="flex items-center justify-between relative">
        <div className="px-4 flex items-center py-2">
          <Link to="/" className="flex items-center gap-3">
            <img className="w-[50px]" src={iconApp} alt="logo" />
            <p className="font-[500] lg:text-2xl dark:text-white">
              Forum Discussion
            </p>
          </Link>
        </div>

        <div className="flex items-center px-4 ">
          <button
            id="hamburger"
            onClick={toggleSideMenu}
            type="button"
            className="block absolute right-4 lg:hidden"
          >
            <span className="hamburger-line origin-top-left"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line origin-bottom-left"></span>
          </button>

          <nav
            className="hidden absolute py-3 bg-white duration-300 ease-in-out dark:bg-dark-primary-2 shadow-2xl rounded-lg max-w-[200px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none"
            id="nav-menu"
          >
            <ul className="block lg:flex items-center lg:space-x-5 z-[1] dark:text-white">
              {authUser && (
                <li className="group lg:grid">
                  <div className="flex items-center gap-3 py-2 px-4">
                    <img
                      className="rounded-[50%] w-[35px]"
                      src={authUser.avatar}
                      alt={authUser.name}
                    />
                    <span className="text-base font-[500] capitalize">
                      {authUser.name}
                    </span>
                  </div>
                </li>
              )}
              <li className="group lg:grid">
                <button onClick={toggleTheme} className="py-2 px-3">
                  {theme === "light" ? (
                    <div className="flex items-center gap-2 p-2 rounded-lg shadow-lg border">
                      <ImSun className="w-[22px] h-[22px] text-yellow-300" />
                      <span className="text-sm md:text-base font-[500]">
                        Light
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-lg shadow-lg border">
                      <BsFillMoonStarsFill className="w-[20px] h-[20px]" />
                      <span className="text-sm md:text-base font-[500] text-white">
                        Dark
                      </span>
                    </div>
                  )}
                </button>
              </li>
              <li className="group lg:grid">
                <Link
                  to="/"
                  onClick={toggleSideMenu}
                  className="text-base font-medium py-2 px-4 flex items-center gap-2 hover:text-primary dark:hover:text-dark-primary-sky"
                >
                  <GoCommentDiscussion className="w-[23px] h-[23px] text-primary dark:text-dark-primary-sky" />
                  Diskusi
                </Link>
                <div className="invisible lg:group-hover:visible border-b-4 border-primary dark:border-dark-primary-sky rounded-lg"></div>
              </li>
              <li className="group lg:grid">
                <Link
                  to="/leader-boards"
                  onClick={toggleSideMenu}
                  className="text-base font-medium py-2 px-4 flex items-center gap-2 hover:text-primary dark:hover:text-dark-primary-sky"
                >
                  <RiLineChartLine className="w-[23px] h-[23px] text-primary dark:text-dark-primary-sky" />
                  Leader Boards
                </Link>
                <div className="invisible lg:group-hover:visible border-b-4 border-primary dark:border-dark-primary-sky rounded-lg"></div>
              </li>
              <li className="group lg:grid">
                <button
                  onClick={onSignOutHandler}
                  className="text-base font-medium py-2 px-4 flex items-center gap-2 hover:text-primary dark:hover:text-dark-primary-sky"
                >
                  {authUser ? (
                    <>
                      <MdLogout className="w-[23px] h-[23px] text-primary dark:text-dark-primary-sky" />
                      Logout
                    </>
                  ) : (
                    <>
                      <MdOutlineLogin className="w-[23px] h-[23px] text-primary dark:text-dark-primary-sky" />
                      Login
                    </>
                  )}
                </button>
                <div className="invisible lg:group-hover:visible border-b-4 border-primary dark:border-dark-primary-sky rounded-lg"></div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  onSignOut: PropTypes.func,
};
