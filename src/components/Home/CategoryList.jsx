import React from "react";
import PropTypes from "prop-types";
import SkeletonCategoryList from "./Skeleton/SkeletonCategoryList";

export default function CategoryList({
  categoryThread,
  threadCategories,
  setCategoryThread,
  isLoading,
}) {
  const onChangeCategoryThreadHandler = (category) => {
    setCategoryThread(category);
  };

  if (isLoading) {
    return <SkeletonCategoryList />;
  }

  if (threadCategories.length < 1) {
    <div className="flex gap-3 my-4 flex-wrap">
      <div
        onClick={() => {
          onChangeCategoryThreadHandler("");
        }}
        className={`${
          !categoryThread
            ? "bg-primary text-white border-primary dark:bg-dark-primary-sky dark:text-text-primary dark:border-dark-primary-sky"
            : "border-black hover:bg-primary hover:text-white hover:border-primary dark:text-white dark:border-white dark:hover:border-dark-primary-sky dark:hover:text-text-primary dark:hover:bg-dark-primary-sky"
        } px-3 py-1 border rounded-lg cursor-pointer ease-in-out duration-300`}
      >
        <p>All</p>
      </div>
    </div>;
  }

  return (
    <div className="flex gap-3 my-4 flex-wrap">
      <div
        onClick={() => {
          onChangeCategoryThreadHandler("");
        }}
        className={`${
          !categoryThread
            ? "bg-primary text-white border-primary dark:bg-dark-primary-sky dark:text-text-primary dark:border-dark-primary-sky"
            : "border-black hover:bg-primary hover:text-white hover:border-primary dark:text-white dark:border-white dark:hover:border-dark-primary-sky dark:hover:text-text-primary dark:hover:bg-dark-primary-sky"
        } px-3 py-1 border rounded-lg cursor-pointer ease-in-out duration-300`}
      >
        <p>All</p>
      </div>
      {threadCategories.map((category, index) => (
        <div
          onClick={() => {
            onChangeCategoryThreadHandler(category);
          }}
          key={index}
          className={`${
            categoryThread === category?.toLowerCase()
              ? "bg-primary text-white border-primary dark:bg-dark-primary-sky dark:text-text-primary dark:border-dark-primary-sky"
              : "border-black hover:bg-primary hover:text-white hover:border-primary dark:text-white dark:border-white dark:hover:border-dark-primary-sky dark:hover:text-text-primary dark:hover:bg-dark-primary-sky"
          } px-3 py-1 border rounded-lg cursor-pointer ease-in-out duration-300 w-max h-max`}
        >
          <p>#{category}</p>
        </div>
      ))}
    </div>
  );
}

CategoryList.propTypes = {
  categoryThread: PropTypes.string,
  threadCategories: PropTypes.array,
  setCategoryThread: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
