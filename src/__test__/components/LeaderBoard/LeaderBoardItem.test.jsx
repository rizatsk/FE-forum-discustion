import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LeaderBoardItem from "../../../components/LeaderBoard/LeaderBoardItem";

/**
 * skenario test
 *
 *  - LeaderBoardItem component
 *    - should have data leaderboard
 */

describe("LeaderBoardItem component", () => {
  const fakeLeaderBoard = {
    id: "leaderboard-123",
    score: 20,
    user: {
      name: "Bambang",
      avatar: "https://geneareteimage.com?name=Bambang",
    },
  };

  afterEach(() => {
    cleanup();
  });

  it("should have data leaderboard", () => {
    // Arrange
    render(<LeaderBoardItem leaderBoard={fakeLeaderBoard} />);

    // Action
    const imgLeaderboardUser = screen.getByTestId("leaderboard-user-avatar");
    const spanLeaderBoardUserName = screen.getByTestId("leaderboard-user-name");
    const spanLeaderBoardScore = screen.getByTestId("leaderboard-score");

    // Assert
    expect(imgLeaderboardUser.nodeName).toBe("IMG");
    expect(imgLeaderboardUser).toHaveAttribute(
      "src",
      fakeLeaderBoard.user.avatar
    );
    expect(imgLeaderboardUser).toHaveAttribute(
      "alt",
      fakeLeaderBoard.user.name
    );
    expect(spanLeaderBoardUserName).toHaveTextContent(
      fakeLeaderBoard.user.name
    );
    expect(spanLeaderBoardScore).toHaveTextContent(fakeLeaderBoard.score);
  });
});
