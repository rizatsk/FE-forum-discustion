import React from "react";
import PropTypes from "prop-types";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { postedAt } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from "../../states/threadDetail/action";

export default function CommentItem({ comment }) {
  const { authUser = null, threadDetail } = useSelector((states) => states);
  const dispatch = useDispatch();

  const isUpVote = comment?.upVotesBy?.includes(authUser?.id);
  const isDownVote = comment?.downVotesBy?.includes(authUser?.id);

  const onUpVoteClick = (e) => {
    e.stopPropagation();

    if (comment.upVotesBy.includes(authUser?.id))
      return dispatch(
        asyncNeutralVoteComment({
          threadId: threadDetail.id,
          commentId: comment.id,
        })
      );

    dispatch(
      asyncUpVoteComment({
        threadId: threadDetail.id,
        commentId: comment.id,
      })
    );
  };

  const onDownVoteClick = (e) => {
    e.stopPropagation();

    if (comment.downVotesBy.includes(authUser?.id))
      return dispatch(
        asyncNeutralVoteComment({
          threadId: threadDetail.id,
          commentId: comment.id,
        })
      );

    dispatch(
      asyncDownVoteComment({
        threadId: threadDetail.id,
        commentId: comment.id,
      })
    );
  };

  return (
    <div className="card-thread space-y-4 text-black dark:text-white">
      <div className="card-thread_head flex items-center gap-3">
        <div className="flex items-center gap-3">
          <img
            className="rounded-[50%] w-[35px]"
            src={comment.owner.avatar}
            alt={comment.owner.name}
          />
          <span className="text-base font-[500] capitalize">
            {comment.owner.name}
          </span>
        </div>
        <p>{postedAt(comment.createdAt)}</p>
      </div>
      <div className="card-thread_body">
        <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
      </div>
      <div className="card-thread_footer flex items-center gap-3">
        <button
          onClick={onUpVoteClick}
          className="button-like-thread flex items-center gap-1"
        >
          {isUpVote ? (
            <BiSolidLike className="w-[20px] h-[20px] text-primary dark:text-dark-primary-sky" />
          ) : (
            <BiLike className="w-[20px] h-[20px]" />
          )}
          <span>{comment.upVotesBy.length}</span>
        </button>
        <button
          onClick={onDownVoteClick}
          className="button-not-like-thread flex items-center gap-1"
        >
          {isDownVote ? (
            <BiSolidDislike className="w-[20px] h-[20px] text-primary dark:text-dark-primary-sky" />
          ) : (
            <BiDislike className="w-[20px] h-[20px]" />
          )}
          <span>{comment.downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
