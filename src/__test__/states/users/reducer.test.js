import usersReducers from "../../../states/users/reducer";
import { describe, it } from "vitest";

/**
 * skenario test
 *
 *  - usersReducers
 *    - should return users [] when given by unknown action
 *    - should return users when given by RECEIVE_USERS action
 */

describe("usersReducers", () => {
  const users = {
    haveData: [
      {
        id: "user-123",
        name: "Sangga",
        imageUser: "https://image/&name=sangga",
      },
      {
        id: "user-124",
        name: "Rizat",
        imageUser: "https://image/&name=rizat",
      },
    ],
    noHaveData: [],
  };

  it("should return users [] when given by unknown action", () => {
    // arrange
    const action = { type: "UNKNOWN" };

    // action
    const nextState = usersReducers(users.noHaveData, action);

    //assert
    expect(nextState).toEqual(users.noHaveData);
  });
  it("should return users when given by RECEIVE_USERS action", () => {
    // arrange
    const action = {
      type: "RECEIVE_USERS",
      payload: { users: users.haveData },
    };

    // action
    const nextState = usersReducers(users.noHaveData, action);

    //assert
    expect(nextState).toEqual(users.haveData);
  });
});
