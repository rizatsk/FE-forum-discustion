import React from "react";
import LoadingBar from "react-redux-loading-bar";

export default function Loading() {
  return (
    <div className="sticky top-0 h-2">
      <LoadingBar className="bg-primary dark:bg-dark-primary-sky h-1 rounded-lg" />
    </div>
  );
}
