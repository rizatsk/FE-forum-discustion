import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonDiscustionItem = () => {
  return (
    <div className="card-skeleton-discustion-item space-y-4 my-4 pb-7 border-neutral-300 border-b-2">
      <div className="flex items-center gap-3">
        <Skeleton width="35px" height="35px" borderRadius="50%" />
        <Skeleton width="150px" />
      </div>
      <div className="space-y-2">
        <Skeleton count="2" />
      </div>
      <div>
        <Skeleton width="130px" />
        <Skeleton width="70px" />
      </div>
    </div>
  );
};

export default SkeletonDiscustionItem;
