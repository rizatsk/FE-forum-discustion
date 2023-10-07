import React from "react";
import PropTypes from "prop-types";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from "../../states/threads/action";

export default function DiscustionItem({ thread }) {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpVote = thread?.upVotesBy?.includes(authUser?.id);
  const isDownVote = thread?.downVotesBy?.includes(authUser?.id);

  const onDetailClick = () => {
    navigate(`/thread/${thread?.id}`);
  };

  const onUpVoteClick = (e) => {
    e.stopPropagation();

    if (thread?.upVotesBy.includes(authUser?.id))
      return dispatch(asyncNeutralVoteThread(thread?.id));

    dispatch(asyncUpVoteThread(thread?.id));
  };

  const onDownVoteClick = (e) => {
    e.stopPropagation();

    if (thread?.downVotesBy.includes(authUser?.id))
      return dispatch(asyncNeutralVoteThread(thread?.id));

    dispatch(asyncDownVoteThread(thread?.id));
  };

  return (
    <div className="card-thread space-y-4 pb-7 border-neutral-300 border-b-2">
      <div className="card-thread_head flex items-center gap-3">
        <div className="flex items-center gap-3">
          <img
            data-testid="img-owner-thread"
            className="rounded-[50%] w-[35px]"
            src={thread?.owner?.avatar}
            alt={thread?.owner?.name}
          />
          <span
            data-testid="name-owner-thread"
            className="text-base font-[500] capitalize"
          >
            {thread?.owner?.name}
          </span>
        </div>
        <p data-testid="thread-createdAt">{postedAt(thread?.createdAt)}</p>
      </div>
      <div className="card-thread_body">
        <h2
          data-testid="thread-title"
          onClick={onDetailClick}
          className="text-lg font-[500] my-2 cursor-pointer text-primary dark:text-dark-primary-sky"
        >
          {thread?.title}
        </h2>
        <div
          data-testid="thread-body"
          dangerouslySetInnerHTML={{ __html: thread?.body }}
        ></div>
      </div>
      <div className="card-thread_footer flex items-center gap-3">
        <button
          data-testid="button-upVote"
          onClick={onUpVoteClick}
          className="button-like-thread flex items-center gap-1"
        >
          {isUpVote ? (
            <BiSolidLike
              data-testid="icon-upVote-liked"
              className="w-[20px] h-[20px] text-primary dark:text-dark-primary-sky"
            />
          ) : (
            <BiLike data-testid="icon-upVote" className="w-[20px] h-[20px]" />
          )}
          <span>{thread?.upVotesBy?.length}</span>
        </button>
        <button
          data-testid="button-downVote"
          onClick={onDownVoteClick}
          className="button-not-like-thread flex items-center gap-1"
        >
          {isDownVote ? (
            <BiSolidDislike
              data-testid="icon-downVote-disliked"
              className="w-[20px] h-[20px] text-primary dark:text-dark-primary-sky"
            />
          ) : (
            <BiDislike
              data-testid="icon-downVote"
              className="w-[20px] h-[20px]"
            />
          )}
          <span>{thread?.downVotesBy?.length}</span>
        </button>
        <div className="comment-thread flex items-center gap-1">
          <VscComment className="w-[20px] h-[20px]" />{" "}
          <span data-testid="thread-totalComment">
            {thread?.totalComments || thread?.comments?.length}
          </span>
        </div>
      </div>
      <div className="w-max px-3 border border-primary text-primary dark:text-dark-primary-sky dark:border-dark-primary-sky rounded-md">
        <p data-testid="thread-category">#{thread?.category}</p>
      </div>
    </div>
  );
}

DiscustionItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    category: PropTypes.string.isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
    totalComments: PropTypes.number,
    comments: PropTypes.array,
    createdAt: PropTypes.string.isRequired,
  }),
};
