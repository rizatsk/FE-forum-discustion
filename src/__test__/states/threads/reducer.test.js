import { describe, it } from "vitest";
import threadsReducer from "../../../states/threads/reducer";

/**
 * skenario test
 *
 *  - threadsReducer
 *    - should return threads [] when given by unknown action
 *    - should return threads when given by RECEIVE_THREADS action
 *    - should return threads when given by ADD_THREAD action
 *    - should return threads when given by UPVOTE_THREAD action
 *    - should return threads when given by DOWNVOTE_THREAD action
 *    - should return threads when given by NEUTRALVOTE_THREAD action
 */

describe("threadsReducer", () => {
  it("should return threads [] when given by unknown action", () => {
    // arrange
    const threads = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = threadsReducer(threads, action);

    //assert
    expect(nextState).toEqual(threads);
  });
  it("should return threads when given by RECEIVE_THREADS action", () => {
    // arrange
    const threads = [
      {
        id: "thread-123",
        title: "Hello",
        body: "Hello world!",
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = { type: "RECEIVE_THREADS", payload: { threads } };

    // action
    const nextState = threadsReducer(threads, action);

    //assert
    expect(nextState).toEqual(threads);
  });
  it("should return threads when given by ADD_THREAD action", () => {
    // arrange
    const newThread = {
      id: "thread-124",
      title: "Hello2 ",
      body: "Hello world!2",
      upVotesBy: [],
      downVotesBy: [],
    };
    const threads = [
      {
        id: "thread-123",
        title: "Hello",
        body: "Hello world!",
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: "ADD_THREAD",
      payload: { threads: [newThread, ...threads] },
    };

    // action
    const nextState = threadsReducer(threads, action);

    //assert
    expect(nextState).toEqual([newThread, ...threads]);
  });
  it("should return threads when given by UPVOTE_THREAD action", () => {
    // arrange
    const payload = {
      threadId: "thread-123",
      userId: "user-123",
    };

    const threads = [
      {
        id: "thread-123",
        title: "Hello",
        body: "Hello world!",
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const newThreads = threads.map((thread) => {
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.concat([payload.userId]),
      };
    });

    const action = {
      type: "UPVOTE_THREAD",
      payload,
    };

    // action
    const nextState = threadsReducer(threads, action);

    //assert
    expect(nextState).toEqual(newThreads);
  });
  it("should return threads when given by DOWNVOTE_THREAD action", () => {
    // arrange
    const payload = {
      threadId: "thread-123",
      userId: "user-123",
    };

    const threads = [
      {
        id: "thread-123",
        title: "Hello",
        body: "Hello world!",
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const newThreads = threads.map((thread) => {
      return {
        ...thread,
        downVotesBy: thread.upVotesBy.concat([payload.userId]),
      };
    });

    const action = {
      type: "DOWNVOTE_THREAD",
      payload,
    };

    // action
    const nextState = threadsReducer(threads, action);

    //assert
    expect(nextState).toEqual(newThreads);
  });
  it("should return threads when given by NEUTRALVOTE_THREAD action", () => {
    // arrange
    const payload = {
      threadId: "thread-123",
      userId: "user-123",
    };

    const threads = [
      {
        id: "thread-123",
        title: "Hello",
        body: "Hello world!",
        upVotesBy: ["user-123"],
        downVotesBy: [],
      },
    ];

    const newThreads = threads.map((thread) => {
      if (
        thread.upVotesBy.includes(payload.userId) ||
        thread.downVotesBy.includes(payload.userId)
      ) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter((vote) => vote !== payload.userId),
          downVotesBy: thread.downVotesBy.filter(
            (vote) => vote !== payload.userId
          ),
        };
      }

      return thread;
    });

    const action = {
      type: "NEUTRALVOTE_THREAD",
      payload,
    };

    // action
    const nextState = threadsReducer(threads, action);

    //assert
    expect(nextState).toEqual(newThreads);
  });
});
