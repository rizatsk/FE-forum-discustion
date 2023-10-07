import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import usersReducer from "./users/reducer";
import threadsReducer from "./threads/reducer";
import themeReducer from "./theme/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import threadDetailReducer from "./threadDetail/reducer";
import categoryThreadsReducer from "./categoryThreads/reducer";
import leaderboardsReducer from "./leaderBoard/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    categoryThreads: categoryThreadsReducer,
    threadDetail: threadDetailReducer,
    theme: themeReducer,
    loadingBar: loadingBarReducer,
    leaderBoards: leaderboardsReducer,
  },
});

export default store;
