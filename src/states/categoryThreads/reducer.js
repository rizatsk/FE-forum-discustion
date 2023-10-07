import { ActionType } from "./action";

function categoryThreadsReducer(categoryThreads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORY_THREADS:
      return action.payload.categoryThreads;
    default:
      return categoryThreads;
  }
}

export default categoryThreadsReducer;
