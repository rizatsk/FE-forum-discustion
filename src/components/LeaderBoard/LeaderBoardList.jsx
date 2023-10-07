import React, { useEffect, useState } from "react";
import LeaderBoardItem from "./LeaderBoardItem";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderBoards } from "../../states/leaderBoard/action";
import { RiLineChartLine } from "react-icons/ri";
import SkeletonLeaderBoardList from "./Skeleton/SkeletonLeaderBoardList";

export default function LeaderBoardList() {
  const { leaderBoards = [] } = useSelector((states) => states);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderBoards(setIsLoading));
  }, [dispatch]);

  if (isLoading) {
    return <SkeletonLeaderBoardList />;
  }

  if (leaderBoards.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 gap-5">
        <RiLineChartLine className="text-dark-primary-sky w-[20vw] h-[20vw] md:w-[70px] md:h-[70px]" />
        <h2 className="text-center text-gray-400">Tidak ada leader boards</h2>
      </div>
    );
  }

  return (
    <div className="leaderBoards-list space-y-4 mt-5">
      {leaderBoards.map((leaderBoard) => (
        <LeaderBoardItem key={leaderBoard.user.id} leaderBoard={leaderBoard} />
      ))}
    </div>
  );
}
