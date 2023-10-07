import { describe, it } from "vitest";
import threadDetailReducer from "../../../states/threadDetail/reducer";

/**
 * skenario test
 *
 *  - threadDetailReducer
 *    - should return thread [] when given by unknown action
 *    - should return thread when given by RECEIVE_THREAD_DETAIL action
 *    - should return thread when given by CLEAR_THREAD_DETAIL action
 *    - should return thread when given by UPVOTE_THREAD_DETAIL action
 *    - should return thread when given by DOWNVOTE_THREAD_DETAIL action
 *    - should return thread when given by NEUTRALVOTE_THREAD_DETAIL action
 *    - should return thread when given by UPVOTE_COMMENT action
 *    - should return thread when given by DOWNVOTE_COMMENT action
 *    - should return thread when given by NEUTRALVOTE_COMMENT action
 *    - should return thread when given by CREATE_COMMENT action
 */

describe("threadDetailReducer", () => {
  const threadDetail = {
    haveData: {
      id: "thread-123",
      title: "Hello",
      body: "Hello world!",
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-123",
          userId: "user-123",
          body: "Yo whatshapp",
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    },
    noData: null,
  };

  it("should return thread [] when given by unknown action", () => {
    // arrange
    const action = { type: "UNKNOWN" };

    // action
    const nextState = threadDetailReducer(threadDetail.noData, action);

    //assert
    expect(nextState).toEqual(threadDetail.noData);
  });
  it("should return thread when given by RECEIVE_THREAD_DETAIL action", () => {
    // arrange
    const action = {
      type: "RECEIVE_THREAD_DETAIL",
      payload: { threadDetail: threadDetail.haveData },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    //assert
    expect(nextState).toEqual(threadDetail.haveData);
  });
  it("should return thread when given by CLEAR_THREAD_DETAIL action", () => {
    // arrange
    const action = { type: "CLEAR_THREAD_DETAIL" };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(threadDetail.noData);
  });
  it("should return thread when given by UPVOTE_THREAD_DETAIL action", () => {
    // arrange// arrange
    const payload = {
      userId: "user-123",
    };

    const newThreadDetail = {
      ...threadDetail.haveData,
      upVotesBy: threadDetail.haveData.upVotesBy.concat([payload.userId]),
    };

    const action = {
      type: "UPVOTE_THREAD_DETAIL",
      payload,
    };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(newThreadDetail);
  });
  it("should return thread when given by DOWNVOTE_THREAD_DETAIL action", () => {
    // arrange// arrange
    const payload = {
      userId: "user-123",
    };

    const newThreadDetail = {
      ...threadDetail.haveData,
      downVotesBy: threadDetail.haveData.downVotesBy.concat([payload.userId]),
    };

    const action = {
      type: "DOWNVOTE_THREAD_DETAIL",
      payload,
    };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(newThreadDetail);
  });
  it("should return thread when given by NEUTRALVOTE_THREAD_DETAIL action", () => {
    // arrange// arrange
    const payload = {
      userId: "user-123",
    };

    const newThreadDetail = {
      ...threadDetail.haveData,
      upVotesBy: threadDetail.haveData.upVotesBy.filter(
        (userId) => userId !== payload.userId
      ),
      downVotesBy: threadDetail.haveData.downVotesBy.filter(
        (userId) => userId !== payload.userId
      ),
    };

    const action = {
      type: "NEUTRALVOTE_THREAD_DETAIL",
      payload,
    };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(newThreadDetail);
  });
  it("should return thread when given by UPVOTE_COMMENT action", () => {
    // arrange// arrange
    const payload = {
      userId: "user-123",
      commentId: threadDetail.haveData.comments[0].id,
    };

    const newThreadDetail = {
      ...threadDetail.haveData,
      comments: threadDetail.haveData.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.concat([payload.userId]),
          };
        }
      }),
    };

    const action = {
      type: "UPVOTE_COMMENT",
      payload,
    };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(newThreadDetail);
  });
  it("should return thread when given by DOWNVOTE_COMMENT action", () => {
    // arrange// arrange
    const payload = {
      userId: "user-123",
      commentId: threadDetail.haveData.comments[0].id,
    };

    const newThreadDetail = {
      ...threadDetail.haveData,
      comments: threadDetail.haveData.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.concat([payload.userId]),
          };
        }
      }),
    };

    const action = {
      type: "DOWNVOTE_COMMENT",
      payload,
    };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(newThreadDetail);
  });
  it("should return thread when given by NEUTRALVOTE_COMMENT action", () => {
    // arrange// arrange
    const payload = {
      userId: "user-123",
      commentId: threadDetail.haveData.comments[0].id,
    };

    const newThreadDetail = {
      ...threadDetail.haveData,
      comments: threadDetail.haveData.comments.map((comment) => {
        if (comment.id === payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== payload.userId),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== payload.userId
            ),
          };
        }
      }),
    };

    const action = {
      type: "NEUTRALVOTE_COMMENT",
      payload,
    };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(newThreadDetail);
  });
  it("should return thread when given by CREATE_COMMENT action", () => {
    // arrange// arrange
    const newComment = {
      id: "comment-4213",
      userId: "user-321",
      body: "Hai my name is Rizat",
      upVotesBy: [],
      downVotesBy: [],
    };

    const payload = {
      userId: "user-123",
      comment: newComment,
    };

    const newThreadDetail = {
      ...threadDetail.haveData,
      comments: [newComment, ...threadDetail.haveData.comments],
    };

    const action = {
      type: "CREATE_COMMENT",
      payload,
    };

    // action
    const nextState = threadDetailReducer(threadDetail.haveData, action);

    //assert
    expect(nextState).toEqual(newThreadDetail);
  });
});
