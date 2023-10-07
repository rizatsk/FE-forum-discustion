import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCommentItem = () => {
  return (
    <div className="list-comments mt-10 space-y-4">
      <div className="card-skeleton-discustion-item space-y-4 my-4 pb-7 border-neutral-300 border-b-2">
        <div className="flex items-center gap-3">
          <Skeleton width="35px" height="35px" borderRadius="50%" />
          <Skeleton width="150px" />
        </div>
        <div className="space-y-2">
          <Skeleton />
        </div>
        <div>
          <Skeleton width="130px" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCommentItem;
