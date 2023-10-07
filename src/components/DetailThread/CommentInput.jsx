import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { validateFormComment } from "./ValidateForm";

export default function CommentInput({ createComment }) {
  const { authUser = null } = useSelector((states) => states);
  const [comment, changeComment, setComment] = useInput("");
  const [validateForm, setValidateForm] = useState({});

  const onSubmitCommentHandler = (e) => {
    e.preventDefault();

    const validateErrorForm = validateFormComment({ comment }, setValidateForm);
    if (Object.keys(validateErrorForm).length > 0) return false;

    createComment(comment);
    setComment("");
  };

  return (
    <div className="input-comment my-5 space-y-4 border-b-2 pb-8">
      {authUser && (
        <div className="flex items-center gap-3">
          <img
            className="rounded-[50%] w-[35px]"
            src={authUser.avatar}
            alt={authUser.name}
          />
          <span className="text-base font-[500] capitalize">
            {authUser.name}
          </span>
        </div>
      )}
      <h2 className="sm:text-base lg:text-lg font-[500]">Komentar :</h2>
      <div>
        <p className="text-form-error font-[400] dark:text-dark-primary-sky">
          {validateForm.comment}
        </p>
        <textarea
          type="text"
          placeholder="Tulis komentar anda ..."
          value={comment}
          onChange={changeComment}
          className="block p-2.5 w-full h-[40vw] md:h-[20vh] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onSubmitCommentHandler}
          className="bg-primary text-white py-2 px-5 rounded-sm font-[500] sm:text-lg tracking-wider hover:bg-primary-hover dark:bg-dark-primary-sky dark:text-text-primary"
        >
          Balas
        </button>
      </div>
    </div>
  );
}

CommentInput.propTypes = {
  createComment: PropTypes.func.isRequired,
};
