import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCommentInput = () => {
  return (
    <div className="comment-input my-5 space-y-4 border-b-2 pb-8">
      <div className="flex items-center gap-3">
        <Skeleton width="35px" height="35px" borderRadius="50%" />
        <Skeleton width="150px" />
      </div>
      <div>
        <Skeleton width="150px" />
        <Skeleton height="20vh" />
      </div>
      <div className="text-end">
        <Skeleton width="90px" height="50px" />
      </div>
    </div>
  );
};

export default SkeletonCommentInput;
