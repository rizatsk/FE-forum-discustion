import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { receiveCategoryThreadsActionCreator } from "../categoryThreads/action";
import {
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
} from "../threadDetail/action";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  UPVOTE_THREAD: "UPVOTE_THREAD",
  DOWNVOTE_THREAD: "DOWNVOTE_THREAD",
  NEUTRALVOTE_THREAD: "NEUTRALVOTE_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function addThreadActionCreator(threads) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      threads,
    },
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert("Harap login terlebih dahulu.");
      return false;
    }

    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    dispatch(
      upVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      dispatch(showLoading());
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(
        upVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert("Harap login terlebih dahulu.");
      return false;
    }

    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    dispatch(
      downVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      dispatch(showLoading());
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(
        downVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert("Harap login terlebih dahulu.");
      return false;
    }

    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    dispatch(
      neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      dispatch(showLoading());
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
      dispatch(
        neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, category, content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    try {
      const { authUser, threads } = getState();
      const thread = await api.createThread({ title, category, content });
      thread.owner = authUser;
      const newThreads = [thread, ...threads];

      const categoryThreads = newThreads.map((thread) => {
        return thread.category;
      });
      const uniqueCategoryThreads = [...new Set(categoryThreads)];

      dispatch(addThreadActionCreator(newThreads));
      dispatch(receiveCategoryThreadsActionCreator(uniqueCategoryThreads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  addThreadActionCreator,
  receiveThreadsActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncAddThread,
};
