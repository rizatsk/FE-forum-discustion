import React from "react";
import SkeletonDiscustionItem from "./SkeletonDiscustionItem";

const SkeletonDisuctionList = () => {
  const skeletonDiscustionItem = [];

  for (let i = 1; i <= 5; i++)
    skeletonDiscustionItem.push(<SkeletonDiscustionItem key={i} />);

  return (
    <div className="mt-4 font-[500] dark:text-white">
      {skeletonDiscustionItem}
    </div>
  );
};

export default SkeletonDisuctionList;
