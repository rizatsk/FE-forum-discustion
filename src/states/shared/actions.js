import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveCategoryThreadsActionCreator } from "../categoryThreads/action";

function asyncPopulateUserAndThreads(setIsLoading = () => {}) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      const threadLists = threads.map((thread) => ({
        ...thread,
        owner: users.find((user) => user.id === thread.ownerId),
      }));

      const categoryThreads = threads.map((thread) => {
        return thread.category;
      });
      const uniqueCategoryThreads = [...new Set(categoryThreads)];

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threadLists));
      dispatch(receiveCategoryThreadsActionCreator(uniqueCategoryThreads));
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }

    dispatch(hideLoading());
  };
}

export { asyncPopulateUserAndThreads };
