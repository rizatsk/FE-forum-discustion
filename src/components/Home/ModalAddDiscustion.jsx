import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import { validateFormAddDiscustion } from "./ValidateForm";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../../states/threads/action";

export default function ModalAddDiscustion() {
  const [title, changeTitle, setTitle] = useInput("");
  const [category, changeCategory, setCategory] = useInput("");
  const [content, changeContent, setContent] = useInput("");
  const [validateForm, setValidateForm] = useState({});

  const dispatch = useDispatch();

  const closeModal = () => {
    const modal = document.querySelector("#staticModalAddDiscustion");
    modal.classList.add("invisible");
    clearModal();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validateErrorForm = validateFormAddDiscustion(
      { title, category, content },
      setValidateForm
    );
    if (Object.keys(validateErrorForm).length > 0) return false;

    dispatch(asyncAddThread({ title, category, content }));
    closeModal();
  };

  const clearModal = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setValidateForm({});
  };

  return (
    <div
      id="staticModalAddDiscustion"
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="invisible fixed inset-0 flex items-end sm:items-center sm:justify-center overflow-auto bg-gray-500 bg-opacity-40"
    >
      <div className="w-full min-h-max max-h-[85vh] 2xl:h-max px-2 pt-4 overflow-y-auto bg-white md:bg-transparent rounded-t-lg dark:bg-gray-800 md:dark:bg-transparent sm:rounded-lg sm:m-4 sm:max-w-xl">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Membuat Diskusi
            </h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="staticModalAddDiscustion"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium leading-6 text-text-primary dark:text-white">
                  Judul:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={changeTitle}
                  placeholder="Masukan judul diskusi"
                  className={`${
                    validateForm.title
                      ? "border-form-error dark:border-dark-primary-sky border dark:border-2"
                      : "border-gray-300"
                  } text-base font-[500] w-full bg-gray-50 text-text-primary rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-2.5`}
                />
                <p className="text-form-error font-[400] dark:text-dark-primary-sky">
                  {validateForm.title}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-text-primary dark:text-white">
                  Kategori:
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={changeCategory}
                  placeholder="Masukan kategori diskusi"
                  className={`${
                    validateForm.category
                      ? "border-form-error dark:border-dark-primary-sky border dark:border-2"
                      : "border-gray-300"
                  } text-base font-[500] w-full bg-gray-50 text-text-primary rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-2.5`}
                />
                <p className="text-form-error font-[400] dark:text-dark-primary-sky">
                  {validateForm.category}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-text-primary dark:text-white">
                  Isi Diskusi:
                </label>
                <textarea
                  type="text"
                  value={content}
                  onChange={changeContent}
                  placeholder="Masukan isi diskusi"
                  className={`${
                    validateForm.content
                      ? "border-form-error dark:border-dark-primary-sky dark:border-2"
                      : "border-gray-300"
                  } text-base font-[500] w-full h-[40vw] md:h-[20vh] bg-gray-50 border text-text-primary rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-2.5`}
                />
                <p className="text-form-error font-[400] dark:text-dark-primary-sky">
                  {validateForm.content}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="staticModal"
                type="submit"
                className="text-white dark:text-dark-primary bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark-primary-sky dark:hover:shadow-darkPrimaryShadow"
              >
                Buat Diskusi
              </button>
              <button
                onClick={closeModal}
                data-modal-hide="staticModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
