import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCategoryList = () => {
  const skeletonCategoryItem = [];

  for (let i = 1; i <= 4; i++) {
    skeletonCategoryItem.push(
      <Skeleton key={i} width="90px" height="35px" borderRadius="8px" />
    );
  }

  return (
    <div className="flex gap-3 my-4 flex-wrap">
      <Skeleton width="50px" height="35px" borderRadius="8px" />
      {skeletonCategoryItem}
    </div>
  );
};

export default SkeletonCategoryList;
