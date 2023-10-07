import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({
  name,
  email,
  password,
  successCallback = () => {},
  errorCallBack = () => {},
}) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ email, name, password });
      successCallback();
    } catch (error) {
      errorCallBack(error.message);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
