import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
import { BiSolidCommentDots } from "react-icons/bi";

export default function CommentList({ comments }) {
  if (comments.length < 1) {
    return (
      <div className="list-comments mt-10 space-y-5 text-white">
        <div className="flex items-center justify-center">
          <BiSolidCommentDots className="text-primary w-[20vw] h-[20vw] md:w-[70px] md:h-[70px] 2xl:w-[100px] 2xl:h-[100px] translate-x-[2rem] z-[5]" />
          <BiSolidCommentDots className="text-gray-300 transform scale-x-[-1] w-[20vw] h-[20vw] md:w-[70px] md:h-[70px] 2xl:w-[100px] 2xl:h-[100px] translate-y-[10px] z-[4]" />
        </div>
        <div className="text-center text-gray-400 dark:text-gray-100">
          <p>Belum ada komentar pada thread ini.</p>
          <p>Jadilah yang pertama untuk menjawab diskusi ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-comments mt-10 space-y-5 text-white">
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
};
