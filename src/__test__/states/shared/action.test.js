import { afterEach, beforeEach, describe, vi } from "vitest";
import { asyncPopulateUserAndThreads } from "../../../states/shared/actions";
import api from "../../../utils/api";
import { receiveThreadsActionCreator } from "../../../states/threads/action";
import { receiveUsersActionCreator } from "../../../states/users/action";
import { receiveCategoryThreadsActionCreator } from "../../../states/categoryThreads/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

/**
 * skenario test
 *
 *  - asyncPopulateUserAndThreads thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadsResponse = [
  {
    id: "thread-123",
    title: "Hello",
    body: "Hello world!",
    upVotesBy: [],
    downVotesBy: [],
  },
];

const fakeUsersResponse = [
  {
    id: "user-1",
    name: "User Test 1",
    photo: "https://generated-image-url.jpg",
  },
];

const categoryThreads = fakeThreadsResponse.map((thread) => {
  return thread.category;
});
const fakeCategoryThreads = [...new Set(categoryThreads)];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncPopulateUserAndThreads thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    // delete backup data
    delete api._getAllThreads;
    delete api._getAllUsers;
  });
  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUserAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveCategoryThreadsActionCreator(fakeCategoryThreads)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUserAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
