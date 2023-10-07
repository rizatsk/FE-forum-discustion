import { describe, it } from "vitest";
import authUserReducer from "../../../states/authUser/reducer";

/**
 * skenario test
 *
 *  - authUserReducer reducer
 *    - should return user null when given by unknown action
 *    - should return user when given by SET_AUTH_USER action
 *    - should return user null when given by UNSET_AUTH_USER action
 */

describe("authUserReducer reducer", () => {
  it("should return user null when given by unknown action", () => {
    // arrange
    const userState = null;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = authUserReducer(userState, action);

    //assert
    expect(nextState).toEqual(userState);
  });
  it("should return user when given by SET_AUTH_USER action", () => {
    // arrange
    const userState = { id: "user-1231231", name: "Rizat Sakmir" };
    const action = { type: "SET_AUTH_USER", payload: { authUser: userState } };

    // action
    const nextState = authUserReducer(userState, action);

    //assert
    expect(nextState).toEqual(userState);
  });
  it("should return user null when given by UNSET_AUTH_USER action", () => {
    // arrange
    const userState = null;
    const action = {
      type: "UNSET_AUTH_USER",
    };

    // action
    const nextState = authUserReducer(userState, action);

    //assert
    expect(nextState).toEqual(userState);
  });
});
