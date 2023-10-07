import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  asyncCreateComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  clearThreadDetailActionCreator,
  createCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  receiveThreadDetailActionCreator,
  upVoteCommentActionCreator,
} from "../../../states/threadDetail/action";
import api from "../../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

/**
 * skenario test
 *
 *  - asyncReceiveThreadDetail thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action alert correctly when data fetching failed
 *  - asyncUpVoteComment thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action alert correctly when authUser null
 *    - should dispatch action alert correctly when fetch API failed
 *  - asyncDownVoteComment thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action alert correctly when authUser null
 *    - should dispatch action alert correctly when fetch API failed
 *  - asyncNeutralVoteComment thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action alert correctly when authUser null
 *    - should dispatch action alert correctly when fetch API failed
 *  - asyncCreateComment thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action alert correctly when authUser null
 *    - should dispatch action alert correctly when data fetching fail
 */

const authUser = {
  id: "user-123",
  name: "rizat sakmir",
};
const fakeThreadDetailReponse = {
  id: "thread-123",
  title: "Hello",
  body: "Hello world!",
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: "comment-123",
      userId: "user-1234",
      body: "Yo whatshapp",
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const setIsLoading = vi.fn();

const fakeErrorResponse = new Error("Something error");

describe("asyncReceiveThreadDetail thunk", () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;

    // delete backup data
    delete api._getThreadDetail;
  });
  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // mock implementation
    api.getThreadDetail = vi.fn(() => Promise.resolve(fakeThreadDetailReponse));
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail(
      fakeThreadDetailReponse.id,
      setIsLoading
    )(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(api.getThreadDetail).toHaveBeenCalledWith(
      fakeThreadDetailReponse.id
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetailReponse)
    );
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it("should dispatch action alert correctly when data fetching failed", async () => {
    // arrange
    // mock implementation
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock window
    window.alert = vi.fn();

    // action
    await asyncReceiveThreadDetail(
      fakeThreadDetailReponse.id,
      setIsLoading
    )(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncUpVoteComment thunk", () => {
  beforeEach(() => {
    api._upVoteComment = api.upVoteComment;
  });

  afterEach(() => {
    api.upVoteComment = api._upVoteComment;

    // delete backup data
    delete api._upVoteComment;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    api.upVoteComment = vi.fn(() => Promise.resolve(true));
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };

    // action
    await asyncUpVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.upVoteComment).toHaveBeenCalledWith({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it("should dispatch action alert correctly when authUser null", async () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser: null };
    };
    window.alert = vi.fn();

    // action
    await asyncUpVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(window.alert).toHaveBeenCalledWith("Harap login terlebih dahulu.");
    expect(dispatch).not.toHaveBeenCalledWith(
      upVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
  });
  it("should dispatch action alert correctly when fetch API failed", async () => {
    // arrange
    api.upVoteComment = vi.fn(() => Promise.reject(fakeErrorResponse));
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };
    window.alert = vi.fn();

    // action
    await asyncUpVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncDownVoteComment", () => {
  beforeEach(() => {
    api._downVoteComment = api.downVoteComment;
  });

  afterEach(() => {
    api.downVoteComment = api._downVoteComment;

    // delete backup data
    delete api._downVoteComment;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    api.downVoteComment = vi.fn(() => Promise.resolve(true));
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };

    // action
    await asyncDownVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.downVoteComment).toHaveBeenCalledWith({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it("should dispatch action alert correctly when authUser null", async () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser: null };
    };
    window.alert = vi.fn();

    // action
    await asyncDownVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(window.alert).toHaveBeenCalledWith("Harap login terlebih dahulu.");
    expect(dispatch).not.toHaveBeenCalledWith(
      downVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
  });
  it("should dispatch action alert correctly when fetch API failed", async () => {
    // arrange
    api.downVoteComment = vi.fn(() => Promise.reject(fakeErrorResponse));
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };
    window.alert = vi.fn();

    // action
    await asyncDownVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncNeutralVoteComment", () => {
  beforeEach(() => {
    api._neutralVoteComment = api.neutralVoteComment;
  });

  afterEach(() => {
    api.neutralVoteComment = api._neutralVoteComment;

    // delete backup data
    delete api._neutralVoteComment;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    api.neutralVoteComment = vi.fn(() => Promise.resolve(true));
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };

    // action
    await asyncNeutralVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.neutralVoteComment).toHaveBeenCalledWith({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it("should dispatch action alert correctly when authUser null", async () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser: null };
    };
    window.alert = vi.fn();

    // action
    await asyncNeutralVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(window.alert).toHaveBeenCalledWith("Harap login terlebih dahulu.");
    expect(dispatch).not.toHaveBeenCalledWith(
      neutralVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
  });
  it("should dispatch action alert correctly when fetch API failed", async () => {
    // arrange
    api.neutralVoteComment = vi.fn(() => Promise.reject(fakeErrorResponse));
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };
    window.alert = vi.fn();

    // action
    await asyncNeutralVoteComment({
      threadId: fakeThreadDetailReponse.id,
      commentId: fakeThreadDetailReponse.comments[0].id,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentActionCreator({
        commentId: fakeThreadDetailReponse.comments[0].id,
        userId: authUser.id,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncCreateComment", () => {
  // Data for fake function asyncCreateComment
  const content = "Yo BBM";

  beforeEach(() => {
    api._createCommment = api.createCommment;
  });

  afterEach(() => {
    api.createCommment = api._createCommment;

    // delete backup data
    delete api._createCommment;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    const fakeCreateCommentResponse = {
      id: "comment-124",
      userId: authUser.id,
      body: content,
      upVotesBy: [],
      downVotesBy: [],
    };
    // arrange
    api.createCommment = vi.fn(() =>
      Promise.resolve(fakeCreateCommentResponse)
    );
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };

    // action
    await asyncCreateComment({
      threadId: fakeThreadDetailReponse.id,
      content,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createCommment).toHaveBeenCalledWith({
      threadId: fakeThreadDetailReponse.id,
      content,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it("should dispatch action alert correctly when authUser null", async () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser: null };
    };
    window.alert = vi.fn();

    // action
    await asyncCreateComment({
      threadId: fakeThreadDetailReponse.id,
      content,
    })(dispatch, getState);

    // assert
    expect(window.alert).toHaveBeenCalledWith("Harap login terlebih dahulu.");
    expect(dispatch).not.toHaveBeenCalledWith(showLoading());
  });
  it("should dispatch action alert correctly when data fetching fail", async () => {
    const fakeCreateCommentResponse = {
      id: "comment-124",
      userId: authUser.id,
      body: content,
      upVotesBy: [],
      downVotesBy: [],
    };
    // arrange
    api.createCommment = vi.fn(() => Promise.reject(fakeErrorResponse));
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => {
      return { authUser };
    };
    window.alert = vi.fn();

    // action
    await asyncCreateComment({
      threadId: fakeThreadDetailReponse.id,
      content,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
