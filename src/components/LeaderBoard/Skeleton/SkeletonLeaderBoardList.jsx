import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLeaderBoardList = () => {
  const skeletonLeaderboardItems = [];

  for (let i = 1; i <= 10; i++) {
    skeletonLeaderboardItems.push(
      <div
        key={i}
        className="flex justify-between items-center tracking-wider border-b-2 pb-3"
      >
        <div className="flex items-center gap-3">
          <Skeleton width="35px" height="35px" borderRadius="50%" />
          <Skeleton width="150px" height="18px" />
        </div>
        <Skeleton width="35px" height="30px" />
      </div>
    );
  }
  return (
    <div className="leaderBoards-list space-y-4 mt-5">
      {skeletonLeaderboardItems}
    </div>
  );
};

export default SkeletonLeaderBoardList;
