import { ActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_THREAD:
      return action.payload.threads;
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return thread;
      });
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: thread.downVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    case ActionType.NEUTRALVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
