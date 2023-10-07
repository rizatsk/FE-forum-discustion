import React from "react";
import Loading from "./components/App/Loading";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/App/Navigation";
import LeaderBoardsPage from "./pages/LeaderBoardsPage";
import DetailThreadPage from "./pages/DetailThreadPage";
import { useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { setThemeActionCreator } from "./states/theme/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";

export default function App() {
  const {
    authUser = null,
    isPreload = false,
    theme = null,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    changeThemeDom(theme);

    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeThemeDom(newTheme);
    localStorage.setItem("theme", newTheme);

    dispatch(setThemeActionCreator(newTheme));
  };

  function changeThemeDom(themeInDom) {
    themeInDom === "light"
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
  }

  if (authUser === null) {
    return (
      <div className="min-h-screen bg-slate-50 my-0 mx-auto dark:bg-dark-primary ease-in-out duration-300">
        <Loading />
        <div className="container">
          <header className="sticky top-[10px] w-full z-50 duration-300 ease-in-out bg-white shadow-lg rounded-lg dark:bg-dark-primary-2">
            <Navigation toggleTheme={toggleTheme} />
          </header>
          <main className="my-0 mx-auto">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/*" element={<HomePage />} />
              <Route path="/leader-boards" element={<LeaderBoardsPage />} />
              <Route path="/thread/:id" element={<DetailThreadPage />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 my-0 mx-auto dark:bg-dark-primary ease-in-out duration-300">
      <Loading />
      <div className="container">
        <header className="sticky top-[10px] w-full z-50 duration-300 ease-in-out bg-white shadow-lg rounded-lg dark:bg-dark-primary-2">
          <Navigation toggleTheme={toggleTheme} onSignOut={onSignOut} />
        </header>
        <main className="my-0 mx-auto">
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/leader-boards" element={<LeaderBoardsPage />} />
            <Route path="/thread/:id" element={<DetailThreadPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
