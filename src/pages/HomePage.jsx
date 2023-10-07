import React, { useEffect, useState } from "react";
import CategoryList from "../components/Home/CategoryList";
import DiscustionList from "../components/Home/DiscustionList";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateUserAndThreads } from "../states/shared/actions";
import ModalAddDiscustion from "../components/Home/ModalAddDiscustion";
import { BsPlusSquareFill } from "react-icons/bs";

export default function HomePage() {
  const {
    threads = [],
    categoryThreads = [],
    authUser = null,
  } = useSelector((states) => states);
  const [categoryThread, setCategoryThread] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUserAndThreads(setIsLoading));
  }, [dispatch]);

  const filterThreadLists = threads.filter((thread) => {
    if (!categoryThread) return thread;

    return thread.category.toLowerCase() === categoryThread.toLowerCase();
  });

  const onModalAddDiscution = () => {
    if (!authUser) {
      alert("Harap login terlebih dahulu");
      return false;
    }

    const modal = document.querySelector("#staticModalAddDiscustion");
    modal.classList.remove("invisible");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-5">
      <div
        id="category"
        className="bg-white shadow-lg rounded-md lg:w-[30%] h-max p-5 dark:bg-dark-primary-2 ease-out duration-300"
      >
        <h2 className="text-center font-[500] sm:text-lg xl:text-xl py-3 border-b-2 dark:text-white">
          Kategori Populer
        </h2>
        <CategoryList
          isLoading={isLoading}
          categoryThread={categoryThread}
          threadCategories={categoryThreads}
          setCategoryThread={setCategoryThread}
        />
      </div>
      <div
        id="threads"
        className="bg-white shadow-lg rounded-md w-full p-5 px-8 dark:bg-dark-primary-2 ease-out duration-300 dark:text-white"
      >
        <div className="py-3 border-b-2 flex justify-between">
          <h2 className="font-[500] sm:text-lg xl:text-xl">Diskusi</h2>
          <button
            onClick={onModalAddDiscution}
            data-modal-target="staticModalAddDiscustion"
            type="button"
            className="button-modal flex gap-3 items-center px-4 py-2 rounded-md bg-primary hover:bg-primary-hover dark:bg-dark-primary-sky dark:hover:shadow-darkPrimaryShadow"
          >
            <BsPlusSquareFill className="text-white dark:text-dark-primary w-[25px] h-[25px]" />
            <span className="font-[500] text-white dark:text-dark-primary ">
              Buat Diskusi
            </span>
          </button>
          <ModalAddDiscustion />
        </div>
        <DiscustionList isLoading={isLoading} threads={filterThreadLists} />
      </div>
    </div>
  );
}
