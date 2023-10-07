import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  UPVOTE_THREAD_DETAIL: "UPVOTE_THREAD_DETAIL",
  DOWNVOTE_THREAD_DETAIL: "DOWNVOTE_THREAD_DETAIL",
  NEUTRALVOTE_THREAD_DETAIL: "NEUTRALVOTE_THREAD_DETAIL",
  UPVOTE_COMMENT: "UPVOTE_COMMENT",
  DOWNVOTE_COMMENT: "DOWNVOTE_COMMENT",
  NEUTRALVOTE_COMMENT: "NEUTRALVOTE_COMMENT",
  CREATE_COMMENT: "CREATE_COMMENT",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId, setIsLoading = () => {}) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);

      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert("Harap login terlebih dahulu.");
      return false;
    }

    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      dispatch(showLoading());
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert("Harap login terlebih dahulu.");
      return false;
    }

    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      dispatch(showLoading());
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        downVoteCommentActionCreator({ commentId, userId: authUser.id })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert("Harap login terlebih dahulu.");
      return false;
    }

    dispatch(
      neutralVoteCommentActionCreator({ commentId, userId: authUser.id })
    );

    try {
      dispatch(showLoading());
      await api.neutralVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralVoteCommentActionCreator({ commentId, userId: authUser.id })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function createCommentActionCreator({ comment }) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert("Harap login terlebih dahulu.");
      return false;
    }

    try {
      dispatch(showLoading());
      const comment = await api.createCommment({ threadId, content });
      dispatch(createCommentActionCreator({ comment }));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  createCommentActionCreator,
  asyncCreateComment,
};
