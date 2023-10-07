import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import api from "../../../utils/api";
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from "../../../states/authUser/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

/**
 * skenario test
 *
 *  - asyncSetAuthUser thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call errorCallBack correctly when data fetching failed
 *  - asyncUnsetAuthUser thunk
 *    - should dispatch action correctly when succes
 */

const paramAuthUser = {
  email: "testuser@gmail.com",
  password: "testUser123",
  successCallback: () => {
    return "succes";
  },
  errorCallBack: () => {
    return "something error";
  },
};

const fakeLoginResponse = "tokenlogin123";
const fakeOwnProfileResponse = {
  id: "user-1",
  email: paramAuthUser.email,
  name: "User Test 1",
  photo: "https://generated-image-url.jpg",
};

const fakeErrorResponse = new Error("Something error");

describe("asyncSetAuthUser thunk", () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._login;
    delete api._getOwnProfile;
  });
  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.login = vi.fn(() => Promise.resolve(fakeLoginResponse));
    api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock putAccessToken
    api.putAccessToken = vi.fn();
    // mock successCallback
    paramAuthUser.successCallback = vi.fn();

    // action
    await asyncSetAuthUser(paramAuthUser)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({
      email: paramAuthUser.email,
      password: paramAuthUser.password,
    });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeLoginResponse);
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeOwnProfileResponse)
    );
    expect(paramAuthUser.successCallback).toHaveBeenCalledWith();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it("should dispatch action and call errorCallBack correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock errorCallBack
    paramAuthUser.errorCallBack = vi.fn();

    // action
    await asyncSetAuthUser(paramAuthUser)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(paramAuthUser.errorCallBack).toHaveBeenCalledWith(
      fakeErrorResponse.message
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncUnsetAuthUser thunk", () => {
  beforeEach(() => {
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.putAccessToken = api._putAccessToken;

    // delete backup data
    delete api._putAccessToken;
  });

  it("should dispatch action correctly when succes", () => {
    // arrange
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith("");
  });
});
