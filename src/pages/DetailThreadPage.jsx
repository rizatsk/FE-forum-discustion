import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiscustionItem from "../components/Home/DiscustionItem";
import CommentInput from "../components/DetailThread/CommentInput";
import CommentList from "../components/DetailThread/CommentList";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import {
  asyncCreateComment,
  asyncReceiveThreadDetail,
} from "../states/threadDetail/action";
import SkeletonDiscustionItem from "../components/Home/Skeleton/SkeletonDiscustionItem";
import SkeletonCommentItem from "../components/DetailThread/Skeleton/SkeletonCommentItem";
import SkeletonCommentInput from "../components/DetailThread/Skeleton/SkeletonCommentInput";

export default function DetailThreadPage() {
  const { id } = useParams();
  const { threadDetail } = useSelector((states) => states);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id, setIsLoading));
  }, [id, dispatch]);

  const onCreateCommentHandler = (content) => {
    dispatch(asyncCreateComment({ threadId: threadDetail?.id, content }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen lg:w-[50vw] mx-auto bg-white mt-5 p-5 dark:bg-dark-primary-2 ease-out duration-300 dark:text-white rounded-md shadow-lg">
        <SkeletonDiscustionItem />
        <SkeletonCommentInput />
        <SkeletonCommentItem />
      </div>
    );
  }

  if (!threadDetail) {
    return (
      <div className="min-h-screen lg:w-[50vw] mx-auto bg-white mt-5 p-5 dark:bg-dark-primary-2 ease-out duration-300 dark:text-white rounded-md shadow-lg">
        <div className="flex flex-col items-center justify-center mt-10 gap-5">
          <MdOutlineSpeakerNotesOff className="text-dark-primary-sky w-[20vw] h-[20vw] md:w-[70px] md:h-[70px] 2xl:w-[100px] 2xl:h-[100px]" />
          <h2 className="text-center text-lg">Thread tidak tersedia</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:w-[50vw] mx-auto bg-white mt-5 p-5 dark:bg-dark-primary-2 ease-out duration-300 dark:text-white rounded-md shadow-lg">
      <DiscustionItem thread={threadDetail} />
      <CommentInput createComment={onCreateCommentHandler} />
      <CommentList comments={threadDetail?.comments} />
    </div>
  );
}
