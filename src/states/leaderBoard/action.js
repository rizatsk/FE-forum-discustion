import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_LEADER_BOARD: "RECEIVE_LEADER_BOARD",
};

function receiveLeaderBoardsActionCreator(leaderBoards) {
  return {
    type: ActionType.RECEIVE_LEADER_BOARD,
    payload: {
      leaderBoards,
    },
  };
}

function asyncReceiveLeaderBoards(setIsLoading = () => {}) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // preload process
      const leaderboards = await api.getLeaderBoards();
      dispatch(receiveLeaderBoardsActionCreator(leaderboards));
    } catch (error) {
      // fallback process
      alert(error.message);
    } finally {
      setIsLoading(false);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderBoardsActionCreator,
  asyncReceiveLeaderBoards,
};
