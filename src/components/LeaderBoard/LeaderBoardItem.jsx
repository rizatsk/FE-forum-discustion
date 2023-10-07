import React from "react";
import PropTypes from "prop-types";

export default function LeaderBoardItem({ leaderBoard }) {
  return (
    <div className="flex justify-between items-center tracking-wider border-b-2 pb-3">
      <div className="flex items-center gap-3">
        <img
          data-testid="leaderboard-user-avatar"
          className="rounded-[50%] w-[35px]"
          src={leaderBoard.user.avatar}
          alt={leaderBoard.user.name}
        />
        <span
          data-testid="leaderboard-user-name"
          className="sm:text-base xl:text-lg font-[500] capitalize"
        >
          {leaderBoard.user.name}
        </span>
      </div>
      <span
        data-testid="leaderboard-score"
        className="sm:text-base xl:text-lg font-[500]"
      >
        {leaderBoard.score}
      </span>
    </div>
  );
}

LeaderBoardItem.propTypes = {
  leaderBoard: PropTypes.shape({
    score: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
  }),
};
