import { ActionType } from "./action";

function leaderboardsReducer(leaderBoards = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADER_BOARD:
      return action.payload.leaderBoards;
    default:
      return leaderBoards;
  }
}

export default leaderboardsReducer;
